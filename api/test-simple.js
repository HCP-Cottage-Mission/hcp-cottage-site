export default function handler(request) {
  return new Response(
    JSON.stringify({ message: 'Simple test works!' }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}
