export async function POST(req: Request) {
  const body = await req.json()
  // Insert stat entry logic here
  return new Response(JSON.stringify({ success: true }))
}
