
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string;
  image?: string;
  github?: string;
  live?: string;
  featured?: boolean;
}

interface Skill {
  id: number;
  name: string;
  level: number;
}

export interface Experience {
  id: number;
  title: string;
  company: string;
  period: string;
  description: string;
}

export interface Education {
  id: number;
  degree: string;
  school: string; // Changed from 'school' to match your usage
  period: string;
  location: string;
}

interface GalleryItem {
  id: number;
  src: string;
  title: string;
  category: string;
}

interface Highlight {
  id: number;
  icon: string;
  title: string;
  description: string;
}

interface SocialLink {
  id: number;
  name: string;
  url: string;
}

export interface Certification {
  id: number;
  name: string;
  issuer?: string;
  date?: string;
  description?: string;
}

interface Content {
  aboutText: string;
  contactEmail: string;
  contactPhone: string;
  profileImage: string;
  resumeFile: string;
  cvFile: string;
  technologies: string[];
  projectsCompleted: number;
  yearsExperience: number;
  technologiesCount: number;
  location: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  socialLinks?: SocialLink[];
}

interface PortfolioData {
  projects: Project[];
  skills: Skill[];
  experiences: Experience[];
  education: Education[];
  gallery: GalleryItem[];
  highlights: Highlight[];
  certifications: Certification[];
  content: Content;
}

interface PortfolioContextType {
  portfolioData: PortfolioData;
  updateProjects: (projects: Project[]) => void;
  updateSkills: (skills: Skill[]) => void;
  updateExperiences: (experiences: Experience[]) => void;
  updateEducation: (education: Education[]) => void;
  updateGallery: (gallery: GalleryItem[]) => void;
  updateHighlights: (highlights: Highlight[]) => void;
  updateCertifications: (certifications: Certification[]) => void;
  updateContent: (content: Content) => void;
  saveChanges: () => void;
}

