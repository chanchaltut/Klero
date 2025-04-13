import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { useDrag } from 'react-dnd';
import { ContactCard } from './Contacts';

// Draggable Contact Card Component
const DraggableContact = ({ contact }) => {
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
    </div>
  );
};

const RequestCard = ({ request, onAddContact }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'CONTACT',
    drop: (item) => onAddContact(request.id, item.contact),
    collect: (monitor) => ({
      isOver: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`bg-white p-4 rounded-lg shadow-sm border-2 ${
        isOver ? 'border-indigo-500' : 'border-gray-200'
      }`}
    >
      <h3 className="text-lg font-medium text-gray-900">{request.subject}</h3>
      <p className="text-sm text-gray-500">Status: {request.status}</p>
      <p className="text-sm text-gray-500">
        Scheduled: {new Date(request.scheduledDate).toLocaleString()}
      </p>
      
      {/* Associated Contacts */}
      {request.contacts && request.contacts.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Associated Contacts:</h4>
          <div className="space-y-2">
            {request.contacts.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center justify-between bg-gray-50 p-2 rounded"
              >
                <div>
                  <p className="text-sm font-medium">{contact.name}</p>
                  <p className="text-xs text-gray-500">{contact.type}</p>
                </div>
                <button
                  onClick={() => onAddContact(request.id, contact, true)}
                  className="text-red-600 hover:text-red-900"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="mt-4 text-sm text-gray-500">
        Drop contacts here to associate them with this request
      </div>
    </div>
  );
};

const RequestContacts = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      subject: 'Monthly Report',
      status: 'Scheduled',
      scheduledDate: '2024-03-20T10:00',
      contacts: []
    },
    // Add more requests as needed
  ]);

  const [availableContacts, setAvailableContacts] = useState([
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

  const handleAddContact = (requestId, contact, remove = false) => {
    setRequests(requests.map(request => {
      if (request.id === requestId) {
        if (remove) {
          return {
            ...request,
            contacts: request.contacts.filter(c => c.id !== contact.id)
          };
        } else {
          // Check if contact is already added
          if (!request.contacts.find(c => c.id === contact.id)) {
            return {
              ...request,
              contacts: [...request.contacts, contact]
            };
          }
        }
      }
      return request;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Requests & Contacts</h2>
        <div className="text-sm text-gray-500">
          Drag contacts from the right panel to associate them with requests
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Requests Column */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Requests</h3>
          <div className="space-y-4">
            {requests.map((request) => (
              <RequestCard
                key={request.id}
                request={request}
                onAddContact={handleAddContact}
              />
            ))}
          </div>
        </div>

        {/* Contacts Column */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Available Contacts</h3>
          <div className="space-y-4">
            {availableContacts.map((contact) => (
              <DraggableContact
                key={contact.id}
                contact={contact}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestContacts; 