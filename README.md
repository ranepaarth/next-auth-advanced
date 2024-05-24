
# Next Auth Advance

Implemented an authentication system using the latest [Next Auth V5 (Auth.js)]((https://authjs.dev/getting-started/migrating-to-v5)). 

[Live Demo](https://next-auth-advanced-black.vercel.app/)

![Untitled_Project_V1](https://github.com/ranepaarth/next-auth-advanced/assets/130083485/0943188a-1ad0-4562-9095-c5f7a6c0f551)


## Features

- Credentials Login
- OAuth (Google & Github)
- Forgot Password
- Email Verification
- Two Factor Authentication (2FA)



## Tech Stack
- [Next.js / TailwindCSS](https://nextjs.org/docs/getting-started/installation)
- [Auth.js](https://authjs.dev/getting-started/migrating-to-v5)
- [Prisma ORM](https://www.prisma.io/docs/orm/overview/introduction/what-is-prisma)
- [Neon for PostgreSQL](https://neon.tech/docs/connect/connect-from-any-app)
- [Zod for Typescript](https://zod.dev/?id=table-of-contents)
- [Resend for email](https://resend.com/docs/send-with-nextjs) 
- [Shadcn/ui](https://ui.shadcn.com/docs/installation/next)

## Installation
1. Clone the repository: `git clone https://github.com/ranepaarth/next-auth-advanced.git`
2. Navigate to the project directory: `cd next-auth-advanced`
3. Install the dependencies: `npm install`
#### Environment Variables
Add a .env file in the root directory and follow  
```

# PostgreSQL databse URL after you setup neon.tech from https://neon.tech/docs/connect/connect-from-any-app
DATABASE_URL

# This is the only strictly required environment variable. It is the secret used to encode the JWT and encrypt things in transit
# This can be generated via the CLI with npm exec auth secret or via openssl with "openssl rand -base64 33".
AUTH_SECRET

# For development http://localhost:3000
# After deployment this will cahnge to your domain: e.g. https://example.com
AUTH_URL

# Refer https://authjs.dev/getting-started/providers/github to setup env values
AUTH_GITHUB_CLIENT_ID={CLIENT_ID}
AUTH_GITHUB_CLIENT_SECRET={CLIENT_SECRET}

# Refer https://authjs.dev/getting-started/providers/google to setup env values
AUTH_GOOGLE_CLIENT_ID={CLIENT_ID}
AUTH_GOOGLE_CLIENT_SECRET={CLIENT_SECRET}


# Refer https://resend.com/docs/send-with-nextjs to setup env values
RESEND_API_KEY={RESEND_API_TOKEN}

```

## Usage
1. Start development server `npm run dev`
2. Get your prisma studio up and running using `npx prisma studio` command and visit [http://localhost:5555](http://localhost:5555) to start editing in your database. 
3. Open your Browser and visit [http://localhost:3000](http://localhost:300) to view the website

## Concepts covered

- [X]  NextJs 14 App routing
- [X]  Server Actions
- [X]  Server & Client components
- [X]  Zod schema validation

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.