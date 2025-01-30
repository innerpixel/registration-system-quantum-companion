# Cosmic Companion Management Guide

## 📦 Installation Methods

### 1. As a Git Submodule (Recommended for Development)
```bash
# Add the submodule
git submodule add https://github.com/innerpixel/cosmic-companion-ai.git frontend/cosmic-companion-ai

# Initialize and update
git submodule update --init --recursive
```

### 2. As an NPM Package (Recommended for Production)
```bash
# Install from npm
npm install cosmic-companion-ai

# Or with specific version
npm install cosmic-companion-ai@1.1.0
```

## 🔄 Updating the Companion

### Submodule Updates
```bash
# Update to latest version
cd frontend/cosmic-companion-ai
git fetch origin
git checkout main
git pull

# Update parent project
cd ../..
git add frontend/cosmic-companion-ai
git commit -m "chore: Update cosmic companion to latest version"
```

### NPM Package Updates
```bash
# Check for updates
npm outdated cosmic-companion-ai

# Update to latest version
npm update cosmic-companion-ai

# Or update to specific version
npm install cosmic-companion-ai@1.1.0
```

## 🔍 Version Management

### Check Current Version
```bash
# For npm package
npm list cosmic-companion-ai

# For submodule
cd frontend/cosmic-companion-ai
git describe --tags
```

### Lock to Specific Version
```bash
# Using npm
npm install cosmic-companion-ai@1.1.0

# Using git submodule
cd frontend/cosmic-companion-ai
git checkout v1.1.0
cd ../..
git add frontend/cosmic-companion-ai
git commit -m "chore: Pin cosmic companion to v1.1.0"
```

## 🛠️ Best Practices

### 1. Version Control
- Always specify version in `package.json`
- Use semantic versioning (e.g., `^1.1.0` for minor updates)
- Document version changes in your project's changelog

### 2. Development Workflow
```bash
# Create a feature branch
git checkout -b feature/update-companion

# Update companion
cd frontend/cosmic-companion-ai
git pull origin main

# Test integration
cd ../..
npm run test
npm run dev

# Commit changes
git add frontend/cosmic-companion-ai
git commit -m "chore: Update companion with latest features"
```

### 3. Production Deployment
- Lock version number in `package.json`
- Run full test suite after updates
- Update documentation with new features
- Create deployment notes

## 🚨 Troubleshooting

### Common Issues

1. **Submodule Out of Sync**
```bash
# Reset submodule
git submodule update --init --recursive
```

2. **Version Conflicts**
```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules
npm install
```

3. **Store Initialization**
```javascript
// Ensure proper store initialization
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useQuantumNexusStore } from 'cosmic-companion-ai'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)

// Initialize stores after pinia setup
const quantumStore = useQuantumNexusStore()
```

## 📋 Update Checklist

Before updating in production:
1. ✅ Review changelog for breaking changes
2. ✅ Test in development environment
3. ✅ Update related documentation
4. ✅ Run full test suite
5. ✅ Create backup/rollback plan
6. ✅ Update deployment scripts
7. ✅ Monitor initial deployment

## 🔄 Regular Maintenance

### Weekly Tasks
- Check for security updates
- Review error logs
- Test quantum metrics

### Monthly Tasks
- Review version compatibility
- Update documentation
- Performance testing
- User feedback review

## 📊 Monitoring

### Key Metrics to Watch
- Quantum coherence levels
- Store initialization time
- Component render performance
- Error rates
- User interaction metrics

### Health Checks
```javascript
// Add to your monitoring system
import { useQuantumNexusStore } from 'cosmic-companion-ai'

const monitorCompanionHealth = async () => {
  const store = useQuantumNexusStore()
  const stats = store.nexusStats
  
  return {
    coherence: stats.coherence,
    entanglement: stats.entanglement,
    nodeStatus: stats.nodeStatus,
    lastUpdate: new Date()
  }
}
```
