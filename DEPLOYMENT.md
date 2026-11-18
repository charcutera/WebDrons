# Deploy and configure quote submissions

The quote form uses a Vercel serverless function to store submissions in Supabase and send an email notification with Resend. The Supabase service-role key and Resend API key must only be configured as server-side environment variables in Vercel.

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
   - `QUOTE_RECIPIENT_EMAIL` (`ingridlaragob@gmail.com`)
3. Deploy. `vercel.json` builds the Vite site at the domain root and rewrites the app's client-side routes to `index.html`.
4. Submit a test quote and verify that it appears in the Supabase table and arrives at the recipient email.

Do not commit real credentials or paste them into source files or chat. The existing GitHub Pages site remains unchanged until its domain or publishing configuration is deliberately switched to Vercel.

Because quote submissions contain personal data, publish an appropriate privacy notice and define a retention/deletion period before collecting real customer submissions.
