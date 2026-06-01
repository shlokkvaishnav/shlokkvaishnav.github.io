import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './page.css'

export const metadata = {
  title: 'Resume - Shlok V Vaishnav',
  description: 'My professional experience, education, and technical skills.',
}

export default function Resume() {
  const education = [
    {
      degree: 'Bachelor of Technology in Computer Science',
      institution: 'University Name',
      period: '2022 - 2026',
      details: 'Relevant coursework: Data Structures, Algorithms, Web Development, Machine Learning'
    }
  ]

  const experience = [
    {
      role: 'Software Development Intern',
      company: 'Company Name',
      period: 'Summer 2025',
      responsibilities: [
        'Developed full-stack web applications using React and Node.js',
        'Collaborated with design team to implement responsive UI components',
        'Optimized database queries resulting in 40% performance improvement'
      ]
    },
    {
      role: 'Frontend Developer',
      company: 'Freelance',
      period: '2024 - Present',
      responsibilities: [
        'Built custom websites for small businesses and startups',
        'Implemented modern design systems and component libraries',
        'Ensured cross-browser compatibility and accessibility standards'
      ]
    }
  ]

  const skills = {
    'Languages': ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++'],
    'Frontend': ['React', 'Next.js', 'Vue.js', 'HTML/CSS', 'Tailwind CSS'],
    'Backend': ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'REST APIs'],
    'Tools': ['Git', 'Docker', 'AWS', 'Firebase', 'Figma']
  }

  return (
    <div className="resume-page">
      <Navbar />
      <div className="page-content">
        <div className="container">
          <header className="page-header">
            <h1 className="page-title">Resume</h1>
            <p className="page-subtitle">
              My professional experience, education, and technical skills.
            </p>
            <button className="download-btn">Download PDF</button>
          </header>

          <section className="resume-section">
            <h2 className="resume-heading">Education</h2>
            <div className="resume-items">
              {education.map((edu, index) => (
                <div key={index} className="resume-item">
                  <div className="item-header">
                    <h3 className="item-title">{edu.degree}</h3>
                    <span className="item-period">{edu.period}</span>
                  </div>
                  <p className="item-subtitle">{edu.institution}</p>
                  <p className="item-details">{edu.details}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="resume-section">
            <h2 className="resume-heading">Experience</h2>
            <div className="resume-items">
              {experience.map((exp, index) => (
                <div key={index} className="resume-item">
                  <div className="item-header">
                    <h3 className="item-title">{exp.role}</h3>
                    <span className="item-period">{exp.period}</span>
                  </div>
                  <p className="item-subtitle">{exp.company}</p>
                  <ul className="item-list">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i}>{resp}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="resume-section">
            <h2 className="resume-heading">Skills</h2>
            <div className="skills-grid">
              {Object.entries(skills).map(([category, items]) => (
                <div key={category} className="skill-category">
                  <h3 className="skill-category-name">{category}</h3>
                  <div className="skill-items">
                    {items.map((skill, index) => (
                      <span key={index} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  )
}
