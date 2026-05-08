// ===== Tennis Racket Recommender =====

// ----- Question definitions -----
const QUESTIONS = [
    {
        id: 'years',
        title: 'How long have you been playing tennis?',
        help: 'Total time on court, casually or competitively.',
        options: [
            { value: 1, label: 'Just starting', sub: '0–6 months' },
            { value: 2, label: 'Beginner', sub: '6 months – 2 years' },
            { value: 3, label: 'Intermediate', sub: '2–5 years' },
            { value: 4, label: 'Advanced', sub: '5+ years' },
            { value: 5, label: 'Expert / Tournament', sub: 'Years of competitive play' }
        ]
    },
    {
        id: 'rating',
        title: 'What is your approximate rating?',
        help: 'NTRP/UTR self-assessment. Pick what feels closest.',
        options: [
            { value: 1, label: '1.0 – 2.5', sub: 'Developing strokes, learning basics' },
            { value: 2, label: '2.5 – 3.0', sub: 'Can rally consistently at slow pace' },
            { value: 3, label: '3.0 – 3.5', sub: 'Steady rallies, basic placement' },
            { value: 4, label: '4.0 – 4.5', sub: 'Varied shots, tactical play' },
            { value: 5, label: '5.0+', sub: 'Tournament/college-level' }
        ]
    },
    {
        id: 'frequency',
        title: 'How often do you play?',
        help: 'Frequency tells us how much your arm tolerates demanding frames.',
        options: [
            { value: 1, label: 'Less than once a month', sub: 'Casual / occasional' },
            { value: 2, label: '1–2 times per week', sub: 'Recreational' },
            { value: 3, label: '3–4 times per week', sub: 'Regular' },
            { value: 4, label: '5+ times per week', sub: 'Daily / competitive' }
        ]
    },
    {
        id: 'court',
        title: 'Where do you prefer to play on the court?',
        help: 'Your typical court position when you’re winning points.',
        options: [
            { value: 'baseline', label: 'Baseline grinder', sub: 'Big topspin, long rallies' },
            { value: 'allcourt', label: 'All-court player', sub: 'Mix of baseline and net' },
            { value: 'net', label: 'Serve & volley / net rusher', sub: 'Quick to the net' },
            { value: 'defensive', label: 'Counterpuncher', sub: 'Defensive, retrieve everything' }
        ]
    },
    {
        id: 'strokes',
        title: 'How would you describe your strokes?',
        help: 'Swing length and shot shape on most groundstrokes.',
        options: [
            { value: 'compact', label: 'Compact & flat', sub: 'Short backswing, lower spin' },
            { value: 'topspin', label: 'Long & full with heavy topspin', sub: 'Modern western/semi-western grip' },
            { value: 'mixed', label: 'Mix of topspin and slice', sub: 'All-court variety' },
            { value: 'developing', label: 'Still developing', sub: 'Working on form' }
        ]
    },
    {
        id: 'backhand',
        title: 'Your backhand is…',
        help: 'One-handers usually prefer head-light, more stable frames.',
        options: [
            { value: 'one', label: 'One-handed' },
            { value: 'two', label: 'Two-handed' },
            { value: 'either', label: 'Both / undecided' }
        ]
    },
    {
        id: 'improve',
        title: 'What part of your game needs the most help from a racket?',
        help: 'The single biggest thing you want the racket to add.',
        options: [
            { value: 'power', label: 'Power', sub: 'Hit deeper, heavier balls' },
            { value: 'control', label: 'Control / precision', sub: 'Place balls more accurately' },
            { value: 'spin', label: 'Spin', sub: 'More topspin, kick serves' },
            { value: 'comfort', label: 'Comfort / feel', sub: 'Reduce shock, plush response' },
            { value: 'maneuver', label: 'Maneuverability', sub: 'Faster swings, quicker hands' }
        ]
    },
    {
        id: 'strength',
        title: 'How would you describe your physical strength?',
        help: 'Helps us match the right racket weight.',
        options: [
            { value: 1, label: 'Lighter build / less arm strength', sub: 'Prefer easy-to-swing rackets' },
            { value: 2, label: 'Average', sub: 'Comfortable with mid-weights' },
            { value: 3, label: 'Strong / athletic', sub: 'Can handle a heavier frame' }
        ]
    },
    {
        id: 'age',
        title: 'What is your age range?',
        help: 'We adjust comfort weighting for older and younger players.',
        options: [
            { value: 'youth', label: 'Under 18' },
            { value: 'adult', label: '18 – 35' },
            { value: 'mid', label: '36 – 55' },
            { value: 'senior', label: '55+' }
        ]
    },
    {
        id: 'injury',
        title: 'Any history of arm injuries?',
        help: 'Tennis elbow, shoulder, or wrist issues steer us toward flexible, plush frames.',
        options: [
            { value: 'none', label: 'No injuries' },
            { value: 'past', label: 'Past injury (recovered)' },
            { value: 'current', label: 'Current / recurring issue' }
        ]
    },
    {
        id: 'budget',
        title: 'What is your budget?',
        help: 'We will only show rackets in your range.',
        options: [
            { value: 130, label: 'Under $130', sub: 'Recreational / starter' },
            { value: 200, label: '$130 – $200', sub: 'Solid mid-tier' },
            { value: 280, label: '$200 – $280', sub: 'Performance frames' },
            { value: 9999, label: 'No limit', sub: 'Show me the best fit' }
        ]
    },
    {
        id: 'priority',
        title: 'Top priority overall',
        help: 'If you could only have one of these in a racket, which?',
        options: [
            { value: 'power', label: 'Power' },
            { value: 'control', label: 'Precision' },
            { value: 'spin', label: 'Spin' },
            { value: 'comfort', label: 'Comfort' },
            { value: 'allround', label: 'All-round versatility' }
        ]
    }
];

