'use client';

import { Card, Tag, Button, Space } from 'antd';
import { GithubOutlined, GlobalOutlined } from '@ant-design/icons';
import { Project } from '@/types';

interface Props {
  project: Project;
}

const ProjectCard = ({ project }: Props) => {
  return (
    <Card
      hoverable
      cover={
        <div style={{ height: 200, background: '#f0f2f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {project.imageUrl ? (
            <img alt={project.title} src={project.imageUrl} style={{ objectFit: 'cover', height: '100%', width: '100%' }} />
          ) : (
            <span>Project Image</span>
          )}
        </div>
      }
    >
      <Card.Meta
        title={project.title}
        description={project.description}
      />
      <div style={{ marginTop: 16 }}>
        {project.technologies.map(tech => (
          <Tag key={tech} color="blue" style={{ marginBottom: 8 }}>{tech}</Tag>
        ))}
      </div>
      <Space style={{ marginTop: 16 }}>
        {project.liveUrl && (
          <Button icon={<GlobalOutlined />} size="small" href={project.liveUrl} target="_blank">
            Live Demo
          </Button>
        )}
        {project.githubUrl && (
          <Button icon={<GithubOutlined />} size="small" href={project.githubUrl} target="_blank">
            Source Code
          </Button>
        )}
      </Space>
    </Card>
  );
};

export default ProjectCard;
