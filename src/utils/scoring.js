/**
 * Computes a match score (0-100) for a job based on user preferences.
 * 
 * Rules:
 * +25 if any roleKeyword appears in job.title (case-insensitive)
 * +15 if any roleKeyword appears in job.description
 * +15 if job.location matches preferredLocations
 * +10 if job.mode matches preferredMode (Array of checkboxes)
 * +10 if job.experience matches experienceLevel
 * +15 if overlap between job.skills and user.skills (any match)
 * +5 if postedDaysAgo <= 2
 * +5 if source is LinkedIn
 */
export const calculateMatchScore = (job, preferences) => {
    if (!preferences) return 0;

    let score = 0;

    // 1. Role Keywords in Title (+25) and Description (+15)
    if (preferences.roleKeywords) {
        const keywords = preferences.roleKeywords.split(',').map(k => k.trim().toLowerCase()).filter(k => k);
        const title = job.title.toLowerCase();
        const desc = job.description.toLowerCase();

        if (keywords.some(k => title.includes(k))) score += 25;
        if (keywords.some(k => desc.includes(k))) score += 15;
    }

    // 2. Location (+15)
    if (preferences.preferredLocations && preferences.preferredLocations.length > 0) {
        if (preferences.preferredLocations.includes(job.location)) {
            score += 15;
        }
    }

    // 3. Mode (+10)
    if (preferences.preferredMode && preferences.preferredMode.length > 0) {
        if (preferences.preferredMode.includes(job.mode)) {
            score += 10;
        }
    }

    // 4. Experience Level (+10)
    if (preferences.experienceLevel) {
        if (job.experience === preferences.experienceLevel) {
            score += 10;
        }
    }

    // 5. Skills Overlap (+15)
    if (preferences.skills) {
        const userSkills = preferences.skills.split(',').map(s => s.trim().toLowerCase()).filter(s => s);
        const jobSkills = job.skills.map(s => s.toLowerCase());
        const hasOverlap = userSkills.some(s => jobSkills.includes(s));
        if (hasOverlap) score += 15;
    }

    // 6. Recency (+5)
    if (job.postedDaysAgo <= 2) {
        score += 5;
    }

    // 7. Source (+5)
    if (job.source === 'LinkedIn') {
        score += 5;
    }

    return Math.min(score, 100);
};

export const getScoreColor = (score) => {
    if (score >= 80) return '#4D5D44'; // Green (Success)
    if (score >= 60) return '#B8860B'; // Amber (Muted)
    if (score >= 40) return '#8B0000'; // Accent (Neutral here)
    return '#666666'; // Grey
};
