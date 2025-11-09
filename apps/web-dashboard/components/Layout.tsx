import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <nav>
        <ul>
          <li><a href="/leads">Leads</a></li>
          <li><a href="/chat">Chat</a></li>
          <li><a href="/login">Login</a></li>
        </ul>
      </nav>
      <main>{children}</main>
    </div>
  );
}
