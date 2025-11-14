Prepare and execute a release for the Vibe project.

Version: $ARGUMENTS (e.g., 1.1.0)

Release checklist:

1. **Pre-Release Checks**:
   - Verify all tests pass (npm run build)
   - Run security audit (npm audit) - must be 0 vulnerabilities
   - Review recent commits since last release
   - Manual testing of critical features

2. **Update Version**:
   - Update version in package.json
   - Update version in CLAUDE.md
   - Update version in README.md

3. **Update CHANGELOG.md**:
   - Move [Unreleased] items to new version section
   - Add release date
   - Categorize changes (Added, Changed, Fixed, Security)
   - Include git commit references

4. **Create Release Commit**:
   - Commit: "chore: release v$ARGUMENTS"
   - Create git tag: v$ARGUMENTS

5. **Deploy**:
   - Push to main (triggers GitHub Actions deploy)
   - Monitor deployment success
   - Verify production: https://krisztiankoos.github.io/vibe/

6. **GitHub Release**:
   - Create GitHub release with tag
   - Copy CHANGELOG entry as release notes
   - Highlight key features/fixes

7. **Post-Release**:
   - Add [Unreleased] section back to CHANGELOG
   - Announce completion

Ask for confirmation before pushing to production.
