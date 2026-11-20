# Deploy the demo site and configure quote submissions

## Publish a client demo on GitHub Pages

The `Deploy GitHub Pages` workflow builds the site and publishes it when changes are pushed to `main`.

1. Push the repository to GitHub.
2. In the repository settings, open **Pages** and set the build and deployment source to **GitHub Actions**.
3. Wait for the `Deploy GitHub Pages` workflow to finish, then open the Pages URL shown in the workflow.

The Pages build includes a `404.html` fallback so routes such as `/WebDrons/presupuesto` and `/WebDrons/productos` still open when loaded directly or refreshed. In this static demo, completing the final form step only shows a demo confirmation; it does not send or store a real submission.

## Send and store real quote submissions

For real submissions, deploy the project to Vercel. Its serverless function stores submitted data in Supabase and sends an email notification with Resend. The Supabase service-role key and Resend API key must only be configured as server-side environment variables in Vercel.

## Configure Supabase

1. Create a Supabase project.
2. Run `supabase/migrations/20261118120000_create_quote_submissions.sql` in the Supabase SQL Editor.
3. Copy the project URL and the service-role key from the Supabase project settings.

The table has row-level security enabled and grants no access to anonymous or authenticated browser clients. Submissions are written by the serverless function using the service-role key.

## Configure Resend

1. Create a Resend account and verify a sender domain.
2. Create an API key.
3. Use a sender address on the verified domain for `QUOTE_FROM_EMAIL`.

## Deploy to Vercel

1. Import this GitHub repository into Vercel and select the repository root as the project root.
2. Add these environment variables for the Production environment (and Preview if needed):
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `RESEND_API_KEY`
   - `QUOTE_FROM_EMAIL`
   - `QUOTE_RECIPIENT_EMAIL` (`info@segurosdron.es`)
3. Deploy. `vercel.json` builds the Vite site at the domain root and rewrites the app's client-side routes to `index.html`.
4. Submit a test quote and verify that it appears in the Supabase table and arrives at the recipient email.

Do not commit real credentials or paste them into source files or chat. GitHub Pages remains a static demo and cannot run the email/database API.

Because quote submissions contain personal data, publish an appropriate privacy notice and define a retention/deletion period before collecting real customer submissions.
