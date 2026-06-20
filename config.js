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
    { name: 'Languages', items: [{ n: 'C++', v: 88 }, { n: 'Python', v: 85 }, { n: 'JavaScript', v: 80 }, { n: 'SQL', v: 75 }] },
    { name: 'ML & Research', items: [{ n: 'Machine Learning', v: 88 }, { n: 'Computer Vision', v: 85 }, { n: 'Deep Learning', v: 82 }, { n: 'PyTorch', v: 78 }] },
    { name: 'Web Dev', items: [{ n: 'React', v: 80 }, { n: 'Node.js', v: 75 }, { n: 'Next.js', v: 72 }, { n: 'Tailwind', v: 78 }] },
    { name: 'Tools', items: [{ n: 'Git', v: 90 }, { n: 'Linux', v: 78 }, { n: 'Docker', v: 72 }, { n: 'GCP', v: 68 }] },
  ],

  experience: [
    { dates: 'APR 2026 — PRESENT', role: 'Software Development Intern', company: 'Bull Agritech', detail: 'Building a crop classification system using satellite imagery and deep learning to detect castor fields and estimate planted acreage across farm boundaries.', find: 'satellite shard' },
    { dates: 'FEB 2026 — PRESENT', role: 'Undergraduate Research Fellow', company: 'CSE Dept, Nirma University (ISRO)', detail: 'Conducting morphometric analysis of lunar impact craters under an ISRO-funded project, processing Chandrayaan DEM data to extract shape parameters.', find: 'lunar fragment' },
    { dates: 'SEP 2025 — PRESENT', role: 'Technical Team Member', company: 'Data Science Club, Nirma', detail: 'Presented ML workshops for 60+ students, co-organized HACKaMINeD 2026 with 1000+ participants, and run bi-weekly Kaggle sessions.', find: 'iron compass' },
    { dates: 'SEP 2025 — PRESENT', role: 'Promotions & Publication Head', company: 'IEEE Computer Society, Nirma', detail: 'Coordinated AI workshops with Google Cloud India, built promotional workflows, and ran campaigns for events including the IEEE Carnival.', find: 'clay seal' },
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
