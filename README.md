# Strawberry Hill Accounting, Website

A complete static website. No build step required to deploy: everything in this folder is ready to upload as-is.

---

## 1. Before you go live (do these first)

### Replace the placeholder contact details
These appear on `contact.html` and in every page footer. Search and replace across all `.html` files:

| Placeholder | Replace with |
|---|---|
| `https://www.strawberryhillaccounting.com` | Your real domain |

Quick way to do all files at once on Mac/Linux:
```bash
cd town-center-advisors
sed -i '' 's|https://www.linkedin.com/|YOUR-LINKEDIN-URL|g' *.html
```

### Connect the contact form
The contact form sends through **FormSubmit** (formsubmit.co), which needs no account or key.

1. After the site is live, submit one test message through the form
2. FormSubmit emails a one-time confirmation link to atrikona@strawberryhillaccounting.com (check spam)
3. Click it. From then on every submission lands in that inbox

The `action` URL in `contact.html` uses FormSubmit's random alias instead of the raw email address, so the address is not exposed in the page source.

Alternatives that work the same way: Web3Forms, Basin, Netlify Forms (free if you host on Netlify).

### Add a social share image
Create a 1200x630px image and save it as `social-card.png` in this folder. This is what appears when someone shares a link on LinkedIn, Facebook, or text message. Without it, links share as plain text.

---

## 2. Deploying

Any static host works. Easiest options, all with free tiers:

**Netlify** (recommended), drag this entire folder onto netlify.com/drop. Live in seconds. Add your custom domain in the site settings. Netlify also handles the contact form natively if you'd rather not use Formspree: just add `netlify` as an attribute on the `<form>` tag.

**Cloudflare Pages**, connect a GitHub repo or upload directly. Free SSL, fast globally.

**Traditional web host**, upload the folder contents to your `public_html` directory via FTP. Works with GoDaddy, Bluehost, etc.

Whichever you choose, point your domain's DNS at the host and enable HTTPS (all three options above do this automatically and for free).

---

## 3. Adding a new article

Articles are the one part of the site you'll update regularly. Two options:

### Option A, copy an existing file (simplest)
1. Duplicate `article-cash-flow-vs-profit.html` and rename it, e.g. `article-hiring-first-employee.html`
2. Edit the `<h1>`, the eyebrow category, the `<p>` under the heading, and the body inside `<article class="prose">`
3. Update the `<title>`, `<meta name="description">`, and `<link rel="canonical">` at the top
4. Add a card for it on `articles.html` by copying an existing `.article-card` block
5. Add the URL to `sitemap.xml`

### Option B, regenerate from the build script
`build.py` (kept outside this folder) generates every page. Add an entry to the `ARTICLES` list and re-run `python3 build.py`. This keeps nav, footer, and metadata consistent automatically and is the better option if you'll be writing often.

### Writing structure that works
Each article body is a series of `<h2>` sections with `<p>` paragraphs. Keep sections short. The three sample articles show the pattern: a plain-language summary first, then the mechanics, then what to actually do.

---

## 4. File map

```
index.html                    Home, hero + four doorways
services.html                 Service map (12 tiles, Core + Advisory)
  service-bookkeeping.html
  service-controller.html
  service-payroll.html
  service-business-formation.html
  service-fpa.html
  service-readiness.html
  service-valuations.html
  service-multi-state.html
  service-cost-segregation.html
  service-fractional-cfo.html
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
- Deep links preselect the form: `contact.html?plan=advisory` opens with that plan chosen.
- Sitemap and robots.txt for search indexing

---

## 6. Legal review before launch

Two items worth having someone look at:

1. **Tax services are hidden for now.** Tax Preparation, Tax Planning, Tax Resolution, Multi-State Compliance, and Cost Segregation are removed from the site (the `HIDDEN` set in the page generator). Once your PTIN and credentials are in place, they can be restored, along with the PTIN line in the footer disclaimer. Confirm the wording matches Missouri requirements.
2. **The FAQ answer on IRS representation** is deliberately worded to avoid overstating your authority pre-EA. Revisit it after enrollment.

Consider adding a Privacy Policy and Terms of Use page before collecting form submissions, especially once you're running any advertising.
