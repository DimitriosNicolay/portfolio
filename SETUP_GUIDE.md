# 🎨 Portfolio Website - Complete Setup Guide

Your modern portfolio website has been successfully created! Here's everything you need to know.

## ✅ What's Been Built

### 1. **Project Structure**
- ✨ Next.js 16 with App Router
- 🎯 TypeScript for type safety
- 🎨 Tailwind CSS 4 for styling
- 🌊 Lenis for smooth scrolling
- 🎮 Three.js for WebGL effects

### 2. **Features Implemented**

#### 🌓 Theme System
- **Default**: Dark mode (as requested)
- **Toggle**: Top-right corner button (🌙/☀️)
- **Persistent**: Saves preference in localStorage
- **Smooth transitions**: All elements fade between themes

#### 🎨 WebGL Background
- **Leather-like texture** with subtle grain and movement
- **Interactive lighting** that responds to mouse position
- **Dynamic colors** that adapt to dark/light theme
- **Performance optimized** shader implementation

#### 📱 Sliding Contact Sidebar
- **Slides in from left** while scrolling (appears at 30% scroll)
- **Rounded profile picture** (currently shows placeholder initials)
- **Contact information**: Email, phone, location
- **Social links**: GitHub, LinkedIn, Twitter
- **Glassmorphism design** with backdrop blur

#### 🚀 Sections Created

1. **Hero Section**
   - Large animated name with gradient
   - Tagline and description
   - CTA buttons
   - Scroll indicator

2. **About Section**
   - Bio with experience showcase
   - Stats grid (projects, clients, technologies)
   - Visual elements with gradients
   - Responsive layout

3. **Tech Stack Section**
   - Categorized by Frontend, Backend, Tools
   - Icon cards with hover effects
   - Glow effects on hover
   - 15+ technologies included

4. **Projects Section**
   - 6 featured projects with dummy data
   - Project cards with tags
   - Hover animations and glow effects
   - Links ready to be updated

5. **Footer**
   - Three-column layout
   - Quick links
   - Social media buttons
   - Copyright info

## 🚀 How to Start

