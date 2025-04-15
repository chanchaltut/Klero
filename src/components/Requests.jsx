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
    <div className="p-2">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-sm font-bold text-gray-900">Email Requests</h2>
        <button
          onClick={() => setShowNewRequestModal(true)}
          className="bg-indigo-600 text-white px-2 py-1 rounded-md hover:bg-indigo-700 text-xs"
        >
          Add Request
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-2">
        <button
          onClick={() => setActiveTab('scheduled')}
          className={`px-2 py-1 rounded-md text-xs ${
            activeTab === 'scheduled'
              ? 'bg-indigo-100 text-indigo-700'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Scheduled
        </button>
        <button
          onClick={() => setActiveTab('all')}
          className={`px-2 py-1 rounded-md text-xs ${
            activeTab === 'all'
              ? 'bg-indigo-100 text-indigo-700'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          All Requests
        </button>
      </div>

      {/* Requests Table */}
      <div className="bg-white shadow overflow-hidden rounded-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-1.5 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider">Subject</th>
              <th className="px-3 py-1.5 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider">Recipients</th>
              <th className="px-3 py-1.5 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-3 py-1.5 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider">Scheduled Date</th>
              <th className="px-3 py-1.5 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-3 py-1.5 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRequests.map((request) => (
              <tr key={request.id}>
                <td className="px-3 py-2 whitespace-nowrap">
                  <div className="text-xs font-medium text-gray-900">{request.subject}</div>
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <div className="text-[10px] text-gray-500">
                    {request.recipients.join(', ')}
                  </div>
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <span className={`px-1.5 py-0.5 inline-flex text-[10px] leading-tight font-semibold rounded-full ${
                    request.status === 'Scheduled' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {request.status}
                  </span>
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <div className="text-[10px] text-gray-500">
                    {new Date(request.scheduledDate).toLocaleString()}
                  </div>
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <span className={`px-1.5 py-0.5 inline-flex text-[10px] leading-tight font-semibold rounded-full ${
                    request.type === 'Report' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                  }`}>
                    {request.type}
                  </span>
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-[10px] font-medium">
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
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center overflow-y-auto">
          <div className="bg-white rounded-md shadow-lg p-2 w-full max-w-2xl">
            <h3 className="text-sm font-medium mb-2">Add New Request</h3>
            <form onSubmit={handleAddRequest} className="space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-medium text-gray-700">Subject</label>
                  <input
                    type="text"
                    required
                    value={newRequest.subject}
                    onChange={(e) => setNewRequest({ ...newRequest, subject: e.target.value })}
                    className="mt-0.5 block w-full border border-gray-300 rounded-md shadow-sm px-1.5 py-1 text-[10px]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-gray-700">Recipients (comma-separated)</label>
                  <input
                    type="text"
                    required
                    value={newRequest.recipients}
                    onChange={(e) => setNewRequest({ ...newRequest, recipients: e.target.value })}
                    className="mt-0.5 block w-full border border-gray-300 rounded-md shadow-sm px-1.5 py-1 text-[10px]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-gray-700">Scheduled Date</label>
                  <input
                    type="datetime-local"
                    required
                    value={newRequest.scheduledDate}
                    onChange={(e) => setNewRequest({ ...newRequest, scheduledDate: e.target.value })}
                    className="mt-0.5 block w-full border border-gray-300 rounded-md shadow-sm px-1.5 py-1 text-[10px]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-gray-700">Type</label>
                  <select
                    value={newRequest.type}
                    onChange={(e) => setNewRequest({ ...newRequest, type: e.target.value })}
                    className="mt-0.5 block w-full border border-gray-300 rounded-md shadow-sm px-1.5 py-1 text-[10px]"
                  >
                    <option value="Report">Report</option>
                    <option value="Notification">Notification</option>
                  </select>
                </div>
              </div>
              <div className="mt-2 flex justify-end space-x-1.5">
                <button
                  type="button"
                  onClick={() => setShowNewRequestModal(false)}
                  className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-300 text-[10px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-2 py-1 rounded-md hover:bg-indigo-700 text-[10px]"
                >
                  Add Request
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