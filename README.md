# Eden Prisma
Example of using Prisma directly on a front end with Elysia Fn.

On Elysia 0.3, you can expose any backend function to run on the front end, with auto-completion and type-safety.

Note: Elysia Eden 0.3 is currently under heavy development which means it might have a bug, the API may change anytime, and not recommended for production usage.

## Prerequisite
- Any up-and-running Postgres Database that can be accessed from Cloud.
    - You can set up one on [Railway](https://railway.app) for free (not sponsored by Railway btw)
    - Or using a free database on [PlanetScale](https://planetscale.com) (also not sponsored)
- [Prisma Data Platform](https://www.prisma.io/data-platform)

## Set up
1. Clone the repo, and install dependency on the root of the project:
```bash
pnpm i
```

2. Connect the database to [Prisma Data Platform](https://www.prisma.io/data-platform) and get the connection string.

The connection string should look something like this:
```bash
prisma://aws-us-east-1.prisma-data.com/?api_key=xxxxxxxxxxx
```

3. Create file `apps/server/.env` as a reference in `apps`/server/.env.example` and paste the connection string in:
```bash
DIRECT_URL=postgresql://username:password@localhost:5432/table
DATABASE_URL=prisma://aws-us-east-1.prisma-data.com/?api_key=xxxxxxxxxxx
```

4. Run migration command
```bash
pnpm migrate
```

5. Run the development server and explore the project at [localhost:3000](http://localhost:3000):
```bash
pnpm dev
```
