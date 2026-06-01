import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './page.css'

export const metadata = {
  title: 'Blogs - Shlok V Vaishnav',
  description: 'Thoughts on development, design, and technology. Writing about what I learn and build.',
}

export default function Blogs() {
  const blogPosts = [
    {
      title: 'Building Scalable React Applications',
      date: 'May 15, 2026',
      excerpt: 'Best practices and patterns for building large-scale React applications that are maintainable and performant.',
      readTime: '8 min read',
      link: '#'
    },
    {
      title: 'Introduction to Machine Learning',
      date: 'April 22, 2026',
      excerpt: 'A beginner-friendly guide to understanding machine learning concepts and getting started with your first model.',
      readTime: '12 min read',
      link: '#'
    },
    {
      title: 'Modern CSS Techniques',
      date: 'March 10, 2026',
      excerpt: 'Exploring modern CSS features like Grid, Flexbox, and custom properties to create beautiful, responsive layouts.',
      readTime: '6 min read',
      link: '#'
    },
    {
      title: 'TypeScript Tips and Tricks',
      date: 'February 28, 2026',
      excerpt: 'Advanced TypeScript patterns and utilities that will make your code more type-safe and maintainable.',
      readTime: '10 min read',
      link: '#'
    }
  ]

  return (
    <div className="blogs-page">
      <Navbar />
      <div className="page-content">
        <div className="container">
          <header className="page-header">
            <h1 className="page-title">Blogs</h1>
            <p className="page-subtitle">
              Thoughts on development, design, and technology.
              Writing about what I learn and build.
            </p>
          </header>

          <div className="blogs-list">
            {blogPosts.map((post, index) => (
              <article key={index} className="blog-card">
                <div className="blog-meta">
                  <time className="blog-date">{post.date}</time>
                  <span className="blog-separator">·</span>
                  <span className="blog-time">{post.readTime}</span>
                </div>
                <h2 className="blog-title">{post.title}</h2>
                <p className="blog-excerpt">{post.excerpt}</p>
                <a href={post.link} className="blog-link">
                  Read more →
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
