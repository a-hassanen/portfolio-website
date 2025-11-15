import React, { useState, useEffect } from 'react';
import type { PortfolioData } from './types';
import Portfolio from './components/Portfolio';
import Admin from './components/Admin';
import { PORTFOLIO_DATA_URL } from './config';

const App: React.FC = () => {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    // Simple routing based on URL path
    if (window.location.pathname.startsWith('/admin')) {
      setIsAdmin(true);
      setLoading(false);
    } else {
      setIsAdmin(false);
      fetchPortfolioData();
    }
  }, []);

  const fetchPortfolioData = async () => {
    // Add a check for the placeholder URL to provide a more helpful error message.
    if (PORTFOLIO_DATA_URL.includes("your-username/my-portfolio-data")) {
      setError("Configuration Error: The portfolio data URL is still set to the default placeholder. Please update `PORTFOLIO_DATA_URL` in `config.ts` with the raw URL of your `portfolioData.json` file from your private GitHub repository. See the README.md for instructions.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(PORTFOLIO_DATA_URL);
      if (!response.ok) {
        // Include status code and text for more detailed error logging.
        throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}. Please ensure the PORTFOLIO_DATA_URL in config.ts is correct.`);
      }
      const jsonData: PortfolioData = await response.json();
      setData(jsonData);
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="text-accent text-2xl">Loading Portfolio...</div>
      </div>
    );
  }

  if (isAdmin) {
    return <Admin />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center p-8">
        <div className="bg-secondary p-8 rounded-lg shadow-2xl text-center">
          <h1 className="text-2xl font-bold text-red-400 mb-4">Error</h1>
          <p className="text-medium">{error}</p>
          <p className="text-medium mt-4 text-sm">Please check the console for more details and verify your configuration in `config.ts`.</p>
        </div>
      </div>
    );
  }

  if (data) {
    return <Portfolio data={data} />;
  }
  
  return null; // Should not be reached
};

export default App;