// ----- Racket database -----
// Attributes: power, control, spin, comfort, maneuverability — all 1–5.
// difficulty: target skill level 1 (beginner) to 5 (advanced).
const RACKETS = [
    {
        id: 'pure-aero',
        name: 'Babolat Pure Aero',
        tagline: 'Heavy topspin, aggressive baseline weapon',
        head: 100, weight: 300, balance: '4 pts HL', pattern: '16x19', stiffness: 70,
        power: 4, control: 3, spin: 5, comfort: 2, maneuverability: 3,
        difficulty: 3, price: 229, weightClass: 'medium',
        styles: ['baseline'],
        stringRec: 'Polyester (e.g., RPM Blast 17g) at 50–55 lbs for spin & durability',
        frame: '#f7e94c', accent: '#0a0a0a',
        purchase: 'https://www.tennis-warehouse.com/searchresults_c.html?kwc=Babolat+Pure+Aero'
    },
    {
        id: 'pure-drive',
        name: 'Babolat Pure Drive',
        tagline: 'Effortless power, the modern all-court favorite',
        head: 100, weight: 300, balance: '4 pts HL', pattern: '16x19', stiffness: 71,
        power: 5, control: 3, spin: 4, comfort: 2, maneuverability: 3,
        difficulty: 3, price: 229, weightClass: 'medium',
        styles: ['baseline', 'allcourt'],
        stringRec: 'Multifilament (e.g., NRG2 16g) at 54–58 lbs to soften the frame',
        frame: '#1f6feb', accent: '#0a1530',
        purchase: 'https://www.tennis-warehouse.com/searchresults_c.html?kwc=Babolat+Pure+Drive'
    },
    {
        id: 'rf97',
        name: 'Wilson Pro Staff RF97 v14',
        tagline: 'Federer’s classic — rewarding and demanding',
        head: 97, weight: 340, balance: '9 pts HL', pattern: '16x19', stiffness: 65,
        power: 2, control: 5, spin: 3, comfort: 3, maneuverability: 2,
        difficulty: 5, price: 269, weightClass: 'heavy',
        styles: ['allcourt', 'net'],
        stringRec: 'Natural gut / poly hybrid at 52–55 lbs for buttery feel',
        frame: '#9b1c1c', accent: '#1a1a1a',
        purchase: 'https://www.tennis-warehouse.com/searchresults_c.html?kwc=Wilson+Pro+Staff+RF97'
    },
    {
        id: 'blade-98',
        name: 'Wilson Blade 98 v9 (16x19)',
        tagline: 'Plush feel and control with modern bite',
        head: 98, weight: 305, balance: '7 pts HL', pattern: '16x19', stiffness: 62,
        power: 3, control: 5, spin: 4, comfort: 4, maneuverability: 3,
        difficulty: 4, price: 249, weightClass: 'medium',
        styles: ['allcourt', 'baseline'],
        stringRec: 'Multifilament or soft co-poly at 52–55 lbs for arm comfort and feel',
        frame: '#1f6f3a', accent: '#0c1a14',
        purchase: 'https://www.tennis-warehouse.com/searchresults_c.html?kwc=Wilson+Blade+98+v9'
    },
    {
        id: 'clash-100',
        name: 'Wilson Clash 100 v3',
        tagline: 'Maximum arm-friendly comfort, easy to swing',
        head: 100, weight: 295, balance: '4 pts HL', pattern: '16x19', stiffness: 55,
        power: 3, control: 4, spin: 3, comfort: 5, maneuverability: 4,
        difficulty: 2, price: 249, weightClass: 'medium',
        styles: ['allcourt', 'defensive'],
        stringRec: 'Multifilament (e.g., Wilson NXT 16g) at 50–55 lbs for plush response',
        frame: '#c0392b', accent: '#101820',
        purchase: 'https://www.tennis-warehouse.com/searchresults_c.html?kwc=Wilson+Clash+100'
    },
    {
        id: 'speed-mp',
        name: 'Head Speed MP',
        tagline: 'Versatile all-court precision used by Sinner',
        head: 100, weight: 300, balance: '4 pts HL', pattern: '16x19', stiffness: 64,
        power: 4, control: 4, spin: 4, comfort: 3, maneuverability: 4,
        difficulty: 3, price: 230, weightClass: 'medium',
        styles: ['allcourt', 'baseline', 'net'],
        stringRec: 'Hybrid: polyester mains / multifilament crosses at 52–55 lbs',
        frame: '#f1f1f1', accent: '#0e0e0e',
        purchase: 'https://www.tennis-warehouse.com/searchresults_c.html?kwc=Head+Speed+MP'
    },
    {
        id: 'ezone-100',
        name: 'Yonex EZONE 100',
        tagline: 'Power and comfort in equal measure',
        head: 100, weight: 300, balance: '3 pts HL', pattern: '16x19', stiffness: 65,
        power: 4, control: 4, spin: 4, comfort: 5, maneuverability: 3,
        difficulty: 3, price: 259, weightClass: 'medium',
        styles: ['baseline', 'allcourt'],
        stringRec: 'Soft co-poly (e.g., Poly Tour Pro 16g) at 48–52 lbs',
        frame: '#1ea7e6', accent: '#0c2c44',
        purchase: 'https://www.tennis-warehouse.com/searchresults_c.html?kwc=Yonex+EZONE+100'
    },
    {
        id: 'radical-mp',
        name: 'Head Radical MP',
        tagline: 'All-court control with a dose of pop',
        head: 98, weight: 300, balance: '4 pts HL', pattern: '16x19', stiffness: 65,
        power: 3, control: 5, spin: 4, comfort: 4, maneuverability: 4,
        difficulty: 4, price: 229, weightClass: 'medium',
        styles: ['allcourt', 'net'],
        stringRec: 'Hybrid or full multifilament at 53–56 lbs for control + comfort',
        frame: '#e67e22', accent: '#101820',
        purchase: 'https://www.tennis-warehouse.com/searchresults_c.html?kwc=Head+Radical+MP'
    },
    {
        id: 'boost-drive',
        name: 'Babolat Boost Drive',
        tagline: 'Lightweight, easy power for new players',
        head: 105, weight: 260, balance: '2 pts HH', pattern: '16x19', stiffness: 68,
        power: 5, control: 2, spin: 3, comfort: 5, maneuverability: 5,
        difficulty: 1, price: 109, weightClass: 'light',
        styles: ['baseline', 'defensive'],
        stringRec: 'Pre-strung synthetic gut at 55 lbs is fine; upgrade to multifilament when worn',
        frame: '#2980b9', accent: '#101820',
        purchase: 'https://www.tennis-warehouse.com/searchresults_c.html?kwc=Babolat+Boost+Drive'
    },
    {
        id: 'vcore-98',
        name: 'Yonex VCORE 98',
        tagline: 'Massive spin with predictable control',
        head: 98, weight: 305, balance: '5 pts HL', pattern: '16x20', stiffness: 65,
        power: 3, control: 4, spin: 5, comfort: 3, maneuverability: 3,
        difficulty: 4, price: 259, weightClass: 'medium',
        styles: ['baseline', 'allcourt'],
        stringRec: 'Spin polyester (e.g., Poly Tour Spin 16g) at 50–54 lbs',
        frame: '#c0392b', accent: '#1a1a1a',
        purchase: 'https://www.tennis-warehouse.com/searchresults_c.html?kwc=Yonex+VCORE+98'
    },
    {
        id: 'ultra-100',
        name: 'Wilson Ultra 100 v4',
        tagline: 'Crisp power with a forgiving feel',
        head: 100, weight: 300, balance: '4 pts HL', pattern: '16x19', stiffness: 68,
        power: 5, control: 3, spin: 4, comfort: 4, maneuverability: 3,
        difficulty: 2, price: 239, weightClass: 'medium',
        styles: ['baseline', 'allcourt'],
        stringRec: 'Multifilament at 54–58 lbs for power-control balance',
        frame: '#0a3a82', accent: '#e6e6e6',
        purchase: 'https://www.tennis-warehouse.com/searchresults_c.html?kwc=Wilson+Ultra+100'
    },
    {
        id: 'prince-tour-100',
        name: 'Prince Textreme ATS Tour 100 (310g)',
        tagline: 'Underrated all-court value performer',
        head: 100, weight: 310, balance: '4 pts HL', pattern: '16x18', stiffness: 66,
        power: 4, control: 4, spin: 5, comfort: 4, maneuverability: 3,
        difficulty: 3, price: 199, weightClass: 'medium',
        styles: ['allcourt', 'baseline'],
        stringRec: 'Co-poly main / multifilament cross at 52–55 lbs',
        frame: '#0e1730', accent: '#1ea7e6',
        purchase: 'https://www.tennis-warehouse.com/searchresults_c.html?kwc=Prince+Textreme+Tour+100'
    }
];

