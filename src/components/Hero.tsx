'use client';

import { Typography, Button, Space } from 'antd';
import { GithubOutlined, LinkedinOutlined, MailOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const Hero = () => {
  return (
    <div style={{ textAlign: 'center', padding: '100px 20px', backgroundColor: '#f0f2f5' }}>
      <Title level={1}>John Doe</Title>
      <Title level={3} type="secondary">Full Stack Developer</Title>
      <Paragraph style={{ fontSize: '18px', maxWidth: '600px', margin: '20px auto' }}>
        I build exceptional digital experiences with modern web technologies.
        Specialized in React, Next.js, Go, and cloud architecture.
      </Paragraph>
      <Space size="large">
        <Button type="primary" size="large" icon={<GithubOutlined />}>
          GitHub
        </Button>
        <Button size="large" icon={<LinkedinOutlined />}>
          LinkedIn
        </Button>
        <Button size="large" icon={<MailOutlined />}>
          Contact
        </Button>
      </Space>
    </div>
  );
};

export default Hero;
