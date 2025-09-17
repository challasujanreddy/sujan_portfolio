// src/components/Projects/ProjectsPage.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

// ✅ Real Project Data — Clean, formatted, with relevant images
interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  images: string[];
  tags: string[];
  techStack: string[];
  github: string;
  live?: string;
  category: string;
}

const projects: Project[] = [
  {
    id: "Project1",
    title: "Artistry Odyssey",
    description: "A web platform for exploring, creating, and showcasing digital art with artist profiles and trending galleries.",
    longDescription: "Artistry Odyssey is a full-stack web platform that empowers digital artists to showcase their work, connect with fans, and explore trending galleries. Built with HTML, CSS, JavaScript, PHP, and PostgreSQL, it features user authentication, artist profiles, and a responsive, gallery-style UI.",
    image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["HTML", "CSS", "JavaScript", "PHP", "PostgreSQL"],
    techStack: ["HTML", "CSS", "JavaScript", "PHP", "PostgreSQL", "Bootstrap"],
    github: "https://github.com/challasujanreddy/Artistry-Odyssey",
    category: "Web"
  },
  {
    id: "Project2",
    title: "Brain Tumor Classifier",
    description: "A deep learning model for 3D MRI brain tumor segmentation using UNet with Dice and Focal loss optimization.",
    longDescription: "This project implements a state-of-the-art deep learning model for 3D MRI brain tumor segmentation. Using UNet architecture with Dice and Focal loss optimization, it achieves high accuracy in identifying tumor regions. Built with Python, TensorFlow, and Keras, it’s designed for medical imaging applications.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["Python", "Deep Learning", "UNet", "Medical Imaging"],
    techStack: ["Python", "TensorFlow", "Keras", "NumPy", "Matplotlib"],
    github: "https://github.com/challasujanreddy/Brain-Tumor-Classifier",
    category: "AI"
  },
  {
    id: "Project3",
    title: "Village Connect",
    description: "A platform connecting travelers with rural hosts for authentic village stay and cultural exchange experiences.",
    longDescription: "Village Connect bridges the gap between travelers and rural communities, offering authentic village stays and cultural exchange experiences. Built as a full-stack application with booking system, user profiles, and responsive UI/UX design, it promotes sustainable tourism and cultural immersion.",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["Full-stack", "Booking System", "UI/UX", "Web Dev"],
    techStack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    github: "https://github.com/challasujanreddy/villageconnect",
    category: "Web"
  },
  {
    id: "Project4",
    title: "Flink-Kafka Balance Tracker",
    description: "Real-time bank balance tracker using Apache Kafka for ingestion and Apache Flink for low-latency stream processing.",
    longDescription: "This project demonstrates real-time data processing using Apache Kafka for data ingestion and Apache Flink for stream processing. It tracks bank balances in real-time, providing low-latency updates and scalable architecture for financial applications.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["Apache Kafka", "Apache Flink", "Streaming", "Big Data"],
    techStack: ["Java", "Apache Kafka", "Apache Flink", "Docker", "PostgreSQL"],
    github: "https://github.com/challasujanreddy/KAFKA_FLINK-Realtime-balance-tracker",
    category: "Data"
  },
  {
    id: "Project5",
    title: "Interactive 3D Portfolio",
    description: "An animated, interactive 3D portfolio built using Spline and React to showcase personal projects and skills.",
    longDescription: "This interactive 3D portfolio showcases my projects and skills using Spline and React. It features smooth animations, 3D models, and a modern, engaging UI that highlights my work in a visually stunning way.",
    image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1639762681057-408e52192e55?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1639762681057-408e52192e55?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["React", "Spline", "Tailwind CSS", "Three.js"],
    techStack: ["React", "Spline", "Tailwind CSS", "Three.js", "Framer Motion"],
    github: "https://github.com/challasujanreddy/sujan_repository",
    live: "https://sujan-portfolio.vercel.app",
    category: "Web"
  }
];