// ----- Profile builder -----
function buildProfile(answers) {
    // Skill level: blend years, rating, frequency
    const skill = (answers.years + answers.rating) / 2 + (answers.frequency >= 3 ? 0.5 : 0);
    const skillRounded = Math.max(1, Math.min(5, Math.round(skill)));

    // Comfort priority — boosted by injury, age, light build, low frequency
    let comfortNeed = 2;
    if (answers.injury === 'past') comfortNeed += 1.5;
    if (answers.injury === 'current') comfortNeed += 3;
    if (answers.age === 'senior') comfortNeed += 1.5;
    if (answers.age === 'mid') comfortNeed += 0.5;
    if (answers.age === 'youth') comfortNeed += 0.5;
    if (answers.strength === 1) comfortNeed += 0.5;
    if (answers.priority === 'comfort') comfortNeed += 1.5;
    if (answers.improve === 'comfort') comfortNeed += 1;

    // Power need — defaults higher for compact strokes, beginners, defensive style
    let powerNeed = 3;
    if (answers.improve === 'power') powerNeed += 2;
    if (answers.priority === 'power') powerNeed += 1;
    if (answers.strokes === 'compact') powerNeed += 1;
    if (answers.strokes === 'developing') powerNeed += 0.5;
    if (answers.court === 'defensive') powerNeed += 0.5;
    if (skillRounded <= 2) powerNeed += 1;

    // Control need — higher for advanced players, flat hitters, precision priority
    let controlNeed = 3;
    if (answers.improve === 'control') controlNeed += 2;
    if (answers.priority === 'control') controlNeed += 1;
    if (skillRounded >= 4) controlNeed += 1;
    if (answers.strokes === 'compact') controlNeed += 0.5;

    // Spin need
    let spinNeed = 3;
    if (answers.improve === 'spin') spinNeed += 2;
    if (answers.priority === 'spin') spinNeed += 1;
    if (answers.strokes === 'topspin') spinNeed += 1.5;
    if (answers.court === 'baseline') spinNeed += 0.5;

    // Maneuverability — net rushers, one-handers, lighter builds, juniors/seniors
    let maneuverNeed = 3;
    if (answers.improve === 'maneuver') maneuverNeed += 2;
    if (answers.court === 'net') maneuverNeed += 1;
    if (answers.backhand === 'one') maneuverNeed += 0.5;
    if (answers.strength === 1) maneuverNeed += 0.5;
    if (answers.age === 'senior') maneuverNeed += 1;

    // Preferred weight class from strength + age
    let preferredWeight;
    if (answers.strength === 1 || answers.age === 'senior' || answers.age === 'youth') {
        preferredWeight = 'light';
    } else if (answers.strength === 3 && skillRounded >= 4) {
        preferredWeight = 'heavy';
    } else {
        preferredWeight = 'medium';
    }

    return {
        skill: skillRounded,
        powerNeed: clamp(powerNeed),
        controlNeed: clamp(controlNeed),
        spinNeed: clamp(spinNeed),
        comfortNeed: clamp(comfortNeed),
        maneuverNeed: clamp(maneuverNeed),
        preferredWeight,
        budget: answers.budget,
        style: answers.court,
        injury: answers.injury,
        priority: answers.priority,
        improve: answers.improve,
        backhand: answers.backhand
    };
}

