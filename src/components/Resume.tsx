import React from 'react';
import { Download, Calendar, MapPin, GraduationCap, Briefcase, Award } from 'lucide-react';
import { usePortfolio, Experience, Education, Certification } from '../contexts/PortfolioContext';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// --- Styled Components ---

const SectionContainer = styled.section`
  background-color: #0A0A0A;
  color: white;
  padding: 5rem 1.5rem;

  @media (min-width: 768px) {
    padding: 7rem 2rem;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1.5rem;
  
  @media (min-width: 768px) {
    font-size: 3.5rem;
  }
`;

const GradientText = styled.span`
  background: linear-gradient(to right, #3B82F6, #8B5CF6);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const ResumeGrid = styled.div`
  display: grid;
  gap: 2.5rem; /* Increased gap for better spacing */
  grid-template-columns: 1fr; /* Default to single column */
  max-width: 90rem;
  margin: 0 auto;
  margin-top: 4rem;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr); /* Three columns on larger screens */
    align-items: start; /* Align cards to the top */
  }
`;

const ResumeCard = styled(motion.div)`
  background: #1A1A1A;
  border: 1px solid #2D2D2D;
  border-radius: 0.75rem;
  padding: 2rem;
  height: 100%; /* Ensures cards in a row have equal height */
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-0.5rem);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.08);
    border-color: #3B82F6;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #2D2D2D;
`;

const CardTitle = styled.h3`
  font-size: 1.75rem; /* Slightly larger for emphasis */
  font-weight: 600;
  margin: 0;
  color: white;
`;

// --- Refined Timeline Components ---
const TimelineWrapper = styled.div`
  position: relative;
  padding-left: 2rem; /* Space for the line and dots */
`;

const TimelineLine = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, #3B82F6, #8B5CF6); /* Gradient line */
`;

const TimelineItem = styled(motion.div)`
  position: relative;
  margin-bottom: 2rem; /* Space between items */
  padding-left: 1.5rem; /* Space for content after dot */

  &:last-child {
    margin-bottom: 0;
  }
`;

const TimelineDot = styled.div<{ color: string }>`
  position: absolute;
  left: -9px; /* Adjust to precisely intersect the TimelineLine (2px width + half of dot width) */
  top: 0.25rem; /* Aligns with the start of the content card */
  width: 18px; /* Larger dot */
  height: 18px; /* Larger dot */
  border-radius: 50%;
  background-color: ${props => props.color}; /* Dynamic color */
  border: 4px solid #1A1A1A; /* Border to create a 'cut-out' effect against the card background */
  z-index: 2; /* Ensure dot is on top of everything */
`;

const TimelineContent = styled(motion.div)` /* Make content card animatable */
  background: #252525; /* Slightly lighter background for the content card */
  border-radius: 0.5rem;
  padding: 1.25rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* Subtle shadow for content card */
  transition: transform 0.2s ease; /* Smooth transition for hover */

  &:hover {
    transform: translateY(-3px); /* Slight lift on hover */
  }
`;

const ItemDate = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #A1A1AA;
  margin-bottom: 0.5rem;
`;

const ItemTitle = styled.h4`
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
  color: white;
`;

const ItemSubtitle = styled.p`
  font-size: 1rem;
  color: #3B82F6;
  margin: 0 0 0.5rem 0;
`;

const ItemDescription = styled.p`
  font-size: 0.875rem;
  color: #D1D5DB;
  margin: 0;
`;

const DownloadButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: linear-gradient(to right, #3B82F6, #8B5CF6);
  color: white;
  font-weight: 600;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(59, 130, 246, 0.3);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(59, 130, 246, 0.4);
  }
`;

const PlaceholderContent = styled.p`
  color: #A1A1AA;
  text-align: center;
  padding: 2rem 1rem;
  background-color: #2A2A2A;
  border-radius: 0.5rem;
  margin-top: 1rem;
`;

