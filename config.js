export const config = {
  personal: {
    name: 'Shlok Vaishnav',
    email: 'shlok9640@gmail.com',
    tagline: 'Software Engineer · Builder of Systems',
    bio: 'Crafting resilient software the way the ancients raised monuments — built to endure, shaped with intention, and standing long after the scaffolding is gone.',
  },

  social: {
    github: 'https://github.com/shlokkvaishnav',
    linkedin: 'https://linkedin.com/in/shlok-vaishnav',
    twitter: 'https://twitter.com/shlokkvaishnav',
    resume: '/resume.pdf',
  },

  navItems: [
    { id: 'sanctuary', label: 'Sanctuary' },
    { id: 'quest-log', label: 'Quest Log' },
    { id: 'armory', label: 'Armory' },
    { id: 'journey', label: 'Journey' },
    { id: 'elysium', label: 'Elysium' },
    { id: 'gathering', label: 'Gathering' },
  ],

  projects: [
    { title: 'E-Commerce Platform', desc: 'A full-featured e-commerce platform with product catalog, shopping cart, payment integration, and admin dashboard.', tags: ['Next.js', 'TypeScript', 'PostgreSQL'], featured: true, demo: 'https://demo.example.com', github: 'https://github.com/shlokkvaishnav/ecommerce' },
    { title: 'AI Image Classifier', desc: 'Machine learning model for image classification using convolutional neural networks with 95% accuracy.', tags: ['Python', 'TensorFlow', 'Keras'], featured: true, demo: null, github: 'https://github.com/shlokkvaishnav/image-classifier' },
    { title: 'Real-Time Chat App', desc: 'WebSocket-based real-time messaging app with rooms, typing indicators, and message history.', tags: ['React', 'Node.js', 'Socket.io'], featured: true, demo: 'https://chat.example.com', github: 'https://github.com/shlokkvaishnav/chat-app' },
    { title: 'Task Management Dashboard', desc: 'Productivity tool with kanban boards, time tracking, and team collaboration features.', tags: ['Vue.js', 'Firebase', 'Tailwind'], featured: false, demo: null, github: 'https://github.com/shlokkvaishnav/task-manager' },
    { title: 'Portfolio Website Builder', desc: 'No-code platform for developers to create and customize their portfolio websites.', tags: ['React', 'Node.js', 'AWS'], featured: false, demo: 'https://builder.example.com', github: null },
    { title: 'Weather Forecast App', desc: 'Mobile-first weather application with location-based forecasts and weather alerts.', tags: ['React Native', 'TypeScript', 'Redux'], featured: false, demo: null, github: 'https://github.com/shlokkvaishnav/weather-app' },
  ],

  skills: [
    { name: 'Languages', items: [{ n: 'JavaScript', v: 90 }, { n: 'TypeScript', v: 85 }, { n: 'Python', v: 80 }, { n: 'Java', v: 70 }, { n: 'SQL', v: 75 }] },
    { name: 'Frontend', items: [{ n: 'React', v: 90 }, { n: 'Next.js', v: 85 }, { n: 'HTML/CSS', v: 95 }, { n: 'Tailwind', v: 90 }] },
    { name: 'Backend', items: [{ n: 'Node.js', v: 85 }, { n: 'Express', v: 85 }, { n: 'PostgreSQL', v: 80 }, { n: 'MongoDB', v: 75 }] },
    { name: 'Tools & AI', items: [{ n: 'Git', v: 90 }, { n: 'Docker', v: 75 }, { n: 'AWS', v: 70 }, { n: 'Machine Learning', v: 75 }] },
  ],

  experience: [
    { dates: 'JUN 2025 — AUG 2025', role: 'Software Development Intern', company: 'Tech Company', detail: 'Worked on full-stack web development projects using modern technologies.', find: 'bronze stylus' },
    { dates: 'JAN 2024 — PRESENT', role: 'Frontend Developer', company: 'Freelance', detail: 'Building custom websites and web applications for clients worldwide.', find: 'clay seal' },
  ],

  albums: [
    { title: 'Random Access Memories', artist: 'Daft Punk', glyph: 'I', color: '#7c3b2e' },
    { title: 'Good Kid, M.A.A.D City', artist: 'Kendrick Lamar', glyph: 'II', color: '#5e6b3a' },
    { title: 'Currents', artist: 'Tame Impala', glyph: 'III', color: '#3e5c63' },
    { title: 'Dark Side of the Moon', artist: 'Pink Floyd', glyph: 'IV', color: '#7a5a2e' },
    { title: 'Blonde', artist: 'Frank Ocean', glyph: 'V', color: '#6b3f55' },
    { title: 'The Wall', artist: 'Pink Floyd', glyph: 'VI', color: '#445a44' },
  ],

  games: [
    'The Legend of Zelda: BOTW',
    'Hades',
    'Hollow Knight',
    'Celeste',
  ],

  travel: [
    { place: 'Greece', note: 'Explored ancient ruins and modern culture' },
    { place: 'Japan', note: 'Experienced the blend of tradition and technology' },
    { place: 'Iceland', note: 'Witnessed breathtaking natural wonders' },
  ],

  contacts: [
    { label: 'Email', value: 'shlok9640@gmail.com', href: 'mailto:shlok9640@gmail.com' },
    { label: 'GitHub', value: 'shlokkvaishnav', href: 'https://github.com/shlokkvaishnav' },
    { label: 'LinkedIn', value: 'in/shlok-vaishnav', href: 'https://linkedin.com/in/shlok-vaishnav' },
    { label: 'X / Twitter', value: '@shlokkvaishnav', href: 'https://twitter.com/shlokkvaishnav' },
  ],
}