function clamp(n, lo = 1, hi = 5) {
    return Math.max(lo, Math.min(hi, n));
}

// ----- Scoring -----
function scoreRacket(racket, profile) {
    let score = 0;

    // Skill match (max 25). Penalize big mismatches; especially harsh for too-advanced rackets.
    // Going below skill is fine — comfort-focused/forgiving frames are valid choices for any level.
    const skillDiff = racket.difficulty - profile.skill;
    let skillScore;
    if (skillDiff > 0) {
        skillScore = Math.max(0, 25 - skillDiff * 11); // racket too advanced — risky
    } else {
        skillScore = Math.max(0, 25 - Math.abs(skillDiff) * 2.5); // racket easier than user — small penalty
    }
    score += skillScore;

    // Attribute satisfaction (max 60 across 5 attrs)
    const attrPairs = [
        ['power', profile.powerNeed],
        ['control', profile.controlNeed],
        ['spin', profile.spinNeed],
        ['comfort', profile.comfortNeed],
        ['maneuverability', profile.maneuverNeed]
    ];
    for (const [attr, need] of attrPairs) {
        const have = racket[attr];
        const isPriority = isPriorityAttr(attr, profile);
        // Hard penalty for shortfall on priority attrs; lighter for non-priority.
        let attrScore;
        if (have >= need) {
            attrScore = 12;
        } else {
            const penaltyPerPt = isPriority ? 4 : 2;
            attrScore = 12 - (need - have) * penaltyPerPt;
        }
        const weight = isPriority ? 1.4 : 1;
        score += Math.max(0, attrScore) * weight;
    }

    // Weight class match (max 8)
    if (racket.weightClass === profile.preferredWeight) {
        score += 8;
    } else if (
        (racket.weightClass === 'medium' && profile.preferredWeight !== 'medium') ||
        (profile.preferredWeight === 'medium' && racket.weightClass !== 'medium')
    ) {
        score += 4; // adjacent
    }

    // Style match (max 6)
    if (racket.styles.includes(profile.style)) {
        score += 6;
    }

    // Injury safeguard: hard penalty for stiff frames if currently injured
    if (profile.injury === 'current' && racket.stiffness >= 68) {
        score -= 18;
    } else if (profile.injury === 'past' && racket.stiffness >= 70) {
        score -= 8;
    }

    // Budget filter: hard penalty over budget
    if (racket.price > profile.budget) {
        score -= 100;
    }

    return Math.max(0, score);
}