const defaultData: PortfolioData = {
  projects: [
    {
      id: 1,
      title: 'Artistry Odyssey',
      description:
        'A web platform that allows users to explore, create, and showcase digital art with artist profiles and trending galleries.',
      tech: 'HTML, CSS, JavaScript, PHP, PostgreSQL',
      image:
        'https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=600&q=80',
      github: 'https://github.com/challasujanreddy/Artistry-Odyssey',
    },
    {
      id: 2,
      title: 'Brain Tumor Classifier',
      description:
        'A deep learning model for 3D MRI brain tumor segmentation using UNet with Dice and Focal loss optimization.',
      tech: 'Python, Deep Learning, UNet, Medical Imaging',
      image:
        'https://images.unsplash.com/photo-1588776814546-ec7d7b8be3f0?auto=format&fit=crop&w=600&q=80',
      github: 'https://github.com/challasujanreddy/Brain-Tumor-Classifier',
    },
    {
      id: 3,
      title: 'Village Connect',
      description:
        'A platform connecting travelers with rural hosts for authentic village stay and cultural exchange experiences.',
      tech: 'Full-stack, Booking System, UI/UX, Web Dev',
      image:
        'https://images.unsplash.com/photo-1579710757893-00a5ef8a6c62?auto=format&fit=crop&w=600&q=80',
      github: 'https://github.com/challasujanreddy/villageconnect',
    },
    {
      id: 4,
      title: 'Flink-Kafka Balance Tracker',
      description:
        'Real-time bank balance tracker using Apache Kafka for ingestion and Apache Flink for low-latency stream processing.',
      tech: 'Apache Kafka, Apache Flink, Streaming, Big Data',
      image:
        'https://images.unsplash.com/photo-1556742031-c6961e8560b0?auto=format&fit=crop&w=600&q=80',
      github:
        'https://github.com/challasujanreddy/KAFKA_FLINK-Realtime-balance-tracker',
    },
    {
      id: 5,
      title: 'Interactive 3D Portfolio',
      description:
        'An animated, interactive 3D portfolio built using Spline and React to showcase personal projects and skills.',
      tech: 'React, Spline, Tailwind CSS, Three.js',
      image:
        'https://images.unsplash.com/photo-1608452964373-e8b0c34c5c54?auto=format&fit=crop&w=600&q=80',
      github: 'https://github.com/challasujanreddy/sujan_portfolio',
    },
  ],
  skills: [
    { id: 1, name: 'JavaScript', level: 90 },
    { id: 2, name: 'React', level: 85 },
    { id: 3, name: 'Python', level: 80 }
  ],
  experiences: [],
  education: [
    {
      id: 1,
      degree: 'Bachelor of Engineering, Information Technology',
      school: 'Chaitanya Bharathi Institute of Technology, Hyderabad',
      period: '2022 – Present',
      location: 'Hyderabad, India',
    },
    {
      id: 2,
      degree: 'Intermediate',
      school: 'Sri Chaitanya Jr College, Hyderabad',
      period: '2019 – 2021',
      location: 'Hyderabad, India',
    },
  ],
  gallery: [],
  highlights: [
    {
      id: 1,
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
      title: "Full Stack Development",
      description: "Expertise in modern web technologies and frameworks"
    },
    {
      id: 2,
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 14 5-5-5-5"/><path d="m9 9.5c-1 0-2.5-.8-2.5-2.5a4.5 4.5 0 0 1 5.5-4.4"/><path d="m9 14.5c1 0 2.5.8 2.5 2.5a4.5 4.5 0 0 1-5.5 4.4"/></svg>',
      title: "Innovation",
      description: "Always exploring cutting-edge technologies and solutions"
    },
    {
      id: 3,
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="m22 21-3-3m0 0-3-3m3 3 3 3m-3-3-3 3"/></svg>',
      title: "Team Leadership",
      description: "Leading teams to deliver exceptional results"
    },
    {
      id: 4,
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>',
      title: "Recognition",
      description: "Multiple hackathon wins and project accolades"
    }
  ],
  certifications: [
    {
      id: 1,
      name: 'Salesforce Certified AI Associate',
      date: 'March 2025',
    },
    {
      id: 2,
      name: 'ALTERYX Data Analytics Process Automation Virtual Internship',
      date: 'Jan – Mar 2025',
    },
    {
      id: 3,
      name: 'Introduction to Internet of Things (NPTEL)',
      date: 'Jan – Apr 2025',
    },
    {
      id: 4,
      name: 'Machine Learning Foundation – Infosys Springboard',
      date: 'Feb 2024',
    },
    {
      id: 5,
      name: 'Artificial Intelligence Primer – Infosys Springboard',
      date: 'Feb 2024',
    },
    {
      id: 6,
      name: 'Artificial Intelligence Foundation – Infosys Springboard',
      date: 'Jan 2024',
    },
  ],
  content: {
    aboutText: 'Passionate software developer with expertise in modern web technologies...',
    contactEmail: 'challasujanreddy@gmail.com',
    contactPhone: '+91 9492471248',
    profileImage: '',
    resumeFile: '/Sujan_Resume.pdf',
    cvFile: '',
    technologies: ['React', 'Vue.js', 'Angular', 'Node.js', 'Express', 'Python', 'Django', 'Flask', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'AWS', 'Docker', 'Kubernetes', 'Git'],
    projectsCompleted: 5,
    yearsExperience: 0,
    technologiesCount: 8,
    location: 'Hyderabad, IN',
    githubUrl: 'https://github.com/challasujanreddy',
    linkedinUrl: 'https://www.linkedin.com/in/challa-sujanreddy-0477a527a',
    twitterUrl: 'https://twitter.com',
    socialLinks: []
  }
};

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};

