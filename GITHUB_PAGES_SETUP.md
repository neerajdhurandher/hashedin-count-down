# GitHub Pages Setup Instructions

## Manual Setup (Required First Time)

You need to enable GitHub Pages in your repository settings **before** the GitHub Actions workflow can work properly.

### Steps:

1. **Go to your repository on GitHub**:
   - Navigate to: https://github.com/neerajdhurandher/hashedin-count-down

2. **Access Repository Settings**:
   - Click on "Settings" tab (near the top of the repository page)

3. **Find Pages Settings**:
   - Scroll down in the left sidebar and click "Pages"

4. **Configure Source**:
   - Under "Source", select "GitHub Actions"
   - This tells GitHub to use the workflow file instead of a branch

5. **Save Configuration**:
   - The settings should save automatically
   - You should see a message confirming GitHub Pages is enabled

## After Manual Setup

Once you complete the manual setup above, the GitHub Actions workflow will work correctly.

### Expected Workflow Behavior:
- ✅ Build job completes successfully
- ✅ Pages configuration works
- ✅ Deployment succeeds
- ✅ Site available at: https://neerajdhurandher.github.io/hashedin-count-down

### Troubleshooting:
- If you still get "Not Found" errors, make sure the repository is public
- Private repositories require GitHub Pro/Team for Pages
- Wait a few minutes after enabling Pages for the configuration to propagate

## Alternative: Repository Settings API

If you prefer, you can also enable Pages via GitHub CLI:
```bash
gh api repos/neerajdhurandher/hashedin-count-down/pages \
  --method POST \
  --field source.branch=main \
  --field source.path="/"
```

But the manual method above is more reliable for first-time setup.