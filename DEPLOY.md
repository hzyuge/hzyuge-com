# Deploy hzyuge.com Blog to GitHub Pages

## Step 1: Create GitHub Repository

```bash
# Go to https://github.com/new
# Repository name: hzyuge-com
# Visibility: Public (required for free GitHub Pages)
# Do NOT initialize with README
```

## Step 2: Push Your Blog to GitHub

```bash
cd blog
git init
git add .
git commit -m "Initial commit - HZYUGE cycling blog"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/hzyuge-com.git
git push -u origin main
```

## Step 3: Enable GitHub Pages

1. Go to `https://github.com/YOUR_USERNAME/hzyuge-com/settings/pages`
2. Under "Source" select "GitHub Actions"
3. Done! Your site will be live at `https://YOUR_USERNAME.github.io/hzyuge-com/`

## Step 4: Set Up Custom Domain (hzyuge.com)

1. Go to your domain registrar (where you bought hzyuge.com)
2. Add these DNS records:

| Type | Name | Value |
|------|------|-------|
| A    | @    | 185.199.108.153 |
| A    | @    | 185.199.109.153 |
| A    | @    | 185.199.110.153 |
| A    | @    | 185.199.111.153 |
| CNAME | www | YOUR_USERNAME.github.io |

3. In GitHub repo Settings > Pages, enter `hzyuge.com` as custom domain
4. Wait 10-30 minutes for DNS propagation

## Step 5: Before Going Live — Replace These Placeholders

✅ **Already done!** The following have been replaced with your actual IDs:

| Placeholder | Replaced with |
|-------------|---------------|
| `ca-pub-REPLACE_WITH_YOUR_ID` | `ca-pub-2958320523040643` ✅ |
| `REPLACE_WITH_YOUR_SLOT` | `6909660918` ✅ |
| `hzyuge-20` | `hzyuge-20` ✅ (already correct) |

No further action needed — AdSense and Amazon tags are live!

## Step 6: Verify Everything Works

1. Visit your site
2. Check that articles load with images
3. Verify Amazon links have `tag=hzyuge-20`
4. Wait 24h for AdSense to approve your site
