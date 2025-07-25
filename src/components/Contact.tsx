import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, ExternalLink, SquareCode } from 'lucide-react';
import { usePortfolio } from '../contexts/PortfolioContext';
import styled from 'styled-components';
import { motion } from 'framer-motion'; // Assuming you want motion for elements here too

// --- Styled Components for Contact Section ---

const SectionContainer = styled.section`
  background-color: #0A0A0A; /* Dark background */
  color: #D1D5DB; /* Light text for general content */
  padding: 5rem 1.5rem;

  @media (min-width: 768px) {
    padding: 7rem 2rem;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 4rem; /* More space below title */
  color: white; /* Base color for the title */

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

const ContactGrid = styled.div`
  display: grid;
  gap: 3rem; /* Adjusted gap for better spacing between info and form */
  grid-template-columns: 1fr;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const InfoCard = styled.div`
  background: #1A1A1A; /* Darker card background */
  border: 1px solid #2D2D2D; /* Subtle border */
  border-radius: 0.75rem;
  padding: 2.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Soft shadow */
`;

const CardHeading = styled.h3`
  font-size: 2rem; /* Slightly larger heading */
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: white;
`;

const IntroParagraph = styled.p`
  font-size: 1.125rem; /* Larger text for intro */
  line-height: 1.75;
  margin-bottom: 2rem;
  color: #A1A1AA; /* Light gray for body text */
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem; /* Space between icon and text */
`;

const IconWrapper = styled.div`
  width: 3rem; /* Larger icon circle */
  height: 3rem;
  background: linear-gradient(to right, #3B82F6, #8B5CF6); /* Gradient background for icons */
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0; /* Prevent shrinking */
`;

const ItemTitle = styled.h4`
  font-size: 1.125rem; /* Consistent title size */
  font-weight: 600;
  color: white;
`;

const ItemContent = styled.p`
  font-size: 1rem;
  color: #A1A1AA; /* Light gray for contact details */
`;

const SocialLinksContainer = styled.div`
  margin-top: 2rem;
`;

const SocialHeading = styled.h4`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: white;
`;

const SocialIconLink = styled.a`
  width: 3.5rem; /* Larger social icons */
  height: 3.5rem;
  background-color: #252525; /* Darker background for social icons */
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  border: 1px solid #2D2D2D; /* Subtle border */

  &:hover {
    background: linear-gradient(to right, #3B82F6, #8B5CF6); /* Gradient on hover */
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(59, 130, 246, 0.3);
    border-color: transparent; /* Remove border on hover with gradient */
  }

  svg {
    color: #D1D5DB; /* Light icon color */
    transition: color 0.3s ease;
  }

  &:hover svg {
    color: white; /* White icon on hover */
  }
`;

const FormContainer = styled.div`
  background: #1A1A1A; /* Darker card background for form */
  border: 1px solid #2D2D2D;
  border-radius: 0.75rem;
  padding: 2.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.95rem; /* Slightly larger label */
  font-weight: 500;
  margin-bottom: 0.6rem;
  color: white; /* White label text */
`;

const Input = styled.input`
  width: 100%;
  padding: 0.9rem 1.25rem; /* More padding */
  background-color: #252525; /* Darker input background */
  border-radius: 0.5rem;
  border: 1px solid #3B3B3B; /* Darker border */
  color: white; /* White text input */
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    border-color: #3B82F6; /* Accent color on focus */
    outline: none;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3); /* Subtle blue glow */
  }

  &::placeholder {
    color: #A1A1AA; /* Lighter placeholder text */
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.9rem 1.25rem; /* More padding */
  background-color: #252525; /* Darker textarea background */
  border-radius: 0.5rem;
  border: 1px solid #3B3B3B; /* Darker border */
  color: white; /* White text input */
  font-size: 1rem;
  transition: all 0.3s ease;
  min-height: 8rem; /* Set a minimum height */
  resize: vertical; /* Allow vertical resizing */

  &:focus {
    border-color: #3B82F6; /* Accent color on focus */
    outline: none;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3); /* Subtle blue glow */
  }

  &::placeholder {
    color: #A1A1AA; /* Lighter placeholder text */
  }
`;

const SubmitButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
  padding: 1rem 2rem;
  background: linear-gradient(to right, #3B82F6, #8B5CF6); /* Gradient button */
  color: white;
  font-weight: 600;
  border-radius: 0.5rem; /* Slightly rounded corners */
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(59, 130, 246, 0.3);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(59, 130, 246, 0.4);
  }
