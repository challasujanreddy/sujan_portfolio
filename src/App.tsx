import { Hero } from './components/Hero';
import { AboutMe } from './components/AboutMe';
import { Skills } from './components/Skills';
import ProjectsDrawer from './components/ProjectsDrawer';
import { PortfolioProvider } from './contexts/PortfolioContext';
import { Resume } from './components/Resume';
import { Contact } from './components/Contact';
import  Chatbot  from './components/Chatbot';
import { Navigation } from './components/Navigation'; // Make sure you have this!

function App() {
  const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;

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
        {/* The component will only render if the webhookUrl is available */}
        {webhookUrl && (
          <Chatbot startOpen={true} webhookUrl={webhookUrl} />
        )}

        {/* Optional: Scroll-to-top or footer */}
      </div>
    </PortfolioProvider>
  );
}

export default App;
