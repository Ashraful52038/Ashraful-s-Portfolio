import type { Metadata } from 'next';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ReduxProvider } from '@/components/ReduxProvider';
import Header from '@/components/Header';
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
            <Header />
            <main>{children}</main>
          </AntdRegistry>
        </ReduxProvider>
      </body>
    </html>
  );
}
