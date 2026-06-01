# Shlok V Vaishnav - Portfolio

A modern, responsive portfolio website built with Next.js 14, inspired by minimalist design principles.

## Features

- Clean, modern design with smooth animations
- Fully responsive layout
- Fast page loads with Next.js App Router
- SEO optimized with metadata
- Multiple sections: Home, Projects, Blogs, Resume
- Easy to customize and extend

## Tech Stack

- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **CSS3** - Styling with CSS modules
- **Google Fonts** - Typography (Inter, Poppins, Playfair Display, etc.)

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
```bash
git clone https://github.com/shlokkvaishnav/shlok-portfolio.git
cd shlok-portfolio
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:3000`

## Building for Production

```bash
npm run build
npm start
```

The built files will be optimized and ready for deployment.

## Deployment

This Next.js app can be easily deployed to:
- **Vercel** (recommended - zero config)
- **Netlify**
- **AWS Amplify**
- Any platform supporting Node.js

## Customization

- Update personal information in the page components (`app/**/page.js`)
- Modify colors in `app/globals.css` (CSS custom properties)
- Add your own projects, blog posts, and resume details
- Replace social links in `Footer.js` and page components
- Update metadata in each page's `metadata` export

## Project Structure

```
app/
├── components/       # Reusable components
│   ├── Navbar.js
│   └── Footer.js
├── projects/        # Projects page
├── blogs/           # Blogs page
├── resume/          # Resume page
├── layout.js        # Root layout
├── page.js          # Home page
└── globals.css      # Global styles
```

## License

MIT License - see LICENSE file for details
