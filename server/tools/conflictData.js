import { request } from './httpClient.js';
import { getAccessToken } from './acledAuth.js';

export async function handler({ country }) {
  if (!country) {
    return { ok: false, reason: 'missing_country', message: 'country is required' };
  }

  let token;
  try {
    token = await getAccessToken();
  } catch (err) {
    if (err.reason === 'missing_credentials') {
      return {
        ok: false,
        reason: 'missing_credentials',
        message: 'ACLED_EMAIL and ACLED_PASSWORD are required',
        source: 'ACLED',
      };
    }
    return { ok: false, reason: 'auth_failed', message: err.message, source: 'ACLED' };
  }

  const params = new URLSearchParams({
    _format: 'json',
    country,
    event_date: '2024-01-01|2025-12-31',
    event_date_where: 'BETWEEN',
    limit: '200',
    fields: 'event_date|event_type|fatalities',
  });
  const url = `https://acleddata.com/api/acled/read?${params.toString()}`;

  const t0 = Date.now();
  const result = await request({
    url,
    headers: { Authorization: `Bearer ${token}` },
    timeoutMs: 45000,
  });
  const elapsed = Date.now() - t0;
  console.log(`[acled] country=${country} status=${result.ok ? 'ok' : result.reason} elapsed=${elapsed}ms`);

  if (!result.ok) {
    return { ok: false, reason: result.reason, message: result.message, source: 'ACLED', url };
  }

  const events = result.data?.data ?? [];
  let total_events = 0;
  let total_fatalities = 0;
  const by_type = {};

  for (const ev of events) {
    total_events++;
    const fat = parseInt(ev.fatalities ?? 0, 10);
    total_fatalities += fat;
    const type = ev.event_type ?? 'unknown';
    if (!by_type[type]) by_type[type] = { count: 0, fatalities_sum: 0 };
    by_type[type].count++;
    by_type[type].fatalities_sum += fat;
  }

  return {
    ok: true,
    data: { total_events, total_fatalities, by_type },
    source: 'ACLED',
    url,
  };
}
