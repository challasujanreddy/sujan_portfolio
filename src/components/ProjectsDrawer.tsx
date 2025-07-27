import { useState, useEffect, useCallback, useRef } from "react";
import Spline from "@splinetool/react-spline";
import type { Application, SplineEvent } from "@splinetool/runtime";

interface Project {
  id: string;
  name: string;
  description: string;
  url: string;
  tags?: string[];
  imageUrl?: string;
}

// Clean project data (trimmed URLs)
const projects: Project[] = [
  {
    id: "Project1",
    name: "Artistry Odyssey",
    description: "A web platform that allows users to explore, create, and showcase digital art with artist profiles and trending galleries.",
    url: "https://github.com/challasujanreddy/Artistry-Odyssey",
    tags: ["HTML", "CSS", "JavaScript", "PHP", "PostgreSQL"],
    imageUrl: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "Project2",
    name: "Brain Tumor Classifier",
    description: "A deep learning model for 3D MRI brain tumor segmentation using UNet with Dice and Focal loss optimization.",
    url: "https://github.com/challasujanreddy/Brain-Tumor-Classifier",
    tags: ["Python", "Deep Learning", "UNet", "Medical Imaging"],
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "Project3",
    name: "Village Connect",
    description: "A platform connecting travelers with rural hosts for authentic village stay and cultural exchange experiences.",
    url: "https://github.com/challasujanreddy/villageconnect",
    tags: ["Full-stack", "Booking System", "UI/UX", "Web Dev"],
    imageUrl: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "Project4",
    name: "Flink-Kafka Balance Tracker",
    description: "Real-time bank balance tracker using Apache Kafka for ingestion and Apache Flink for low-latency stream processing.",
    url: "https://github.com/challasujanreddy/KAFKA_FLINK-Realtime-balance-tracker",
    tags: ["Apache Kafka", "Apache Flink", "Streaming", "Big Data"],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "Project5",
    name: "Interactive 3D Portfolio",
    description: "An animated, interactive 3D portfolio built using Spline and React to showcase personal projects and skills.",
    url: "https://github.com/challasujanreddy/sujan_repository",
    tags: ["React", "Spline", "Tailwind CSS", "Three.js"],
    imageUrl: "https://images.unsplash.com/photo-1639762681057-408e52192e55?auto=format&fit=crop&w=600&q=80",
  },
];

export default function ProjectsDrawer({ isOpen = true }: { isOpen?: boolean }) {
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [initialCardMousePos, setInitialCardMousePos] = useState<{ x: number; y: number } | null>(null);
  const [isHoveringCard, setIsHoveringCard] = useState(false);
  const [isHoveringSpline, setIsHoveringSpline] = useState(false);
  const currentMousePos = useRef({ x: 0, y: 0 });
  const leaveTimer = useRef<NodeJS.Timeout | null>(null);
  const isMounted = useRef(true);

  // Track mount state
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
      if (leaveTimer.current) clearTimeout(leaveTimer.current);
    };
  }, []);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      currentMousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Close hover card when drawer is closed
  useEffect(() => {
    if (!isOpen) {
      setHoveredProject(null);
      setInitialCardMousePos(null);
    }
  }, [isOpen]);

  // Delay closing hover card
  const handleLeave = useCallback(() => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => {
      if (isMounted.current && !isHoveringCard) {
        setHoveredProject(null);
        setInitialCardMousePos(null);
      }
    }, 150);
  }, [isHoveringCard]);

  // Manage hover state
  useEffect(() => {
    if (!isHoveringSpline && !isHoveringCard) {
      handleLeave();
    }
  }, [isHoveringSpline, isHoveringCard, handleLeave]);

  // Spline event handler
  const onSplineLoad = useCallback((spline: Application) => {
    spline.addEventListener("mouseHover", (e: SplineEvent) => {
      const name = e.target?.name;
      const match = projects.find((p) => p.id === name);
      if (match) {
        if (hoveredProject?.id !== match.id && isMounted.current) {
          setHoveredProject(match);
          setInitialCardMousePos(currentMousePos.current);
        }
        setIsHoveringSpline(true);
      } else {
        setIsHoveringSpline(false);
      }
    });

    spline.addEventListener("mouseDown", (e: SplineEvent) => {
      const name = e.target?.name;
      const match = projects.find((p) => p.id === name);
      if (match && isMounted.current) {
        window.open(match.url, "_blank", "noopener,noreferrer");
        setHoveredProject(null);
        setInitialCardMousePos(null);
      }
    });
  }, [hoveredProject]);

  // Calculate card position
  const getCardPosition = () => {
    if (!initialCardMousePos || !hoveredProject) return { left: 0, top: 0 };
    const cardWidth = 340;
    const cardHeight = 280;
    const padding = 16;

    let left = initialCardMousePos.x + 24;
    let top = initialCardMousePos.y - cardHeight - 24;

    if (left + cardWidth > window.innerWidth - padding) {
      left = initialCardMousePos.x - cardWidth - 24;
    }
    if (left < padding) left = padding;

    if (top < padding) {
      top = initialCardMousePos.y + 24;
    }
    if (top + cardHeight > window.innerHeight - padding) {
      top = window.innerHeight - cardHeight - padding;
    }

    return { left, top };
  };

  const cardPosition = getCardPosition();

  return (
    <div
      id="projects"
      className="relative w-full h-[600px] bg-[#0A0A1A] rounded-lg overflow-hidden"
      onMouseEnter={() => setIsHoveringSpline(true)}
      onMouseLeave={() => {
        setIsHoveringSpline(false);
        handleLeave();
      }}
    >
      {/* Spline Scene - Clean URL */}
      <Spline
        scene="https://prod.spline.design/7ao6ZN0z8NoNzVE9/scene.splinecode"
        onLoad={onSplineLoad}
      />

      {/* Hover Card */}
      {hoveredProject && initialCardMousePos && (
        <div
          className="fixed z-[9999] transition-all duration-200 ease-out"
          style={{
            left: `${cardPosition.left}px`,
            top: `${cardPosition.top}px`,
            width: "340px",
            pointerEvents: "auto",
          }}
          onMouseEnter={() => setIsHoveringCard(true)}
          onMouseLeave={() => {
            setIsHoveringCard(false);
            handleLeave();
          }}
        >
          <div className="rounded-xl border border-[#3a3a5a] bg-[#121224] p-4 shadow-2xl backdrop-blur-md">
            <img
              src={hoveredProject.imageUrl}
              alt={hoveredProject.name}
              className="w-full h-36 object-cover rounded-lg mb-4"
            />
            <h4 className="text-xl font-bold text-white mb-2 leading-tight tracking-wide">
              {hoveredProject.name}
            </h4>
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              {hoveredProject.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {hoveredProject.tags?.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 bg-[#2a2a4a] text-blue-100 rounded-full border border-[#4a4a6a]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <button
              onClick={() => {
                window.open(hoveredProject.url, "_blank", "noopener,noreferrer");
                setHoveredProject(null);
                setInitialCardMousePos(null);
              }}
              className="w-full py-2 text-sm font-semibold bg-gradient-to-r from-purple-600 to-indigo-500 text-white rounded-md hover:brightness-110 transition duration-200"
            >
              View on GitHub
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="absolute bottom-4 left-4 bg-black/80 px-4 py-2 rounded-lg text-sm text-white shadow-md border border-[#3a3a5a]">
        {hoveredProject ? (
          <span className="font-medium text-blue-300">Viewing: {hoveredProject.name}</span>
        ) : (
          "Hover over a folder to preview"
        )}
      </div>
    </div>
  );
}