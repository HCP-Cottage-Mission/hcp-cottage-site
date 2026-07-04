import { useState } from 'react';
import { ChevronLeft, Send, Trash2 } from 'lucide-react';

export default function InquiryDetail({ inquiry, token, onBack }) {
  const [response, setResponse] = useState(inquiry.ai_draft || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleApprove = async () => {
    if (!response.trim()) {
      setError('Response cannot be empty');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch(`/api/inquiry/${inquiry.id}/approve`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ final_response: response })
      });

      if (!res.ok) throw new Error('Failed to approve inquiry');

      setSuccess('Response sent to guest!');
      setTimeout(onBack, 2000);
    } catch (err) {
      setError('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    if (!window.confirm('Are you sure you want to reject this inquiry?')) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/inquiry/${inquiry.id}/reject`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ admin_notes: 'Rejected by admin' })
      });

      if (!res.ok) throw new Error('Failed to reject inquiry');

      setSuccess('Inquiry rejected');
      setTimeout(onBack, 1500);
    } catch (err) {
      setError('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Back to Inquiries
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Original Email */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="font-bold text-lg mb-4">Guest Inquiry</h2>
          <div className="space-y-3 text-sm mb-4">
            <div>
              <p className="text-gray-600">From:</p>
              <p className="font-medium">{inquiry.guest_email}</p>
            </div>
            {inquiry.guest_name && (
              <div>
                <p className="text-gray-600">Name:</p>
                <p className="font-medium">{inquiry.guest_name}</p>
              </div>
            )}
            <div>
              <p className="text-gray-600">Subject:</p>
              <p className="font-medium">{inquiry.subject}</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded p-4">
            <p className="text-gray-600 whitespace-pre-wrap">{inquiry.body}</p>
          </div>
        </div>

        {/* AI Draft & Response Editor */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="font-bold text-lg mb-4">Response to Guest</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Edit or approve response
              </label>
              <textarea
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                disabled={loading}
                className="w-full h-64 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                placeholder="Response to send to guest..."
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-sm mb-4">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded text-sm mb-4">
                {success}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleApprove}
                disabled={loading || !response.trim()}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                {loading ? 'Sending...' : 'Send Response'}
              </button>
              <button
                onClick={handleReject}
                disabled={loading}
                className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 font-medium rounded-lg transition flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Reject
              </button>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
            <p className="font-medium mb-1">💡 Tips for your response:</p>
            <ul className="list-disc list-inside space-y-1 text-blue-700">
              <li>Be warm and professional</li>
              <li>Answer their specific questions</li>
              <li>Include booking info if relevant</li>
              <li>End with contact info</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
