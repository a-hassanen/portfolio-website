import React, { useState, useEffect } from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import '../styles/ResumeView.css';
import portfolioData from '../data/portfolioData.json';

const ResumeView = () => {
    const [pdfUrl, setPdfUrl] = useState('');
    const [wordUrl, setWordUrl] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const findResumes = async () => {
            try {
                // Use Vite's import.meta.glob to find files matching the pattern.
                const pdfModules = import.meta.glob('/src/assets/resumes/*.pdf');
                const wordModules = import.meta.glob('/src/assets/resumes/*.{doc,docx}');

                const pdfPath = Object.keys(pdfModules)[0]; // Get the path of the first PDF found
                const wordPath = Object.keys(wordModules)[0]; // Get the path of the first Word doc found

                let foundPdf = false;

                if (pdfPath) {
                    const pdfModule = await pdfModules[pdfPath]();
                    setPdfUrl(pdfModule.default);
                    foundPdf = true;
                }

                if (wordPath) {
                    const wordModule = await wordModules[wordPath]();
                    setWordUrl(wordModule.default);
                }
                
                if (!foundPdf) {
                     setError('Could not find a PDF resume file in src/assets/resumes/. Please add one to view it here.');
                }

            } catch (e) {
                console.error("Error finding resume files:", e);
                setError('An error occurred while loading resume files.');
            }
        };
        findResumes();
    }, []);

    return (
        <React.Fragment>
             <Header name={portfolioData.personalInfo.name} showEditorLink={false} />
             <main className="app-container">
                <div className="resume-view">
                    <h2>My Resume</h2>
                    <div className="resume-actions">
                        {pdfUrl && <a href={pdfUrl} download className="button">Download PDF</a>}
                        {wordUrl && <a href={wordUrl} download className="button">Download Word</a>}
                    </div>
                    
                    {error && <div className="card resume-error"><p>{error}</p></div>}

                    {pdfUrl && !error ? (
                        <div className="resume-embed card">
                            <iframe src={pdfUrl} type="application/pdf" width="100%" height="800px" title="Resume" frameBorder="0" />
                        </div>
                    ) : !error && (
                         <div className="card"><p>Loading resume...</p></div>
                    )}
                </div>
             </main>
             <Footer name={portfolioData.personalInfo.name} />
        </React.Fragment>
    );
};

export default ResumeView;
