import React, { useState } from 'react';
import { ADMIN_CONFIG } from '../config';
import type { PortfolioData } from '../types';

// Helper for GitHub API requests
const githubApiRequest = async (token: string, method: string, path: string, body?: object) => {
    const response = await fetch(`https://api.github.com/repos/${ADMIN_CONFIG.github.owner}/${ADMIN_CONFIG.github.repo}/${path}`, {
        method,
        headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json',
        },
        body: body ? JSON.stringify(body) : undefined,
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'GitHub API request failed');
    }
    return response.json();
};


const Admin: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const [pat, setPat] = useState('');
  const [data, setData] = useState<PortfolioData | null>(null);
  const [fileSha, setFileSha] = useState<string | null>(null);
  const [status, setStatus] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_CONFIG.credentials.username && password === ADMIN_CONFIG.credentials.password) {
      setLoggedIn(true);
      setError('');
    } else {
      setError('Invalid username or password.');
    }
  };
  
  const handleLoadData = async () => {
    if (!pat) {
      setStatus('Please enter a Personal Access Token.');
      return;
    }
    setStatus('Loading data...');
    try {
      const fileData = await githubApiRequest(pat, 'GET', `contents/portfolioData.json?ref=${ADMIN_CONFIG.github.branch}`);
      const content = atob(fileData.content);
      setData(JSON.parse(content));
      setFileSha(fileData.sha);
      setStatus('Data loaded successfully.');
    } catch (e: any) {
      setStatus(`Error loading data: ${e.message}`);
      console.error(e);
    }
  };

  const handleSaveData = async () => {
      if (!pat || !data || !fileSha) {
          setStatus('Data not loaded or PAT missing.');
          return;
      }
      setStatus('Saving data...');
      try {
          const content = btoa(JSON.stringify(data, null, 2));
          await githubApiRequest(pat, 'PUT', 'contents/portfolioData.json', {
              message: 'Update portfolio data via admin panel',
              content: content,
              sha: fileSha,
              branch: ADMIN_CONFIG.github.branch,
          });
          setStatus('Data saved successfully! It may take a minute for your live site to update.');
          // Refresh SHA for next save
          handleLoadData();
      } catch (e: any) {
          setStatus(`Error saving data: ${e.message}`);
          console.error(e);
      }
  };
  
  const handleDataChange = (section: keyof PortfolioData, value: any) => {
    if (data) {
        setData({ ...data, [section]: value });
    }
  };

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <form onSubmit={handleLogin} className="bg-secondary p-8 rounded-lg shadow-2xl w-full max-w-sm">
          <h1 className="text-2xl font-bold text-light mb-6 text-center">Admin Login</h1>
          <div className="mb-4">
            <label className="block text-medium mb-2" htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-primary text-light px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <div className="mb-6">
            <label className="block text-medium mb-2" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-primary text-light px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}
          <button type="submit" className="w-full bg-accent text-primary font-bold py-2 px-4 rounded-lg hover:bg-opacity-80 transition duration-300">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-light mb-6">Portfolio Admin Panel</h1>
        
        <div className="bg-secondary p-6 rounded-lg shadow-xl mb-8">
            <h2 className="text-xl font-semibold text-accent mb-4">Configuration</h2>
            <div className="mb-4">
              <label className="block text-medium mb-2" htmlFor="pat">GitHub Personal Access Token (PAT)</label>
              <input
                id="pat"
                type="password"
                value={pat}
                onChange={(e) => setPat(e.target.value)}
                placeholder="Enter token with 'repo' scope"
                className="w-full bg-primary text-light px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <button onClick={handleLoadData} className="bg-accent text-primary font-bold py-2 px-4 rounded-lg hover:bg-opacity-80 transition duration-300">
              Load Portfolio Data
            </button>
        </div>

        {status && <p className="bg-secondary p-4 rounded-lg my-4 text-center text-light">{status}</p>}

        {data && (
            <div className="space-y-8">
                <div className="bg-secondary p-6 rounded-lg shadow-xl">
                    <h2 className="text-xl font-semibold text-accent mb-4">About Section</h2>
                    <textarea
                        value={data.about}
                        onChange={(e) => handleDataChange('about', e.target.value)}
                        rows={5}
                        className="w-full bg-primary text-light px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                </div>

                 {/* Add more form fields for other sections: profile, experience, projects, etc. */}
                 {/* This is a simplified example. A full implementation would have forms for each section. */}
                 <div className="bg-secondary p-6 rounded-lg shadow-xl">
                    <h2 className="text-xl font-semibold text-accent mb-4">Raw JSON Editor</h2>
                    <p className="text-medium text-sm mb-2">For complex edits, you can modify the raw JSON data below.</p>
                     <textarea
                        value={JSON.stringify(data, null, 2)}
                        onChange={(e) => {
                            try {
                                handleDataChange(null, JSON.parse(e.target.value))
                            } catch (err) {
                                console.log("Invalid JSON");
                            }
                        }}
                        rows={30}
                        className="w-full bg-primary text-light font-mono text-sm px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                 </div>

                <button onClick={handleSaveData} className="w-full bg-green-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-600 transition duration-300 text-lg">
                    Save All Changes
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
