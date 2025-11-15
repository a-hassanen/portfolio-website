import React from 'react';

const useIntersectionObserver = (options) => {
    const [isVisible, setIsVisible] = React.useState(false);
    const ref = React.useRef(null);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // We only want to set it to true.
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Stop observing after it's visible to prevent re-triggering.
                    observer.unobserve(entry.target);
                }
            },
            options
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [ref, options]);

    return [ref, isVisible];
};

export default useIntersectionObserver;
