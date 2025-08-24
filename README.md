# ISG Attendance App

A modern attendance tracking and BI system for ISG (Igreja do Senhor Jesus) built with Next.js, Prisma, and shadcn/ui.

## Features

- 📊 **Attendance Tracking**: Record service attendance with detailed metrics
- 📈 **Dashboard & Analytics**: Visual charts and KPIs for insights
- 🏢 **Multi-campus Support**: Ready for multi-tenant architecture
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 📤 **CSV Export**: Export data for external BI tools
- 🔧 **Admin Panel**: Configuration and integration settings
- 🎨 **Modern UI**: Built with shadcn/ui and Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **UI Components**: shadcn/ui, Tailwind CSS, Framer Motion
- **Charts**: Recharts
- **Database**: PostgreSQL with Prisma ORM
- **Icons**: Lucide React

## Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd attendance-isg
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp env.example .env.local
   ```

   Edit `.env.local` and add your database URL:

   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/isg_attendance"
   ```

4. **Set up the database**

   ```bash
   # Generate Prisma client
   npm run db:generate

   # Push schema to database
   npm run db:push

   # Or run migrations (recommended for production)
   npm run db:migrate
   ```

5. **Start the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Database Schema

The app uses two main tables:

### ServiceRecord

- Service attendance records with detailed metrics
- Includes member counts, visitor counts, decisions, parking data
- Supports multi-campus through `campusId`

### Campus

- Campus/location information
- Supports multi-tenant architecture

## API Endpoints

- `GET /api/records` - Fetch attendance records
- `POST /api/records` - Create new attendance record
- `GET /api/records/[id]` - Get specific record
- `PUT /api/records/[id]` - Update record
- `DELETE /api/records/[id]` - Delete record

## Usage

### Adding Attendance Records

1. Navigate to the "Lançar" tab
2. Fill in service details (date, time, type, minister)
3. Enter attendance numbers (members, visitors, decisions)
4. Add parking information
5. Include responsible person and observations
6. Click "Salvar Lançamento"

### Viewing Analytics

1. Go to the "Dashboard" tab
2. View KPIs for the last 30 days
3. Explore charts for attendance trends
4. Analyze parking patterns and conversion rates

### Exporting Data

1. Use the "Exportar CSV" button in the header
2. Data is formatted for BI tools like Power BI, Tableau
3. Includes all attendance metrics and metadata

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio

### Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── api/            # API routes
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Main page
├── components/         # React components
│   └── ui/            # shadcn/ui components
├── lib/               # Utility functions
│   ├── constants.ts   # App constants
│   ├── demo-data.ts   # Sample data
│   ├── export.ts      # CSV export
│   ├── metrics.ts     # Analytics calculations
│   ├── prisma.ts      # Database client
│   └── utils.ts       # Helper functions
└── types/             # TypeScript types
    └── index.ts       # Type definitions
```

## Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

1. Build the application: `npm run build`
2. Set up PostgreSQL database
3. Configure environment variables
4. Run database migrations
5. Start the production server: `npm run start`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please contact the development team.

---

**Note**: This is a functional skeleton. For production use, consider adding:

- Authentication and authorization
- Input validation
- Error handling
- Logging
- Rate limiting
- Backup strategies
