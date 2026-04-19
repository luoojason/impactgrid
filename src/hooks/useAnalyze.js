export async function analyze(intake) {
  const r = await fetch(`${import.meta.env.VITE_API_BASE ?? ''}/api/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(intake),
  });
  const json = await r.json();
  // 429 means duplicate — return existing streamId
  if (r.status === 429) {
    return { streamId: json.streamId, duplicate: true };
  }
  return json;
}
