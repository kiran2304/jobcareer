import React, { useState, useEffect } from 'react';
import { Bookmark } from 'lucide-react';
import JobCard from '../UI/JobCard';
import JobModal from '../UI/JobModal';
import { jobs } from '../../data/jobs';

const Saved = () => {
    const [savedJobs, setSavedJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [savedJobIds, setSavedJobIds] = useState([]);

    useEffect(() => {
        const ids = JSON.parse(localStorage.getItem('savedJobs') || '[]');
        setSavedJobIds(ids);
        const filtered = jobs.filter(job => ids.includes(job.id));
        setSavedJobs(filtered);
    }, []);

    const handleSave = (job) => {
        const updatedIds = savedJobIds.filter(id => id !== job.id);
        setSavedJobIds(updatedIds);
        setSavedJobs(savedJobs.filter(j => j.id !== job.id));
        localStorage.setItem('savedJobs', JSON.stringify(updatedIds));
    };

    return (
        <div className="saved-page">
            <div className="saved-header mb-4">
                <h1 className="serif">Saved Jobs</h1>
                <p className="text-muted">Your curated list of intentional opportunities</p>
            </div>

            {savedJobs.length > 0 ? (
                <div className="job-grid mt-4">
                    {savedJobs.map(job => (
                        <JobCard
                            key={job.id}
                            job={job}
                            onView={setSelectedJob}
                            onSave={handleSave}
                            isSaved={true}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center" style={{ minHeight: '50vh', textAlign: 'center' }}>
                    <div className="empty-state-icon" style={{ color: 'var(--border-color)', marginBottom: 'var(--space-2)' }}>
                        <Bookmark size={64} strokeWidth={1} />
                    </div>
                    <h2 className="serif" style={{ fontSize: '2rem', marginBottom: 'var(--space-1)' }}>Your collection is empty.</h2>
                    <p className="text-muted" style={{ maxWidth: '400px' }}>
                        Browse the dashboard and save jobs that align with your career vision. They will appear here for focused action.
                    </p>
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
        }
        .job-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: var(--space-3);
        }
        .mb-4 { margin-bottom: 24px; }
        .mt-4 { margin-top: 24px; }
      `}</style>
        </div>
    );
};

export default Saved;
