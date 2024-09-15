# Security Audit
The objective of the code audit for SESAN was to identify potential vulnerabilities and their impacts on the specified scope, including the TK and Gatsbi projects. The audit aimed to uncover threats related to the application's design and interactions with external dependencies, analyze weaknesses in the source code and security implementation, and provide a corrective action plan to address identified vulnerabilities and guard against potential attack threats. Key stakeholders included Tania MAC-LUCKIE from GCS SESAN and Alexandra LEVRAT, Nicolas BOURRAS, and Remy FARULLI from Orange Cyberdefense, serving as the main points of contact.

## Refactoring:
### SQL Injection in Search Query:
- **Security Risk:** Vulnerability to SQL injection
- **How to Fix:**
  - Validate and escape all query parameters. Verify that user data has the expected format (e.g., a number, a date...) and reject it if not.
  - Use prepared statements to separate SQL instructions from data.
- **Additional Step:** Other calls to the vulnerable function are made. Moreover, other vulnerable functions may be present in the code. Therefore, it is recommended to conduct a complete code review, especially all interactions between the application and the database, to ensure no SQL injection persists.
- **Maintainability Step:** Rigorous monitoring of logs on servers and applications to quickly detect any exploitation attempts.

### LFI: File access vulnerability
- **Security Risk:** Ability to retrieve any file, including system files.
- **How to Fix:**
  - Restrict access to this feature as much as possible.
  - Validate the path requested by the user.
  - Add a whitelist for allowed file names.
- **Maintainability Step:** Regularly check file access.

## Evo:
### Regular Expressions May Cause Denial of Service:
- **Title:** Denial of Service by Regular Expressions
- **Security Risk:** Vulnerability causing denial of service.
- **How to Fix:**
  - Revise regular expressions to make them less complex.
  - Add maximum runtime handling.
- **Additional Step:** Conduct a complete review of the used regular expressions (more than 100).
- **Maintainability Step:** Tools like "ReDos Checker" can be used to verify that expressions are no longer vulnerable.

### Use of Obsolete MD5 Encryption Algorithm:
- **Security Risk:** Weakness of the MD5 algorithm for hashing passwords.
- **How to Fix:**
  - Replace MD5 with more secure algorithms like BCrypt.
  - Update encryption algorithms in future updates.

### Lack of Quality in Development:
- **Title:** Lack of quality in code
- **Security Risk:** Increased complexity, difficulties in maintenance, and scalability.
- **How to Fix:**
  - Link to best practices.

### Missing HTTPOnly and Secure Attributes for Session Cookies:
- **Security Risk:** Vulnerability of session cookies.
- **How to Fix:**
  - Add HTTPOnly and Secure attributes to session cookies.
  - Have a limited validity period to reduce replay risks.

### Obsoletes Libraries:
- **Security Risk:** Known and exploitable vulnerabilities.
- **How to Fix:**
  - Update all used components. 
Establish a policy for tracking software updates.

**Maintainability Step**: Establish a routine for tracking updates for components. Create a script that checks it once a month or with each push.