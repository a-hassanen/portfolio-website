import type { AdminConfig } from './types';

// =================================================================================================
// WEBSITE CONFIGURATION
// =================================================================================================
// This is the main configuration file for your portfolio.
// Update the values below to customize your site.

/**
 * The public URL to your `portfolioData.json` file.
 * This should be the "Raw" URL from the private GitHub repository where you store your data.
 * @example "https://raw.githubusercontent.com/your-username/my-portfolio-data/main/portfolioData.json"
 */
export const PORTFOLIO_DATA_URL: string = "https://raw.githubusercontent.com/your-username/my-portfolio-data/main/portfolioData.json";


/**
 * Admin panel configuration.
 * Set the username and password for accessing the hidden admin editor.
 * IMPORTANT: While this provides a layer of protection, it's not a high-security system.
 *            Avoid using sensitive passwords.
 */
export const ADMIN_CONFIG: AdminConfig = {
  // Credentials to log into the `/admin` panel
  credentials: {
    username: "",
    password: "",
  },
  
  // GitHub repository details where your `portfolioData.json` is stored.
  // This is required for the admin panel to save your changes.
  github: {
    owner: "a-hassanen",       // Your GitHub username
    repo: "portfolio-webiste",    // The name of your PRIVATE repository
    branch: "main",               // The branch where your data is stored
  },
};