export const Resume = () => {
  const { portfolioData } = usePortfolio();

  const experiences = portfolioData.experiences || [];
  const education = portfolioData.education || [];
  const certifications = portfolioData.certifications || [];

  const handleDownloadResume = () => {
    if (portfolioData.content.resumeFile) {
      const link = document.createElement('a');
      link.href = '/Sujan_Resume.pdf';
      link.download = 'Sujan_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('Resume file not found. Please upload your resume to the public folder and update its path in PortfolioContext.tsx');
    }
  };

  // Animation variants for timeline items
  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <SectionContainer id="resume">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <SectionTitle
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            My <GradientText>Journey</GradientText>
          </SectionTitle>
          <DownloadButton
            onClick={handleDownloadResume}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <Download size={20} />
            Download Resume
          </DownloadButton>
        </div>

        {/* Grid Layout */}
        <ResumeGrid>
          {/* Education Card with Timeline */}
          <ResumeCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <CardHeader>
              <GraduationCap size={28} className="text-blue-400" />
              <CardTitle>Education</CardTitle>
            </CardHeader>
            
            <TimelineWrapper>
              <TimelineLine /> {/* This is the main vertical line */}
              {education.length > 0 ? (
                education.map((edu, index) => (
                  <TimelineItem
                    key={edu.id}
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible" // Animate when in view
                    viewport={{ once: true, amount: 0.5 }} // Trigger once when 50% in view
                    transition={{ delay: index * 0.15, ease: [0.42, 0, 0.58, 1] }} // Staggered animation, fixed ease type
                  >
                    <TimelineDot color="#3B82F6" /> {/* Blue dot for Education */}
                    <TimelineContent>
                      <ItemDate>
                        <Calendar size={16} />
                        {edu.period}
                      </ItemDate>
                      <ItemTitle>{edu.degree}</ItemTitle>
                      <ItemSubtitle>{edu.school}</ItemSubtitle>
                      <ItemDescription>
                        <span className="flex items-center gap-1 mb-1">
                          <MapPin size={16} />
                          {edu.location}
                        </span>
                        {/* Dynamic Grade - Consider making this part of your PortfolioContext data */}
                        {edu.school.includes("Chaitanya Bharathi Institute of Technology") && (
                          <span>CGPA: 7.9/10</span>
                        )}
                        {edu.school.includes("Sri Chaitanya Junior College") && (
                          <span>Percentage: 94.4%</span>
                        )}
                        {edu.school.includes("Central Board of Secondary Education") && (
                          <span>Percentage: 88.8%</span>
                        )}
                      </ItemDescription>
                    </TimelineContent>
                  </TimelineItem>
                ))
              ) : (
                <PlaceholderContent>No education details available.</PlaceholderContent>
              )}
            </TimelineWrapper>
          </ResumeCard>

          {/* Experience Card with Timeline */}
          <ResumeCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <CardHeader>
              <Briefcase size={28} className="text-green-400" />
              <CardTitle>Experience</CardTitle>
            </CardHeader>
            
            <TimelineWrapper>
              <TimelineLine /> {/* This is the main vertical line */}
              {experiences.length > 0 ? (
                experiences.map((exp, index) => (
                  <TimelineItem
                    key={exp.id}
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible" // Animate when in view
                    viewport={{ once: true, amount: 0.5 }} // Trigger once when 50% in view
                    transition={{ delay: index * 0.15, ease: [0.42, 0, 0.58, 1] }} // Staggered animation, fixed ease type
                  >
                    <TimelineDot color="#22C55E" /> {/* Green dot for Experience */}
                    <TimelineContent>
                      <ItemDate>
                        <Calendar size={16} />
                        {exp.period}
                      </ItemDate>
                      <ItemTitle>{exp.title}</ItemTitle>
                      <ItemSubtitle>{exp.company}</ItemSubtitle>
                      <ItemDescription>{exp.description}</ItemDescription>
                    </TimelineContent>
                  </TimelineItem>
                ))
              ) : (
                <PlaceholderContent>
                <p className="text-white-700 mb-4 font-bold">
                  Ready to start my professional journey!
                </p>
                <p className="text-sm text-white-700 font-bold">
                  Experience will be added as I progress in my career.
                </p>
              </PlaceholderContent>
              )}
            </TimelineWrapper>
          </ResumeCard>

          {/* Certifications Card (without timeline) */}
          <ResumeCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <CardHeader>
              <Award size={28} className="text-purple-400" />
              <CardTitle>Certifications</CardTitle>
            </CardHeader>
            <div className="space-y-4">
              {certifications.length > 0 ? (
                certifications.map((cert) => (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-b border-gray-800 pb-4 last:border-0"
                  >
                    <ItemTitle>{cert.name}</ItemTitle>
                    {cert.issuer && <ItemSubtitle>{cert.issuer}</ItemSubtitle>}
                    {cert.date && (
                      <ItemDate>
                        <Calendar size={16} />
                        {cert.date}
                      </ItemDate>
                    )}
                    {cert.description && (
                      <ItemDescription>{cert.description}</ItemDescription>
                    )}
                  </motion.div>
                ))
              ) : (
                <PlaceholderContent>No certifications added yet.</PlaceholderContent>
              )}
            </div>
          </ResumeCard>
        </ResumeGrid>
      </div>
    </SectionContainer>
  );
};