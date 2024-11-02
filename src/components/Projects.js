import React, { useState, useEffect } from 'react';
import { FaLightbulb, FaCode, FaRocket, FaGithub, FaExternalLinkAlt, FaServer, FaTasks, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import '../css/Projects.css';

const ProjectCard = ({ project }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isServerRunning, setIsServerRunning] = useState(true);

  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        const response = await fetch(`${project.serverHealthEndpoint}`);
        setIsServerRunning(response.ok);
      } catch (error) {
        setIsServerRunning(false);
      }
    };
    checkServerStatus();
  }, [project.serverHealthEndpoint]);

  return (
    <div className="project-card">
      <div className="project-image-container">
        <img
          src={project.imageUrl || '/placeholder.svg?height=300&width=400'}
          alt={project.name || 'Project'}
          className="project-image"
        />
        <div className="project-overlay">
          <h3 className="project-name">{project.name || 'Untitled Project'}</h3>
        </div>
      </div>
      <div className="project-content">
        <p className="project-description">{project.description}</p>
        <button
          className="expand-btn"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? <FaChevronUp /> : <FaChevronDown />} {isExpanded ? 'Hide' : 'Show'} Details
        </button>
        {isExpanded && (
          <div className="project-details">
            <h4>Key Features:</h4>
            <ul>
              {project.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <div className="project-links">
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link button">
                <FaExternalLinkAlt /> View Project
              </a>
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="github-link button">
                <FaGithub /> View on GitHub
              </a>
            </div>
            {isServerRunning ? (
              <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="live-link button">
                <FaServer /> Open Live App
              </a>
            ) : (
              <p className="server-message">
                <FaServer /> {project.name} server is not running. Please start the server.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const Projects = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const projects = [
    {
      id: '1',
      name: 'Todo App',
      description: 'A powerful and intuitive todo list application built with React and Spring Boot. Stay organized and boost your productivity with this feature-rich task management tool.',
      link: 'http://localhost:3000',
      github: 'https://github.com/dasFeuer/Todo-WebApp.git',
      liveLink: 'http://localhost:3000',
      imageUrl: '/TodoApp.png',
      serverHealthEndpoint: 'http://localhost:8080/serverhealth',
      features: [
        'Create, edit, and delete tasks',
        'Mark tasks as complete',
        'Filter tasks by status',
        'Responsive design for mobile and desktop',
        'Data persistence with Spring Boot backend'
      ]
    },
    {
      id: '2',
      name: 'Blog Web App',
      description: 'A feature-rich blogging platform built with React and Spring Boot. Share your thoughts, engage with readers, and manage your content with ease.',
      link: 'http://localhost:3000',
      github: 'https://github.com/dasFeuer/Blog-Webapp.git',
      liveLink: 'http://localhost:3000',
      imageUrl: '/BlogApp.jpg',
      serverHealthEndpoint: 'http://localhost:8081/api/health',
      features: [
        'Create, edit, and delete blog posts',
        'User authentication and authorization',
        'Comment system for reader engagement',
        'Rich text editor for content creation',
        'Responsive design for all devices',
      ]
    }
  ];

  if (loading) {
    return (
      <div className="loader-container" aria-live="polite">
        <div className="loader" aria-hidden="true"></div>
        <p>Loading amazing projects...</p>
      </div>
    );
  }

  return (
    <div className="projects-container">
      <h2 className="projects-title">My Showcase Projects</h2>
      <div className="project-spotlight">
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      <div className="project-journey">
        <h3>My Project Journey</h3>
        <div className="journey-timeline">
          <div className="journey-item">
            <FaLightbulb className="journey-icon" />
            <h4>Idea Inception</h4>
            <p>The spark that ignited these projects</p>
          </div>
          <div className="journey-item">
            <FaCode className="journey-icon" />
            <h4>Development Process</h4>
            <p>Bringing concepts to life through code</p>
          </div>
          <div className="journey-item">
            <FaRocket className="journey-icon" />
            <h4>Launch and Beyond</h4>
            <p>Continuous improvement and future plans</p>
          </div>
        </div>
      </div>
      <div className="call-to-action">
        <h3>Ready to Collaborate?</h3>
        <p>I'm always excited to work on new projects and bring ideas to life!</p>
        <a href="/contact" className="cta-button">
          <FaTasks /> Start a Project Together
        </a>
      </div>
    </div>
  );
};

export default Projects;