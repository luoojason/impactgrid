import { request } from './httpClient.js';

export async function handler({ country }) {
  const key = process.env.GFW_API_KEY;

  if (!key) {
    return { ok: false, reason: 'missing_key', message: 'GFW_API_KEY is required' };
  }

  const iso3 = country.toUpperCase();
  const url = 'https://data-api.globalforestwatch.org/dataset/gadm__tcl__iso_change/latest/query';
  const body = {
    sql: `SELECT umd_tree_cover_loss__year, SUM(umd_tree_cover_loss__ha) as loss_ha FROM data WHERE iso='${iso3}' GROUP BY umd_tree_cover_loss__year ORDER BY umd_tree_cover_loss__year DESC LIMIT 10`,
  };

  const result = await request({
    url,
    method: 'POST',
    headers: {
      'x-api-key': key,
      'Origin': 'http://localhost',
      'Content-Type': 'application/json',
    },
    body,
    redirect: 'follow',
  });

  if (!result.ok) {
    return { ok: false, reason: result.reason, message: result.message, source: 'Global Forest Watch', url };
  }

  const rows = result.data?.data ?? [];
  const loss_by_year = rows.map(r => ({ year: r.umd_tree_cover_loss__year, loss_ha: parseFloat(r.loss_ha) }));

  return {
    ok: true,
    data: { loss_by_year },
    source: 'Global Forest Watch',
    url,
  };
}
