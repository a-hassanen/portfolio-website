# Dynamic Personal Portfolio

A modern, data-driven personal portfolio website built with React and Tailwind CSS. This portfolio is designed to be managed from a hidden admin panel, with its data stored securely in a separate, private GitHub repository.

## Architecture Overview

This portfolio uses a unique "GitHub as a Database" approach:

1.  **Public Code Repository**: This repository contains the React application code. It is public so it can be deployed to GitHub Pages.
2.  **Private Data Repository**: You will create a separate, **private** GitHub repository to store a single `portfolioData.json` file. This keeps your personal information and content secure and separate from the public code.
3.  **Dynamic Fetching**: The live website fetches the `portfolioData.json` from your private repository to display your portfolio.
4.  **Admin Panel**: A hidden admin page (`/admin`) allows you to log in, load the data from your private repository, edit it in a user-friendly interface, and save it back.

## Setup Instructions

Follow these steps carefully to get your portfolio running.

### Step 1: Create a Private Data Repository

1.  Create a new **private** repository on GitHub. You can name it something like `my-portfolio-data`.
2.  In this new repository, create a new file named `portfolioData.json`.
3.  Copy the contents of the `data/portfolioData.json` file from *this* project and paste it into your new `portfolioData.json` file.
4.  Customize the content with your own information and commit the file.

### Step 2: Generate a GitHub Personal Access Token (PAT)

The admin panel needs a PAT to securely access and modify your private data repository.

1.  Go to your GitHub **Settings** > **Developer settings** > **Personal access tokens** > **Tokens (classic)**.
2.  Click **Generate new token (classic)**.
3.  Give it a **Note** (e.g., "Portfolio Admin").
4.  Set an **Expiration** date (e.g., 90 days).
5.  Under **Select scopes**, check the box for `repo`. This grants full control of private repositories.
6.  Click **Generate token**.
7.  **IMPORTANT**: Copy the token immediately. You will not be able to see it again.

### Step 3: Configure The Project

Open the `config.ts` file in this project and update the following variables:

1.  **`PORTFOLIO_DATA_URL`**:
    *   Go to the `portfolioData.json` file in your **private** repository.
    *   Click the "Raw" button.
    *   Copy the URL from your browser's address bar. This is your raw content URL.
    *   Paste this URL as the value for `PORTFOLIO_DATA_URL`.

2.  **`ADMIN_CONFIG`**:
    *   Set a `username` and `password` for your admin panel. **Change the default password!**
    *   Under `github`, fill in your GitHub `owner` (username) and the `repo` name of your private data repository.

### Step 4: Deploy to GitHub Pages

1.  Push your configured project code to your public GitHub repository.
2.  In your repository settings, go to **Settings > Pages**.
3.  Under "Build and deployment", for the **Source**, select **GitHub Actions**.

The included GitHub Action will automatically deploy your site. Your portfolio URL will be something like: `https://<your-username>.github.io/<your-repository-name>/`.

## How to Update Your Portfolio Content

1.  Navigate to `https://<your-username>.github.io/<your-repository-name>/admin`.
2.  Log in using the username and password you set in `config.ts`.
3.  Enter your **GitHub Personal Access Token** into the configuration field.
4.  Click **Load Portfolio Data**.
5.  Your portfolio content will appear in the editor. Make your desired changes.
6.  Click **Save All Changes**.

Your changes are now saved to your private repository. It may take a minute or two for the changes to appear on your live website due to caching.
