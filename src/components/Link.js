import React from 'react';

const Link = ({ href, className, children }) => {
    // this change the url, but do not refresh the page
    const onClick = (event) => {
        // when user press cmd or ctrl, open in a new tab
        if(event.metaKey || event.ctrlKey) {
            return;
        }

        event.preventDefault();
        window.history.pushState({}, '', href);
        // tell route component that url changed
        const navEvent = new PopStateEvent('popstate');
        window.dispatchEvent(navEvent);
    }

    return <a onClick={onClick} className={className} href={href}>{children}</a>;
};

export default Link;