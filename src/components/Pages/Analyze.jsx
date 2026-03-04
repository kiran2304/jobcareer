import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../UI/Card';
import Input from '../UI/Input';
import Button from '../UI/Button';
import { analyzeJD } from '../../utils/analyzer';
import { Sparkles, Loader } from 'lucide-react';

const Analyze = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        company: '',
        role: '',
        jdText: ''
    });
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAnalyze = () => {
        if (!formData.jdText.trim()) {
            alert("Please provide the Job Description text.");
            return;
        }

        setIsAnalyzing(true);
        setTimeout(() => {
            const result = analyzeJD(formData.jdText, formData.company, formData.role);

            // Save to History
            const existingHistory = JSON.parse(localStorage.getItem('placementHistory') || '[]');
            const updatedHistory = [result, ...existingHistory];
            localStorage.setItem('placementHistory', JSON.stringify(updatedHistory));

            setIsAnalyzing(false);
            navigate('/results', { state: { result } });
        }, 800);
    };

    return (
        <div className="analyze-page">
            <div className="analyze-header text-container mb-4">
                <h1 className="serif">Placement Readiness Analysis</h1>
                <p className="text-muted">Extract technical requirements and generate a customized preparation plan.</p>
            </div>

            <div className="text-container flex flex-col gap-4">
                <Card title="Job Details">
                    <div className="flex flex-col gap-3">
                        <Input
                            label="Company Name (Optional)"
                            name="company"
                            placeholder="e.g. Google, Microsoft, Amazon"
                            value={formData.company}
                            onChange={handleChange}
                        />
                        <Input
                            label="Role Title (Optional)"
                            name="role"
                            placeholder="e.g. Frontend Developer, SDE 1"
                            value={formData.role}
                            onChange={handleChange}
                        />
                        <div className="input-group flex flex-col gap-1">
                            <label className="input-label">Job Description (Required)</label>
                            <textarea
                                className="input-field textarea-field"
                                name="jdText"
                                placeholder="Paste the full job description here..."
                                value={formData.jdText}
                                onChange={handleChange}
                                rows={8}
                            />
                        </div>
                    </div>
                </Card>

                <div className="flex items-center mt-2">
                    <Button onClick={handleAnalyze} disabled={isAnalyzing} className="w-full flex justify-center items-center gap-2" style={{ padding: '16px' }}>
                        {isAnalyzing ? <><Loader className="animate-spin" size={20} /> Analyzing Context...</> : <><Sparkles size={20} /> Generate Readiness Plan</>}
                    </Button>
                </div>
            </div>

            <style jsx>{`
        .analyze-page {
          padding: var(--space-4) 0;
        }
        .text-container {
          max-width: 720px;
          margin: 0 auto;
          width: 100%;
          padding: 0 var(--space-4);
        }
        .input-group {
          margin-bottom: var(--space-2);
          width: 100%;
        }
        .input-label {
          font-size: 0.875rem;
          font-weight: 500;
          opacity: 0.8;
          color: var(--text-primary);
        }
        .input-field {
          padding: 12px;
          border: 1px solid var(--border-color);
          border-radius: var(--radius);
          background: white;
          transition: var(--transition-fast);
          width: 100%;
          font-family: inherit;
        }
        .textarea-field {
          resize: vertical;
          min-height: 150px;
        }
        .input-field:focus {
          border-color: var(--text-primary);
          outline: none;
        }
        .mb-4 { margin-bottom: 24px; }
        .mt-2 { margin-top: 16px; }
        .gap-4 { gap: 16px; }
        .w-full { width: 100%; }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
        </div>
    );
};

export default Analyze;
