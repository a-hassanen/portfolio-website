import React from 'react';
import '../styles/BackToTopButton.css';

const BackToTopButton = () => {
    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    React.useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <button
            type="button"
            onClick={scrollToTop}
            className={`back-to-top-button ${isVisible ? 'show' : ''}`}
            aria-label="Go to top"
            title="Go to top"
        >
            &#8679;
        </button>
    );
};

export default BackToTopButton;