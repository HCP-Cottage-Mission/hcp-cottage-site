import { vi } from 'vitest';

// Set required environment variables
process.env.ADMIN_TOKEN = 'test-admin-token-12345';
process.env.DATABASE_URL = 'postgresql://test:test@localhost/test';

// Mock authentication
vi.mock('../api/_lib/auth.js', () => ({
  checkAdminAuth: vi.fn((req) => req?.headers?.authorization === 'Bearer test-admin-token-12345'),
  sendUnauthorized: vi.fn((res) => {
    return { status: 401, json: { error: 'Unauthorized' } };
  }),
}));

// Mock database for testing
const mockRows = {
  guest_inquiries: new Map(),
};

// Mock pg pool
vi.mock('../api/_lib/db.js', () => ({
  pool: {
    query: vi.fn(async (sql, params) => {
      // Mock different query types
      if (sql.includes('DELETE')) {
        return { rows: [], rowCount: 0 };
      }

      if (sql.includes('INSERT')) {
        const uuid = crypto.randomUUID?.() || 'test-id-' + Date.now();
        const row = {
          id: uuid,
          guest_email: params[0],
          guest_name: params[1] || null,
          subject: params[2],
          body: params[3],
          ai_draft: params[4] || null,
          status: params[7] || 'draft_ready',
          received_at: new Date().toISOString(),
        };
        mockRows.guest_inquiries.set(uuid, row);
        return { rows: [row], rowCount: 1 };
      }

      if (sql.includes('SELECT') && sql.includes('guest_inquiries')) {
        if (sql.includes('WHERE')) {
          // Filter logic
          const rows = Array.from(mockRows.guest_inquiries.values());
          return { rows: rows, rowCount: rows.length };
        }
        const rows = Array.from(mockRows.guest_inquiries.values())
          .filter(r => ['pending', 'draft_ready'].includes(r.status))
          .sort((a, b) => new Date(b.received_at) - new Date(a.received_at));
        return { rows, rowCount: rows.length };
      }

      if (sql.includes('UPDATE')) {
        return { rows: [], rowCount: 1 };
      }

      // Default response
      return { rows: [], rowCount: 0 };
    }),
    end: vi.fn(async () => {}),
    connect: vi.fn(async () => ({
      query: vi.fn(),
      release: vi.fn(),
    })),
  },
}));

// Setup global test variables
global.testData = mockRows;
