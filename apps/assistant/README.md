## Setup

Create `.env.local` file with the following

```bash
SUPABASE_API_URL=SUPABASE_API_URL
SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

Install node:

```bash
# must be v20+
node -v
```

Install the dependencies:

```bash
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`

```bash
pnpm  dev
```

## Production

Build the application for production:

```bash
pnpm  build
```

Locally preview production build:

```bash
pnpm  start
```
