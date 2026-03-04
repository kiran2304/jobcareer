import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from '../UI/Card';
import { Target, CheckCircle2, ChevronRight, Activity, Calendar, Copy, Download, ThumbsUp, AlertCircle, Building2, Briefcase, Users, Info } from 'lucide-react';

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

    const safeResult = result || {};
    const { id, company, role, extractedSkills = {}, readinessScore: baseScore = 35, checklist = [], plan = [], questions = [], companyIntel, roundMapping } = safeResult;

    // Derived states
    const allExpectedSkills = Object.values(extractedSkills).flat();

    // Initialize confidence map with defaults if missing
    const initialMap = safeResult.skillConfidenceMap || {};
    const [confidenceMap, setConfidenceMap] = useState(() => {
        const map = { ...initialMap };
        allExpectedSkills.forEach(s => {
            if (!map[s]) map[s] = 'practice';
        });
        return map;
    });

    const [liveScore, setLiveScore] = useState(baseScore);

    // Calculate dynamic score on confidence change
    useEffect(() => {
        let knowCount = 0;
        let practiceCount = 0;

        Object.values(confidenceMap).forEach(val => {
            if (val === 'know') knowCount++;
            if (val === 'practice') practiceCount++;
        });

        const newScore = Math.max(0, Math.min(100, baseScore + (knowCount * 2) - (practiceCount * 2)));
        setLiveScore(Math.round(newScore));

        // Update history in localStorage
        const history = JSON.parse(localStorage.getItem('placementHistory') || '[]');
        const updatedHistory = history.map(item => {
            if (item.id === id) {
                return { ...item, skillConfidenceMap: confidenceMap, readinessScore: newScore };
            }
            return item;
        });
        localStorage.setItem('placementHistory', JSON.stringify(updatedHistory));

        // Also sync local 'result' state copy to prevent regression on re-renders
        setResult(prev => ({ ...prev, skillConfidenceMap: confidenceMap, readinessScore: newScore }));

    }, [confidenceMap, baseScore, id]);

    const handleToggleConfidence = (skill) => {
        setConfidenceMap(prev => ({
            ...prev,
            [skill]: prev[skill] === 'know' ? 'practice' : 'know'
        }));
    };

    const getScoreColor = (score) => {
        if (score >= 80) return 'var(--status-success)';
        if (score >= 50) return 'var(--status-warning)';
        return '#ef4444'; // var(--status-danger)
    };

    // Export Handlers
    const handleCopyPlan = () => {
        const text = plan.map(p => `${p.day}: ${p.focus}\n${p.details}`).join('\n\n');
        navigator.clipboard.writeText("7-Day Preparation Plan\n\n" + text);
        alert("7-Day Plan copied to clipboard!");
    };

    const handleCopyChecklist = () => {
        const text = checklist.map(c => `${c.round}\n` + c.items.map(i => `- ${i}`).join('\n')).join('\n\n');
        navigator.clipboard.writeText("Round-wise Checklist\n\n" + text);
        alert("Checklist copied to clipboard!");
    };

    const handleCopyQuestions = () => {
        const text = questions.map((q, i) => `${i + 1}. ${q}`).join('\n');
        navigator.clipboard.writeText("10 Likely Interview Questions\n\n" + text);
        alert("Questions copied to clipboard!");
    };

    const handleDownloadTxt = () => {
        const text = `
Placement Readiness Analysis: ${company || 'Unknown Company'} - ${role || 'Unknown Role'}
Readiness Score: ${liveScore}%

## 7-Day Plan
${plan.map(p => `${p.day}: ${p.focus}\n${p.details}`).join('\n\n')}

## Checklist
${checklist.map(c => `${c.round}\n` + c.items.map(i => `- ${i}`).join('\n')).join('\n\n')}

## Questions
${questions.map((q, i) => `${i + 1}. ${q}`).join('\n')}
        `.trim();

        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Readiness_Plan_${Date.now()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    if (!result) return <div className="p-8 text-center text-muted">Loading...</div>;

    const weakSkills = Object.keys(confidenceMap).filter(k => confidenceMap[k] === 'practice').slice(0, 3);
    const hasWeakSkills = weakSkills.length > 0;

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
                    <div className="score-circle flex flex-col items-center justify-center transition-all" style={{ borderColor: getScoreColor(liveScore), color: getScoreColor(liveScore) }}>
                        <span className="serif text-2xl font-bold leading-none">{liveScore}</span>
                        <span className="text-xs font-bold uppercase tracking-wider mt-1 opacity-80">Score</span>
                    </div>
                </div>
            </div>

            <div className="export-toolbar flex gap-3 mt-6 flex-wrap pb-6 border-bottom">
                <button className="export-btn flex items-center gap-1 text-sm font-semibold" onClick={handleCopyPlan}><Copy size={16} /> Copy Plan</button>
                <button className="export-btn flex items-center gap-1 text-sm font-semibold" onClick={handleCopyChecklist}><Copy size={16} /> Copy Checklist</button>
                <button className="export-btn flex items-center gap-1 text-sm font-semibold" onClick={handleCopyQuestions}><Copy size={16} /> Copy Questions</button>
                <button className="export-btn primary flex items-center gap-1 text-sm font-semibold" onClick={handleDownloadTxt}><Download size={16} /> Download TXT</button>
            </div>

            <div className="flex flex-col gap-6 mt-8">
                {/* Company Intel Box */}
                {companyIntel && (
                    <Card title="Company Intelligence">
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex-1 bg-primary border rounded p-4 flex flex-col gap-3">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-[rgba(var(--accent-hsl),0.1)] text-accent rounded-full"><Building2 size={20} /></div>
                                    <div>
                                        <p className="text-xs text-muted uppercase font-bold tracking-wider">Company</p>
                                        <p className="font-semibold">{companyIntel.name}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-[rgba(var(--accent-hsl),0.1)] text-accent rounded-full"><Briefcase size={20} /></div>
                                    <div>
                                        <p className="text-xs text-muted uppercase font-bold tracking-wider">Industry inferred</p>
                                        <p className="font-semibold">{companyIntel.industry}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-[rgba(var(--accent-hsl),0.1)] text-accent rounded-full"><Users size={20} /></div>
                                    <div>
                                        <p className="text-xs text-muted uppercase font-bold tracking-wider">Estimated Size</p>
                                        <p className="font-semibold">{companyIntel.size}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-[2] border rounded p-5 bg-secondary flex flex-col justify-center">
                                <h4 className="font-serif text-lg mb-2 flex items-center gap-2"><Target size={20} className="text-accent" /> Typical Hiring Focus</h4>
                                <p className="text-sm leading-relaxed text-body">{companyIntel.focus}</p>
                            </div>
                        </div>
                        <p className="text-xs text-muted mt-4 opacity-70 italic flex items-center gap-1">
                            <Info size={12} /> Demo Mode: Company intel and size are generated heuristically based on known patterns.
                        </p>
                    </Card>
                )}

                {/* Extracted Skills - Interactive */}
                <Card title="Skill Self-Assessment">
                    <p className="text-muted text-sm mb-4">Click skills to toggle your confidence. Your score will update dynamically.</p>
                    <div className="flex flex-col gap-5">
                        {Object.entries(extractedSkills).map(([category, skills]) => (
                            <div key={category} className="skill-category border-bottom pb-4 last-no-border">
                                <h4 className="text-sm font-bold text-muted mb-3 uppercase tracking-wide">{category}</h4>
                                <div className="flex flex-wrap gap-2">
                                    {skills.map(skill => {
                                        const isKnown = confidenceMap[skill] === 'know';
                                        return (
                                            <button
                                                key={skill}
                                                onClick={() => handleToggleConfidence(skill)}
                                                className={`interactive-skill-pill flex items-center gap-1 ${isKnown ? 'known' : 'practice'}`}
                                            >
                                                {isKnown ? <ThumbsUp size={12} className="opacity-80" /> : <Activity size={12} className="opacity-80" />}
                                                {skill}
                                            </button>
                                        );
                                    })}
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
                    {/* Dynamic Round Mapping Timeline */}
                    <Card title="Interview Round Timeline">
                        <div className="flex flex-col relative pl-6">
                            {/* Vertical Line */}
                            <div className="absolute left-[11px] top-2 bottom-6 w-[2px] bg-border-color timeline-line"></div>

                            {(roundMapping && roundMapping.length > 0 ? roundMapping : checklist).map((round, idx) => {
                                // Support both new dynamic roundMapping and legacy checklist schema
                                const isLegacy = !round.whyItMatters;
                                return (
                                    <div key={idx} className="timeline-item relative mb-8 last:mb-0">
                                        <div className="absolute -left-[30px] top-1 w-6 h-6 rounded-full bg-[var(--bg-secondary)] border-2 border-accent flex items-center justify-center timeline-dot">
                                            <div className="w-2 h-2 rounded-full bg-accent"></div>
                                        </div>
                                        <h4 className="font-bold text-sm mb-1">{isLegacy ? round.round : round.round}</h4>
                                        <p className="text-sm font-semibold text-accent mb-2">{isLegacy ? "Focus Areas" : round.focus}</p>

                                        {!isLegacy && (
                                            <p className="text-sm text-body leading-relaxed bg-[var(--bg-primary)] p-3 rounded border border-[rgba(var(--accent-hsl),0.2)] mb-3">
                                                <span className="font-semibold text-muted block mb-1 text-xs uppercase tracking-wider">Why this round matters</span>
                                                {round.whyItMatters}
                                            </p>
                                        )}

                                        {isLegacy && round.items && (
                                            <ul className="flex flex-col gap-2 mt-2">
                                                {round.items.map((item, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-sm">
                                                        <CheckCircle2 size={16} className="text-muted mt-0.5 flex-shrink-0" />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                );
                            })}
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

                {/* Action Next Box */}
                <div className="action-next-box mt-4 p-6 rounded border flex items-start gap-4">
                    <div className="icon-wrapper flex-shrink-0">
                        <AlertCircle size={32} className="text-accent" />
                    </div>
                    <div className="flex-1">
                        <h3 className="serif text-lg mb-2">Priority Focus Areas</h3>
                        {hasWeakSkills ? (
                            <p className="text-sm text-body leading-relaxed">
                                You've identified <strong>{weakSkills.join(', ')}</strong> as areas requiring practice.
                                <br /><br />
                                <span className="font-bold">Next Action:</span> Start Day 1 of your preparation plan now to tackle these weaknesses head-on.
                            </p>
                        ) : (
                            <p className="text-sm text-body leading-relaxed">
                                You've marked all skills as "Known"! You're in a great position.
                                <br /><br />
                                <span className="font-bold">Next Action:</span> Review the mock interview questions directly to evaluate your depth of understanding.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
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
        
        /* New Styles for Interactive & Export Features */
        .interactive-skill-pill {
          padding: 8px 16px;
          border-radius: 24px;
          font-size: 0.8125rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 1px solid var(--border-color);
        }
        .interactive-skill-pill.known {
          background-color: var(--status-success);
          color: white;
          border-color: var(--status-success);
          box-shadow: 0 4px 12px rgba(34, 197, 94, 0.2);
        }
        .interactive-skill-pill.practice {
          background-color: var(--bg-secondary);
          color: var(--text-secondary);
        }
        .interactive-skill-pill.practice:hover {
          background-color: var(--border-color);
        }
        
        .export-btn {
          padding: 8px 16px;
          border-radius: var(--radius);
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          cursor: pointer;
          transition: all 0.2s;
        }
        .export-btn:hover {
          background-color: var(--border-color);
        }
        .export-btn.primary {
          background-color: var(--text-primary);
          color: var(--bg-primary);
          border-color: var(--text-primary);
        }
        .export-btn.primary:hover {
          opacity: 0.9;
        }
        
        .border-bottom { border-bottom: 1px solid var(--border-color); }
        .last-no-border:last-child { border-bottom: none; padding-bottom: 0; }
        .pb-4 { padding-bottom: 16px; }
        .pb-6 { padding-bottom: 24px; }
        .p-6 { padding: 24px; }
        
        .action-next-box {
          background-color: rgba(var(--accent-hsl), 0.05);
          border-color: rgba(var(--accent-hsl), 0.2);
        }
        .text-accent { color: var(--accent); }

        .timeline-line {
            background-color: var(--border-color);
        }
        .bg-border-color {
            background-color: var(--border-color);
        }
      `}} />
        </div>
    );
};

export default Results;
