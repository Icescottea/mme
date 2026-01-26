# 🚀 Quick Start Guide

## Step 1: Initialize Project (5 minutes)

```bash
# Create Next.js project
npx create-next-app@latest recruitment-agency --typescript --tailwind --app
cd recruitment-agency

# Install dependencies
npm install lucide-react bcryptjs jsonwebtoken pg
npm install -D @types/bcryptjs @types/jsonwebtoken @types/pg
```

## Step 2: Create File Structure (2 minutes)

```bash
# Create directories
mkdir -p app/\(public\)/{employment,due-diligence,job-inquiry,contact}
mkdir -p app/admin/{jobs,inquiries}
mkdir -p app/api/auth/login
mkdir -p app/login
mkdir -p components
mkdir -p lib

# Create empty files
touch app/\(public\)/layout.tsx
touch app/admin/layout.tsx
touch components/{Navbar,Footer,AdminNav}.tsx
touch lib/db.ts
```

## Step 3: Database Setup (3 minutes)

```bash
# Create database
createdb recruitment_agency

# Create .env.local
cat > .env.local << EOF
DATABASE_URL=postgresql://localhost:5432/recruitment_agency
JWT_SECRET=$(openssl rand -base64 32)
NEXT_PUBLIC_APP_URL=http://localhost:3000
EOF
```

Run this SQL in PostgreSQL:

```sql
CREATE TABLE admins (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

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

INSERT INTO admins (email, password) 
VALUES ('admin@agency.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy');
```

## Step 4: Copy Component Files

I've provided all the component code. Copy each file:

### Components (3 files)
- `components/Navbar.tsx`
- `components/Footer.tsx`
- `components/AdminNav.tsx`

### Public Pages (5 files)
- `app/(public)/page.tsx` - Home
- `app/(public)/employment/page.tsx` - Jobs
- `app/(public)/due-diligence/page.tsx` - Due Diligence
- `app/(public)/job-inquiry/page.tsx` - Job Inquiry
- `app/(public)/contact/page.tsx` - Contact

### Admin Pages (2 files)
- `app/admin/jobs/page.tsx` - Job Management
- `app/admin/inquiries/page.tsx` - Inquiry Management

### Layouts (2 files)
- `app/(public)/layout.tsx` - Public Layout
- `app/admin/layout.tsx` - Admin Layout

### Auth & API (2 files)
- `app/login/page.tsx` - Login Page
- `app/api/auth/login/route.ts` - Auth API

### Library (1 file)
- `lib/db.ts` - Database Connection

## Step 5: Run Development Server

```bash
npm run dev
```

## 🎯 Access Points

- **Public Site**: http://localhost:3000
- **Employment**: http://localhost:3000/employment
- **Job Inquiry**: http://localhost:3000/job-inquiry
- **Contact**: http://localhost:3000/contact
- **Admin Login**: http://localhost:3000/login
- **Admin Jobs**: http://localhost:3000/admin/jobs
- **Admin Inquiries**: http://localhost:3000/admin/inquiries

## 🔑 Default Login

```
Email: admin@agency.com
Password: admin123
```

## ✅ Verification Checklist

- [ ] All pages load without errors
- [ ] Navigation works on all pages
- [ ] Job inquiry form submits successfully
- [ ] Admin login works
- [ ] Can create/edit/delete jobs in admin
- [ ] Can view inquiries in admin
- [ ] Responsive design works on mobile

## 🎨 Customization Quick Tasks

### 1. Change Brand Name (5 minutes)
Find and replace "Global Recruitment" in:
- `components/Navbar.tsx`
- `components/Footer.tsx`
- All page files

### 2. Update Contact Info (2 minutes)
Update in `components/Footer.tsx` and `app/(public)/contact/page.tsx`:
- Phone numbers
- Email addresses
- Physical address
- Social media links

### 3. Change Color Theme (3 minutes)
Replace `blue-600` with your color throughout files:
```bash
# Example: Change to purple
find . -type f -name "*.tsx" -exec sed -i 's/blue-600/purple-600/g' {} +
find . -type f -name "*.tsx" -exec sed -i 's/blue-700/purple-700/g' {} +
```

### 4. Add Logo (2 minutes)
1. Add logo to `public/logo.png`
2. Update `components/Navbar.tsx`:
```tsx
<Image src="/logo.png" alt="Logo" width={40} height={40} />
```

## 🚀 Production Deployment

### Vercel (Easiest)
```bash
npm install -g vercel
vercel
```

### Manual Deployment
```bash
npm run build
npm start
```

## 📊 Next Features to Add

1. **Email Integration** - Send notifications for inquiries
2. **File Uploads** - CV/resume upload in job inquiry
3. **Search Filters** - Advanced job filtering
4. **Analytics** - Google Analytics integration
5. **Newsletter** - Email subscription
6. **Multi-language** - i18n support

## 🆘 Common Issues

**Port already in use:**
```bash
npx kill-port 3000
npm run dev
```

**Database connection error:**
- Check PostgreSQL is running
- Verify DATABASE_URL in .env.local
- Test connection: `psql recruitment_agency`

**Module not found:**
```bash
rm -rf node_modules package-lock.json
npm install
```

---

**Total Setup Time: ~15-20 minutes**

Need help? Check the main README.md for detailed documentation!