function isPriorityAttr(attr, profile) {
    const map = { power: 'power', control: 'control', spin: 'spin', comfort: 'comfort', maneuverability: 'maneuver' };
    return profile.priority === map[attr] || profile.improve === map[attr];
}

// ----- Reasoning text -----
function explainMatch(racket, profile) {
    const reasons = [];
    if (Math.abs(racket.difficulty - profile.skill) <= 1) {
        reasons.push(`well-matched to your skill level`);
    }
    if (racket.weightClass === profile.preferredWeight) {
        reasons.push(`${racket.weightClass}-weight suits your build`);
    }
    if (profile.priority === 'power' && racket.power >= 4) reasons.push('delivers the power you want');
    if (profile.priority === 'control' && racket.control >= 4) reasons.push('rewards precision');
    if (profile.priority === 'spin' && racket.spin >= 4) reasons.push('huge spin window');
    if (profile.priority === 'comfort' && racket.comfort >= 4) reasons.push('plush, arm-friendly response');
    if (profile.improve === 'spin' && racket.spin >= 4) reasons.push('helps you find more topspin');
    if (profile.improve === 'control' && racket.control >= 4) reasons.push('improves your placement');
    if (profile.improve === 'power' && racket.power >= 4) reasons.push('adds depth & pace');
    if (profile.improve === 'comfort' && racket.comfort >= 4) reasons.push('softens impact on the arm');
    if (profile.injury !== 'none' && racket.stiffness < 66) reasons.push('flexible frame is gentle on the arm');
    if (racket.styles.includes(profile.style)) reasons.push(`fits your ${labelStyle(profile.style)} game`);
    if (reasons.length === 0) reasons.push('balanced fit across your inputs');
    // De-dup and join naturally
    const unique = [...new Set(reasons)];
    return unique.slice(0, 4).join(' · ');
}