### Option 1: Using the start script
\`\`\`bash
cd /home/reavy/portfolio
./start.sh
\`\`\`

### Option 2: Using npm directly
\`\`\`bash
cd /home/reavy/portfolio
npm run dev
\`\`\`

Then open **http://localhost:3000** in your browser.

## 📝 Customization Guide

### 1. Update Your Personal Information

#### Contact Sidebar (`components/ContactSidebar.tsx`)
\`\`\`typescript
// Replace:
<h3>John Doe</h3>
<p>Full Stack Developer</p>

// With your info:
<h3>Your Name</h3>
<p>Your Title</p>

// Update contact items:
<ContactItem icon="📧" label="Email" value="your@email.com" />
<ContactItem icon="📱" label="Phone" value="+1 xxx xxx xxxx" />
<ContactItem icon="📍" label="Location" value="Your City" />

// Update social links:
<SocialLink href="https://github.com/yourusername" icon="🐙" />
\`\`\`

#### Hero Section (`components/HeroSection.tsx`)
\`\`\`typescript
// Update name and tagline:
<h1>Your Name</h1>
<p>Your Professional Title</p>
\`\`\`

#### About Section (`components/AboutSection.tsx`)
- Replace bio paragraphs with your story
- Update statistics (projects, experience, etc.)

#### Tech Stack (`components/TechStackSection.tsx`)
- Add/remove technologies you actually use
- Customize colors and icons

#### Projects (`components/ProjectsSection.tsx`)
- Replace dummy projects with your real projects
- Add actual links, descriptions, and images
- Update technology tags

### 2. Add Your Profile Picture

Replace the placeholder in `ContactSidebar.tsx`:
\`\`\`typescript
// Current placeholder:
<div className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-500">
  <span>JD</span>
</div>

// Replace with:
<Image 
  src="/profile.jpg" 
  alt="Your Name"
  fill
  className="object-cover"
/>
\`\`\`

Then add your image to the `public` folder as `profile.jpg`.

### 3. Customize Colors

The site uses these main color schemes:
- **Purple**: `from-purple-500 to-blue-500`
- **Pink**: `from-pink-500 to-rose-500`
- **Cyan**: `from-cyan-500 to-teal-500`

Search and replace these gradients in components to match your brand.

### 4. Update Metadata

In `app/layout.tsx`:
\`\`\`typescript
export const metadata: Metadata = {
  title: "Your Name - Your Title",
  description: "Your description",
};
\`\`\`

## 🎨 Theme Customization

### Background Colors
Edit `components/WebGLBackground.tsx` to change the shader colors:
\`\`\`typescript
// Dark mode base color:
vec3 darkColor = vec3(0.05, 0.05, 0.08) + leather * 0.15;

// Light mode base color:
vec3 lightColor = vec3(0.92, 0.92, 0.95) - leather * 0.15;
\`\`\`

### Global Styles
Edit `app/globals.css` for:
- Custom animations
- Scrollbar styling
- Theme transitions

## 📦 Project Structure

\`\`\`
portfolio/
├── app/
│   ├── globals.css           # Global styles, animations, scrollbar
│   ├── layout.tsx             # Root layout with ThemeProvider
│   └── page.tsx               # Main page assembling all sections
├── components/
│   ├── AboutSection.tsx       # About me with stats
│   ├── ContactSidebar.tsx     # Sliding sidebar with contact info
│   ├── Footer.tsx             # Footer with links
│   ├── HeroSection.tsx        # Landing hero section
│   ├── ProjectsSection.tsx    # Projects showcase
│   ├── SmoothScroll.tsx       # Lenis integration
│   ├── TechStackSection.tsx   # Tech stack display
│   ├── ThemeToggle.tsx        # Dark/light mode toggle
│   └── WebGLBackground.tsx    # Custom WebGL shader background
├── contexts/
│   └── ThemeContext.tsx       # Theme state management
├── package.json
└── start.sh                   # Quick start script
\`\`\`

## 🎯 Key Features Explained

### Smooth Scrolling (Lenis)
- Duration: 1.2s
- Custom easing function
- Momentum-based
- Works with all scroll events

### WebGL Background
- Custom GLSL fragment shader
- Noise-based leather texture
- Real-time lighting calculation
- Optimized for performance
- Automatically adjusts to theme

### Contact Sidebar Animation
- Triggers at 30% scroll
- Smooth CSS transform
- Fixed positioning
- z-index: 40 (above content, below toggle)

### Theme System
- Context API for state management
- localStorage persistence
- CSS class-based (html.dark)
- Smooth color transitions (200ms)

## 🚀 Deployment

### Vercel (Recommended)
\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
\`\`\`

### Build for Production
\`\`\`bash
npm run build
npm start
\`\`\`

## 🎨 Design Details

### Color Palette
- **Dark Mode Background**: `#0a0a0a` (very dark)
- **Light Mode Background**: `#ffffff` (bright white)
- **Accent Gradients**: Purple → Blue, Pink → Rose
- **Text Dark**: High contrast grays
- **Borders**: White with low opacity for glass effect

### Typography
- **Headings**: Bold, large (text-5xl to text-9xl)
- **Body**: Clean, readable (text-lg to text-xl)
- **Fonts**: Geist Sans & Geist Mono (built-in)

### Effects
- **Glassmorphism**: `backdrop-blur-xl` with `bg-white/10`
- **Hover States**: Scale transforms (1.05-1.10)
- **Animations**: Fade-in-up on scroll
- **Shadows**: Layered for depth

## 📱 Responsive Design

All sections are fully responsive:
- **Mobile**: Single column, larger touch targets
- **Tablet**: 2-column grids
- **Desktop**: 3-column grids, full sidebar

## ⚡ Performance

- **Code Splitting**: Automatic with Next.js
- **Image Optimization**: Use next/image for photos
- **Font Loading**: Optimized Google Fonts
- **CSS**: Purged unused styles
- **WebGL**: Optimized shader, 60fps target

## 🐛 Troubleshooting

### Port Already in Use
\`\`\`bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
\`\`\`

### Styles Not Updating
\`\`\`bash
# Clear Next.js cache
rm -rf .next
npm run dev
\`\`\`

### WebGL Not Working
- Check browser console for errors
- Ensure hardware acceleration is enabled
- Try a different browser (Chrome recommended)

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Three.js](https://threejs.org/docs)
- [Lenis](https://github.com/studio-freight/lenis)

## 🎉 Next Steps

1. ✅ Start the dev server
2. 📝 Update all personal information
3. 🖼️ Add your profile picture and project images
4. 🎨 Customize colors to match your brand
5. 🔗 Update all external links
6. 📱 Test on different devices
7. 🚀 Deploy to production

---

**Your portfolio is ready to go! Just add your personal touch and launch it! 🚀**
