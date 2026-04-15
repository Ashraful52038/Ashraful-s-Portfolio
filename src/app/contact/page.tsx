'use client';

import { Typography } from 'antd';
import ContactForm from '@/components/ContactForm';

const { Title } = Typography;

export default function ContactPage() {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '50px 20px' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: 48 }}>
        Get In Touch
      </Title>
      <ContactForm />
    </div>
  );
}
