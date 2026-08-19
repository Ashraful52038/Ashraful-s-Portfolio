import Navbar from '@/components/Navbar';
import { ReduxProvider } from '@/components/ReduxProvider';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ashraful Islam | Full Stack Developer & CEO, Hakaluki',
  description: 'Portfolio of Ashraful Islam — Full Stack Developer and CEO of Hakaluki, a software development studio building scalable products and AI automation.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <AntdRegistry>
            <Navbar/>
            <main>{children}</main>
          </AntdRegistry>
        </ReduxProvider>
      </body>
    </html>
  );
}
