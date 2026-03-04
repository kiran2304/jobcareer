import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from '../UI/Card';
import { Target, CheckCircle2, ChevronRight, Activity, Calendar } from 'lucide-react';

const Results = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [result, setResult] = useState(null);

    useEffect(() => {
        if (location.state?.result) {
            setResult(location.state.result);
        } else {
            const history = JSON.parse(localStorage.getItem('placementHistory') || '[]');
            if (history.length > 0) {
                setResult(history[0]);
            } else {
                navigate('/analyze');
            }
        }
    }, [location.state, navigate]);

    if (!result) return <div className="p-8 text-center text-muted">Loading...</div>;

    const { company, role, extractedSkills, readinessScore, checklist, plan, questions } = result;

    const getScoreColor = (score) => {
        if (score >= 80) return 'var(--status-success)';
        if (score >= 50) return 'var(--status-warning)';
        return '#ef4444'; // var(--status-danger)
    };

    return (
        <div className="results-page">
            <div className="results-header">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="serif">Readiness Analysis</h1>
                        <p className="text-muted mt-1 flex gap-2">
                            {company && <span>{company}</span>}
                            {company && role && <span>•</span>}
                            {role && <span>{role}</span>}
                        </p>
                    </div>
                    <div className="score-circle flex flex-col items-center justify-center" style={{ borderColor: getScoreColor(readinessScore), color: getScoreColor(readinessScore) }}>
                        <span className="serif text-2xl font-bold leading-none">{readinessScore}</span>
                        <span className="text-xs font-bold uppercase tracking-wider mt-1 opacity-80">Score</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-6 mt-8">
                {/* Extracted Skills */}
                <Card title="Detected Skills Profile">
                    <div className="flex flex-col gap-4">
                        {Object.entries(extractedSkills).map(([category, skills]) => (
                            <div key={category} className="skill-category">
                                <h4 className="text-sm font-bold text-muted mb-2 uppercase tracking-wide">{category}</h4>
                                <div className="flex flex-wrap gap-2">
                                    {skills.map(skill => (
                                        <div key={skill} className="skill-pill flex items-center gap-1">
                                            <Target size={12} className="opacity-50" /> {skill}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* 7-Day Plan */}
                <Card title="7-Day Preparation Plan">
                    <div className="plan-timeline flex flex-col gap-4">
                        {plan.map((dayPlan, i) => (
                            <div key={i} className="plan-day flex gap-4">
                                <div className="day-badge flex flex-col items-center justify-center p-2 rounded bg-primary text-sm font-bold h-12 min-w-16 text-center border">
                                    <Calendar size={14} className="mb-1 opacity-50 text-muted" />
                                    {dayPlan.day.replace('Day ', '')}
                                </div>
                                <div className="day-details">
                                    <h4 className="font-bold">{dayPlan.focus}</h4>
                                    <p className="text-sm text-muted mt-1 leading-relaxed">{dayPlan.details}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                <div className="grid-2-col gap-6">
                    {/* Round-wise Checklist */}
                    <Card title="Round-wise Checklist">
                        <div className="flex flex-col gap-6">
                            {checklist.map((round) => (
                                <div key={round.round}>
                                    <h4 className="font-bold text-sm text-accent mb-3 flex items-center gap-2">
                                        <Activity size={16} /> {round.round}
                                    </h4>
                                    <ul className="flex flex-col gap-2">
                                        {round.items.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-sm">
                                                <CheckCircle2 size={16} className="text-muted mt-0.5 flex-shrink-0" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Highly Likely Interview Questions */}
                    <Card title="Likely Interview Questions">
                        <div className="questions-list flex flex-col gap-3">
                            {questions.map((q, idx) => (
                                <div key={idx} className="question-item flex items-start gap-3 p-3 bg-primary border rounded">
                                    <div className="q-number text-muted font-serif font-bold opacity-50">Q{idx + 1}</div>
                                    <p className="text-sm font-medium leading-relaxed">{q}</p>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>

            <style jsx>{`
        .results-page {
          padding: var(--space-4);
          max-width: 1000px;
          margin: 0 auto;
          width: 100%;
        }
        .score-circle {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          border: 4px solid var(--text-primary);
          background: white;
        }
        .text-2xl { font-size: 2rem; }
        .text-xs { font-size: 0.75rem; }
        .skill-pill {
          padding: 6px 12px;
          background: white;
          border: 1px solid var(--border-color);
          border-radius: 20px;
          font-size: 0.8125rem;
          font-weight: 600;
        }
        .plan-day {
          padding-bottom: 16px;
          border-bottom: 1px dashed var(--border-color);
        }
        .plan-day:last-of-type { border-bottom: none; padding-bottom: 0; }
        .day-badge {
          background: var(--bg-primary);
          border-color: var(--border-color);
        }
        .grid-2-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        .bg-primary { background-color: var(--bg-primary); }
        .border { border: 1px solid var(--border-color); }
        .rounded { border-radius: var(--radius); }
        .mt-1 { margin-top: 4px; }
        .mt-8 { margin-top: 32px; }
        .gap-6 { gap: 24px; }
        .mb-2 { margin-bottom: 8px; }
        .mb-3 { margin-bottom: 12px; }
        .p-8 { padding: 32px; }
        
        @media (max-width: 768px) {
          .grid-2-col {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
        </div>
    );
};

export default Results;
