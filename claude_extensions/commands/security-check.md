Perform security audit on the code:

1. Check all user input handling:
   - Verify validateInput() and sanitizeInput() are used from utils/security.ts
   - Check for unvalidated form inputs
   - Look for potential XSS vulnerabilities

2. Review URL handling:
   - Ensure validateURL() is used for all external links
   - Check for unsafe URL constructions

3. Check dependencies:
   - Run npm audit
   - Review any new dependencies

4. Review data handling:
   - Check localStorage operations
   - Verify no sensitive data exposure
   - Check JSON import validation

5. Report findings with severity levels (Critical/High/Medium/Low)

If specific files/components are provided via $ARGUMENTS, focus audit on those areas.

Arguments: $ARGUMENTS
