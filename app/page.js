import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './page.css'

export default function Home() {
  const projects = [
    {
      title: 'Project One',
      description: 'A full-stack web application built with React and Node.js',
      tags: ['React', 'Node.js', 'MongoDB'],
      link: '#'
    },
    {
      title: 'Project Two',
      description: 'Machine learning model for image classification',
      tags: ['Python', 'TensorFlow', 'AI/ML'],
      link: '#'
    },
    {
      title: 'Project Three',
      description: 'Mobile app for productivity and task management',
      tags: ['React Native', 'Firebase', 'TypeScript'],
      link: '#'
    }
  ]

  return (
    <div className="home">
      <Navbar />

      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Hi, I&apos;m <span className="hero-name">Shlok V Vaishnav</span>
            </h1>
            <p className="hero-subtitle">
              Developer & creative problem-solver
            </p>
            <p className="hero-description">
              Building thoughtful digital experiences with code.
              Passionate about creating intuitive interfaces and solving complex problems.
            </p>
            <div className="hero-cta">
              <a href="#projects" className="btn btn-primary">
                View Projects
              </a>
              <a href="#contact" className="btn btn-secondary">
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="section about-section">
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <div className="about-content">
            <p className="about-text">
              I&apos;m a developer focused on creating meaningful digital experiences.
              With expertise in frontend development, AI/ML, and full-stack engineering,
              I build solutions that blend technical excellence with thoughtful design.
            </p>
            <p className="about-text">
              Currently studying Computer Science and exploring the intersection of
              technology and user experience. I believe in writing clean, maintainable
              code and designing interfaces that feel natural and intuitive.
            </p>
          </div>
        </div>
      </section>

      <section id="projects" className="section projects-section">
        <div className="container">
          <h2 className="section-title">Featured Projects</h2>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div key={index} className="project-card">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="project-tag">{tag}</span>
                  ))}
                </div>
                <a href={project.link} className="project-link">
                  Learn more →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section contact-section">
        <div className="container">
          <h2 className="section-title">Get in Touch</h2>
          <div className="contact-content">
            <p className="contact-text">
              I&apos;m always open to discussing new projects, creative ideas, or
              opportunities to be part of your vision.
            </p>
            <div className="contact-links">
              <a
                href="mailto:shlokkvaishnav@gmail.com"
                className="contact-link"
              >
                shlokkvaishnav@gmail.com
              </a>
              <div className="social-links">
                <a
                  href="https://github.com/shlokkvaishnav"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/shlokkvaishnav"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
