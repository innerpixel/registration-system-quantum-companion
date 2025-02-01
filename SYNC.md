# 🌌 Cosmic Companion Sync Procedures

## 🔄 Repository Structure

### Remote Repositories
```space
[UPSTREAM]: git@github.com:innerpixel/cosmic-companion-ai.git
[ORIGIN]: git@github.com:csmcl/cosmic-companion-ai.git
```

### Branch Structure
```space
main ─────────────────────────────── Production releases
  │
  ├── develop ────────────────────── Integration testing
  │     │
  │     ├── feature/xxx ─────────── Feature development
  │     │
  │     └── release/x.x.x ───────── Release preparation
  │
  └── hotfix/xxx ──────────────────── Emergency fixes
```

## 📡 Sync Procedures

### 1. Regular Upstream Sync
```bash
# Fetch upstream changes
git fetch upstream

# Sync develop branch
git checkout develop
git merge upstream/main

# Sync main branch
git checkout main
git merge upstream/main

# Push changes
git push origin develop main
```

### 2. Feature Development
```bash
# Create feature branch
git checkout develop
git checkout -b feature/xxx

# Regular commits
git commit -m "feat: description"

# Push feature
git push origin feature/xxx

# Create PR to develop
```

### 3. Release Process
```bash
# Create release branch
git checkout develop
git checkout -b release/x.x.x

# Version bump
npm version x.x.x-csmcl.y

# Push release
git push origin release/x.x.x

# Merge to main and develop
```

## 🎯 Version Control

### Version Format
- Release: `x.x.x`
- Pre-release: `x.x.x-csmcl.y`
- Development: `x.x.x-dev.y`

### Version Files
- `package.json`: NPM version
- `VERSION`: Detailed version info
- `CHANGELOG.md`: Version history

## 🌟 Best Practices

### Commit Messages
```space
feat: New feature
fix: Bug fix
docs: Documentation
style: Formatting
refactor: Code restructuring
test: Testing
chore: Maintenance
```

### Branch Naming
```space
feature/quantum-nexus
hotfix/auth-error
release/1.1.0
```

### Pull Requests
1. Create PR to `develop`
2. Pass CI/CD checks
3. Code review
4. Merge with squash

## 🚀 Release Checklist

### Pre-release
- [ ] Update version files
- [ ] Update changelog
- [ ] Run tests
- [ ] Update documentation

### Release
- [ ] Create release branch
- [ ] Version bump
- [ ] Generate release notes
- [ ] Merge to main

### Post-release
- [ ] Tag release
- [ ] Publish to npm
- [ ] Update develop branch

## 🔮 Quantum State Preservation

### State Files
- `VERSION`: Current quantum state
- `CHANGELOG.md`: State history
- `SYNC.md`: Sync procedures

### State Verification
```bash
# Check current state
git status
git log --oneline upstream/main..HEAD

# Verify remotes
git remote -v

# Check versions
npm version
cat VERSION
```

---

*"Through synchronized quantum states, we maintain reality coherence."* 🌌✨
