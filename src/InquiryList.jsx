import { useState, useEffect } from 'react';
import { Mail, Clock, AlertCircle } from 'lucide-react';

export default function InquiryList({ token, onSelectInquiry, onLogout }) {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchInquiries();
    const interval = setInterval(fetchInquiries, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, [token]);

  const fetchInquiries = async () => {
    try {
      const res = await fetch('/api/inquiries', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to fetch inquiries');
      const data = await res.json();
      setInquiries(data.inquiries || []);
      setError('');
    } catch (err) {
      setError('Failed to load inquiries: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    const colors = {
      'draft_ready': 'bg-yellow-100 text-yellow-800',
      'pending': 'bg-blue-100 text-blue-800',
      'approved': 'bg-green-100 text-green-800',
      'sent': 'bg-green-100 text-green-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return <div className="flex justify-center items-center h-96">Loading inquiries...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Guest Inquiries</h1>
        <button
          onClick={onLogout}
          className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded"
        >
          Sign Out
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          <AlertCircle className="w-4 h-4 inline mr-2" />
          {error}
        </div>
      )}

      {inquiries.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-12 text-center">
          <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">No pending inquiries</p>
          <p className="text-gray-500 text-sm">Check back soon for new guest messages</p>
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inquiry) => (
            <div
              key={inquiry.id}
              onClick={() => onSelectInquiry(inquiry)}
              className="bg-white rounded-lg border border-gray-200 p-4 hover:border-blue-400 hover:shadow-md cursor-pointer transition"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{inquiry.subject}</h3>
                  <p className="text-gray-600">{inquiry.guest_email}</p>
                  {inquiry.guest_name && (
                    <p className="text-sm text-gray-500">{inquiry.guest_name}</p>
                  )}
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(inquiry.status)}`}>
                  {inquiry.status === 'draft_ready' ? 'Ready' : inquiry.status}
                </span>
              </div>
              <div className="flex items-center text-sm text-gray-500 mt-3">
                <Clock className="w-4 h-4 mr-1" />
                {formatDate(inquiry.received_at)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
