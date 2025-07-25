import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

export const Skills = () => {
  const skillsData = [
    {
      category: 'Frontend',
      icon: '💻',
      skills: [
        { name: 'React', level: 90, icon: '⚛️' },
        { name: 'TypeScript', level: 85, icon: '📘' },
        { name: 'Next.js', level: 80, icon: '⏭️' },
        { name: 'Tailwind CSS', level: 75, icon: '🎨' },
        { name: 'Three.js', level: 65, icon: '✨' }
      ]
    },
    {
      category: 'Backend',
      icon: '🔧',
      skills: [
        { name: 'Node.js', level: 85, icon: '🟢' },
        { name: 'Express', level: 80, icon: '🚂' },
        { name: 'MongoDB', level: 75, icon: '🍃' },
        { name: 'PostgreSQL', level: 70, icon: '🐘' },
        { name: 'GraphQL', level: 65, icon: '📊' }
      ]
    },
    {
      category: 'AI/ML',
      icon: '🧠',
      skills: [
        { name: 'Python', level: 80, icon: '🐍' },
        { name: 'TensorFlow', level: 70, icon: '🔢' },
        { name: 'OpenAI API', level: 75, icon: '🤖' },
        { name: 'LangChain', level: 65, icon: '⛓️' },
        { name: 'LLMs', level: 70, icon: '💬' }
      ]
    },
    {
      category: 'CS Fundamentals',
      icon: '📚',
      skills: [
        { name: 'DSA', level: 85, icon: '🧩' },
        { name: 'OOPs', level: 80, icon: '🔄' },
        { name: 'Computer Networks', level: 75, icon: '🌐' },
        { name: 'Database Systems', level: 70, icon: '🗄️' },
        { name: 'Operating Systems', level: 65, icon: '💻' }
      ]
    }
  ];

  const techStack = [
    { name: 'React', icon: '⚛️' },
    { name: 'TypeScript', icon: '📘' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'Python', icon: '🐍' },
    { name: 'MongoDB', icon: '🍃' },
    { name: 'AWS', icon: '☁️' },
    { name: 'Docker', icon: '🐳' },
    { name: 'GraphQL', icon: '📊' }
  ];

  return (
    <SkillsSection id="skills">
      <FloatingIcons>
        {['⚛️', '🐍', '☁️', '🤖', '⚡', '🚀', '💡', '🔥'].map((icon, i) => (
          <FloatingIcon 
            key={i}
            style={{
              left: `${Math.random() * 90 + 5}%`,
              top: `${Math.random() * 90 + 5}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            {icon}
          </FloatingIcon>
        ))}
      </FloatingIcons>
      
      <Container>
        <SectionTitle>
          My <GradientText>Skills</GradientText>
        </SectionTitle>
        
        <SkillsGrid>
          {skillsData.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <SkillCategory>
                <CategoryHeader>
                  <CategoryIcon>{category.icon}</CategoryIcon>
                  <CategoryTitle>{category.category}</CategoryTitle>
                </CategoryHeader>
                <SkillsList>
                  {category.skills.map((skill) => (
                    <SkillItem key={skill.name}>
                      <SkillName>
                        <SkillIcon>{skill.icon}</SkillIcon>
                        {skill.name}
                      </SkillName>
                      <SkillLevel>
                        <LevelBar 
                          level={skill.level}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 }}
                        />
                        <LevelPercent>{skill.level}%</LevelPercent>
                      </SkillLevel>
                    </SkillItem>
                  ))}
                </SkillsList>
              </SkillCategory>
            </motion.div>
          ))}
        </SkillsGrid>
        
        <TechStack>
          <TechTitle>Tech Stack</TechTitle>
          <TechIcons>
            {techStack.map((tech, index) => (
              <TechIcon 
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <TechIconEmoji>{tech.icon}</TechIconEmoji>
                {tech.name}
              </TechIcon>
            ))}
          </TechIcons>
        </TechStack>
      </Container>
    </SkillsSection>
  );
};

// Animations
const floatAnimation = keyframes`
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
  100% { transform: translateY(0) rotate(0deg); }
`;

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

// Styled Components
const SkillsSection = styled.section`
  padding: 5rem 1.5rem;
  background: #0a0a0a;
  color: white;
  position: relative;
  overflow: hidden;
`;

const FloatingIcons = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
`;

const FloatingIcon = styled.div`
  position: absolute;
  font-size: 2rem;
  opacity: 0.1;
  animation: ${floatAnimation} 3s ease-in-out infinite;
  user-select: none;
`;

const Container = styled.div`
  max-width: 72rem;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.25rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  
  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

const GradientText = styled.span`
  background: linear-gradient(to right, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const SkillsGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const SkillCategory = styled.div`
  background: rgba(30, 30, 36, 0.6);
  border-radius: 1rem;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    border-color: rgba(255, 255, 255, 0.2);
  }
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`;

const CategoryIcon = styled.div`
  font-size: 1.5rem;
`;

const CategoryTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #e2e8f0;
`;

const SkillsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SkillItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SkillName = styled.span`
  font-size: 0.875rem;
  color: #d1d5db;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SkillIcon = styled.span`
  font-size: 1rem;
`;

const SkillLevel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LevelBar = styled(motion.div)<{ level: number }>`
  height: 8px;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, 
      rgba(255, 255, 255, 0.1) 0%, 
      rgba(255, 255, 255, 0.3) 50%, 
      rgba(255, 255, 255, 0.1) 100%);
    animation: ${shimmer} 2s infinite;
  }
`;

const LevelPercent = styled.span`
  font-size: 0.75rem;
  color: #94a3b8;
`;

const TechStack = styled.div`
  margin-top: 4rem;
  text-align: center;
`;

const TechTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #e2e8f0;
`;

const TechIcons = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  max-width: 800px;
  margin: 0 auto;
`;

const TechIcon = styled(motion.div)`
  background: rgba(30, 30, 36, 0.6);
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  
  &:hover {
    background: rgba(59, 130, 246, 0.3);
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const TechIconEmoji = styled.span`
  font-size: 1rem;
`;