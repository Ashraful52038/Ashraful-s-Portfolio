'use client';

import Hero from '@/components/Hero';
import { Typography, Row, Col, Card } from 'antd';
import { CodeOutlined, DatabaseOutlined, CloudOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

export default function Home() {
  return (
    <>
      <Hero />
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '50px 20px' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 48 }}>
          What I Do
        </Title>
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={8}>
            <Card>
              <CodeOutlined style={{ fontSize: 48, color: '#1890ff' }} />
              <Title level={4}>Frontend Development</Title>
              <Paragraph>
                Modern React applications with Next.js, TypeScript, and responsive design.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <DatabaseOutlined style={{ fontSize: 48, color: '#1890ff' }} />
              <Title level={4}>Backend Development</Title>
              <Paragraph>
                Scalable APIs with Go, Node.js, and database design.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <CloudOutlined style={{ fontSize: 48, color: '#1890ff' }} />
              <Title level={4}>Cloud & DevOps</Title>
              <Paragraph>
                Deployment, CI/CD pipelines, and cloud infrastructure management.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