const ensureDataStructure = (data: any): PortfolioData => {
  return {
    projects: Array.isArray(data?.projects) ? data.projects : defaultData.projects,
    skills: Array.isArray(data?.skills) ? data.skills : defaultData.skills,
    experiences: Array.isArray(data?.experiences) ? data.experiences : defaultData.experiences,
    education: Array.isArray(data?.education) ? data.education : defaultData.education,
    gallery: Array.isArray(data?.gallery) ? data.gallery : defaultData.gallery,
    highlights: Array.isArray(data?.highlights) ? data.highlights : defaultData.highlights,
    certifications: Array.isArray(data?.certifications) ? data.certifications : defaultData.certifications,
    content: {
      aboutText: data?.content?.aboutText || defaultData.content.aboutText,
      contactEmail: data?.content?.contactEmail || defaultData.content.contactEmail,
      contactPhone: data?.content?.contactPhone || defaultData.content.contactPhone,
      profileImage: data?.content?.profileImage || defaultData.content.profileImage,
      resumeFile: data?.content?.resumeFile || defaultData.content.resumeFile,
      cvFile: data?.content?.cvFile || defaultData.content.cvFile,
      technologies: Array.isArray(data?.content?.technologies) ? data.content.technologies : defaultData.content.technologies,
      projectsCompleted: data?.content?.projectsCompleted || defaultData.content.projectsCompleted,
      yearsExperience: data?.content?.yearsExperience || defaultData.content.yearsExperience,
      technologiesCount: data?.content?.technologiesCount || defaultData.content.technologiesCount,
      location: data?.content?.location || defaultData.content.location,
      githubUrl: data?.content?.githubUrl || defaultData.content.githubUrl,
      linkedinUrl: data?.content?.linkedinUrl || defaultData.content.linkedinUrl,
      twitterUrl: data?.content?.twitterUrl || defaultData.content.twitterUrl,
      socialLinks: Array.isArray(data?.content?.socialLinks) ? data.content.socialLinks : defaultData.content.socialLinks
    }
  };
};

export const PortfolioProvider = ({ children }: { children: ReactNode }) => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(defaultData);

  useEffect(() => {
    const savedData = localStorage.getItem('portfolioData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        console.log('Loading saved portfolio data:', parsedData);
        const validatedData = ensureDataStructure(parsedData);
        setPortfolioData(validatedData);
      } catch (error) {
        console.error('Error parsing saved portfolio data:', error);
        setPortfolioData(defaultData);
      }
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
      console.log('Portfolio data auto-saved:', portfolioData);
    } catch (error) {
      console.error('Error auto-saving portfolio data:', error);
    }
  }, [portfolioData]);

  const updateProjects = (projects: Project[]) => {
    console.log('Updating projects:', projects);
    setPortfolioData(prev => ({ ...prev, projects }));
  };

  const updateSkills = (skills: Skill[]) => {
    console.log('Updating skills:', skills);
    setPortfolioData(prev => ({ ...prev, skills }));
  };

  const updateExperiences = (experiences: Experience[]) => {
    console.log('Updating experiences:', experiences);
    setPortfolioData(prev => ({ ...prev, experiences }));
  };

  const updateEducation = (education: Education[]) => {
    console.log('Updating education:', education);
    setPortfolioData(prev => ({ ...prev, education }));
  };

  const updateGallery = (gallery: GalleryItem[]) => {
    console.log('Updating gallery:', gallery);
    setPortfolioData(prev => ({ ...prev, gallery }));
  };

  const updateHighlights = (highlights: Highlight[]) => {
    console.log('Updating highlights:', highlights);
    setPortfolioData(prev => ({ ...prev, highlights }));
  };

  const updateCertifications = (certifications: Certification[]) => {
    console.log('Updating certifications:', certifications);
    setPortfolioData(prev => ({ ...prev, certifications }));
  };

  const updateContent = (content: Content) => {
    console.log('Updating content:', content);
    setPortfolioData(prev => ({ ...prev, content }));
  };

  const saveChanges = () => {
    try {
      localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
      console.log('Portfolio data saved manually:', portfolioData);
    } catch (error) {
      console.error('Error saving portfolio data:', error);
    }
  };

  return (
    <PortfolioContext.Provider value={{
      portfolioData,
      updateProjects,
      updateSkills,
      updateExperiences,
      updateEducation,
      updateGallery,
      updateHighlights,
      updateCertifications,
      updateContent,
      saveChanges
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};