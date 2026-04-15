'use client';

import { useEffect, useState } from 'react';
import { Row, Col, Spin, Typography } from 'antd';
import ProjectCard from '@/components/ProjectCard';
import { api } from '@/lib/api';
import { Project } from '@/types';

const { Title } = Typography;

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await api.getProjects();
        setProjects(data);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '50px 20px' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: 48 }}>
        My Projects
      </Title>
      <Row gutter={[24, 24]}>
        {projects.map(project => (
          <Col xs={24} sm={12} lg={8} key={project.id}>
            <ProjectCard project={project} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
