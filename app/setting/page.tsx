"use client"
import React from 'react';
import { ModeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';

const SettingsPage: React.FC = () => {
  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
fetch('/api/delete-account', {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
  },
})
.then(response => {
  if (response.ok) {
    // Handle successful account deletion, e.g., redirect to a goodbye page
    window.location.href = '/login';
  } else {
    // Handle errors
    alert('Failed to delete account. Please try again.');
  }
})
.catch(error => {
  console.error('Error:', error);
  alert('An error occurred. Please try again.');
});
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white dark:bg-transparent">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Settings</h1>
      <div className="mb-6 lg:hidden">
        <label htmlFor="theme" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Theme:
        </label>
        {/* Hide on small devices, show on large devices */}
        <div className="hidden lg:block">
          <ModeToggle />
        </div>
      </div>
      <div>
        <Button
          onClick={handleDeleteAccount}
          variant="destructive"
          className="w-full dark:bg-[#151617]"
        >
          Delete Account
        </Button>
      </div>
    </div>
  );
};

export default SettingsPage;