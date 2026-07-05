import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  // For ANY request to /admin or /admin/*, serve admin.html
  const adminHtmlPath = path.join(process.cwd(), 'dist', 'admin.html');
  
  try {
    const html = fs.readFileSync(adminHtmlPath, 'utf-8');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(200).send(html);
  } catch (err) {
    res.status(500).json({ error: 'Admin dashboard not available' });
  }
}
