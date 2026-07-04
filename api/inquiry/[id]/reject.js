import { supabase } from '../../_lib/db.js';
import { checkAdminAuth, sendUnauthorized } from '../../_lib/auth.js';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    return handlePost(req, res);
  }

  res.status(405).json({ error: 'Method not allowed' });
}

async function handlePost(req, res) {
  if (!checkAdminAuth(req)) {
    return sendUnauthorized(res);
  }

  const { id } = req.query;
  const { admin_notes } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Missing inquiry ID' });
  }

  const { error } = await supabase
    .from('guest_inquiries')
    .update({
      status: 'rejected',
      admin_notes: admin_notes || 'Rejected by admin',
    })
    .eq('id', id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json({ success: true, message: 'Inquiry rejected' });
}
