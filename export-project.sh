#!/bin/bash

# Export script for Trimurti Hardware Manager
echo "=== Trimurti Hardware Manager - Project Export ==="
echo "Preparing files for Git repository transfer..."

# Create export directory
mkdir -p project-export

# Copy all source files
echo "Copying source files..."
cp -r src/ project-export/
cp -r node_modules/@types project-export/types 2>/dev/null || true

# Copy configuration files
echo "Copying configuration files..."
cp package.json project-export/
cp angular.json project-export/
cp tsconfig.json project-export/
cp tsconfig.app.json project-export/
cp tsconfig.spec.json project-export/
cp .editorconfig project-export/

# Create README with setup instructions
cat > project-export/README.md << 'EOF'
# Trimurti Hardware Manager

A modern Angular-based hardware store management system with inventory, billing, customer management, and reporting features.

## Features

- 📊 **Dashboard**: Overview of sales, inventory, and key metrics
- 📦 **Inventory Management**: Track stock levels, categories, and suppliers
- 👥 **Customer Management**: Manage customer information and credit balances
- 🧾 **Billing System**: Create invoices with GST calculations
- 📈 **Reports**: Sales analytics and business insights
- 💾 **Offline Storage**: Uses IndexedDB for local data persistence

## Tech Stack

- Angular 16
- TypeScript
- Bootstrap 5
- FontAwesome Icons
- Dexie.js (IndexedDB wrapper)
- Animate.css

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Development Server**
   ```bash
   ng serve
   ```
   Navigate to `http://localhost:4200`

3. **Build for Production**
   ```bash
   ng build --prod
   ```

## Project Structure

```
src/
├── app/
│   ├── modules/
│   │   ├── dashboard/     # Dashboard and home components
│   │   ├── inventory/     # Stock management
│   │   ├── customers/     # Customer management
│   │   ├── billing/       # Invoice creation and history
│   │   └── reports/       # Sales reports and analytics
│   ├── services/          # Data services and database
│   └── styles.css         # Global styles
├── assets/                # Static assets
└── index.html            # Main HTML file
```

## Database Schema

The application uses IndexedDB with the following tables:
- `inventory` - Product stock information
- `customers` - Customer details and credit balances
- `bills` - Invoice records and line items

## Styling

The application features a modern design with:
- Purple-blue gradient theme
- Glass morphism effects
- Responsive design for mobile and desktop
- Smooth animations and transitions
- Professional typography and spacing

## License

Private project for Trimurti Hardware Store.
EOF

# Create Git setup script
cat > project-export/setup-git.sh << 'EOF'
#!/bin/bash

echo "Setting up Git repository for Trimurti Hardware Manager..."

# Initialize git repository
git init

# Create .gitignore
cat > .gitignore << 'GITIGNORE'
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDEs and editors
.vscode/
.idea/
*.swp
*.swo

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Angular
/dist/
/tmp/
/out-tsc/
/bazel-out/

# Logs
logs
*.log

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
*.lcov

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Build outputs
*.tgz
*.tar.gz
GITIGNORE

# Add all files
git add .

# Initial commit
git commit -m "Initial commit: Trimurti Hardware Manager

- Complete Angular 16 application
- Modern responsive design with purple-blue theme
- Inventory management system
- Customer management with credit tracking
- Billing system with GST calculations
- Sales reporting and analytics
- IndexedDB for offline data storage
- Bootstrap 5 and FontAwesome integration"

echo "Git repository initialized successfully!"
echo "Next steps:"
echo "1. Add remote repository: git remote add origin <your-repo-url>"
echo "2. Push to remote: git push -u origin main"
EOF

chmod +x project-export/setup-git.sh

echo "✅ Project exported to 'project-export' directory"
echo "📁 Files ready for Git repository transfer"
echo ""
echo "Next steps:"
echo "1. Copy the 'project-export' folder to your local machine"
echo "2. Run: cd project-export && ./setup-git.sh"
echo "3. Add your remote repository and push"