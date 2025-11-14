# 🌍 Fernweh & Fussspuren - Reiseblog

A beautiful, modern travel blog website built with React, TypeScript, and Tailwind CSS.

## 📖 About

Follow Lena and Max on their incredible journey around the world. This blog documents their adventures across 4 continents with stunning stories, interactive maps, and beautiful photography.

## ✨ Features

- 🎨 **Modern Design** - Beautiful hero section with animated gradients
- 📱 **Fully Responsive** - Works perfectly on all devices
- 🗺️ **Interactive Map** - Leaflet-based map showing all travel locations
- 📝 **Blog Posts** - Beautifully formatted travel stories in German
- 📸 **Image Gallery** - Optimized images with fallback support
- ⚡ **Fast Performance** - Built with Vite for lightning-fast load times
- 🎯 **Smooth Scrolling** - Elegant scroll indicators and animations

## 🛠️ Tech Stack

- **Frontend:** React 18 + TypeScript
- **Styling:** Tailwind CSS 3
- **Build Tool:** Vite 4
- **Maps:** Leaflet + OpenStreetMap
- **Icons:** Lucide React
- **Hosting Ready:** Vercel, Netlify, GitHub Pages

## 🚀 Quick Start

### Development
```bash
# Install dependencies
npm install

# Start dev server with hot reload
npm run dev

# Open browser to http://localhost:5173
```

### Production
```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Deploy (see DEPLOYMENT.md)
```

## 📁 Project Structure

```
├── components/          # React components
│   ├── Hero.tsx        # Beautiful hero section
│   ├── IntroSection.tsx # Travel story introduction
│   ├── BlogSection.tsx  # Blog posts grid
│   ├── BlogCard.tsx     # Individual blog card
│   ├── BlogPost.tsx     # Full blog post reader
│   ├── TravelMap.tsx    # Interactive map
│   ├── MapSection.tsx   # Map section wrapper
│   └── ui/             # Reusable UI components
├── data/
│   └── blog-posts.ts   # Blog content and metadata
├── styles/
│   └── globals.css     # Global styles & Tailwind
├── types/
│   └── blog.ts         # TypeScript types
├── public/
│   └── images/         # Static images
├── App.tsx             # Main app component
├── main.tsx            # Entry point
└── vite.config.ts      # Vite configuration
```

## 📝 Blog Posts

The website currently features 4 travel destinations:

1. **Shanghai** (Day 1) - "Wo Tradition auf Zukunft trifft"
2. **Beijing** (Day 18) - "Die Chinesische Mauer"
3. **Rio de Janeiro** (Day 42) - "Wo die Berge ins Meer fallen"
4. **Sydney** (Day 65) - "Die Stadt unter dem Südkreuz"

Each post includes:
- Engaging German storytelling
- Beautiful images
- GPS coordinates
- Personal reflections
- Relevant tags

## 🗺️ Interactive Map

The website features an interactive map showing all travel locations with:
- Numbered markers for each destination
- Clickable route line connecting destinations
- Map legend with all locations
- One-click navigation to blog posts

## 📱 Responsive Design

- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interface
- Fast load times on all devices

## 🌐 Deployment

Ready to go live? See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions on deploying to:
- ✅ Vercel (Recommended)
- ✅ Netlify
- ✅ GitHub Pages

## 🔧 Customization

### Add a New Blog Post

1. Edit `data/blog-posts.ts`:
```typescript
{
  id: "unique-id",
  title: "Ort Name",
  subtitle: "Tag X – Beschreibung",
  location: "Stadt, Land",
  date: "DD. Monat YYYY",
  day: 100,
  image: "/images/image.jpg",
  coordinates: [latitude, longitude],
  content: ["Paragraph 1", "Paragraph 2", ...],
  quote: "Inspirational quote",
  reflection: "Personal thoughts",
  tags: ["Tag1", "Tag2"]
}
```

2. Images should be placed in `public/images/`
3. The map will automatically update with the new location

### Change Colors

Edit `tailwind.config.js` to change the color scheme or modify Tailwind classes in components.

### Update Content

- Hero section: `components/Hero.tsx`
- Intro section: `components/IntroSection.tsx`
- Footer: `App.tsx`

## 📄 License

This project is open source and available under the MIT License.

## 👥 Authors

**Lena & Max** - Travel bloggers documenting their world adventures

---

## 🎉 Ready to Deploy?

Your site is production-ready! Follow the [DEPLOYMENT.md](./DEPLOYMENT.md) guide to get it online in minutes.

**Enjoy your travels! ✈️🌍**
