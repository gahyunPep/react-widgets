import React from 'react';

const Link = ({ href, className, children }) => {
    const onClick = (event) => {
        event.preventDefault();
        window.history.pushState({}, '', href);
        // tell route component that url changed
        const navEvent = new PopStateEvent('popstate');
        window.dispatchEve
    }

    return <a onClick={onClick} className={className} href={href}>{children}</a>;
};

export default Link;