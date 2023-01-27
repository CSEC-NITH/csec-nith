import '../styles/globals.css';
import React from 'react';
import Link from 'next/link';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div>
          <Link href="/">Home</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/events">Events</Link>
          <Link href="/team">Team</Link>
        </div>
        {children}
      </body>
    </html>
  );
}
