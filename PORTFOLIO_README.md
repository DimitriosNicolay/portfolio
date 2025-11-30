# Portfolio Website

A modern, elegant portfolio website built with Next.js, featuring smooth scrolling, WebGL textures, and a beautiful dark/light theme system.

## Features

- ✨ **WebGL Background**: Leather-like texture with interactive light effects
- 🌓 **Dark/Light Theme**: Toggle between dark and light modes with smooth transitions
- 🎯 **Smooth Scrolling**: Powered by Lenis for buttery-smooth navigation
- 📱 **Responsive Design**: Looks great on all devices
- 🎨 **Modern UI**: Glassmorphism effects and gradient animations
- 📧 **Contact Sidebar**: Slides in while scrolling with profile and contact info

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **3D Graphics**: Three.js, React Three Fiber
- **Smooth Scrolling**: Lenis
- **Animations**: CSS animations and transitions

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
\`\`\`bash
cd /home/reavy/portfolio
\`\`\`

2. Install dependencies (already done):
\`\`\`bash
npm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

\`\`\`
portfolio/
├── app/
│   ├── globals.css          # Global styles and animations
│   ├── layout.tsx            # Root layout with providers
│   └── page.tsx              # Main page
├── components/
│   ├── AboutSection.tsx      # About me section
│   ├── ContactSidebar.tsx    # Sliding contact sidebar
│   ├── HeroSection.tsx       # Hero/landing section
│   ├── ProjectsSection.tsx   # Projects showcase
│   ├── SmoothScroll.tsx      # Lenis smooth scroll wrapper
│   ├── TechStackSection.tsx  # Technology stack display
│   ├── ThemeToggle.tsx       # Dark/light theme toggle
│   └── WebGLBackground.tsx   # WebGL texture background
├── contexts/
│   └── ThemeContext.tsx      # Theme context and provider
└── package.json
\`\`\`

## Customization

### Update Personal Information

Edit the following files to add your own information:

1. **Contact Sidebar** (`components/ContactSidebar.tsx`):
   - Name, title, email, phone, location
   - Profile picture
   - Social media links

2. **Hero Section** (`components/HeroSection.tsx`):
   - Your name and tagline
   - Introduction text

3. **About Section** (`components/AboutSection.tsx`):
   - Your bio and experience
   - Statistics and achievements

4. **Tech Stack** (`components/TechStackSection.tsx`):
   - Add/remove technologies you work with
   - Customize categories

5. **Projects** (`components/ProjectsSection.tsx`):
   - Replace dummy projects with your real projects
   - Add project images, links, and descriptions

### Styling

- Colors and gradients can be adjusted in each component
- Global styles are in `app/globals.css`
- WebGL shader colors can be modified in `components/WebGLBackground.tsx`

## Features Breakdown

### WebGL Background
The background uses custom GLSL shaders to create a leather-like texture with dynamic lighting that responds to mouse movement. The colors automatically adjust based on the theme.

### Smooth Scrolling
Lenis provides hardware-accelerated smooth scrolling with customizable easing functions.

### Contact Sidebar
The sidebar smoothly slides in from the left as you scroll down the page (appears at 30% scroll progress).

### Theme System
- Default: Dark mode
- Persists preference in localStorage
- Smooth transitions between themes
- Toggle button in top-right corner

## Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Deployment

This project can be deployed to:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- Any Node.js hosting platform

## Performance Tips

- Images should be optimized and placed in the `public` folder
- Consider lazy loading for sections
- WebGL canvas is performant but may need optimization for mobile devices

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## License

MIT

## Support

For issues or questions, feel free to open an issue or reach out!

---

Built with ❤️ using Next.js and modern web technologies
