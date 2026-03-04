import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Building, Briefcase, Activity, ChevronRight } from 'lucide-react';

const History = () => {
    const navigate = useNavigate();
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const savedHistory = JSON.parse(localStorage.getItem('placementHistory') || '[]');
        setHistory(savedHistory);
    }, []);

    const handleOpenResult = (item) => {
        navigate('/results', { state: { result: item } });
    };

    const getScoreColor = (score) => {
        if (score >= 80) return 'var(--status-success)';
        if (score >= 50) return 'var(--status-warning)';
        return 'var(--status-danger, #ef4444)';
    };

    return (
        <div className="history-page">
            <div className="history-header mb-4">
                <h1 className="serif">Analysis History</h1>
                <p className="text-muted">Review your past job descriptions and readiness preparations.</p>
            </div>

            {history.length > 0 ? (
                <div className="history-list flex flex-col gap-3">
                    {history.map((item) => (
                        <div
                            key={item.id}
                            className="history-card"
                            onClick={() => handleOpenResult(item)}
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="serif text-lg">
                                        {item.role || 'Role Not Provided'}
                                    </h3>
                                    <div className="meta-info flex items-center gap-4 mt-2">
                                        {item.company && (
                                            <span className="flex items-center gap-1 text-muted text-sm">
                                                <Building size={14} /> {item.company}
                                            </span>
                                        )}
                                        <span className="flex items-center gap-1 text-muted text-sm">
                                            <Calendar size={14} /> {new Date(item.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="score-badge flex items-center gap-1" style={{ color: getScoreColor(item.readinessScore), backgroundColor: `${getScoreColor(item.readinessScore)}15` }}>
                                        <Activity size={14} /> {item.readinessScore}% Match
                                    </div>
                                    <ChevronRight className="text-muted" size={20} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="empty-state">
                    <Briefcase size={48} className="text-muted mb-3" strokeWidth={1} />
                    <h3 className="serif text-muted">No Analysis Yet.</h3>
                    <p className="text-muted text-sm">Go to Analyze and submit a Job Description.</p>
                </div>
            )
            }

            <style jsx>{`
        .history-page {
          padding: var(--space-4);
          max-width: 800px;
          margin: 0 auto;
          width: 100%;
        }
        .history-card {
          background: white;
          border: 1px solid var(--border-color);
          border-radius: var(--radius);
          padding: var(--space-3) var(--space-4);
          cursor: pointer;
          transition: var(--transition-fast);
        }
        .history-card:hover {
          border-color: var(--text-primary);
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          transform: translateY(-2px);
        }
        .score-badge {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.8125rem;
          font-weight: 700;
        }
        .text-lg { font-size: 1.125rem; }
        .empty-state {
          padding: 80px 0;
          text-align: center;
          display: flex;
          flex-col;
          align-items: center;
          justify-content: center;
          border: 1px dashed var(--border-color);
          border-radius: var(--radius);
          background: white;
        }
        .mb-4 { margin-bottom: 24px; }
        .mb-3 { margin-bottom: 12px; }
        .mt-2 { margin-top: 8px; }
        .gap-4 { gap: 16px; }
      `}</style>
        </div >
    );
};

export default History;
