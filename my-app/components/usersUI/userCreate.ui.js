'use client';

import { useState } from 'react';

export default function UserForm({ onSubmit, error }) {
  const [data, setData] = useState({
    role: '',
    title: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });

  const onChange = e => setData({ ...data, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(data);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Create New User</h1>
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-2">
        <input name="role" placeholder="Role" value={data.role} onChange={onChange} className="block w-full p-2 border rounded" />
        <input name="title" placeholder="Title" value={data.title} onChange={onChange} className="block w-full p-2 border rounded" />
        <input name="firstName" placeholder="First Name" value={data.firstName} onChange={onChange} className="block w-full p-2 border rounded" />
        <input name="lastName" placeholder="Last Name" value={data.lastName} onChange={onChange} className="block w-full p-2 border rounded" />
        <input type="email" name="email" placeholder="Email" value={data.email} onChange={onChange} className="block w-full p-2 border rounded" />
        <input name="phoneNumber" placeholder="Phone Number" value={data.phoneNumber} onChange={onChange} className="block w-full p-2 border rounded" />
        <input type="password" name="password" placeholder="Password" value={data.password} onChange={onChange} className="block w-full p-2 border rounded" />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={data.confirmPassword} onChange={onChange} className="block w-full p-2 border rounded" />
        <button type="submit" className="px-4 py-2 rounded shadow bg-green-500 text-white">Submit</button>
      </form>
    </div>
  );
}