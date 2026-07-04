import { supabase } from '../_lib/db.js';
import { checkAdminAuth, sendUnauthorized } from '../_lib/auth.js';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    return handleGet(req, res);
  }

  res.status(405).json({ error: 'Method not allowed' });
}

async function handleGet(req, res) {
  if (!checkAdminAuth(req)) {
    return sendUnauthorized(res);
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'Missing inquiry ID' });
  }

  const { data, error } = await supabase
    .from('guest_inquiries')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return res.status(404).json({ error: 'Inquiry not found' });
    }
    return res.status(500).json({ error: error.message });
  }

  res.json({ inquiry: data });
}
