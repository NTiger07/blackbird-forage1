# NEW
npx create-react-app task1
git init
git status
git add -A
git status
git commit -m "Initial commit"
git remote add origin https://github.com/NTiger07/blackbird-forage1.git
git push origin master

git checkout -b update_logo
git push -u origin update_logo

gh pr create --title "Update Logo" --body "Updating logo and link"
gh pr merge

# REPO_URL https://github.com/NTiger07/blackbird-forage1
