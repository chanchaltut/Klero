import React, { useState } from 'react';
import { useDrag } from 'react-dnd';

export const ContactCard = ({ contact, onDelete }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'CONTACT',
    item: { contact },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`bg-white p-4 rounded-lg shadow-sm border border-gray-200 ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{contact.name}</h3>
          <p className="text-sm text-gray-500">{contact.email}</p>
          <p className="text-sm text-gray-500">{contact.phone}</p>
          <p className="text-sm text-gray-500">{contact.type}</p>
          {contact.type === 'Hospital' && (
            <p className="text-sm text-gray-500">{contact.department}</p>
          )}
          {contact.type === 'Heir' && (
            <p className="text-sm text-gray-500">Relationship: {contact.relationship}</p>
          )}
        </div>
        {onDelete && (
          <button
            onClick={() => onDelete(contact.id)}
            className="text-red-600 hover:text-red-900"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

const Contacts = () => {
  const [activeType, setActiveType] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: 'City Hospital',
      email: 'info@cityhospital.com',
      phone: '123-456-7890',
      type: 'Hospital',
      department: 'General'
    },
    {
      id: 2,
      name: 'John Smith',
      email: 'john@example.com',
      phone: '123-456-7891',
      type: 'Heir',
      relationship: 'Son'
    },
    {
      id: 3,
      name: 'Legal Services Inc.',
      email: 'legal@example.com',
      phone: '123-456-7892',
      type: 'Notary'
    }
  ]);

  const [newContact, setNewContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'Hospital',
    department: '',
    relationship: ''
  });

  const handleAddContact = (e) => {
    e.preventDefault();
    const newId = Math.max(...contacts.map(c => c.id)) + 1;
    setContacts([...contacts, { ...newContact, id: newId }]);
    setShowAddModal(false);
    setNewContact({
      name: '',
      email: '',
      phone: '',
      type: 'Hospital',
      department: '',
      relationship: ''
    });
  };

  const handleDeleteContact = (contactId) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      setContacts(contacts.filter(contact => contact.id !== contactId));
    }
  };

  const filteredContacts = contacts.filter(contact => 
    activeType === 'all' ? true : contact.type === activeType
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveType('all')}
            className={`px-4 py-2 rounded-md ${
              activeType === 'all'
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveType('Hospital')}
            className={`px-4 py-2 rounded-md ${
              activeType === 'Hospital'
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Hospitals
          </button>
          <button
            onClick={() => setActiveType('Heir')}
            className={`px-4 py-2 rounded-md ${
              activeType === 'Heir'
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Heirs
          </button>
          <button
            onClick={() => setActiveType('Notary')}
            className={`px-4 py-2 rounded-md ${
              activeType === 'Notary'
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Notaries
          </button>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Add Contact
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <input
          type="text"
          placeholder="Search contacts..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredContacts.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            onDelete={handleDeleteContact}
          />
        ))}
      </div>

      {/* Add Contact Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Add New Contact</h3>
            <form onSubmit={handleAddContact}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    required
                    value={newContact.name}
                    onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    required
                    value={newContact.email}
                    onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    required
                    value={newContact.phone}
                    onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <select
                    value={newContact.type}
                    onChange={(e) => setNewContact({ ...newContact, type: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  >
                    <option value="Hospital">Hospital</option>
                    <option value="Heir">Heir</option>
                    <option value="Notary">Notary</option>
                  </select>
                </div>
                {newContact.type === 'Hospital' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Department</label>
                    <input
                      type="text"
                      value={newContact.department}
                      onChange={(e) => setNewContact({ ...newContact, department: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                  </div>
                )}
                {newContact.type === 'Heir' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Relationship</label>
                    <input
                      type="text"
                      value={newContact.relationship}
                      onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                  </div>
                )}
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  Add Contact
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contacts; 