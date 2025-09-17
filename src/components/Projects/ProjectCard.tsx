// src/components/Projects/ProjectCard.tsx
"use client";

import React from 'react';
import styled, { keyframes } from 'styled-components';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github?: string;
  live?: string;
}

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  return (
    <Card onClick={onClick}>
      <CardContent>
        <ImageContainer>
          <img src={project.image} alt={project.title} />
        </ImageContainer>
        <Title>{project.title}</Title>
        <Description>{project.description}</Description>
        <TagsContainer>
          {project.tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </TagsContainer>
        <ButtonsContainer>
          {project.github && (
            <Button href={project.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
              GitHub
            </Button>
          )}
          {project.live && (
            <Button 
              href={project.live} 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={(e) => e.stopPropagation()}
              primary
            >
              Live Demo
            </Button>
          )}
        </ButtonsContainer>
      </CardContent>
    </Card>
  );
};

// ✅ Styled Components — Match About Me Card Design

const cardGlow = keyframes`
  0% { box-shadow: 0 0 5px rgba(251, 146, 60, 0.5); }
  25% { box-shadow: 0 0 15px rgba(0, 166, 255, 0.7); }
  50% { box-shadow: 0 0 10px rgba(255, 0, 86, 0.7); }
  75% { box-shadow: 0 0 15px rgba(101, 0, 255, 0.7); }
  100% { box-shadow: 0 0 5px rgba(251, 146, 60, 0.5); }
`;

const Card = styled.div`
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  z-index: 1;
  transition: all 0.3s ease;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;

  &::before {
    content: "";
    position: absolute;
    top: -15px;
    left: -15px;
    right: -15px;
    bottom: -15px;
    border-radius: inherit;
    background: 
      radial-gradient(circle at 0 0, #fb923c, transparent),
      radial-gradient(circle at 100% 0, #00a6ff, transparent),
      radial-gradient(circle at 0 100%, #ff0056, transparent),
      radial-gradient(circle at 100% 100%, #6500ff, transparent);
    filter: blur(30px);
    z-index: -2;
    opacity: 0.4;
    transition: opacity 0.3s ease;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: rgba(5, 5, 5, 0.7); /* Semi-transparent */
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    z-index: -1;
  }

  &:hover::before {
    opacity: 1;
    animation: ${cardGlow} 2s ease-in-out infinite;
  }

  &:hover {
    transform: translateY(-5px) scale(1.02);
  }
`;

const CardContent = styled.div`
  position: relative;
  z-index: 2;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 160px;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  overflow: hidden;
  background: #1e1e24;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.5rem;
  background: linear-gradient(to right, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const Description = styled.p`
  font-size: 0.875rem;
  color: #d1d5db;
  line-height: 1.5;
  margin-bottom: 1rem;
  flex-grow: 1;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Tag = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  background: rgba(139, 92, 246, 0.2);
  color: #c4b5fd;
  border: 1px solid rgba(139, 92, 246, 0.3);
  transition: all 0.2s ease;

  &:hover {
    background: rgba(139, 92, 246, 0.3);
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: auto;
`;

const Button = styled.a<{ primary?: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
  text-decoration: none;
  flex: 1;
  text-align: center;

  ${props => props.primary ? `
    background: linear-gradient(to right, #3b82f6, #8b5cf6);
    color: white;
    &:hover {
      background: linear-gradient(to right, #2563eb, #7c3aed);
      transform: translateY(-2px);
    }
  ` : `
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.2);
    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  `}
`;