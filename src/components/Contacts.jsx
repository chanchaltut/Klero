import React, { useState } from 'react';
import { useDrag } from 'react-dnd';

export const ContactCard = ({ contact, onEdit }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'CONTACT',
    item: { contact },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleClick = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
    setDropdownOpen(false);
  };

  const handleDropdown = (e) => {
    e.stopPropagation();
    setDropdownOpen((prev) => !prev);
  };

  return (
    <div
      ref={drag}
      onClick={handleClick}
      className={`p-1.5 border border-gray-200 rounded-md bg-white shadow-sm cursor-pointer hover:bg-gray-50 ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
      <div className="flex items-center space-x-2">
        <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-medium">
          {contact.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-gray-900 truncate leading-tight">{contact.name}</p>
          <p className="text-[10px] text-gray-500 truncate leading-tight">{contact.email}</p>
        </div>
        <div className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-600">{contact.type}</div>
        <div className="relative">
          <button
            className="text-gray-400 hover:text-gray-600 px-1"
            onClick={handleDropdown}
            tabIndex={-1}
          >
            &#x22EE; {/* vertical ellipsis */}
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-24 bg-white border rounded shadow z-10">
              <button
                className="block w-full text-left px-3 py-1 text-xs hover:bg-gray-100"
                onClick={(e) => {
                  e.stopPropagation();
                  setDropdownOpen(false);
                  onEdit(contact);
                }}
              >
                Edit
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="mt-2 pt-2 border-t border-gray-100">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <p className="text-gray-500">Phone</p>
              <p className="text-gray-900">{contact.phone}</p>
            </div>
            <div>
              <p className="text-gray-500">Type</p>
              <p className="text-gray-900">{contact.type}</p>
            </div>
            {contact.department && (
              <div>
                <p className="text-gray-500">Department</p>
                <p className="text-gray-900">{contact.department}</p>
              </div>
            )}
            {contact.relationship && (
              <div>
                <p className="text-gray-500">Relationship</p>
                <p className="text-gray-900">{contact.relationship}</p>
              </div>
            )}
          </div>
          <div className="flex justify-end mt-2">
            <button
              className="px-3 py-1 text-xs rounded bg-indigo-600 text-white hover:bg-indigo-700 transition"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(contact);
              }}
            >
              Edit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Contacts = () => {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: 'City Hospital',
      email: 'contact@cityhospital.com',
      phone: '123-456-7890',
      type: 'Hospital',
      department: 'Emergency',
      relationship: 'Client',
    },
    {
      id: 2,
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '987-654-3210',
      type: 'Individual',
      department: 'Legal',
      relationship: 'Partner',
    },
    {
      id: 3,
      name: 'Legal Services Inc.',
      email: 'info@legalservices.com',
      phone: '555-123-4567',
      type: 'Company',
      department: 'Legal',
      relationship: 'Vendor',
    },
    {
      id: 4,
      name: 'Central Clinic',
      email: 'info@centralclinic.com',
      phone: '555-999-8888',
      type: 'Hospital',
      department: 'General',
      relationship: 'Client',
    },
    {
      id: 5,
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      phone: '555-777-6666',
      type: 'Individual',
      department: 'Admin',
      relationship: 'Staff',
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [editContact, setEditContact] = useState(null);
  const [editForm, setEditForm] = useState({});

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || contact.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleEdit = (contact) => {
    setEditContact(contact);
    setEditForm(contact);
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setContacts((prev) =>
      prev.map((c) => (c.id === editContact.id ? { ...c, ...editForm } : c))
    );
    setEditContact(null);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-sm font-semibold text-gray-900">Contacts</h2>
        <button className="bg-indigo-600 text-white px-2 py-1 rounded-md hover:bg-indigo-700 text-xs">
          Add Contact
        </button>
      </div>

      <div className="flex space-x-2 mb-2">
        <input
          type="text"
          placeholder="Search contacts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 border border-gray-300 rounded-md px-2 py-1 text-xs focus:ring-indigo-500 focus:border-indigo-500"
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border border-gray-300 rounded-md px-2 py-1 text-xs focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="all">All Types</option>
          <option value="Hospital">Hospital</option>
          <option value="Individual">Individual</option>
          <option value="Company">Company</option>
        </select>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="space-y-1">
          {filteredContacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              onEdit={handleEdit}
            />
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      {editContact && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <form
            className="bg-white p-4 rounded shadow w-80 space-y-2"
            onSubmit={handleEditSubmit}
          >
            <h3 className="text-sm font-semibold mb-2">Edit Contact</h3>
            <input
              name="name"
              value={editForm.name || ''}
              onChange={handleEditChange}
              className="w-full border px-2 py-1 rounded text-xs"
              placeholder="Name"
            />
            <input
              name="email"
              value={editForm.email || ''}
              onChange={handleEditChange}
              className="w-full border px-2 py-1 rounded text-xs"
              placeholder="Email"
            />
            <input
              name="phone"
              value={editForm.phone || ''}
              onChange={handleEditChange}
              className="w-full border px-2 py-1 rounded text-xs"
              placeholder="Phone"
            />
            <input
              name="department"
              value={editForm.department || ''}
              onChange={handleEditChange}
              className="w-full border px-2 py-1 rounded text-xs"
              placeholder="Department"
            />
            <input
              name="relationship"
              value={editForm.relationship || ''}
              onChange={handleEditChange}
              className="w-full border px-2 py-1 rounded text-xs"
              placeholder="Relationship"
            />
            <select
              name="type"
              value={editForm.type || ''}
              onChange={handleEditChange}
              className="w-full border px-2 py-1 rounded text-xs"
            >
              <option value="Hospital">Hospital</option>
              <option value="Individual">Individual</option>
              <option value="Company">Company</option>
            </select>
            <div className="flex justify-end space-x-2 mt-2">
              <button
                type="button"
                className="px-2 py-1 text-xs bg-gray-200 rounded"
                onClick={() => setEditContact(null)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-2 py-1 text-xs bg-indigo-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Contacts; 