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
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      type: 'Hospital',
      department: 'Cardiology'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '987-654-3210',
      type: 'Heir',
      relationship: 'Daughter'
    }
  ]);

  const [requests, setRequests] = useState([
    {
      id: 1,
      subject: 'Monthly Report',
      recipients: [],
      status: 'Pending',
      scheduledDate: '2024-03-20T10:00',
      type: 'Report'
    }
  ]);

  const [, drop] = useDrop({
    accept: 'CONTACT',
    drop: (item, monitor) => {
      const { contact } = item;
      const requestId = monitor.getItem().requestId;
      
      if (requestId) {
        setRequests(prevRequests => 
          prevRequests.map(request => 
            request.id === requestId
              ? {
                  ...request,
                  recipients: [...request.recipients, contact.email]
                }
              : request
          )
        );
      }
    }
  });

  const handleAddRequest = () => {
    const newId = Math.max(...requests.map(r => r.id)) + 1;
    setRequests([
      ...requests,
      {
        id: newId,
        subject: 'New Request',
        recipients: [],
        status: 'Pending',
        scheduledDate: new Date().toISOString().slice(0, 16),
        type: 'Report'
      }
    ]);
  };

  const handleDeleteRequest = (requestId) => {
    if (window.confirm('Are you sure you want to delete this request?')) {
      setRequests(requests.filter(request => request.id !== requestId));
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Request & Contacts</h2>
        <button
          onClick={handleAddRequest}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Add New Request
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contacts Section */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-4">Available Contacts</h3>
          <div className="space-y-4">
            {contacts.map(contact => (
              <ContactCard key={contact.id} contact={contact} />
            ))}
          </div>
        </div>

        {/* Requests Section */}
        <div ref={drop} className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-4">Email Requests</h3>
          <div className="space-y-4">
            {requests.map(request => (
              <div
                key={request.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{request.subject}</h4>
                  <button
                    onClick={() => handleDeleteRequest(request.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  <p>Status: {request.status}</p>
                  <p>Scheduled: {new Date(request.scheduledDate).toLocaleString()}</p>
                </div>
                <div className="mt-2">
                  <h5 className="text-sm font-medium mb-1">Recipients:</h5>
                  <div className="flex flex-wrap gap-2">
                    {request.recipients.map((recipient, index) => (
                      <span
                        key={index}
                        className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded"
                      >
                        {recipient}
                      </span>
                    ))}
                    {request.recipients.length === 0 && (
                      <span className="text-gray-500 text-sm">
                        Drag contacts here to add recipients
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestContacts; 