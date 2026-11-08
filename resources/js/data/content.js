// Static content (only Projects is database-driven in this activity)
export const SKILLS = [
    ['Adobe Photoshop', 'Primary tool', 'Advanced photo manipulation, non-destructive editing, commercial retouching, and mockups.', 95, 'design'],
    ['Adobe Illustrator', 'Vector suite', 'Vector identity creation, brand collateral, scalable iconography, and print-prepress assets.', 90, 'design'],
    ['Adobe InDesign', 'Editorial', 'Multi-page publication design, editorial grid architecture, typography, and audit reports.', 88, 'design'],
    ['Adobe Lightroom', 'Color suite', 'Batch RAW processing, filmic tone curves, calibrated color grading, and asset curation.', 92, 'design'],
    ['UI/UX & Figma', 'Prototyping', 'Design systems, hi-fi wireframes, interactive dashboard prototypes, responsive component kits.', 91, 'design'],
    ['Python for Security', 'Scripting', 'Custom socket port scanners, log analysis parsers, HTTP scrapers, and automation utilities.', 84, 'security'],
    ['TryHackMe & CTFs', 'Active labs', 'Pre-Security, Jr Penetration Tester path, privilege escalation rooms, write-ups documentation.', 95, 'security'],
].map(([name, tag, description, proficiency, category], id) => ({ id, name, tag, description, proficiency, category }));

export const EDUCATION = [
    {
        meta: '2023 — PRESENT · URDANETA CITY UNIVERSITY',
        title: 'Bachelor of Science in Information Technology (BSIT)',
        text: 'Focusing on layouting, graphics design, networking, and web systems, combining academic theory with applied lab implementations in network segmentation and UI design.',
        chips: ['Computer Networks', 'Layout', 'Graphic Designs'],
    },
    {
        meta: '2021 — 2023 · SAN PEDRO NATIONAL HIGH SCHOOL',
        title: 'Computer System Servicing',
        text: 'Fundamental education in computers and how they work. Built a strong foundation that inspired me to take the path in technology and in journalism, being a layout artist.',
        chips: ['Intro to computer world', 'Intro to Layouting', 'Peer Mentorship'],
    },
];

export const CERTS = [
    {
        meta: 'ONGOING · TRYHACKME',
        title: 'Pre-Security & Jr Penetration Tester Path',
        text: 'Guided labs on networking, web exploitation, and privilege escalation, with write-ups documented per room.',
    },
    {
        meta: 'FREELANCE',
        title: 'Layout & Graphic Design Commissions',
        text: 'Brand collateral, editorial layouts, and photo retouching for small clients and student publications.',
    },
];
