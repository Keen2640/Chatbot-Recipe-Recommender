const BASE_URL = 'http://11.33.7.81:3001'; // replace with your machine IP for device testing

export async function generate(prompt) {
  const res = await fetch(`${BASE_URL}/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });
  return res.json(); // { output: string, meta?: { id } }
}

export async function vote(id, choice) {
  // implement or stub if not needed for demo
  return { ok: true };
}