export const ProjectsPage = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('All');
  const [visibleProjects, setVisibleProjects] = useState<Project[]>(projects);

  // Filter projects
  useEffect(() => {
    if (filter === 'All') {
      setVisibleProjects(projects);
    } else {
      setVisibleProjects(projects.filter(project => project.category === filter));
    }
  }, [filter]);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <ProjectsSection id="projects">
      <Container>
        {/* Gradient Title */}
        <Title>
          <GradientText>My Projects</GradientText>
        </Title>
        <Subtitle>
          Some of my recent work showcasing full-stack development, AI/ML, and creative problem-solving.
        </Subtitle>

        {/* Category Filters */}
        <FilterContainer>
          {['All', 'Web', 'AI', 'Data'].map((category) => (
            <FilterButton
              key={category}
              onClick={() => setFilter(category)}
              isActive={filter === category}
            >
              {category}
            </FilterButton>
          ))}
        </FilterContainer>

        {/* Projects Grid */}
        <ProjectsGrid>
          {visibleProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProjectCard 
                project={project} 
                onClick={() => openModal(project)} 
              />
            </motion.div>
          ))}

          {/* ✅ Collaboration CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: visibleProjects.length * 0.1 }}
          >
            <CollaborationCard>
              <CardContent>
                <Icon>🤝</Icon>
                <CardTitle>Let's Work Together</CardTitle>
                <CardDescription>
                  I'm always open to new opportunities and exciting projects. Let's create something amazing together!
                </CardDescription>
                <CTAButton href="#contact">
                  Get In Touch
                </CTAButton>
              </CardContent>
            </CollaborationCard>
          </motion.div>
        </ProjectsGrid>
      </Container>

      {/* Project Modal */}
      <ProjectModal 
        project={selectedProject} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </ProjectsSection>
  );
};

// ✅ Styled Components — Match About Me Design

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const ProjectsSection = styled.section`
  padding: 5rem 1.5rem;
  background: #050505;
  color: white;
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 72rem;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 2.25rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  
  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

const GradientText = styled.span`
  background: linear-gradient(to right, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: inline-block;
`;

const Subtitle = styled.p`
  text-align: center;
  font-size: 1.125rem;
  color: #d1d5db;
  margin-bottom: 3rem;
  max-width: 42rem;
  margin-left: auto;
  margin-right: auto;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ isActive: boolean }>`
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  font-weight: 500;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: ${props => props.isActive ? 'linear-gradient(to right, #3b82f6, #8b5cf6)' : 'rgba(30, 30, 36, 0.6)'};
  color: ${props => props.isActive ? 'white' : '#d1d5db'};
  backdrop-filter: blur(10px);

  &:hover {
    background: ${props => props.isActive ? 'linear-gradient(to right, #2563eb, #7c3aed)' : 'rgba(30, 30, 36, 0.8)'};
    transform: translateY(-3px);
  }
`;

const cardGlow = keyframes`
  0% { box-shadow: 0 0 5px rgba(251, 146, 60, 0.5); }
  25% { box-shadow: 0 0 15px rgba(0, 166, 255, 0.7); }
  50% { box-shadow: 0 0 10px rgba(255, 0, 86, 0.7); }
  75% { box-shadow: 0 0 15px rgba(101, 0, 255, 0.7); }
  100% { box-shadow: 0 0 5px rgba(251, 146, 60, 0.5); }
`;

const ProjectsGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

// ✅ Collaboration Card Styles
const CollaborationCard = styled.div`
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  z-index: 1;
  transition: all 0.3s ease;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2));

  &::before {
    content: "";
    position: absolute;
    top: -15px;
    left: -15px;
    right: -15px;
    bottom: -15px;
    border-radius: inherit;
    background: 
      radial-gradient(circle at 0 0, #3b82f6, transparent),
      radial-gradient(circle at 100% 0, #8b5cf6, transparent),
      radial-gradient(circle at 0 100%, #ec4899, transparent),
      radial-gradient(circle at 100% 100%, #6500ff, transparent);
    filter: blur(30px);
    z-index: -2;
    opacity: 0.6;
    transition: opacity 0.3s ease;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: rgba(5, 5, 5, 0.7);
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
  padding: 2rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  text-align: center;
`;

const Icon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
  background: linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const CardDescription = styled.p`
  font-size: 1rem;
  color: #d1d5db;
  line-height: 1.6;
  margin-bottom: 2rem;
  flex-grow: 1;
`;

const CTAButton = styled.a`
  padding: 0.75rem 2rem;
  border-radius: 9999px;
  font-size: 1rem;
  font-weight: 600;
  background: linear-gradient(to right, #3b82f6, #8b5cf6);
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  margin: 0 auto;
  display: inline-block;

  &:hover {
    background: linear-gradient(to right, #2563eb, #7c3aed);
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
  }
`;

export default ProjectsPage;