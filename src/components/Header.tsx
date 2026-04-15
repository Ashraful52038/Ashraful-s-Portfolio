'use client';

import { Layout, Menu } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const { Header: AntHeader } = Layout;

const Header = () => {
  const pathname = usePathname();
  
  const menuItems = [
    { key: '/', label: <Link href="/">Home</Link> },
    { key: '/projects', label: <Link href="/projects">Projects</Link> },
    { key: '/contact', label: <Link href="/contact">Contact</Link> },
  ];

  return (
    <AntHeader style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[pathname]}
          items={menuItems}
          style={{ justifyContent: 'flex-end' }}
        />
      </div>
    </AntHeader>
  );
};

export default Header;
