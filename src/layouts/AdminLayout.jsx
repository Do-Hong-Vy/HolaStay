import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <header>Admin Header</header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
