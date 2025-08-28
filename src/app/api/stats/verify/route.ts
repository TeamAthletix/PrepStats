export async function POST(req: Request) {
  const body = await req.json()
  // Insert verification logic here
  return new Response(JSON.stringify({ verified: true }))
}
