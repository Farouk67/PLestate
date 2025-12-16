# PlEstate - Real Estate Website

A modern, full-featured real estate website built with Next.js 14 and Sanity CMS.

## Features

✨ **Modern Design**
- Beautiful, responsive UI with Tailwind CSS
- Smooth animations and transitions
- Mobile-first approach

🏠 **Property Management**
- Comprehensive property listings
- Advanced filtering (price, bedrooms, location, type)
- Featured properties section
- Property detail pages with image galleries
- Virtual tour integration

🎨 **CMS Integration**
- Sanity CMS for easy content management
- Rich property schema
- Image upload and management
- Inquiry tracking system

📱 **User Experience**
- Fast page loads with Next.js 14 App Router
- SEO optimized
- Contact forms with validation
- Similar properties recommendations

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React
- **Styling**: Tailwind CSS
- **CMS**: Sanity.io
- **Fonts**: Playfair Display, Manrope
- **Icons**: Lucide React
- **Image Optimization**: Next.js Image

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Sanity account (free tier available)

### Installation

1. **Clone and install dependencies**

```bash
cd plestate
npm install
```

2. **Set up Sanity CMS**

```bash
# Install Sanity CLI globally
npm install -g @sanity/cli

# Initialize Sanity project
sanity init

# Follow the prompts:
# - Create new project or use existing
# - Choose dataset name (production)
# - Choose output path (./sanity)
```

3. **Configure environment variables**

Create `.env.local` in the root directory:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-03-15
SANITY_API_TOKEN=your_token_here
NEXT_PUBLIC_SITE_URL=https://plestate.com
```

Get your Sanity credentials from: https://www.sanity.io/manage

4. **Deploy Sanity Studio**

```bash
cd sanity
sanity deploy
```

This will give you a URL like: `https://your-project.sanity.studio`

5. **Run development server**

```bash
npm run dev
```

Visit `http://localhost:3000`

## Project Structure

```
plestate/
├── app/                      # Next.js App Router
│   ├── layout.js            # Root layout
│   ├── page.js              # Homepage
│   ├── properties/          # Property listings
│   │   ├── page.js
│   │   └── [slug]/          # Property detail pages
│   ├── globals.css          # Global styles
│   └── api/                 # API routes
│       └── contact/
├── components/              # React components
│   ├── Header.js
│   ├── Hero.js
│   ├── PropertyCard.js
│   ├── Filters.js
│   └── ContactForm.js
├── lib/                     # Utilities
│   ├── sanity.js           # Sanity client
│   └── queries.js          # GROQ queries
├── sanity/                  # Sanity CMS
│   ├── schema.js
│   ├── schemas/
│   │   ├── property.js     # Property schema
│   │   └── inquiry.js      # Inquiry schema
│   └── config.js
└── public/                  # Static assets
```

## Using the CMS

### Accessing Sanity Studio

Visit: `http://localhost:3000/studio` (local)
Or: `https://your-project.sanity.studio` (deployed)

### Adding a Property

1. Click "Property" in the sidebar
2. Click "Create new Property"
3. Fill in the required fields:
   - Title
   - Slug (auto-generated from title)
   - Property Type
   - Status (For Sale/Rent)
   - Price
   - Description
   - Location details
   - Bedrooms, Bathrooms, Area
   - Upload images (minimum 1)
4. Optional fields:
   - Features & amenities
   - Year built
   - Parking spaces
   - Virtual tour URL
   - Mark as featured
5. Click "Publish"

### Managing Inquiries

All contact form submissions are saved as "Inquiries" in Sanity:
- View all inquiries in the CMS
- Track status (New, Contacted, Closed)
- See which property they inquired about
- Access contact details

## Deployment

### Deploy to Hostinger

1. **Build the project**

```bash
npm run build
```

2. **Upload to Hostinger**

Option A: Using Git
- Push your code to GitHub
- Connect GitHub to Hostinger
- Auto-deploy on push

Option B: Using FTP
- Upload the entire project folder
- Make sure Node.js is enabled in Hostinger
- Set environment variables in Hostinger panel

3. **Configure Node.js on Hostinger**
- Go to your hosting panel
- Find "Node.js" section
- Set Application Root: `/public_html`
- Set Application URL: `https://plestate.com`
- Set Application Startup File: `node_modules/next/dist/bin/next`
- Add environment variables from `.env.local`

4. **Point your domain**
- Update nameservers or A records to point to Hostinger
- Wait for DNS propagation (up to 24 hours)

### Alternative: Deploy to Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

Follow prompts and add environment variables in Vercel dashboard.

## Customization

### Colors

Edit `tailwind.config.js` to change the color scheme:

```js
colors: {
  primary: { /* your colors */ },
  accent: { /* your colors */ },
}
```

### Fonts

Change fonts in `app/globals.css`:

```css
@import url('your-google-font-url');

:root {
  --font-display: 'Your Display Font', serif;
  --font-body: 'Your Body Font', sans-serif;
}
```

### Content

- Update company info in `app/layout.js` footer
- Modify hero text in `components/Hero.js`
- Update metadata in `app/layout.js`

## Adding Features

### Email Notifications

Install an email service:

```bash
npm install @sendgrid/mail
# or
npm install resend
```

Update `app/api/contact/route.js` to send emails.

### Google Maps Integration

Add map to property detail pages:

```bash
npm install @react-google-maps/api
```

### Property Comparison

Create a comparison feature to compare multiple properties side-by-side.

### User Accounts

Add authentication with NextAuth.js for saved searches and favorites.

## Troubleshooting

**Issue**: Sanity images not loading
- Check `NEXT_PUBLIC_SANITY_PROJECT_ID` in `.env.local`
- Verify CORS settings in Sanity dashboard

**Issue**: Build fails
- Delete `.next` folder and `node_modules`
- Run `npm install` again
- Run `npm run build`

**Issue**: 404 on properties
- Make sure you've published properties in Sanity
- Check that slugs are generated correctly

## Support

For issues:
1. Check the [Next.js docs](https://nextjs.org/docs)
2. Check the [Sanity docs](https://www.sanity.io/docs)
3. Review the code comments

## License

MIT License - feel free to use for personal or commercial projects.

---

Built with ❤️ using Next.js and Sanity
