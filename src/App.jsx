import React from 'react';
import portfolioData from './data/portfolioData.json';
import PortfolioView from './components/PortfolioView.jsx';
import EditorView from './components/EditorView.jsx';
import ResumeView from './components/ResumeView.jsx';
import BackToTopButton from './components/BackToTopButton.jsx';

const App = () => {
    const [route, setRoute] = React.useState(window.location.hash);

    React.useEffect(() => {
        const handleHashChange = () => {
            setRoute(window.location.hash);
        };
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);
    
    const renderView = () => {
        switch (route) {
            case '#edit':
                return <EditorView initialData={portfolioData} />;
            case '#resume-view':
                return <ResumeView />;
            default:
                return <PortfolioView data={portfolioData} />;
        }
    };
    
    return (
        <React.Fragment>
            {renderView()}
            <BackToTopButton />
        </React.Fragment>
    );
};

export default App;