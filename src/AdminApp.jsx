import { useState, useEffect } from 'react';
import AdminLogin from './AdminLogin';
import InquiryList from './InquiryList';
import InquiryDetail from './InquiryDetail';

export default function AdminApp() {
  const [token, setToken] = useState(() => sessionStorage.getItem('adminToken'));
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const handleLogin = (adminToken) => {
    setToken(adminToken);
    sessionStorage.setItem('adminToken', adminToken);
  };

  const handleLogout = () => {
    setToken(null);
    sessionStorage.removeItem('adminToken');
    setSelectedInquiry(null);
  };

  if (!token) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      {selectedInquiry ? (
        <InquiryDetail
          inquiry={selectedInquiry}
          token={token}
          onBack={() => setSelectedInquiry(null)}
        />
      ) : (
        <InquiryList
          token={token}
          onSelectInquiry={setSelectedInquiry}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}
