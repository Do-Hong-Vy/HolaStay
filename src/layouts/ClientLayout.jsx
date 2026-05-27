import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const ClientLayout = () => {
  return (
    <div className="client-layout">
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default ClientLayout;
