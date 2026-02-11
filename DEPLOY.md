# Deploy Mememator to GitHub + Vercel

## 1. Add the project to GitHub

### Create a new repository on GitHub

1. Go to [github.com](https://github.com) and sign in.
2. Click **+** (top right) → **New repository**.
3. Set:
   - **Repository name:** e.g. `mememator-app` (or any name you like).
   - **Visibility:** Public (so you can share the link).
   - Leave **Add a README** unchecked (you already have a project).
4. Click **Create repository**.

### Push your code from your machine

In a terminal, from your project folder (`mememator-app`):

```bash
# If you haven't initialized git yet
git init

# Add GitHub as remote (replace YOUR_USERNAME and YOUR_REPO with your GitHub username and repo name)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Stage and commit everything (if you haven't already)
git add .
git commit -m "Initial commit: Mememator meme-to-market app"

# Push to GitHub (use main or master depending on your default branch)
git branch -M main
git push -u origin main
```

If the repo already had a remote and commits, you can just:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

---

## 2. Deploy on Vercel and share the link

### Connect GitHub to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in (use **Continue with GitHub**).
2. Click **Add New…** → **Project**.
3. **Import** the repository you just pushed (e.g. `mememator-app`).
4. Vercel will detect **Next.js** automatically. Leave the defaults:
   - **Framework Preset:** Next.js
   - **Root Directory:** ./
   - **Build Command:** `next build`
   - **Output Directory:** (default)
5. Click **Deploy**.

### Get your live link

- When the build finishes, Vercel gives you a URL like:  
  `https://mememator-app-xxxx.vercel.app`
- You can share this link; every push to `main` will trigger a new deployment.

### Optional: custom domain

- In the Vercel project: **Settings** → **Domains** → add your own domain and follow the DNS steps.

---

## Quick checklist

- [ ] Create a new GitHub repo (no README).
- [ ] Run `git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git`.
- [ ] Run `git push -u origin main`.
- [ ] Sign in at vercel.com with GitHub.
- [ ] Import the repo and deploy.
- [ ] Share the Vercel URL.

No env vars or build tweaks are required for this app unless you add APIs later.
