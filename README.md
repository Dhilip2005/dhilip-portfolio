# Dhilip Kumar — Engineering Portfolio

A multi-page React portfolio for electrical and electronics engineering work. The interface uses React Router, Framer Motion, a React Three Fiber hero illustration, and a lightweight shared canvas particle field. Portfolio text and links are maintained in one configuration module.

## Requirements

- Node.js 20 or newer
- npm

## Run locally

1. Install dependencies:

   ```sh
   npm install
   ```

2. Copy `.env.example` to `.env`. Configure the SMTP and contact values to enable real email delivery. Until configured, the contact API responds with an explicit service-not-configured message.

3. Start the Vite client and Express API:

   ```sh
   npm run dev
   ```

   Open `http://localhost:5173`. The client proxies `/api` requests to the Express server on port 3001.

## Personalize before publishing

Update `client/src/data.js`:

- Add verified profile URLs, email, and location. The current GitHub, LinkedIn, LeetCode, and portfolio source repository URLs are configured there.
- Replace education timing only when confirmed.
- Add the resume PDF under `client/public/resume/` and set `profile.resumeUrl` to its public path.
- Add confirmed contribution details, repository/demo links, and achievement documentation before claiming them.
- Coding statistics are intentionally omitted; only add manually verified values or a supported integration.

The supplied portrait and conference presentation certificate are in `client/public/images/`. Update `profile.portraitUrl` and the certificate entry in `achievements` when replacing either asset or changing its details. The certificate records a paper presentation at the 18th International Conference on Science & Innovative Engineering on 11–12 October 2026.

## Contact email setup

The backend validates field types and lengths, checks the email format, applies a per-IP rate limit, includes a honeypot field, and sends mail only when SMTP settings are present. Set `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_TO`, and `CONTACT_FROM` in `.env`. Use a sender address authorized by the configured mail provider. Do not commit `.env`.

The API deliberately does not require MongoDB: project and profile content is static configuration and is better edited with the source until a content-management workflow is needed.

`npm audit --omit=dev` reports no production vulnerabilities. The current registry still flags a high-severity `picomatch` advisory inherited by Vite's development toolchain; keep the Vite server local and do not expose it publicly. This toolchain is not included in the production client bundle.

## Build and deployment

The project is configured as one Render Node web service: Express serves both the Vite production build and the contact API, so client-side routes and `/api` share one HTTPS origin. `render.yaml` points to `https://github.com/Dhilip2005/dhilip-portfolio`, targets the `main` branch, and configures the Node runtime, build/start commands, health check, and automatic deploys on pushes.

The GitHub publication intentionally excludes video files at the owner's request. VoltGuard's image gallery remains available; add videos later through an external media host and update `client/src/portfolioAssets.js` if video playback should be restored.

1. The source workspace must be connected to the existing repository. The repository URL is verified, but if the repository has no source files yet, push the complete project (excluding ignored files and secrets) to its `main` branch first.
2. In Render, create a **Blueprint** and connect `Dhilip2005/dhilip-portfolio`. Review `render.yaml` and deploy the `dhilip-kumar-portfolio` service. The expected service origin is `https://dhilip-kumar-portfolio.onrender.com`; use the actual assigned origin if Render reports a name conflict, and update `CLIENT_ORIGIN`, `client/public/robots.txt`, and `client/public/sitemap.xml` accordingly.
3. Configure the `SMTP_*`, `CONTACT_TO`, and `CONTACT_FROM` values in Render's environment settings to enable contact-form delivery. Keep `SMTP_PASS` in the provider's secret environment settings only; never commit `.env` or credentials.
4. Verify `/api/health`, a direct refresh of `/projects/voltguard`, the resume download, and the contact form after deployment. The resume PDF is a public asset by design.

Render's free web-service plan may spin down after inactivity. The service URL and auto-deploy configuration remain stable, but the first request after idle can be delayed. Choose a paid plan only if always-on response time is required; no paid plan or domain is purchased by this project.

For future updates, edit the centralized content in `client/src/data.js` and asset paths in `client/src/portfolioAssets.js`, test with `npm run build`, then push to the connected default branch. Render builds and deploys automatically. Project repository links should only be added after confirming the repository exists.

To use a custom domain later, add a domain you own under the Render service's **Settings → Custom Domains**, then copy the DNS records Render provides into your domain registrar. Render provisions HTTPS after DNS verification. Update `CLIENT_ORIGIN`, `client/public/robots.txt`, and `client/public/sitemap.xml` to match the verified domain. Check domain availability and pricing with a registrar yourself; this project does not purchase domains.

## Accessibility and performance

The site includes a keyboard skip link, semantic page landmarks, reduced-motion handling, mobile navigation, responsive layouts, and a low-count canvas particle field. The 3D hero uses procedural geometry and avoids external model downloads. Press **Ctrl + K** to open the engineering terminal easter egg.
