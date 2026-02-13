import React, { useState, useMemo, useEffect } from 'react';
import FilterBar from '../UI/FilterBar';
import JobCard from '../UI/JobCard';
import JobModal from '../UI/JobModal';
import { jobs } from '../../data/jobs';

const Dashboard = () => {
    const [filters, setFilters] = useState({
        query: '',
        location: '',
        mode: '',
        experience: '',
        source: '',
        sort: 'latest'
    });

    const [selectedJob, setSelectedJob] = useState(null);
    const [savedJobIds, setSavedJobIds] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('savedJobs') || '[]');
        setSavedJobIds(saved);
    }, []);

    const handleFilterChange = (name, value) => {
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = (job) => {
        let updated;
        if (savedJobIds.includes(job.id)) {
            updated = savedJobIds.filter(id => id !== job.id);
        } else {
            updated = [...savedJobIds, job.id];
        }
        setSavedJobIds(updated);
        localStorage.setItem('savedJobs', JSON.stringify(updated));
    };

    const filteredJobs = useMemo(() => {
        return jobs
            .filter(job => {
                const matchesQuery = job.title.toLowerCase().includes(filters.query.toLowerCase()) ||
                    job.company.toLowerCase().includes(filters.query.toLowerCase());
                const matchesLocation = !filters.location || job.location === filters.location;
                const matchesMode = !filters.mode || job.mode === filters.mode;
                const matchesExperience = !filters.experience || job.experience === filters.experience;
                const matchesSource = !filters.source || job.source === filters.source;

                return matchesQuery && matchesLocation && matchesMode && matchesExperience && matchesSource;
            })
            .sort((a, b) => {
                if (filters.sort === 'latest') return a.postedDaysAgo - b.postedDaysAgo;
                if (filters.sort === 'oldest') return b.postedDaysAgo - a.postedDaysAgo;
                return 0;
            });
    }, [filters]);

    return (
        <div className="dashboard-page">
            <div className="dashboard-header flex justify-between items-end mb-4">
                <div>
                    <h1 className="serif">Job Dashboard</h1>
                    <p className="text-muted">Showing {filteredJobs.length} available opportunities</p>
                </div>
            </div>

            <FilterBar filters={filters} onFilterChange={handleFilterChange} />

            <div className="job-grid mt-4">
                {filteredJobs.length > 0 ? (
                    filteredJobs.map(job => (
                        <JobCard
                            key={job.id}
                            job={job}
                            onView={setSelectedJob}
                            onSave={handleSave}
                            isSaved={savedJobIds.includes(job.id)}
                        />
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center">
                        <h3 className="serif text-muted">No matches found.</h3>
                        <p className="text-muted">Try adjusting your filters to see more results.</p>
                    </div>
                )}
            </div>

            <JobModal
                job={selectedJob}
                onClose={() => setSelectedJob(null)}
            />

            <style jsx>{`
        .dashboard-page {
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
        .col-span-full {
          grid-column: 1 / -1;
        }
        .py-20 { padding: 80px 0; }
        .mb-4 { margin-bottom: 24px; }
        .mt-4 { margin-top: 24px; }
      `}</style>
        </div>
    );
};

export default Dashboard;
