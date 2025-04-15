import React, { useState } from 'react';

const ManageTeam = () => {
  const [teamMembers, setTeamMembers] = useState([
    { 
      user_id: 1, 
      name: 'John Doe', 
      email: 'john@example.com',
      ovh_email: 'john@ovh.com',
      phone: '1234567890',
      role: 'member',
      status: 'ACTIVE',
      username: 'johndoe',
      signature_html: '<p>Best regards,<br>John Doe</p>',
      profile_image_url: 'https://example.com/profile.jpg',
      calendly_link: 'https://calendly.com/johndoe',
      title: 'Senior Developer',
      shortcode: 'JD'
    },
    // Add more team members as needed
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    ovh_email: '',
    phone: '',
    role: 'member',
    status: 'ACTIVE',
    username: '',
    password: '',
    signature_html: '',
    profile_image_url: '',
    calendly_link: '',
    title: '',
    shortcode: ''
  });

  const handleAddMember = (e) => {
    e.preventDefault();
    const newId = Math.max(...teamMembers.map(m => m.user_id)) + 1;
    setTeamMembers([
      ...teamMembers,
      { ...newMember, user_id: newId }
    ]);
    setShowAddModal(false);
    setNewMember({
      name: '',
      email: '',
      ovh_email: '',
      phone: '',
      role: 'member',
      status: 'ACTIVE',
      username: '',
      password: '',
      signature_html: '',
      profile_image_url: '',
      calendly_link: '',
      title: '',
      shortcode: ''
    });
  };

  const handleStatusChange = (memberId) => {
    setTeamMembers(teamMembers.map(member => {
      if (member.user_id === memberId) {
        return {
          ...member,
          status: member.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
        };
      }
      return member;
    }));
  };

  return (
    <div className="p-2">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-sm font-bold text-gray-900">Team Members</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-indigo-600 text-white px-2 py-1 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
        >
          Add Member
        </button>
      </div>

      {/* Team Members Table */}
      <div className="bg-white shadow overflow-hidden rounded-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-1.5 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-3 py-1.5 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-3 py-1.5 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider">OVH Email</th>
              <th className="px-3 py-1.5 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-3 py-1.5 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-3 py-1.5 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {teamMembers.map((member) => (
              <tr key={member.user_id}>
                <td className="px-3 py-2 whitespace-nowrap">
                  <div className="text-xs font-medium text-gray-900">{member.name}</div>
                  <div className="text-[10px] text-gray-500">{member.title}</div>
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <div className="text-[10px] text-gray-500">{member.email}</div>
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <div className="text-[10px] text-gray-500">{member.ovh_email}</div>
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <span className={`px-1.5 py-0.5 inline-flex text-[10px] leading-tight font-semibold rounded-full ${
                    member.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {member.role}
                  </span>
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <span className={`px-1.5 py-0.5 inline-flex text-[10px] leading-tight font-semibold rounded-full ${
                    member.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {member.status}
                  </span>
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-[10px] font-medium">
                  <button
                    onClick={() => handleStatusChange(member.user_id)}
                    className={`${
                      member.status === 'ACTIVE' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'
                    } mr-2`}
                  >
                    {member.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
                  </button>
                  <button className="text-indigo-600 hover:text-indigo-900">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center overflow-y-auto">
          <div className="bg-white rounded-md shadow-lg p-2 w-full max-w-2xl">
            <h3 className="text-sm font-medium mb-2">Add New Team Member</h3>
            <form onSubmit={handleAddMember} className="space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    required
                    value={newMember.name}
                    onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                    className="mt-0.5 block w-full border border-gray-300 rounded-md shadow-sm px-1.5 py-1 text-[10px]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    required
                    value={newMember.email}
                    onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                    className="mt-0.5 block w-full border border-gray-300 rounded-md shadow-sm px-1.5 py-1 text-[10px]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-gray-700">OVH Email</label>
                  <input
                    type="email"
                    value={newMember.ovh_email}
                    onChange={(e) => setNewMember({ ...newMember, ovh_email: e.target.value })}
                    className="mt-0.5 block w-full border border-gray-300 rounded-md shadow-sm px-1.5 py-1 text-[10px]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    value={newMember.phone}
                    onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                    className="mt-0.5 block w-full border border-gray-300 rounded-md shadow-sm px-1.5 py-1 text-[10px]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-gray-700">Username</label>
                  <input
                    type="text"
                    required
                    value={newMember.username}
                    onChange={(e) => setNewMember({ ...newMember, username: e.target.value })}
                    className="mt-0.5 block w-full border border-gray-300 rounded-md shadow-sm px-1.5 py-1 text-[10px]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    required
                    value={newMember.password}
                    onChange={(e) => setNewMember({ ...newMember, password: e.target.value })}
                    className="mt-0.5 block w-full border border-gray-300 rounded-md shadow-sm px-1.5 py-1 text-[10px]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-gray-700">Role</label>
                  <select
                    value={newMember.role}
                    onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                    className="mt-0.5 block w-full border border-gray-300 rounded-md shadow-sm px-1.5 py-1 text-[10px]"
                  >
                    <option value="member">Member</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    value={newMember.title}
                    onChange={(e) => setNewMember({ ...newMember, title: e.target.value })}
                    className="mt-0.5 block w-full border border-gray-300 rounded-md shadow-sm px-1.5 py-1 text-[10px]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-gray-700">Shortcode</label>
                  <input
                    type="text"
                    value={newMember.shortcode}
                    onChange={(e) => setNewMember({ ...newMember, shortcode: e.target.value })}
                    className="mt-0.5 block w-full border border-gray-300 rounded-md shadow-sm px-1.5 py-1 text-[10px]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-gray-700">Calendly Link</label>
                  <input
                    type="url"
                    value={newMember.calendly_link}
                    onChange={(e) => setNewMember({ ...newMember, calendly_link: e.target.value })}
                    className="mt-0.5 block w-full border border-gray-300 rounded-md shadow-sm px-1.5 py-1 text-[10px]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-gray-700">Profile Image URL</label>
                  <input
                    type="url"
                    value={newMember.profile_image_url}
                    onChange={(e) => setNewMember({ ...newMember, profile_image_url: e.target.value })}
                    className="mt-0.5 block w-full border border-gray-300 rounded-md shadow-sm px-1.5 py-1 text-[10px]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-medium text-gray-700">Signature HTML</label>
                <textarea
                  value={newMember.signature_html}
                  onChange={(e) => setNewMember({ ...newMember, signature_html: e.target.value })}
                  className="mt-0.5 block w-full border border-gray-300 rounded-md shadow-sm px-1.5 py-1 text-[10px]"
                  rows="2"
                />
              </div>
              <div className="mt-2 flex justify-end space-x-1.5">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-300 text-[10px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-2 py-1 rounded-md hover:bg-indigo-700 text-[10px]"
                >
                  Add Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageTeam; 