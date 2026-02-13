import React, { useState, useEffect } from 'react';
import JobCard from '../UI/JobCard';
import JobModal from '../UI/JobModal';
import { jobs } from '../../data/jobs';
import { calculateMatchScore } from '../../utils/scoring';
import { Sparkles } from 'lucide-react';

const Saved = () => {
    const [savedJobs, setSavedJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [preferences, setPreferences] = useState(null);
    const [jobStatuses, setJobStatuses] = useState({});
    const [toast, setToast] = useState(null);

    useEffect(() => {
        const fetchSaved = () => {
            const savedIds = JSON.parse(localStorage.getItem('savedJobs') || '[]');
            const prefs = localStorage.getItem('jobTrackerPreferences');
            const statuses = JSON.parse(localStorage.getItem('jobTrackerStatuses') || '{}');

            const parsedPrefs = prefs ? JSON.parse(prefs) : null;
            setPreferences(parsedPrefs);
            setJobStatuses(statuses);

            const filtered = jobs
                .filter(job => savedIds.includes(job.id))
                .map(job => ({
                    ...job,
                    matchScore: parsedPrefs ? calculateMatchScore(job, parsedPrefs) : null
                }));

            setSavedJobs(filtered);
        };

        fetchSaved();
    }, []);

    const showToast = (message) => {
        setToast(message);
        setTimeout(() => setToast(null), 3000);
    };

    const handleStatusChange = (jobId, newStatus) => {
        const updated = { ...jobStatuses, [jobId]: newStatus };
        setJobStatuses(updated);
        localStorage.setItem('jobTrackerStatuses', JSON.stringify(updated));
        showToast(`Status updated: ${newStatus}`);

        // Update history
        const job = jobs.find(j => j.id === jobId);
        const history = JSON.parse(localStorage.getItem('jobTrackerStatusHistory') || '[]');
        const newEntry = {
            jobId,
            title: job?.title,
            company: job?.company,
            status: newStatus,
            timestamp: new Date().toISOString()
        };
        const updatedHistory = [newEntry, ...history].slice(0, 10);
        localStorage.setItem('jobTrackerStatusHistory', JSON.stringify(updatedHistory));
    };

    const handleUnsave = (job) => {
        const savedIds = JSON.parse(localStorage.getItem('savedJobs') || '[]');
        const updated = savedIds.filter(id => id !== job.id);
        localStorage.setItem('savedJobs', JSON.stringify(updated));
        setSavedJobs(prev => prev.filter(j => j.id !== job.id));
    };

    return (
        <div className="saved-page">
            {toast && (
                <div className="status-toast fixed top-4 right-4 z-50">
                    <div className="toast-content flex items-center gap-2">
                        <Sparkles size={16} /> {toast}
                    </div>
                </div>
            )}

            <div className="saved-header mb-4">
                <h1 className="serif">Saved Jobs</h1>
                <p className="text-muted">Manage your bookmarked opportunities and track progress.</p>
            </div>

            {savedJobs.length > 0 ? (
                <div className="job-grid mt-4">
                    {savedJobs.map(job => (
                        <JobCard
                            key={job.id}
                            job={job}
                            onView={setSelectedJob}
                            onSave={handleUnsave}
                            isSaved={true}
                            matchScore={job.matchScore}
                            status={jobStatuses[job.id]}
                            onStatusChange={handleStatusChange}
                        />
                    ))}
                </div>
            ) : (
                <div className="empty-state py-20 text-center">
                    <h3 className="serif text-muted">No saved jobs yet.</h3>
                    <p className="text-muted">Start bookmarking roles from your dashboard to track them here.</p>
                </div>
            )}

            <JobModal
                job={selectedJob}
                onClose={() => setSelectedJob(null)}
            />

            <style jsx>{`
        .saved-page {
          padding: var(--space-4);
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
          position: relative;
        }
        .job-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: var(--space-3);
        }
        .status-toast {
          position: fixed;
          top: 24px;
          right: 24px;
          animation: slideIn 0.3s ease-out;
        }
        .toast-content {
          background: var(--text-primary);
          color: white;
          padding: 10px 24px;
          border-radius: 40px;
          font-size: 0.875rem;
          font-weight: 600;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
        }
        @keyframes slideIn {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .py-20 { padding: 80px 0; }
        .mb-4 { margin-bottom: 24px; }
        .mt-4 { margin-top: 24px; }
        .z-50 { z-index: 50; }
      `}</style>
        </div>
    );
};

export default Saved;
