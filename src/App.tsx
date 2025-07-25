import { Hero } from './components/Hero';
import { AboutMe } from './components/AboutMe';
import { Skills } from './components/Skills';
import ProjectsDrawer from './components/ProjectsDrawer';
import { PortfolioProvider } from './contexts/PortfolioContext';
import { Resume } from './components/Resume';
import { Contact } from './components/Contact';
import { JotformChatbot } from './components/JotformChatbot';
import { Navigation } from './components/Navigation'; // Make sure you have this!

function App() {
  return (
    <PortfolioProvider>
      <div className="min-h-screen bg-[#0A0A1A] text-white relative">
        {/* Navigation */}
        <Navigation />

        {/* Main Content */}
        <main>
          <Hero />
          <AboutMe />
          <Skills />
          <ProjectsDrawer />
          <Resume />
          <Contact />
        </main>

        {/* Global AI Chatbot */}
        <JotformChatbot />

        {/* Optional: Scroll-to-top or footer */}
      </div>
    </PortfolioProvider>
  );
}

export default App;