function labelStyle(s) {
    return ({ baseline: 'baseline', allcourt: 'all-court', net: 'net-rushing', defensive: 'defensive' })[s] || s;
}

// ----- String / tension recommendation tailoring -----
function tailoredStringAdvice(racket, profile) {
    let baseAdvice = racket.stringRec;
    const notes = [];
    if (profile.injury === 'current') {
        notes.push('With a current injury, drop tension 2–4 lbs and lean toward natural gut or premium multifilament.');
    } else if (profile.injury === 'past') {
        notes.push('Given past injury, avoid stiff polys at high tension; multifilament or hybrid is safer.');
    }
    if (profile.priority === 'spin' && profile.skill >= 3 && racket.spin >= 4) {
        notes.push('Polyester mains will maximize spin; replace every 30–40 hours.');
    }
    if (profile.priority === 'power' && profile.skill <= 3) {
        notes.push('String 2–3 lbs lower than the midpoint for extra power.');
    }
    if (profile.priority === 'control' && profile.skill >= 4) {
        notes.push('String 2–3 lbs higher for tighter control.');
    }
    return { baseAdvice, notes };
}

// ----- SVG racket renderer -----
function racketSVG(racket) {
    const { frame, accent, head } = racket;
    // Visualize head size: 95–110 -> rx scale
    const rx = 70 + (head - 95) * 1.2;
    const ry = 90 + (head - 95) * 1.5;
    const stringColor = '#f4f4ec';

    // Build vertical strings within ellipse approximate range
    const verticals = [];
    const horizontals = [];
    const cx = 100, cy = 120;
    for (let i = -5; i <= 5; i++) {
        const x = cx + i * (rx / 7);
        // Compute y bounds along ellipse: y = cy ± ry * sqrt(1 - ((x-cx)/rx)^2)
        const t = (x - cx) / rx;
        if (t * t < 1) {
            const dy = ry * Math.sqrt(1 - t * t);
            verticals.push(`<line x1="${x.toFixed(1)}" y1="${(cy - dy + 3).toFixed(1)}" x2="${x.toFixed(1)}" y2="${(cy + dy - 3).toFixed(1)}" />`);
        }
    }
    for (let j = -6; j <= 6; j++) {
        const y = cy + j * (ry / 8);
        const t = (y - cy) / ry;
        if (t * t < 1) {
            const dx = rx * Math.sqrt(1 - t * t);
            horizontals.push(`<line x1="${(cx - dx + 3).toFixed(1)}" y1="${y.toFixed(1)}" x2="${(cx + dx - 3).toFixed(1)}" y2="${y.toFixed(1)}" />`);
        }
    }

    return `<svg viewBox="0 0 200 360" xmlns="http://www.w3.org/2000/svg" aria-label="${racket.name} illustration">
        <defs>
            <linearGradient id="grad-${racket.id}" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="${frame}" stop-opacity="1"/>
                <stop offset="100%" stop-color="${frame}" stop-opacity="0.78"/>
            </linearGradient>
        </defs>
        <!-- string bed background -->
        <ellipse cx="${cx}" cy="${cy}" rx="${rx - 6}" ry="${ry - 6}" fill="rgba(255,255,255,0.04)"/>
        <!-- strings -->
        <g stroke="${stringColor}" stroke-width="0.8" opacity="0.8">
            ${verticals.join('')}
            ${horizontals.join('')}
        </g>
        <!-- frame -->
        <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="url(#grad-${racket.id})" stroke-width="9"/>
        <!-- throat: two diagonal lines from frame to shaft -->
        <path d="M ${cx - rx * 0.55} ${cy + ry * 0.92} L ${cx - 8} ${cy + ry + 18} L ${cx + 8} ${cy + ry + 18} L ${cx + rx * 0.55} ${cy + ry * 0.92}"
              fill="${frame}" opacity="0.95"/>
        <!-- shaft -->
        <rect x="${cx - 9}" y="${cy + ry + 16}" width="18" height="60" fill="${frame}"/>
        <!-- grip -->
        <rect x="${cx - 13}" y="${cy + ry + 72}" width="26" height="80" rx="3" fill="${accent}"/>
        <!-- grip wrap lines -->
        <g stroke="${frame}" stroke-width="0.8" opacity="0.6">
            ${[0, 1, 2, 3, 4, 5, 6, 7].map(i => {
                const y = cy + ry + 78 + i * 9;
                return `<line x1="${cx - 13}" y1="${y}" x2="${cx + 13}" y2="${y - 3}"/>`;
            }).join('')}
        </g>
        <!-- butt cap -->
        <rect x="${cx - 14}" y="${cy + ry + 150}" width="28" height="6" rx="2" fill="${frame}"/>
    </svg>`;
}

