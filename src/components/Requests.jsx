import React, { useState } from 'react';

const Requests = () => {
  const [activeTab, setActiveTab] = useState('scheduled');
  const [showNewRequestModal, setShowNewRequestModal] = useState(false);
  const [requests, setRequests] = useState([
    {
      id: 1,
      subject: 'Monthly Report',
      recipients: ['john@example.com', 'jane@example.com'],
      status: 'Scheduled',
      scheduledDate: '2024-03-20T10:00',
      type: 'Report'
    },
    // Add more requests as needed
  ]);

  const [newRequest, setNewRequest] = useState({
    subject: '',
    recipients: '',
    scheduledDate: '',
    type: 'Report'
  });

  const handleAddRequest = (e) => {
    e.preventDefault();
    const newId = Math.max(...requests.map(r => r.id)) + 1;
    setRequests([
      ...requests,
      {
        ...newRequest,
        id: newId,
        status: 'Scheduled',
        recipients: newRequest.recipients.split(',').map(email => email.trim())
      }
    ]);
    setShowNewRequestModal(false);
    setNewRequest({
      subject: '',
      recipients: '',
      scheduledDate: '',
      type: 'Report'
    });
  };

  const handleDeleteRequest = (requestId) => {
    if (window.confirm('Are you sure you want to delete this request?')) {
      setRequests(requests.filter(request => request.id !== requestId));
    }
  };

  const filteredRequests = requests.filter(request => 
    activeTab === 'scheduled' ? request.status === 'Scheduled' : true
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('scheduled')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'scheduled'
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Scheduled Emails
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'all'
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            All Emails
          </button>
        </div>
        <button
          onClick={() => setShowNewRequestModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          New Request
        </button>
      </div>

      {/* Filters */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex space-x-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search requests..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-md">
            <option value="">All Types</option>
            <option value="Report">Report</option>
            <option value="Notification">Notification</option>
            <option value="Newsletter">Newsletter</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-md">
            <option value="">All Status</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Sent">Sent</option>
            <option value="Failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipients</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scheduled Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRequests.map((request) => (
              <tr key={request.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{request.subject}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500">
                    {request.recipients.join(', ')}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{request.type}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    request.status === 'Scheduled' ? 'bg-yellow-100 text-yellow-800' :
                    request.status === 'Sent' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {request.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {new Date(request.scheduledDate).toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteRequest(request.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* New Request Modal */}
      {showNewRequestModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">New Email Request</h3>
            <form onSubmit={handleAddRequest}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Subject</label>
                  <input
                    type="text"
                    required
                    value={newRequest.subject}
                    onChange={(e) => setNewRequest({ ...newRequest, subject: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Recipients (comma-separated)</label>
                  <input
                    type="text"
                    required
                    value={newRequest.recipients}
                    onChange={(e) => setNewRequest({ ...newRequest, recipients: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Scheduled Date</label>
                  <input
                    type="datetime-local"
                    required
                    value={newRequest.scheduledDate}
                    onChange={(e) => setNewRequest({ ...newRequest, scheduledDate: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <select
                    value={newRequest.type}
                    onChange={(e) => setNewRequest({ ...newRequest, type: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  >
                    <option value="Report">Report</option>
                    <option value="Notification">Notification</option>
                    <option value="Newsletter">Newsletter</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowNewRequestModal(false)}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  Create Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Requests; 