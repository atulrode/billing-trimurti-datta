# Git Repository Setup Commands

After downloading the project files, use these commands to set up your Git repository:

## 1. Initialize Repository
```bash
cd your-project-folder
git init
```

## 2. Create .gitignore
```bash
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
package-lock.json

# Build outputs
/dist/
/tmp/
/out-tsc/

# IDEs
.vscode/
.idea/

# OS files
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*

# Environment
.env
.env.local
EOF
```

## 3. Add Files and Commit
```bash
# Add all files
git add .

# Initial commit
git commit -m "Initial commit: Trimurti Hardware Manager

Features:
- Modern Angular 16 application
- Inventory management system
- Customer management with credit tracking
- Billing system with GST calculations
- Sales reporting and analytics
- Responsive design with purple-blue theme
- IndexedDB for offline storage"
```

## 4. Connect to Remote Repository
```bash
# Add remote (replace with your repository URL)
git remote add origin https://github.com/yourusername/trimurti-hardware-manager.git

# Push to remote
git branch -M main
git push -u origin main
```

## 5. Future Updates
```bash
# Stage changes
git add .

# Commit changes
git commit -m "Update: Description of changes"

# Push changes
git push origin main
```

## Project Structure for Git
```
trimurti-hardware-manager/
├── src/
│   ├── app/
│   │   ├── modules/
│   │   ├── services/
│   │   └── ...
│   ├── assets/
│   └── styles.css
├── package.json
├── angular.json
├── tsconfig.json
├── README.md
└── .gitignore
```