// ----- App state and flow -----
const state = {
    answers: {},
    currentIdx: 0
};

const $ = (id) => document.getElementById(id);

function showScreen(name) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    $(name).classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderQuestion() {
    const q = QUESTIONS[state.currentIdx];
    $('questionTitle').textContent = q.title;
    $('questionHelp').textContent = q.help || '';
    const optsEl = $('options');
    optsEl.innerHTML = '';
    const currentValue = state.answers[q.id];

    q.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option' + (currentValue === opt.value ? ' selected' : '');
        btn.innerHTML = `
            <span class="option-icon"></span>
            <span class="option-label">
                ${opt.label}
                ${opt.sub ? `<span class="option-sub">${opt.sub}</span>` : ''}
            </span>
        `;
        btn.addEventListener('click', () => {
            state.answers[q.id] = opt.value;
            renderQuestion();
        });
        optsEl.appendChild(btn);
    });

    const total = QUESTIONS.length;
    $('progressFill').style.width = `${((state.currentIdx) / total) * 100}%`;
    $('progressText').textContent = `Question ${state.currentIdx + 1} of ${total}`;
    $('backBtn').disabled = state.currentIdx === 0;
    $('nextBtn').disabled = state.answers[q.id] === undefined;
    $('nextBtn').textContent = state.currentIdx === total - 1 ? 'See results →' : 'Next →';
}

