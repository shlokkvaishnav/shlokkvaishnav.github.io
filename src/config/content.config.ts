/**
 * Content Configuration
 * All portfolio content: projects, experience, skills, education, testimonials
 */

export const contentConfig = {
  // Projects
  projects: [
    {
      id: 'project-1',
      title: 'E-Commerce Platform',
      description: 'A full-featured e-commerce platform with product catalog, shopping cart, payment integration, and admin dashboard.',
      longDescription: 'Built a comprehensive e-commerce solution featuring advanced search, filtering, secure payment processing via Stripe, inventory management, and real-time order tracking.',
      image: '/projects/ecommerce.jpg',
      tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
      category: 'Web Development',
      status: 'completed',
      github: 'https://github.com/shlokkvaishnav/ecommerce',
      demo: 'https://demo.example.com',
      featured: true,
      year: 2026
    },
    {
      id: 'project-2',
      title: 'AI Image Classifier',
      description: 'Machine learning model for image classification using convolutional neural networks with 95% accuracy.',
      longDescription: 'Developed and trained a CNN-based image classifier using TensorFlow and Keras. Implemented data augmentation, transfer learning, and achieved 95% accuracy on test dataset.',
      image: '/projects/ai-classifier.jpg',
      tags: ['Python', 'TensorFlow', 'Keras', 'Computer Vision', 'ML'],
      category: 'Machine Learning',
      status: 'completed',
      github: 'https://github.com/shlokkvaishnav/image-classifier',
      demo: null,
      featured: true,
      year: 2026
    },
    {
      id: 'project-3',
      title: 'Real-Time Chat Application',
      description: 'WebSocket-based real-time messaging app with rooms, typing indicators, and message history.',
      longDescription: 'Built a scalable real-time chat application using Socket.io, Redis for session management, and MongoDB for message persistence. Features include private messaging, group chats, and file sharing.',
      image: '/projects/chat-app.jpg',
      tags: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Redis'],
      category: 'Web Development',
      status: 'completed',
      github: 'https://github.com/shlokkvaishnav/chat-app',
      demo: 'https://chat.example.com',
      featured: true,
      year: 2025
    },
    {
      id: 'project-4',
      title: 'Task Management Dashboard',
      description: 'Productivity tool with kanban boards, time tracking, and team collaboration features.',
      longDescription: 'Created a comprehensive project management tool with drag-and-drop kanban boards, Gantt charts, time tracking, team collaboration, and detailed analytics.',
      image: '/projects/task-manager.jpg',
      tags: ['Vue.js', 'Firebase', 'Vuex', 'Tailwind CSS'],
      category: 'Web Development',
      status: 'in-progress',
      github: 'https://github.com/shlokkvaishnav/task-manager',
      demo: null,
      featured: false,
      year: 2026
    },
    {
      id: 'project-5',
      title: 'Portfolio Website Builder',
      description: 'No-code platform for developers to create and customize their portfolio websites.',
      longDescription: 'Developed a SaaS platform that allows developers to build professional portfolio websites using pre-built templates, drag-and-drop editor, and custom domain support.',
      image: '/projects/portfolio-builder.jpg',
      tags: ['React', 'Node.js', 'PostgreSQL', 'AWS S3', 'Stripe'],
      category: 'Web Development',
      status: 'in-progress',
      github: null,
      demo: 'https://builder.example.com',
      featured: false,
      year: 2026
    },
    {
      id: 'project-6',
      title: 'Weather Forecast App',
      description: 'Mobile-first weather application with location-based forecasts and weather alerts.',
      longDescription: 'Built a responsive weather app using React Native with features like 7-day forecasts, hourly updates, weather maps, and push notifications for severe weather alerts.',
      image: '/projects/weather-app.jpg',
      tags: ['React Native', 'TypeScript', 'Weather API', 'Redux'],
      category: 'Mobile Development',
      status: 'completed',
      github: 'https://github.com/shlokkvaishnav/weather-app',
      demo: null,
      featured: false,
      year: 2025
    }
  ],

  // Work Experience
  experience: [
    {
      id: 'exp-1',
      role: 'Software Development Intern',
      company: 'Tech Company Name',
      companyUrl: 'https://company.com',
      location: 'Remote',
      type: 'Internship',
      startDate: 'Jun 2025',
      endDate: 'Aug 2025',
      current: false,
      description: 'Worked on full-stack web development projects using modern technologies.',
      responsibilities: [
        'Developed and maintained full-stack web applications using React and Node.js',
        'Collaborated with design team to implement responsive UI components and improve user experience',
        'Optimized database queries and API endpoints resulting in 40% performance improvement',
        'Participated in code reviews and contributed to team documentation'
      ],
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'Git'],
      achievements: [
        'Reduced page load time by 35% through code optimization',
        'Implemented new feature that increased user engagement by 25%'
      ]
    },
    {
      id: 'exp-2',
      role: 'Frontend Developer',
      company: 'Freelance',
      companyUrl: null,
      location: 'Remote',
      type: 'Freelance',
      startDate: 'Jan 2024',
      endDate: null,
      current: true,
      description: 'Building custom websites and web applications for clients worldwide.',
      responsibilities: [
        'Built custom websites for small businesses and startups using modern frameworks',
        'Implemented design systems and component libraries for consistent UI/UX',
        'Ensured cross-browser compatibility and WCAG accessibility standards',
        'Provided ongoing maintenance and technical support for client projects'
      ],
      technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Figma'],
      achievements: [
        'Completed 15+ projects with 100% client satisfaction',
        'Established long-term partnerships with 5 recurring clients'
      ]
    }
  ],

  // Education
  education: [
    {
      id: 'edu-1',
      degree: 'Bachelor of Technology in Computer Science',
      field: 'Computer Science and Engineering',
      institution: 'University Name',
      institutionUrl: 'https://university.edu',
      location: 'City, State',
      startDate: '2022',
      endDate: '2026',
      current: true,
      grade: '8.5 CGPA',
      description: 'Specialization in Software Engineering and Artificial Intelligence',
      coursework: [
        'Data Structures and Algorithms',
        'Database Management Systems',
        'Operating Systems',
        'Computer Networks',
        'Machine Learning',
        'Web Technologies',
        'Software Engineering',
        'Cloud Computing'
      ],
      achievements: [
        'Dean\'s List (2023, 2024)',
        'Best Project Award for Final Year Project',
        'Represented university in national hackathons'
      ]
    }
  ],

  // Skills
  skills: {
    languages: [
      { name: 'JavaScript', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'Python', level: 80 },
      { name: 'Java', level: 70 },
      { name: 'C++', level: 65 },
      { name: 'SQL', level: 75 }
    ],
    frontend: [
      { name: 'React', level: 90 },
      { name: 'Next.js', level: 85 },
      { name: 'Vue.js', level: 75 },
      { name: 'HTML/CSS', level: 95 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'Framer Motion', level: 80 },
      { name: 'Redux', level: 75 }
    ],
    backend: [
      { name: 'Node.js', level: 85 },
      { name: 'Express.js', level: 85 },
      { name: 'PostgreSQL', level: 80 },
      { name: 'MongoDB', level: 75 },
      { name: 'REST APIs', level: 90 },
      { name: 'GraphQL', level: 70 },
      { name: 'Firebase', level: 75 }
    ],
    tools: [
      { name: 'Git', level: 90 },
      { name: 'Docker', level: 75 },
      { name: 'AWS', level: 70 },
      { name: 'Vercel', level: 85 },
      { name: 'Figma', level: 80 },
      { name: 'Postman', level: 85 },
      { name: 'VS Code', level: 95 }
    ],
    other: [
      { name: 'Machine Learning', level: 75 },
      { name: 'TensorFlow', level: 70 },
      { name: 'Computer Vision', level: 65 },
      { name: 'Agile/Scrum', level: 80 },
      { name: 'CI/CD', level: 70 }
    ]
  },

  // Testimonials
  testimonials: [
    {
      id: 'test-1',
      name: 'John Smith',
      role: 'CTO',
      company: 'Tech Startup',
      avatar: '/testimonials/john.jpg',
      content: 'Shlok delivered exceptional work on our web application. His attention to detail and problem-solving skills are outstanding.',
      rating: 5,
      date: '2026-03'
    },
    {
      id: 'test-2',
      name: 'Sarah Johnson',
      role: 'Product Manager',
      company: 'Digital Agency',
      avatar: '/testimonials/sarah.jpg',
      content: 'Working with Shlok was a pleasure. He understood our requirements perfectly and delivered a polished product ahead of schedule.',
      rating: 5,
      date: '2025-12'
    },
    {
      id: 'test-3',
      name: 'Michael Chen',
      role: 'Founder',
      company: 'E-commerce Startup',
      avatar: '/testimonials/michael.jpg',
      content: 'Highly skilled developer with great communication. Shlok transformed our vision into a beautiful, functional website.',
      rating: 5,
      date: '2025-10'
    }
  ],

  // Blog Posts (if you want to add blogs later)
  blogs: [
    {
      id: 'blog-1',
      title: 'Building Scalable React Applications',
      slug: 'building-scalable-react-applications',
      excerpt: 'Best practices and patterns for building large-scale React applications that are maintainable and performant.',
      content: '', // Full markdown content
      coverImage: '/blogs/react-scalable.jpg',
      date: '2026-05-15',
      readTime: '8 min read',
      tags: ['React', 'JavaScript', 'Architecture', 'Best Practices'],
      published: true,
      featured: true
    },
    {
      id: 'blog-2',
      title: 'Introduction to Machine Learning',
      slug: 'introduction-to-machine-learning',
      excerpt: 'A beginner-friendly guide to understanding machine learning concepts and getting started with your first model.',
      content: '',
      coverImage: '/blogs/ml-intro.jpg',
      date: '2026-04-22',
      readTime: '12 min read',
      tags: ['Machine Learning', 'Python', 'AI', 'Tutorial'],
      published: true,
      featured: true
    },
    {
      id: 'blog-3',
      title: 'Modern CSS Techniques',
      slug: 'modern-css-techniques',
      excerpt: 'Exploring modern CSS features like Grid, Flexbox, and custom properties to create beautiful, responsive layouts.',
      content: '',
      coverImage: '/blogs/css-modern.jpg',
      date: '2026-03-10',
      readTime: '6 min read',
      tags: ['CSS', 'Web Design', 'Frontend', 'Tutorial'],
      published: true,
      featured: false
    },
    {
      id: 'blog-4',
      title: 'TypeScript Tips and Tricks',
      slug: 'typescript-tips-and-tricks',
      excerpt: 'Advanced TypeScript patterns and utilities that will make your code more type-safe and maintainable.',
      content: '',
      coverImage: '/blogs/typescript-tips.jpg',
      date: '2026-02-28',
      readTime: '10 min read',
      tags: ['TypeScript', 'JavaScript', 'Best Practices', 'Tutorial'],
      published: true,
      featured: false
    }
  ]
} as const

export type ContentConfig = typeof contentConfig