`;

export const Contact = () => {
  const { portfolioData } = usePortfolio();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const MY_EMAIL = 'challasujanreddy@gmail.com'; // Your hardcoded email

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create a form element and submit to FormSubmit
    const form = document.createElement('form');
    form.action = `https://formsubmit.co/${MY_EMAIL}`;
    form.method = 'POST';
    form.target = '_blank'; // Opens in a new tab

    // Add form data
    const nameInput = document.createElement('input');
    nameInput.type = 'hidden';
    nameInput.name = 'name';
    nameInput.value = formData.name;
    form.appendChild(nameInput);

    const emailInput = document.createElement('input');
    emailInput.type = 'hidden';
    emailInput.name = 'email';
    emailInput.value = formData.email;
    form.appendChild(emailInput);

    const messageInput = document.createElement('input');
    messageInput.type = 'hidden';
    messageInput.name = 'message';
    messageInput.value = formData.message;
    form.appendChild(messageInput);

    // Add FormSubmit configuration
    const subjectInput = document.createElement('input');
    subjectInput.type = 'hidden';
    subjectInput.name = '_subject';
    subjectInput.value = `Portfolio Contact from ${formData.name}`;
    form.appendChild(subjectInput);

    const nextInput = document.createElement('input');
    nextInput.type = 'hidden';
    nextInput.name = '_next';
    nextInput.value = window.location.href; // Redirects back to current page
    form.appendChild(nextInput);

    // Append the form to the body, submit, and remove it
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);

    // Reset form for new input
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // This function is defined in a script tag in your original code,
  // which is not a React-friendly way. It's better to manage scrolling
  // within React components directly or via a utility hook/context if needed globally.
  // For this component, it's not directly used here for a button.
  // If it's used elsewhere, keep it in a shared utility.
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <section id="contact">
      <div className="container mx-auto max-w-6xl">
        <SectionTitle
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Get In <GradientText>Touch</GradientText>
        </SectionTitle>

        <ContactGrid>
          {/* Contact Info */}
          <InfoCard
            as={motion.div} // Use motion.div directly on styled component
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <CardHeading>Let's Connect</CardHeading>
            <IntroParagraph>
              I'm always open to discussing new opportunities, interesting projects,
              or just having a great conversation about technology. Feel free to reach out!
            </IntroParagraph>

            <div className="space-y-6"> {/* Increased space between contact items */}
              <ContactItem>
                <IconWrapper>
                  <Mail size={20} className="text-white" />
                </IconWrapper>
                <div>
                  <ItemTitle>Email</ItemTitle>
                  <ItemContent>{MY_EMAIL}</ItemContent>
                </div>
              </ContactItem>

              <ContactItem>
                <IconWrapper>
                  <Phone size={20} className="text-white" />
                </IconWrapper>
                <div>
                  <ItemTitle>Phone</ItemTitle>
                  <ItemContent>+91 9492471248</ItemContent>
                </div>
              </ContactItem>

              <ContactItem>
                <IconWrapper>
                  <MapPin size={20} className="text-white" />
                </IconWrapper>
                <div>
                  <ItemTitle>Location</ItemTitle>
                  <ItemContent>Hyderabad, India</ItemContent>
                </div>
              </ContactItem>
            </div>

            {/* Social Links */}
            <SocialLinksContainer>
              <SocialHeading>Follow Me</SocialHeading>
              <div className="flex gap-4 flex-wrap"> {/* Space between social icons */}
                <SocialIconLink
                  href="https://github.com/challasujanreddy"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub" // Added for accessibility
                >
                  <Github size={20} />
                </SocialIconLink>
                <SocialIconLink
                  href="https://www.linkedin.com/in/challa-sujanreddy-0477a527a"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn" // Added for accessibility
                >
                  <Linkedin size={20} />
                </SocialIconLink>
                <SocialIconLink
                  href="https://leetcode.com/u/CHALLASUJANREDDY/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LeetCode" // Added for accessibility
                >
                  <SquareCode size={20} />
                </SocialIconLink>

                {/* Dynamic Social Links */}
                {portfolioData.content.socialLinks && portfolioData.content.socialLinks.map((link) => (
                  <SocialIconLink
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={link.name}
                    aria-label={link.name} // Added for accessibility
                  >
                    {/* You'd likely need custom icons for these based on link.name or link.icon */}
                    <ExternalLink size={20} />
                  </SocialIconLink>
                ))}
              </div>

              {/* Custom Social Links List (if you still want this text list) */}
              {portfolioData.content.socialLinks && portfolioData.content.socialLinks.length > 0 && (
                <div className="mt-6 space-y-3"> {/* Adjusted margin and spacing */}
                  {portfolioData.content.socialLinks.map((link) => (
                    <div key={link.id} className="flex items-center gap-3"> {/* Adjusted gap */}
                      <ExternalLink size={18} className="text-blue-400" /> {/* Changed icon color */}
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 transition-colors duration-300" // Accent color for links
                      >
                        {link.name}
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </SocialLinksContainer>
          </InfoCard>

          {/* Contact Form */}
          <FormContainer
            as={motion.div} // Use motion.div directly on styled component
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your full name"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="message">Message</Label>
                <TextArea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell me about your project or just say hello!"
                ></TextArea>
              </FormGroup>

              <SubmitButton
                type="submit"
                whileHover={{ scale: 1.02 }} // Slight scale on hover
                whileTap={{ scale: 0.98 }} // Slight shrink on tap
              >
                <Send size={20} />
                Send Message
              </SubmitButton>
            </form>
          </FormContainer>
        </ContactGrid>
      </div>

      {/* Removed the dangerouslySetInnerHTML script block
          as it's generally not a good practice in React.
          If scrollToProjects is needed elsewhere, it should be
          a utility function or part of a shared context. */}
    </section>
  );
};