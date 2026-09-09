# Strawberry Hill Accounting — Website

A complete static website. No build step required to deploy: everything in this folder is ready to upload as-is.

---

## 1. Before you go live (do these first)

### Replace the placeholder contact details
These appear on `contact.html` and in every page footer. Search and replace across all `.html` files:

| Placeholder | Replace with |
|---|---|
| `hello@strawberryhillaccounting.com` | Your real email |
| `(816) 555-0142` | Your real phone number |
| `https://www.strawberryhillaccounting.com` | Your real domain |

Quick way to do all files at once on Mac/Linux:
```bash
cd town-center-advisors
sed -i '' 's/(816) 555-0142/YOUR-REAL-NUMBER/g' *.html
```

### Connect the contact form
The form is built and styled but needs an endpoint to actually deliver submissions to you.

1. Create a free account at **formspree.io**
2. Create a new form; it gives you an ID like `xyzabcde`
3. In `contact.html`, find `action="https://formspree.io/f/YOUR_FORM_ID"` and swap in your ID

Until you do this, the form shows the confirmation message but does not send anything. That is intentional so the site doesn't silently lose leads before it's wired up.

Alternatives to Formspree that work the same way: Basin, Web3Forms, Netlify Forms (free if you host on Netlify).

### Add a social share image
Create a 1200x630px image and save it as `social-card.png` in this folder. This is what appears when someone shares a link on LinkedIn, Facebook, or text message. Without it, links share as plain text.

---

## 2. Deploying

Any static host works. Easiest options, all with free tiers:

**Netlify** (recommended) — drag this entire folder onto netlify.com/drop. Live in seconds. Add your custom domain in the site settings. Netlify also handles the contact form natively if you'd rather not use Formspree: just add `netlify` as an attribute on the `<form>` tag.

**Cloudflare Pages** — connect a GitHub repo or upload directly. Free SSL, fast globally.

**Traditional web host** — upload the folder contents to your `public_html` directory via FTP. Works with GoDaddy, Bluehost, etc.

Whichever you choose, point your domain's DNS at the host and enable HTTPS (all three options above do this automatically and for free).

---

## 3. Adding a new article

Articles are the one part of the site you'll update regularly. Two options:

### Option A — copy an existing file (simplest)
1. Duplicate `article-cash-flow-vs-profit.html` and rename it, e.g. `article-hiring-first-employee.html`
2. Edit the `<h1>`, the eyebrow category, the `<p>` under the heading, and the body inside `<article class="prose">`
3. Update the `<title>`, `<meta name="description">`, and `<link rel="canonical">` at the top
4. Add a card for it on `articles.html` by copying an existing `.article-card` block
5. Add the URL to `sitemap.xml`

### Option B — regenerate from the build script
`build.py` (kept outside this folder) generates every page. Add an entry to the `ARTICLES` list and re-run `python3 build.py`. This keeps nav, footer, and metadata consistent automatically and is the better option if you'll be writing often.

### Writing structure that works
Each article body is a series of `<h2>` sections with `<p>` paragraphs. Keep sections short. The three sample articles show the pattern: a plain-language summary first, then the mechanics, then what to actually do.

---

## 4. File map

```
index.html                    Home — hero + four doorways
services.html                 Service map (12 tiles, Core + Advisory)
  service-tax-preparation.html
  service-tax-planning.html
  service-bookkeeping.html
  service-payroll.html
  service-business-formation.html
  service-tax-resolution.html
  service-fpa.html
  service-readiness.html
  service-valuations.html
  service-multi-state.html
  service-cost-segregation.html
  service-fractional-cfo.html
plans.html                    Membership tiers + project work
about.html                    Who we are, who we serve, why it matters
articles.html                 Article index
  article-cash-flow-vs-profit.html
  article-s-corp-election.html
  article-reading-your-pl.html
faq.html                      16 questions in four groups
contact.html                  Interest form
404.html                      Not-found page
style.css                     All styling, single file
favicon.svg                   Browser tab icon
sitemap.xml                   For search engines
robots.txt                    For search engines
```

Every service page follows the identical four-part template: **What it is → Who it's for → What's included → Where it fits**. Keep that consistent if you add more.

---

## 5. Things already handled

- Mobile responsive down to phone width
- Keyboard navigation with visible focus states
- Skip-to-content link for screen readers
- Reduced-motion preference respected
- SEO metadata, canonical URLs, Open Graph and Twitter cards on every page
- Deep links preselect the form: `contact.html?plan=advisory` opens with that plan chosen. The plan buttons already use this.
- Sitemap and robots.txt for search indexing

---

## 6. Legal review before launch

Two items worth having someone look at:

1. **The footer disclaimer** currently references PTIN-based federal tax preparation. Update the language once your EA credential is active, and confirm it matches Missouri requirements.
2. **The FAQ answer on IRS representation** is deliberately worded to avoid overstating your authority pre-EA. Revisit it after enrollment.

Consider adding a Privacy Policy and Terms of Use page before collecting form submissions, especially once you're running any advertising.