function renderResults() {
    const profile = buildProfile(state.answers);
    const ranked = RACKETS
        .map(r => ({ racket: r, score: scoreRacket(r, profile) }))
        .sort((a, b) => b.score - a.score);

    // Normalize top scores to a 0–100 match value, max 100 anchored to perfect score (~123)
    const maxPossible = 25 + 60 * 1.4 + 8 + 6; // roughly 123
    // Drop rackets that are out of budget or otherwise badly mismatched.
    const viable = ranked.filter(e => e.score >= 40);
    const top = viable.slice(0, 3);

    // Summary
    const summaryParts = [];
    summaryParts.push(`Skill ${profile.skill}/5`);
    summaryParts.push(`${profile.preferredWeight}-weight`);
    summaryParts.push(`${labelStyle(profile.style)} style`);
    summaryParts.push(`priority: ${profile.priority}`);
    if (profile.injury !== 'none') summaryParts.push(`arm care`);
    $('resultsSummary').textContent = `Profile: ${summaryParts.join(' · ')}`;

    const container = $('recommendations');
    container.innerHTML = '';

    if (top.length === 0) {
        // No racket scored above threshold — likely a tight budget. Show the best in-budget pick(s) anyway.
        const inBudget = ranked.filter(e => e.racket.price <= profile.budget).slice(0, 3);
        if (inBudget.length === 0) {
            container.innerHTML = `<div class="welcome-card" style="text-align:center;">
                <h3>No matches in your budget</h3>
                <p>Try a higher budget tier — most performance rackets are $200+.</p>
            </div>`;
            return;
        }
        top.push(...inBudget);
    }

    top.forEach((entry, i) => {
        const r = entry.racket;
        const matchPct = Math.min(99, Math.round((entry.score / maxPossible) * 100));
        const advice = tailoredStringAdvice(r, profile);
        const reasons = explainMatch(r, profile);
        const rankClass = i === 0 ? 'top' : '';
        const rankBadge = i === 0 ? 'Best match' : (i === 1 ? '2nd pick' : '3rd pick');
        const badgeClass = i === 0 ? '' : (i === 1 ? 'silver' : 'bronze');

        const card = document.createElement('div');
        card.className = `rec-card ${rankClass}`;
        card.innerHTML = `
            <div class="rec-image">
                <span class="rec-rank ${badgeClass}">${rankBadge}</span>
                ${racketSVG(r)}
            </div>
            <div class="rec-body">
                <div class="rec-name">${r.name}</div>
                <div class="rec-tagline">${r.tagline}</div>
                <div class="match-bar">
                    <div class="match-track"><div class="match-fill" style="width:${matchPct}%"></div></div>
                    <div class="match-value">${matchPct}%</div>
                </div>
                <div class="why">Why: ${reasons}</div>
                <div class="specs">
                    <div class="spec"><span class="spec-label">Head size</span><span class="spec-value">${r.head} sq in</span></div>
                    <div class="spec"><span class="spec-label">Weight</span><span class="spec-value">${r.weight}g unstrung</span></div>
                    <div class="spec"><span class="spec-label">Balance</span><span class="spec-value">${r.balance}</span></div>
                    <div class="spec"><span class="spec-label">String pattern</span><span class="spec-value">${r.pattern}</span></div>
                    <div class="spec"><span class="spec-label">Stiffness (RA)</span><span class="spec-value">${r.stiffness}</span></div>
                    <div class="spec"><span class="spec-label">Approx. price</span><span class="spec-value">$${r.price}</span></div>
                </div>
                <div class="string-rec">
                    <strong>Strings &amp; tension:</strong> ${advice.baseAdvice}
                    ${advice.notes.length ? `<br><span style="color: var(--muted); font-size: 13px;">${advice.notes.join(' ')}</span>` : ''}
                </div>
                <div class="rec-actions">
                    <a class="primary" href="${r.purchase}" target="_blank" rel="noopener">Shop on Tennis Warehouse →</a>
                    <a href="https://www.google.com/search?tbm=shop&q=${encodeURIComponent(r.name)}" target="_blank" rel="noopener">Compare prices</a>
                    <a href="https://www.google.com/search?q=${encodeURIComponent(r.name + ' review')}" target="_blank" rel="noopener">Read reviews</a>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// ----- Event wiring -----
document.addEventListener('DOMContentLoaded', () => {
    $('startBtn').addEventListener('click', () => {
        state.answers = {};
        state.currentIdx = 0;
        renderQuestion();
        showScreen('quiz');
    });

    $('nextBtn').addEventListener('click', () => {
        if (state.currentIdx < QUESTIONS.length - 1) {
            state.currentIdx++;
            renderQuestion();
        } else {
            renderResults();
            showScreen('results');
        }
    });

    $('backBtn').addEventListener('click', () => {
        if (state.currentIdx > 0) {
            state.currentIdx--;
            renderQuestion();
        }
    });

    $('retakeBtn').addEventListener('click', () => {
        state.answers = {};
        state.currentIdx = 0;
        showScreen('welcome');
    });
});
