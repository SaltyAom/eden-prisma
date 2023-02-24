# Eden Prisma
Example of using Prisma directly on frontend with Elysia Fn.

On Elysia 0.3, you can expose any backend function to run on frontend, with auto-completion and type-safety.

Note: Elysia Eden 0.3 is currently under heavy development which means it might have a bug, the API may change anytime, and not recommended for production usage.

## Prerequisted
- Any up and running Postgres Database that can be accessed from Cloud.
    - You can setup one on [Railway](https://railway.app) for free (not sponsered by Railway btw)
    - Or using free database on [Planet Scale](https://planetscale.com) (also not sponsered)
- [Prisma Data Platform](https://www.prisma.io/data-platform)

## Set up
1. Clone the repo, and install dependency on the root of the project:
```bash
pnpm i
```

2. Connect Database to [Prisma Data Platform](https://www.prisma.io/data-platform) and get the connection string.

The connection string should look something like this:
```bash
prisma://aws-us-east-1.prisma-data.com/?api_key=xxxxxxxxxxx
```

3. Create file `apps/server/.env` as reference in `apps/server/.env.example` and paste the connection string in:
```bash
DATABASE_URL=prisma://aws-us-east-1.prisma-data.com/?api_key=xxxxxxxxxxx
```

4. Run the development server and explore the project at [localhost:3000](http://localhost:3000):
```bash
pnpm dev
```
