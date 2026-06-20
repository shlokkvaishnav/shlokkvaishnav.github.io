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
    { title: 'NanoDB', desc: 'Persistent Vector Search Engine built from scratch featuring disk-based HNSW indexing, AVX2 optimization, multi-threaded insertion, and Python bindings.', tags: ['C++', 'SIMD', 'HNSW'], featured: true, demo: null, github: 'https://github.com/shlokkvaishnav/nano-db' },
    { title: 'Climate Equation Discovery', desc: 'An autonomous agent for discovering physics-validated climate equations using symbolic reasoning, dynamic memory pruning, and Bayesian regime tracking.', tags: ['Python', 'Symbolic AI', 'PySR'], featured: true, demo: null, github: 'https://github.com/shlokkvaishnav/climate-equation-discovery' },
    { title: 'Meridian Analytics', desc: 'A privacy-focused engineering intelligence platform that surfaces PR bottlenecks, optimizes team velocity, and proactively prevents developer burnout.', tags: ['TypeScript', 'ML', 'Full Stack'], featured: true, demo: 'https://meridian-analytics.vercel.app', github: 'https://github.com/shlokkvaishnav/meridian-analytics' },
    { title: 'Cardiovascular Risk', desc: 'Production-grade ML system for heart disease prediction featuring a modular ETL pipeline, FastAPI backend, MLflow tracking, and Docker-ready deployment.', tags: ['Python', 'FastAPI', 'MLOps'], featured: false, demo: 'https://cardiovascular-risk.vercel.app', github: 'https://github.com/shlokkvaishnav/cardiovascular-risk' },
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
    { title: 'After Hours', artist: 'The Weeknd', glyph: 'I', color: '#7c3b2e', cover: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e028863bc11d2aa12b54f5aeb36', spotifyTrack: '0VjIjW4GlUZAMYd2vXMi3b' },
    { title: 'AM', artist: 'Arctic Monkeys', glyph: 'II', color: '#5e6b3a', cover: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e024ae1c4c5c45aabe565499163', spotifyTrack: '5XeFesFbtLpXzIVDNQP22n' },
    { title: 'Cigarettes After Sex', artist: 'Cigarettes After Sex', glyph: 'III', color: '#3e5c63', cover: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e029e495fb707973f3390850eea', spotifyTrack: '2eiOkwpnBpaEkhHoSRDOyr' },
    { title: 'The Stranger', artist: 'Billy Joel', glyph: 'IV', color: '#445a44', cover: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e026ce61113662ecf693b605ee5', spotifyTrack: '4U45aEWtQhrm8A5mxPaFZ7' },
    { title: 'Viva la Vida', artist: 'Coldplay', glyph: 'V', color: '#6b3f55', cover: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02a108e07c661f9fc54de9c43a', spotifyTrack: '1mea3bSkSGXuIRvnWJo9Id' },
  ],

  movies: [
    'The Shawshank Redemption',
    'Into the Wild',
    'The Pianist',
    'The Pursuit of Happyness',
  ],

  philosophies: [
    { title: 'Memento Mori', note: 'Remember you will die — so make every line of code count.' },
    { title: 'Amor Fati', note: 'Love your fate — embrace the bugs, the failures, the refactors.' },
    { title: 'Arete', note: 'Excellence as a habit — not an act, but a practice.' },
  ],

  contacts: [
    { label: 'Email', value: 'shlok9640@gmail.com', href: 'mailto:shlok9640@gmail.com' },
    { label: 'GitHub', value: 'shlokkvaishnav', href: 'https://github.com/shlokkvaishnav' },
    { label: 'LinkedIn', value: 'in/shlok-vaishnav', href: 'https://linkedin.com/in/shlok-vaishnav' },
    { label: 'X / Twitter', value: '@shlokkvaishnav', href: 'https://twitter.com/shlokkvaishnav' },
  ],
}
