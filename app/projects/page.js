import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './page.css'

export const metadata = {
  title: 'Projects - Shlok V Vaishnav',
  description: 'A collection of my work spanning web development, machine learning, mobile applications, and open-source contributions.',
}

export default function Projects() {
  const projectsList = [
    {
      title: 'Project One',
      description: 'A comprehensive full-stack web application featuring real-time data synchronization, user authentication, and responsive design. Built with modern React patterns and optimized for performance.',
      tags: ['React', 'Node.js', 'MongoDB', 'WebSocket'],
      link: '#',
      status: 'Completed'
    },
    {
      title: 'Project Two',
      description: 'Machine learning model for image classification using convolutional neural networks. Achieved 95% accuracy on test dataset with efficient preprocessing pipeline.',
      tags: ['Python', 'TensorFlow', 'AI/ML', 'Computer Vision'],
      link: '#',
      status: 'Completed'
    },
    {
      title: 'Project Three',
      description: 'Cross-platform mobile application for productivity and task management with offline-first architecture and cloud synchronization.',
      tags: ['React Native', 'Firebase', 'TypeScript', 'Redux'],
      link: '#',
      status: 'In Progress'
    },
    {
      title: 'Project Four',
      description: 'Open-source developer tool for code analysis and documentation generation. Supports multiple programming languages with extensible plugin system.',
      tags: ['TypeScript', 'Node.js', 'CLI', 'Open Source'],
      link: '#',
      status: 'Completed'
    },
    {
      title: 'Project Five',
      description: 'Real-time collaborative whiteboard application with drawing tools, text annotations, and multi-user cursors.',
      tags: ['React', 'WebRTC', 'Canvas API', 'Socket.io'],
      link: '#',
      status: 'In Progress'
    },
    {
      title: 'Project Six',
      description: 'E-commerce platform with advanced search, filtering, payment integration, and admin dashboard for inventory management.',
      tags: ['Next.js', 'PostgreSQL', 'Stripe', 'Tailwind'],
      link: '#',
      status: 'Completed'
    }
  ]

  return (
    <div className="projects-page">
      <Navbar />
      <div className="page-content">
        <div className="container">
          <header className="page-header">
            <h1 className="page-title">Projects</h1>
            <p className="page-subtitle">
              A collection of my work spanning web development, machine learning,
              mobile applications, and open-source contributions.
            </p>
          </header>

          <div className="projects-list">
            {projectsList.map((project, index) => (
              <div key={index} className="project-item">
                <div className="project-header">
                  <h2 className="project-name">{project.title}</h2>
                  <span className={`project-status ${project.status.toLowerCase().replace(' ', '-')}`}>
                    {project.status}
                  </span>
                </div>
                <p className="project-desc">{project.description}</p>
                <div className="project-tech">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="tech-tag">{tag}</span>
                  ))}
                </div>
                <a href={project.link} className="project-view">
                  View Project →
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
