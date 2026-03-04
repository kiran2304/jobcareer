export const SKILL_CATEGORIES = {
    "Core CS": ["DSA", "OOP", "DBMS", "OS", "Networks", "Operating Systems", "Object Oriented"],
    "Languages": ["Java", "Python", "JavaScript", "TypeScript", "C", "C++", "C#", "Go", "Golang", "JS", "TS"],
    "Web": ["React", "Next.js", "Node.js", "Express", "REST", "GraphQL", "HTML", "CSS", "Frontend", "Backend"],
    "Data": ["SQL", "MongoDB", "PostgreSQL", "MySQL", "Redis", "Database"],
    "Cloud/DevOps": ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "CI/CD", "Linux", "Jenkins"],
    "Testing": ["Selenium", "Cypress", "Playwright", "JUnit", "PyTest", "Jest"]
};

export const analyzeJD = (jdText, company, role) => {
    const textBase = jdText.toLowerCase();

    // 1. Skill Extraction
    const extractedSkills = {};
    let foundCategoriesCount = 0;
    let totalSkillsFound = 0;

    Object.keys(SKILL_CATEGORIES).forEach(category => {
        const found = [];
        SKILL_CATEGORIES[category].forEach(skill => {
            // using boundary to match exact skill if possible, but simple includes is often enough 
            // for case insensitive text matching
            const lowerSkill = skill.toLowerCase();
            // Escape special regex characters
            const escapedSkill = lowerSkill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`\\b${escapedSkill}\\b`, 'i');
            // fallback for Next.js, Node.js etc
            if (regex.test(textBase) || textBase.includes(lowerSkill)) {
                if (!found.includes(skill)) found.push(skill);
            }
        });
        if (found.length > 0) {
            extractedSkills[category] = found;
            foundCategoriesCount++;
            totalSkillsFound += found.length;
        }
    });

    if (Object.keys(extractedSkills).length === 0) {
        extractedSkills["General"] = ["General fresher stack"];
    }

    // 2. Readiness Score
    let score = 35;
    score += Math.min(30, foundCategoriesCount * 5);
    if (company && company.trim().length > 0) score += 10;
    if (role && role.trim().length > 0) score += 10;
    if (jdText && jdText.length > 800) score += 10;
    score = Math.min(100, score);

    // 3. Generate outputs
    const allSkills = Object.values(extractedSkills).flat();
    const hasSkill = (k) => textBase.includes(k.toLowerCase());

    // A) Round-wise preparation checklist
    const checklist = [
        {
            round: "Round 1: Aptitude / Basics",
            items: [
                "Review quantitative aptitude and logical reasoning.",
                "Practice verbal ability and reading comprehension.",
                "Revise CS fundamentals (OS, DBMS, Computer Networks).",
                "Brush up on basic programming syntax.",
                "Take 2 timed mock aptitude tests."
            ]
        },
        {
            round: "Round 2: DSA + Core CS",
            items: [
                "Practice easy to medium LeetCode array and string problems.",
                "Review common sorting and searching algorithms.",
                "Revise Object-Oriented Programming principles.",
                extractedSkills["Core CS"] ? `Focus on specific core concepts: ${extractedSkills["Core CS"].join(', ')}.` : "Practice linked lists and trees.",
                hasSkill("sql") ? "Practice advanced SQL queries and joins." : "Review standard database normalization forms."
            ]
        },
        {
            round: "Round 3: Tech interview (projects + stack)",
            items: [
                "Prepare a 2-minute pitch for your best project.",
                extractedSkills["Web"] ? `Brush up on framework specifics: ${extractedSkills["Web"].join(', ')}.` : "Review REST API design principles.",
                "Be ready to explain the architecture of your previous work.",
                extractedSkills["Testing"] ? `Review testing methodologies (${extractedSkills["Testing"].join(', ')}).` : "Review unit testing basics.",
                "Prepare to talk about challenges faced and how you solved them."
            ]
        },
        {
            round: "Round 4: Managerial / HR",
            items: [
                "Prepare STAR method stories for behavioral questions.",
                company ? `Research ${company}'s recent news and core values.` : "Research target company values.",
                role ? `Align your past experiences with the ${role} requirements.` : "Align past experiences with the role.",
                "Prepare 3 insightful questions to ask the interviewer.",
                "Review standard HR questions (strengths, weaknesses, where do you see yourself)."
            ]
        }
    ];

    // B) 7-day plan
    const plan = [
        { day: "Day 1-2", focus: "Basics + core CS", details: `Review fundamental CS concepts. ${extractedSkills["Core CS"] ? 'Focus heavily on ' + extractedSkills["Core CS"].join(', ') + '.' : 'Ensure general OOP and DBMS knowledge.'}` },
        { day: "Day 3-4", focus: "DSA + coding practice", details: `Solve 5-8 medium level algorithmic problems. ${extractedSkills["Languages"] ? 'Use your strongest language: ' + extractedSkills["Languages"][0] + '.' : ''}` },
        { day: "Day 5", focus: "Project + resume alignment", details: `Align your resume with the Job Description. Be ready to explain your architecture.` },
        { day: "Day 6", focus: "Mock interview questions", details: `Self-evaluate using the generated interview questions.` },
        { day: "Day 7", focus: "Revision + weak areas", details: `Light review of specific frameworks and languages. ${extractedSkills["Web"] ? 'Revise ' + extractedSkills["Web"].join(', ') + ' concepts.' : 'Rest and mental prep.'}` }
    ];

    // C) 10 likely interview questions
    const questions = [];
    if (extractedSkills["Core CS"]) questions.push("Explain the four main principles of Object-Oriented Programming with real-world examples.");
    if (hasSkill("sql") || hasSkill("mysql") || hasSkill("postgresql")) questions.push("Explain database indexing and when it significantly helps performance.");
    if (hasSkill("mongodb") || hasSkill("nosql")) questions.push("When would you choose a NoSQL database over a relational database?");
    if (hasSkill("react")) questions.push("Explain state management options in React and when to use Context API vs Redux.");
    if (hasSkill("java")) questions.push("How does garbage collection work in Java?");
    if (hasSkill("python")) questions.push("What are decorators in Python and how do you use them?");
    if (hasSkill("javascript") || hasSkill("js")) questions.push("Explain the concept of closures in JavaScript and provide a practical use case.");
    if (hasSkill("node.js") || hasSkill("express")) questions.push("How does Node.js handle asynchronous operations despite being single-threaded?");
    if (hasSkill("docker") || hasSkill("kubernetes")) questions.push("Explain the difference between a container and a virtual machine.");
    if (hasSkill("aws") || hasSkill("azure") || hasSkill("gcp")) questions.push("How would you design a highly available architecture in the cloud?");

    // Add generic questions to reach 10
    const generics = [
        "How would you optimize search in sorted data?",
        "Describe a time you solved a particularly difficult technical bug.",
        "How do you ensure your code is secure and handles edge cases?",
        "Explain the difference between threading and multiprocessing.",
        "What happens behind the scenes when you type a URL into a browser?",
        "How do you design an API that needs to handle high scale traffic?",
        "Describe your approach to writing unit tests for a new feature.",
        "How would you handle a situation where a critical production system goes down?",
        "What is your strategy for learning a completely new technology stack?",
        "Can you explain a complex project you worked on recently?"
    ];

    for (let i = 0; questions.length < 10 && i < generics.length; i++) {
        questions.push(generics[i]);
    }

    return {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        company,
        role,
        jdText,
        extractedSkills,
        plan,
        checklist,
        questions,
        readinessScore: score
    };
};
