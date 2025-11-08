import React, { ReactNode } from 'react';
import TopBar from './TopBar';

interface LayoutProps {
  children: ReactNode;
}

export default function NewLayout({ children }: LayoutProps) {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <TopBar />
      <main>
        {children}
      </main>
    </div>
  );
}
