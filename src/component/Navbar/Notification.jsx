import React from 'react';

const Notification = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>
      <ul>
        {/* Placeholder notifications */}
        <li className="p-4 mb-2 bg-gray-100 rounded-lg">
          <p className="text-lg">New update available for your account.</p>
          <span className="text-sm text-gray-500">2 hours ago</span>
        </li>
        <li className="p-4 mb-2 bg-gray-100 rounded-lg">
          <p className="text-lg">Your fee voucher has been generated.</p>
          <span className="text-sm text-gray-500">1 day ago</span>
        </li>
        {/* Add more notifications here */}
      </ul>
    </div>
  );
};

export default Notification;
