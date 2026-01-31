# Recruitment Agency Website

A modern, full-stack recruitment and workforce management website built with Next.js, TypeScript, and PostgreSQL.

## Features

### Public Pages
- **Home** - Agency overview with services and statistics
- **Employment** - Job listings with category filtering
- **Due Diligence** - Information about verification services
- **Job Inquiry** - Form for job seekers to submit inquiries
- **Contact** - Contact form and agency information

### Admin Panel
- **Job Management** - CRUD operations for job listings
- **Inquiry Management** - View and manage job inquiries
- **Secure Authentication** - JWT-based login system

## Prerequisites

- Node.js 18+ installed
- PostgreSQL database
- Git

## Installation

### 1. Create Next.js Project

```bash
npx create-next-app@latest recruitment-agency
cd recruitment-agency
```

When prompted, select:
- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ App Router
- ❌ src/ directory

### 2. Install Dependencies

```bash
npm install lucide-react
npm install bcryptjs jsonwebtoken pg
npm install -D @types/bcryptjs @types/jsonwebtoken @types/pg
```

### 3. Setup Database

Create PostgreSQL database:

```bash
createdb recruitment_agency
```

Run the SQL schema:

```sql
-- Create admins table
CREATE TABLE admins (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create jobs table
CREATE TABLE jobs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  location VARCHAR(255),
  description TEXT,
  requirements TEXT,
  salary_range VARCHAR(100),
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create inquiries table
CREATE TABLE inquiries (
  id SERIAL PRIMARY KEY,
  job_id INTEGER REFERENCES jobs(id),
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  message TEXT,
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default admin (password: admin123)
INSERT INTO admins (email, password) 
VALUES ('admin@agency.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy');
```

### 4. Environment Variables

Create `.env.local` file:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/recruitment_agency
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Project Structure

Create the following folder structure:

```
recruitment-agency/
├── app/
│   ├── (public)/
│   │   ├── page.tsx
│   │   ├── employment/page.tsx
│   │   ├── due-diligence/page.tsx
│   │   ├── job-inquiry/page.tsx
│   │   ├── contact/page.tsx
│   │   └── layout.tsx
│   ├── admin/
│   │   ├── jobs/page.tsx
│   │   ├── inquiries/page.tsx
│   │   └── layout.tsx
│   ├── login/page.tsx
│   └── api/
│       └── auth/
│           └── login/route.ts
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── AdminNav.tsx
├── lib/
│   └── db.ts
└── .env.local
```

## 🎨 Customization

### Branding
Update the following in components:
- `Navbar.tsx` - Company name and logo
- `Footer.tsx` - Contact information
- All pages - Replace "Global Recruitment" with your agency name

### Colors
Default theme uses blue (`blue-600`). To change:
1. Find and replace color classes in components
2. Update Tailwind config for custom colors

### Images
Add real images to `/public/images/` and update:
- Hero sections
- Service icons
- About page photos

## Default Admin Credentials

- **Email**: admin@agency.com
- **Password**: admin123

**Change these immediately in production!**

## Running the Application

### Development

```bash
npm run dev
```

Visit:
- Public site: `http://localhost:3000`
- Admin login: `http://localhost:3000/login`

### Production

```bash
npm run build
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login

### Jobs (to be implemented)
- `GET /api/jobs` - Get all jobs
- `POST /api/jobs` - Create job (admin)
- `PUT /api/jobs/:id` - Update job (admin)
- `DELETE /api/jobs/:id` - Delete job (admin)

### Inquiries (to be implemented)
- `GET /api/inquiries` - Get all inquiries (admin)
- `POST /api/inquiries` - Submit inquiry
- `PUT /api/inquiries/:id` - Update inquiry status (admin)
- `DELETE /api/inquiries/:id` - Delete inquiry (admin)

## 📝 Next Steps

1. **Connect Real Database**: Update API routes to use PostgreSQL
2. **Add Email Notifications**: Integrate email service for inquiries
3. **File Uploads**: Add CV/document upload functionality
4. **Analytics**: Add Google Analytics or similar
5. **SEO**: Add meta tags and sitemap
6. **Testing**: Add unit and integration tests
7. **Deployment**: Deploy to Vercel, Netlify, or your VPS

## 🚢 Deployment

### Vercel (Recommended for Next.js)

```bash
npm install -g vercel
vercel
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📄 License

MIT License - Feel free to use for your recruitment agency!

## 🤝 Support

For issues or questions:
- Check documentation
- Review code comments
- Contact development team

---

**Built with ❤️ using Next.js 15, TypeScript, and Tailwind CSS**
