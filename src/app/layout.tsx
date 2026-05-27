import Navbar from '@/components/Navbar';
import { ReduxProvider } from '@/components/ReduxProvider';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'John Doe | Portfolio',
  description: 'Professional portfolio showcasing my work and skills',
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
