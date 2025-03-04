# Git SSH Setup Guide

This guide will help you set up SSH for pushing and pulling from Git repositories without being prompted for a username and password.

## Steps to Set Up SSH for Git

### 1. **Generate an SSH Key**

If you don't have an SSH key yet, follow these steps:

1. Open a terminal or Git Bash.
2. Run the following command to generate a new SSH key pair:

   ```bash
   ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
   ```

   - Replace `your_email@example.com` with your actual email address.
   - Press **Enter** to save the key to the default file location (`~/.ssh/id_rsa`).
   - When prompted, enter a passphrase for extra security (or leave it empty).

### 2. **Add SSH Key to SSH Agent**

1. Start the SSH agent:

   ```bash
   eval "$(ssh-agent -s)"
   ```

2. Add your SSH private key to the SSH agent:

   ```bash
   ssh-add ~/.ssh/id_rsa
   ```

### 3. **Add SSH Key to GitHub**

1. Copy your SSH public key to your clipboard:

   ```bash
   cat ~/.ssh/id_rsa.pub
   ```

2. Log into your GitHub account.
3. Navigate to **Settings > SSH and GPG keys**.
4. Click **New SSH key**.
5. Paste the copied SSH key into the "Key" field.
6. Give it a descriptive name (e.g., "My Laptop SSH Key") and click **Add SSH key**.

### 4. **Update Git Remote URL to Use SSH**

If your repository is currently using HTTPS, update the remote URL to SSH.

1. Check the current remote URL of your repository:

   ```bash
   git remote -v
   ```

   This will show the URL of your repository, usually in the format `https://github.com/user/repo.git`.

2. To change the URL to SSH, run:

   ```bash
   git remote set-url origin git@github.com:user/repo.git
   ```

   Replace `user/repo.git` with your actual repository's path.

### 5. **Push Using SSH**

Now, you're ready to push to your Git repository using SSH. You will no longer be prompted for your username and password, but you may be asked for the passphrase of your SSH key (if you set one).

To push your changes:

```bash
git push origin main
```

Or for another branch:

```bash
git push origin your-branch-name
```

### Troubleshooting

- **If you're prompted for a password**: Ensure your SSH key is added correctly to your SSH agent and that it's uploaded to GitHub.
- **If you can't push or pull**: Double-check that the remote URL has been updated to SSH using `git remote -v`.

---

With this setup, you'll be able to work with GitHub repositories using SSH, avoiding the need to enter your username and password each time.
```
