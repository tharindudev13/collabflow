**CollabFlow** — a collaborative project and task management platform.

---

**Features**

Project Management
Task Management
Kanban Board
Dashboard and Analytics
Real-time updates
Search and filtering

**Tech Stack**
Framework - Next.js
Language - TypeScript
UI - Tailwind CSS + shadcn/ui
Database - PostgreSQL
ORM - Prisma
Authentication - Auth.js
Drag & Drop - dnd-kit
REal-time - Supabase Realtime
Deployement - Vercel


## Prerequisites

Before running CollabFlow locally, make sure you have installed:

- Node.js and npm
- PostgreSQL
- Git

pgAdmin 4 is optional but recommended for managing the PostgreSQL database.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/tharindudev13/collabflow.git
cd collabflow
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up PostgreSQL

Start your local PostgreSQL server.

Using pgAdmin 4 or the PostgreSQL command-line interface, create a database named `collabflow_db`.

You can create it using SQL:

```sql
CREATE DATABASE collabflow_db;
```

### 4. Configure environment variables

Create a `.env` file in the project root.

Copy the contents of `.env.example` into `.env` and replace the placeholder password with your PostgreSQL password.

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/collabflow_db?schema=public"
```

If your PostgreSQL server uses a different username, host, or port, update the connection string accordingly.

**Security:** Never commit `.env` or actual database credentials to GitHub.

### 5. Set up Prisma

Apply the database migrations:

```bash
npx prisma migrate dev
```

Generate the Prisma Client:

```bash
npx prisma generate
```

These commands create the required database tables and generate the TypeScript client used to interact with PostgreSQL.

### 6. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Management

CollabFlow uses **PostgreSQL** as its relational database and **Prisma ORM** for database access.

The main database files are:

| File | Purpose |
|---|---|
| `prisma/schema.prisma` | Defines the database models |
| `prisma/migrations/` | Stores database migration history |
| `prisma.config.ts` | Configures Prisma |
| `lib/prisma.ts` | Provides a reusable Prisma Client instance |
| `.env.example` | Documents required environment variables |

### Useful Prisma Commands

| Command | Description |
|---|---|
| `npx prisma validate` | Validate the Prisma schema |
| `npx prisma generate` | Generate the Prisma Client |
| `npx prisma migrate dev` | Apply development migrations |
| `npx prisma studio` | Open the database management interface |
| `npx prisma migrate status` | Check migration status |

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

## Project Status

CollabFlow is currently under active development. Features such as authentication, project collaboration, task management, and Kanban boards will be implemented in upcoming development phases.


**Getting Started**

1.Clone the Repository
2.Run npm install
3.Run npm run dev
