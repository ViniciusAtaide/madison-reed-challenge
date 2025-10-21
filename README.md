# Madison Reed Image Gallery

## Challenge Reasoning
- Mise : Easy setup for new developers. I love coming to companies with a 1hour setup -> Build features pipeline.
- Nuxt : For image optimizations I wished to use NuxtImage. Also I started with the idea of route modals with the model being the view/#id of the image but I went back with the idea.
- i18n/watcher : I believe in setting up for success when it is easy. i18n was too manual before but after my last gig I learned how to build a default language script and then expand to other languages as we go with a simple google translate or AI prompt.
- uselazyFetch/useQuery - I want to avoid using global state for remote state as much as possible. That makes the context so much leaner. And also good cache key hierarchy can be so good when dealing with cache invalidations by invalidating a base cache key with recursiveness.
- zod - Avoid as much as possible building intrinsic build types and try to validate them in runtime for good sound type checking. Since zod produces good typescript inference it's a low effort to use it instead of pure types.

## Setup
Install mise for automatic language agnostic global dependencies installation
[Learn more about mise](https://mise.jdx.dev/)
```
curl https://mise.run | sh
```

Before running the project rename .env.example to .env. This will enable all environment variables to be loaded.

Automatic first setup

```bash
mise dev
```

```bash
# pnpm
pnpm install

# dev
pnpm dev
```

## Development Server

Start the development server on `http://localhost:3000`:

## Production

Build the application for production:

```bash
# pnpm
pnpm build
```

Locally preview production build:

```bash
# pnpm
pnpm preview
```