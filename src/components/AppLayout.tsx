import React from 'react';
import { Dashboard } from './Dashboard';

const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <div className="container mx-auto px-4 py-8">
        <Dashboard />
      </div>
    </div>
  );
};

export default AppLayout;