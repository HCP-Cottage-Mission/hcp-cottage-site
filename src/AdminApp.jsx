import { useState, useEffect } from 'react';
import AdminLogin from './AdminLogin';
import InquiryList from './InquiryList';
import InquiryDetail from './InquiryDetail';

export default function AdminApp() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth-check', {
        credentials: 'include',
      });
      setAuthenticated(response.ok);
    } catch (err) {
      setAuthenticated(false);
    } finally {
      setChecking(false);
    }
  };

  const handleLogin = () => {
    setAuthenticated(true);
    setSelectedInquiry(null);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth-logout', {
        method: 'POST',
        credentials: 'include'
      });
    } catch (err) {
      console.error('Logout error:', err);
    }
    setAuthenticated(false);
    setSelectedInquiry(null);
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!authenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      {selectedInquiry ? (
        <InquiryDetail
          inquiry={selectedInquiry}
          onBack={() => setSelectedInquiry(null)}
          onLogout={handleLogout}
        />
      ) : (
        <InquiryList
          onSelectInquiry={setSelectedInquiry}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}
