import React from 'react';

const PagePlaceholder = ({ title }) => {
    return (
        <div className="page-placeholder text-container" style={{ padding: 'var(--space-5) 0' }}>
            <h1 className="serif" style={{ fontSize: '3rem', marginBottom: 'var(--space-2)' }}>{title}</h1>
            <p className="text-muted" style={{ fontSize: '1.25rem' }}>
                This section will be built in the next step.
            </p>
        </div>
    );
};

export default PagePlaceholder;
