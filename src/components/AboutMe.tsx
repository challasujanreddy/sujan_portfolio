import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

export const AboutMe = () => {
  return (
    <section id="about">
      <Container>
        <Title>
          <GradientText>About Me</GradientText>
        </Title>

        <ContentGrid>
          <TextContent>
            <Paragraph>
              I'm Sujan, a full-stack developer with a deep interest in AI/ML, 3D UI, and building tools that blend creativity and logic.
            </Paragraph>
            <Paragraph>
              My work spans from crafting scalable backend systems to developing sleek and responsive frontend interfaces.
            </Paragraph>
            <StatsContainer>
              <StatsCard>
                <StatNumber>8+</StatNumber>
                <StatLabel>Projects</StatLabel>
              </StatsCard>
              <StatsCard>
                <StatNumber>15+</StatNumber>
                <StatLabel>Technologies</StatLabel>
              </StatsCard>
            </StatsContainer>
          </TextContent>

          <ImageContainer>
            <ProfileImage />
          </ImageContainer>
        </ContentGrid>

        <CardsGrid>
          {[
            {
              icon: '</>',
              title: 'Full Stack Dev',
              desc: 'Experienced in building full-stack web applications with modern frameworks.',
            },
            {
              icon: '🧠',
              title: 'AI/ML Enthusiast',
              desc: 'Proficient in GenAI, OpenAI APIs, LangChain, and machine learning models.',
            },
            {
              icon: '🎨',
              title: 'Creative UI/UX',
              desc: '3D UI, animations, and design thinking driven interfaces.',
            },
            {
              icon: '🏆',
              title: 'Hackathon Dev',
              desc: 'Built in fast-paced, competitive environments with tight deadlines.',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <SkillCard>
                <CardContent>
                  <Icon>{item.icon}</Icon>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.desc}</CardDescription>
                </CardContent>
              </SkillCard>
            </motion.div>
          ))}
        </CardsGrid>
      </Container>
    </section>
  );
};

// Animations
const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const outerGlow = keyframes`
  0% { 
    box-shadow: 
      0 0 10px 5px rgba(251, 146, 60, 0.7),
      0 0 20px 10px rgba(251, 146, 60, 0.4);
  }
  25% { 
    box-shadow: 
      0 0 10px 5px rgba(0, 166, 255, 0.7),
      0 0 20px 10px rgba(0, 166, 255, 0.4);
  }
  50% { 
    box-shadow: 
      0 0 10px 5px rgba(255, 0, 86, 0.7),
      0 0 20px 10px rgba(255, 0, 86, 0.4);
  }
  75% { 
    box-shadow: 
      0 0 10px 5px rgba(101, 0, 255, 0.7),
      0 0 20px 10px rgba(101, 0, 255, 0.4);
  }
  100% { 
    box-shadow: 
      0 0 10px 5px rgba(251, 146, 60, 0.7),
      0 0 20px 10px rgba(251, 146, 60, 0.4);
  }
`;

// Styled Components
const AboutSection = styled.section`
  padding: 5rem 1.5rem;
  background: #050505;
  color: white;
`;

const Container = styled.div`
  max-width: 72rem;
  margin: 0 auto;
`;

const Title = styled.h2`
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

const ContentGrid = styled.div`
  display: grid;
  gap: 3rem;
  margin-bottom: 4rem;
  align-items: center;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Paragraph = styled.p`
  font-size: 1.125rem;
  line-height: 1.75;
  color: #d1d5db;
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
`;

const StatsCard = styled.div`
  padding: 1rem 1.5rem;
  background: rgba(30, 30, 36, 0.6);
  border-radius: 0.75rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  text-align: center;
  min-width: 100px;
  
  &:hover {
    background: rgba(30, 30, 36, 0.8);
    transform: translateY(-3px);
  }
`;

const StatNumber = styled.div`
  font-size: 1.875rem;
  font-weight: 700;
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  opacity: 0.7;
`;

const ImageContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`;

const ProfileImage = styled.div`
  width: 18rem;
  height: 18rem;
  border-radius: 50%;
  background: #1e1e24;
  border: 4px solid rgba(101, 0, 255, 0.3);
  box-shadow: 
    0 0 20px rgba(101, 0, 255, 0.3),
    0 0 40px rgba(0, 166, 255, 0.2),
    inset 0 0 20px rgba(255, 255, 255, 0.1);
  position: relative;
  
  &::before {
    content: "";
    position: absolute;
    inset: -5px;
    border-radius: 50%;
    background: 
      radial-gradient(circle at 30% 30%, hsl(27deg 93% 60%), transparent),
      radial-gradient(circle at 70% 30%, #00a6ff, transparent),
      radial-gradient(circle at 30% 70%, #ff0056, transparent),
      radial-gradient(circle at 70% 70%, #6500ff, transparent);
    z-index: -1;
    filter: blur(10px);
    opacity: 0.7;
  }
`;

const CardsGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const cardGlow = keyframes`
  0% { box-shadow: 0 0 5px rgba(251, 146, 60, 0.5); }
  25% { box-shadow: 0 0 15px rgba(0, 166, 255, 0.7); }
  50% { box-shadow: 0 0 10px rgba(255, 0, 86, 0.7); }
  75% { box-shadow: 0 0 15px rgba(101, 0, 255, 0.7); }
  100% { box-shadow: 0 0 5px rgba(251, 146, 60, 0.5); }
`;

const SkillCard = styled.div`
  position: relative;
  border-radius: 1rem;
  padding: 1.5rem;
  overflow: visible;
  z-index: 1;
  transition: all 0.3s ease;
  min-height: 220px;

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
    background: #050505; /* dark interior */
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
`;

const Icon = styled.div`
  font-size: 1.875rem;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: white; 
  margin-bottom: 0.5rem;
`;

const CardDescription = styled.p`
  font-size: 0.875rem;
  color: #d1d5db;
  line-height: 1.5;
`;