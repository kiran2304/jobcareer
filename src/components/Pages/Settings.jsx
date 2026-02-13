import React, { useState, useEffect } from 'react';
import Card from '../UI/Card';
import Input from '../UI/Input';
import Button from '../UI/Button';

const LOCATIONS = ["Bangalore", "Pune", "Hyderabad", "Chennai", "Mumbai", "Noida", "Gurgaon"];
const MODES = ["Remote", "Hybrid", "Onsite"];
const EXPERIENCE_LEVELS = ["Fresher", "0-1", "1-3", "3-5"];

const Settings = () => {
    const [prefs, setPrefs] = useState({
        roleKeywords: '',
        preferredLocations: [],
        preferredMode: [],
        experienceLevel: 'Fresher',
        skills: '',
        minMatchScore: 40
    });

    const [saveStatus, setSaveStatus] = useState(null);

    useEffect(() => {
        const saved = localStorage.getItem('jobTrackerPreferences');
        if (saved) {
            try {
                setPrefs(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse preferences", e);
            }
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPrefs(prev => ({ ...prev, [name]: value }));
    };

    const handleToggle = (name, value) => {
        setPrefs(prev => {
            const current = prev[name];
            if (current.includes(value)) {
                return { ...prev, [name]: current.filter(item => item !== value) };
            } else {
                return { ...prev, [name]: [...current, value] };
            }
        });
    };

    const handleSave = () => {
        localStorage.setItem('jobTrackerPreferences', JSON.stringify(prefs));
        setSaveStatus('Preferences saved successfully.');
        setTimeout(() => setSaveStatus(null), 3000);
    };

    return (
        <div className="settings-page">
            <div className="settings-header text-container mb-4">
                <h1 className="serif">Preferences</h1>
                <p className="text-muted">Tailor the matching engine to your career goals.</p>
            </div>

            <div className="text-container flex flex-col gap-4">
                <Card title="Role & Skills">
                    <div className="flex flex-col gap-3">
                        <Input
                            label="Role Keywords (comma separated)"
                            name="roleKeywords"
                            placeholder="e.g. SDE, Frontend, React Intern"
                            value={prefs.roleKeywords}
                            onChange={handleChange}
                        />
                        <Input
                            label="Skills (comma separated)"
                            name="skills"
                            placeholder="e.g. React, Node.js, Python, Figma"
                            value={prefs.skills}
                            onChange={handleChange}
                        />
                    </div>
                </Card>

                <Card title="Location & Mode">
                    <div className="flex flex-col gap-4">
                        <div>
                            <label className="field-label">Preferred Locations</label>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {LOCATIONS.map(loc => (
                                    <label key={loc} className={`pill-checkbox ${prefs.preferredLocations.includes(loc) ? 'active' : ''}`}>
                                        <input
                                            type="checkbox"
                                            hidden
                                            onChange={() => handleToggle('preferredLocations', loc)}
                                        />
                                        {loc}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div style={{ flex: 1 }}>
                                <label className="field-label">Preferred Mode</label>
                                <div className="flex flex-col gap-2 mt-2">
                                    {MODES.map(mode => (
                                        <label key={mode} className="checkbox-item flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={prefs.preferredMode.includes(mode)}
                                                onChange={() => handleToggle('preferredMode', mode)}
                                            />
                                            <span>{mode}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div style={{ flex: 1 }}>
                                <label className="field-label">Experience Level</label>
                                <select
                                    className="premium-select mt-2"
                                    name="experienceLevel"
                                    value={prefs.experienceLevel}
                                    onChange={handleChange}
                                >
                                    {EXPERIENCE_LEVELS.map(lvl => (
                                        <option key={lvl} value={lvl}>{lvl} {lvl === 'Fresher' ? '' : 'Years'}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card title="Matching Sensitivity">
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center">
                            <label className="field-label">Minimum Match Score</label>
                            <span className="serif text-accent" style={{ fontSize: '1.25rem' }}>{prefs.minMatchScore}%</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            name="minMatchScore"
                            value={prefs.minMatchScore}
                            onChange={handleChange}
                            className="premium-range"
                        />
                        <p className="text-muted" style={{ fontSize: '0.8125rem' }}>
                            Only jobs meeting this threshold will be highlighted on your dashboard.
                        </p>
                    </div>
                </Card>

                <div className="flex flex-col gap-2 items-start mt-2">
                    <Button onClick={handleSave}>Save Preferences</Button>
                    {saveStatus && <p className="text-success" style={{ fontSize: '0.875rem' }}>{saveStatus}</p>}
                </div>
            </div>

            <style jsx>{`
        .settings-page {
          padding: var(--space-4) 0;
        }
        .text-container {
          max-width: 720px;
          margin: 0 auto;
        }
        .field-label {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
          display: block;
        }
        .pill-checkbox {
          padding: 6px 16px;
          background: white;
          border: 1px solid var(--border-color);
          border-radius: 20px;
          font-size: 0.8125rem;
          cursor: pointer;
          transition: var(--transition-fast);
        }
        .pill-checkbox:hover { border-color: var(--text-primary); }
        .pill-checkbox.active {
          background: var(--text-primary);
          color: white;
          border-color: var(--text-primary);
        }
        .checkbox-item {
          font-size: 0.875rem;
          cursor: pointer;
        }
        .premium-select, .premium-range {
          width: 100%;
          outline: none;
        }
        .premium-select {
          padding: 10px;
          border: 1px solid var(--border-color);
          border-radius: var(--radius);
          background: white;
          font-family: var(--font-sans);
          font-size: 0.875rem;
        }
        .premium-range {
          height: 4px;
          background: var(--border-color);
          border-radius: 2px;
          appearance: none;
        }
        .premium-range::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: var(--accent-base);
          border-radius: 50%;
          cursor: pointer;
        }
        .text-success { color: var(--status-success); }
        .mb-4 { margin-bottom: 24px; }
        .mt-2 { margin-top: 16px; }
        .gap-4 { gap: 32px; }
      `}</style>
        </div>
    );
};

export default Settings;
