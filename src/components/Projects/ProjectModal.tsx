// src/components/Projects/ProjectModal.tsx
"use client";

import React from 'react';

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  images: string[];
  tags: string[];
  techStack: string[];
  github?: string;
  live?: string;
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  if (!project || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div 
        className="bg-glass rounded-2xl p-6 w-full max-h-[90vh] overflow-y-auto max-w-4xl transform transition-all duration-300 scale-100 border border-white/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-3xl font-bold text-white text-gradient">
            {project.title}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl hover:scale-110 transition-transform duration-200"
          >
            ×
          </button>
        </div>

        {/* Main Image */}
        <div className="mb-6 rounded-xl overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-64 md:h-80 object-cover rounded-xl"
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-3">Description</h3>
          <p className="text-gray-300 leading-relaxed text-lg">
            {project.longDescription}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-3">Tech Stack</h3>
          <div className="flex flex-wrap gap-3">
            {project.techStack.map((tech, index) => (
              <span 
                key={index}
                className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-white rounded-lg border border-purple-500/30"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Additional Images */}
        {project.images.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-white mb-3">Screenshots</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.images.map((img, index) => (
                <img 
                  key={index}
                  src={img} 
                  alt={`${project.title} screenshot ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg border border-white/10"
                />
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 pt-6 border-t border-white/10">
          {project.github && (
            <a 
              href={project.github.trim()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-center font-medium border border-white/20"
            >
              View Code
            </a>
          )}
          {project.live && (
            <a 
              href={project.live.trim()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-lg transition-all duration-300 text-center font-medium"
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
      <div 
        className="absolute inset-0" 
        onClick={onClose}
      />
    </div>
  );
};