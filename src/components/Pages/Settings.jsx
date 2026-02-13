import React from 'react';
import Card from '../UI/Card';
import Input from '../UI/Input';
import Button from '../UI/Button';

const Settings = () => {
    return (
        <div className="settings-page text-container" style={{ padding: 'var(--space-4) 0' }}>
            <h1 className="serif" style={{ marginBottom: 'var(--space-3)' }}>Preferences</h1>

            <Card title="Job Search Criteria">
                <div className="flex flex-col gap-3">
                    <Input
                        label="Role Keywords"
                        placeholder="e.g. Product Designer, Senior Frontend Developer"
                    />
                    <Input
                        label="Preferred Locations"
                        placeholder="e.g. London, San Francisco, Remote"
                    />

                    <div className="flex gap-2">
                        <div style={{ flex: 1 }}>
                            <label className="text-muted" style={{ fontSize: '0.875rem', fontWeight: '500', display: 'block', marginBottom: '8px' }}>Mode</label>
                            <select className="premium-select">
                                <option>Remote</option>
                                <option>Hybrid</option>
                                <option>Onsite</option>
                            </select>
                        </div>
                        <div style={{ flex: 1 }}>
                            <label className="text-muted" style={{ fontSize: '0.875rem', fontWeight: '500', display: 'block', marginBottom: '8px' }}>Experience Level</label>
                            <select className="premium-select">
                                <option>Entry Level</option>
                                <option>Mid-level</option>
                                <option>Senior</option>
                                <option>Lead / Director</option>
                            </select>
                        </div>
                    </div>

                    <Button style={{ marginTop: 'var(--space-2)', alignSelf: 'flex-start' }}>
                        Save Preferences
                    </Button>
                </div>
            </Card>

            <style jsx>{`
        .premium-select {
          width: 100%;
          padding: 12px;
          border: 1px solid var(--border-color);
          border-radius: var(--radius);
          background: white;
          font-family: var(--font-sans);
          font-size: 0.875rem;
          outline: none;
        }
        .premium-select:focus {
          border-color: var(--text-primary);
        }
      `}</style>
        </div>
    );
};

export default Settings;
