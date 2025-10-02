import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="app-layout">
      <header className="app-header">
        {/* Add your header/navigation here */}
      </header>
      <main className="app-main">
        <Outlet />
      </main>
      <footer className="app-footer">
        {/* Add your footer here */}
      </footer>
    </div>
  );
};

export default Layout;