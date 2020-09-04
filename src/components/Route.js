import { useEffect, useState } from 'react';

const Route = ( {path, children} ) => {
    // just to track currentpath, and get Route to rerender on updates
    const [currentPath, setCurrentPath] = useState(window.location.pathname);
    
    useEffect(() => {
        const onLocationChange = () => {
            setCurrentPath(window.location.pathname);
        };

        window.addEventListener('popstate', onLocationChange);

        return () => {
            window.removeEventListener('popstate', onLocationChange);
        };
    }, []);

    return currentPath === path ? children : null;
};



export default Route;