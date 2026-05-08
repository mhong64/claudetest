// ===== The Racket — bespoke tennis racket recommender =====

// ----- Question definitions -----
const QUESTIONS = [
    {
        id: 'years',
        title: 'How long have you been playing?',
        help: 'Total time on court — casual or competitive both count.',
        options: [
            { value: 1, label: 'Just starting', sub: 'Zero to six months' },
            { value: 2, label: 'Beginner', sub: 'Six months to two years' },
            { value: 3, label: 'Intermediate', sub: 'Two to five years' },
            { value: 4, label: 'Advanced', sub: 'Five years or more' },
            { value: 5, label: 'Expert / Tournament', sub: 'Years of competitive play' }
        ]
    },
    {
        id: 'rating',
        title: 'What is your approximate rating?',
        help: 'NTRP / UTR self-assessment. Pick what feels closest.',
        options: [
            { value: 1, label: '1.0 – 2.5', sub: 'Developing strokes, learning basics' },
            { value: 2, label: '2.5 – 3.0', sub: 'Consistent rallies at slow pace' },
            { value: 3, label: '3.0 – 3.5', sub: 'Steady rallies with placement' },
            { value: 4, label: '4.0 – 4.5', sub: 'Varied shots, tactical play' },
            { value: 5, label: '5.0 and above', sub: 'Tournament or college-level' }
        ]
    },
    {
        id: 'frequency',
        title: 'How often do you play?',
        help: 'Frequency tells us how much your arm tolerates demanding frames.',
        options: [
            { value: 1, label: 'Less than once a month', sub: 'Casual / occasional' },
            { value: 2, label: 'One to two times per week', sub: 'Recreational' },
            { value: 3, label: 'Three to four times per week', sub: 'Regular' },
            { value: 4, label: 'Five times per week or more', sub: 'Daily / competitive' }
        ]
    },
    {
        id: 'court',
        title: 'Where do you live on the court?',
        help: 'Your typical position when winning points.',
        options: [
            { value: 'baseline', label: 'A baseline grinder', sub: 'Big topspin, long rallies' },
            { value: 'allcourt', label: 'An all-court player', sub: 'Equally at home anywhere' },
            { value: 'net', label: 'A serve-and-volleyer', sub: 'Always moving forward' },
            { value: 'defensive', label: 'A counterpuncher', sub: 'Defensive, retrieving everything' }
        ]
    },
    {
        id: 'strokes',
        title: 'How would you describe your strokes?',
        help: 'Swing length and shot shape on most groundstrokes.',
        options: [
            { value: 'compact', label: 'Compact and flat', sub: 'Short backswing, lower spin' },
            { value: 'topspin', label: 'Long and full with heavy topspin', sub: 'Modern western / semi-western grip' },
            { value: 'mixed', label: 'A mix of topspin and slice', sub: 'Variety, all-court feel' },
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
            { value: 'either', label: 'Both, or undecided' }
        ]
    },
    {
        id: 'improve',
        title: 'What part of your game most needs help?',
        help: 'The single biggest thing you want a racket to add.',
        options: [
            { value: 'power', label: 'Power', sub: 'Hit deeper, heavier balls' },
            { value: 'control', label: 'Control and precision', sub: 'Place balls more accurately' },
            { value: 'spin', label: 'Spin', sub: 'More topspin, kick serves' },
            { value: 'comfort', label: 'Comfort and feel', sub: 'Reduce shock, plush response' },
            { value: 'maneuver', label: 'Maneuverability', sub: 'Faster swings, quicker hands' }
        ]
    },
    {
        id: 'strength',
        title: 'How would you describe your physical strength?',
        help: 'Helps us match the right racket weight.',
        options: [
            { value: 1, label: 'Lighter build, less arm strength', sub: 'Prefer easy-to-swing rackets' },
            { value: 2, label: 'Average', sub: 'Comfortable with mid-weights' },
            { value: 3, label: 'Strong, athletic build', sub: 'Can handle a heavier frame' }
        ]
    },
    {
        id: 'age',
        title: 'What is your age range?',
        help: 'We adjust comfort weighting for older and younger players.',
        options: [
            { value: 'youth', label: 'Under 18' },
            { value: 'adult', label: '18 to 35' },
            { value: 'mid', label: '36 to 55' },
            { value: 'senior', label: '55 and above' }
        ]
    },
    {
        id: 'injury',
        title: 'Any history of arm injuries?',
        help: 'Tennis elbow, shoulder, or wrist issues steer us toward flexible, plush frames.',
        options: [
            { value: 'none', label: 'No injuries' },
            { value: 'past', label: 'Past injury, recovered' },
            { value: 'current', label: 'Current or recurring issue' }
        ]
    },
    {
        id: 'budget',
        title: 'What is your budget?',
        help: 'We will only show rackets in your range.',
        options: [
            { value: 130, label: 'Under one hundred and thirty dollars', sub: 'Recreational / starter' },
            { value: 200, label: 'One hundred and thirty to two hundred', sub: 'Solid mid-tier' },
            { value: 280, label: 'Two hundred to two hundred and eighty', sub: 'Performance frames' },
            { value: 9999, label: 'No limit', sub: 'Show me the best fit' }
        ]
    },
    {
        id: 'priority',
        title: 'Above all else, you value…',
        help: 'If you could have only one of these in a racket, which?',
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
// Each racket has tiered media: a YouTube review video first, then any
// unblocked image, with a final SVG illustration as the safety net.
//   videoId — YouTube ID of an actual review (shows as click-to-play poster)
//   image   — fallback image URL if YouTube thumbnail fails
const RACKETS = [
    {
        id: 'pure-aero',
        brand: 'Babolat',
        name: 'Pure Aero',
        tagline: 'Heavy topspin, an aggressive baseline weapon',
        head: 100, weight: 300, balance: '4 pts HL', pattern: '16x19', stiffness: 70,
        power: 4, control: 3, spin: 5, comfort: 2, maneuverability: 3,
        difficulty: 3, price: 229, weightClass: 'medium',
        styles: ['baseline'],
        stringRec: 'Polyester (e.g., RPM Blast 17g) at 50–55 lbs for spin and durability',
        frame: '#e8d23a', accent: '#1a1a1a',
        videoId: 'yvXbYVTvYwY',
        purchase: 'https://www.tennis-warehouse.com/Babolat_Pure_Aero_2023/descpageRCBAB-BARO.html'
    },
    {
        id: 'pure-drive',
        brand: 'Babolat',
        name: 'Pure Drive',
        tagline: 'Effortless power, the modern all-court favourite',
        head: 100, weight: 300, balance: '4 pts HL', pattern: '16x19', stiffness: 71,
        power: 5, control: 3, spin: 4, comfort: 2, maneuverability: 3,
        difficulty: 3, price: 229, weightClass: 'medium',
        styles: ['baseline', 'allcourt'],
        stringRec: 'Multifilament (e.g., NRG2 16g) at 54–58 lbs to soften the frame',
        frame: '#1f6feb', accent: '#0a1530',
        videoId: 'IvY-eLEDxH4',
        purchase: 'https://www.tennis-warehouse.com/searchresults_c.html?kwc=Babolat+Pure+Drive'
    },
    {
        id: 'ps97v14',
        brand: 'Wilson',
        name: 'Pro Staff 97 v14',
        tagline: 'A modern descendant of Federer’s Pro Staff lineage',
        head: 97, weight: 315, balance: '8 pts HL', pattern: '16x19', stiffness: 65,
        power: 2, control: 5, spin: 3, comfort: 3, maneuverability: 2,
        difficulty: 5, price: 269, weightClass: 'heavy',
        styles: ['allcourt', 'net'],
        stringRec: 'Natural gut and polyester hybrid at 52–55 lbs for buttery feel',
        frame: '#1a1a1a', accent: '#9b1c1c',
        videoId: 'Nxn3auU4NmA',
        purchase: 'https://www.tennis-warehouse.com/descpage-W97V14.html'
    },
    {
        id: 'blade-98',
        brand: 'Wilson',
        name: 'Blade 98 v9 (16x19)',
        tagline: 'Plush feel and control with modern bite',
        head: 98, weight: 305, balance: '7 pts HL', pattern: '16x19', stiffness: 62,
        power: 3, control: 5, spin: 4, comfort: 4, maneuverability: 3,
        difficulty: 4, price: 249, weightClass: 'medium',
        styles: ['allcourt', 'baseline'],
        stringRec: 'Multifilament or soft co-poly at 52–55 lbs for arm comfort and feel',
        frame: '#1f6f3a', accent: '#0c1a14',
        videoId: 't4u6XFu44LY',
        purchase: 'https://www.tennis-warehouse.com/Wilson_Blade_98_16x19_v9/descpageRCWILSON-WB9816.html'
    },
    {
        id: 'clash-100',
        brand: 'Wilson',
        name: 'Clash 100 v3',
        tagline: 'Maximum arm-friendly comfort, easy to swing',
        head: 100, weight: 295, balance: '4 pts HL', pattern: '16x19', stiffness: 55,
        power: 3, control: 4, spin: 3, comfort: 5, maneuverability: 4,
        difficulty: 2, price: 249, weightClass: 'medium',
        styles: ['allcourt', 'defensive'],
        stringRec: 'Multifilament (e.g., Wilson NXT 16g) at 50–55 lbs for plush response',
        frame: '#c0392b', accent: '#101820',
        videoId: 'NNlKjIe3FbY',
        purchase: 'https://www.tennis-warehouse.com/searchresults_c.html?kwc=Wilson+Clash+100+v3'
    },
    {
        id: 'speed-mp',
        brand: 'Head',
        name: 'Speed MP',
        tagline: 'Versatile all-court precision used by Sinner',
        head: 100, weight: 300, balance: '4 pts HL', pattern: '16x19', stiffness: 64,
        power: 4, control: 4, spin: 4, comfort: 3, maneuverability: 4,
        difficulty: 3, price: 230, weightClass: 'medium',
        styles: ['allcourt', 'baseline', 'net'],
        stringRec: 'Hybrid: polyester mains and multifilament crosses at 52–55 lbs',
        frame: '#f1f1f1', accent: '#0e0e0e',
        videoId: 'T2J4zLk4rcM',
        purchase: 'https://www.tennis-warehouse.com/Head_Speed_MP_2024/descpageRCHEAD-HSPDM.html'
    },
    {
        id: 'ezone-100',
        brand: 'Yonex',
        name: 'EZONE 100',
        tagline: 'Power and comfort in equal measure',
        head: 100, weight: 300, balance: '3 pts HL', pattern: '16x19', stiffness: 65,
        power: 4, control: 4, spin: 4, comfort: 5, maneuverability: 3,
        difficulty: 3, price: 259, weightClass: 'medium',
        styles: ['baseline', 'allcourt'],
        stringRec: 'Soft co-poly (e.g., Poly Tour Pro 16g) at 48–52 lbs',
        frame: '#1ea7e6', accent: '#0c2c44',
        videoId: 'yuzDQ03BGjo',
        purchase: 'https://www.tennis-warehouse.com/Yonex_EZONE_100_2025/descpageRCYONEX-EZ10BB.html'
    },
    {
        id: 'radical-mp',
        brand: 'Head',
        name: 'Radical MP',
        tagline: 'All-court control with a dose of pop',
        head: 98, weight: 300, balance: '4 pts HL', pattern: '16x19', stiffness: 65,
        power: 3, control: 5, spin: 4, comfort: 4, maneuverability: 4,
        difficulty: 4, price: 229, weightClass: 'medium',
        styles: ['allcourt', 'net'],
        stringRec: 'Hybrid or full multifilament at 53–56 lbs for control and comfort',
        frame: '#e67e22', accent: '#101820',
        videoId: 'r_JMB_xK9nU',
        purchase: 'https://www.tennis-warehouse.com/Head_Radical_MP_2023/descpageRCHEAD-HMPR.html'
    },
    {
        id: 'boost-drive',
        brand: 'Babolat',
        name: 'Boost Drive',
        tagline: 'Lightweight, easy power for new players',
        head: 105, weight: 260, balance: '2 pts HH', pattern: '16x19', stiffness: 68,
        power: 5, control: 2, spin: 3, comfort: 5, maneuverability: 5,
        difficulty: 1, price: 109, weightClass: 'light',
        styles: ['baseline', 'defensive'],
        stringRec: 'Pre-strung synthetic gut at 55 lbs is fine; upgrade to multifilament when worn',
        frame: '#2980b9', accent: '#101820',
        videoId: 'uGHXLos_Sr4',
        purchase: 'https://www.tennis-warehouse.com/Babolat_Boost_Drive/descpageRCBAB-BBSTDR.html'
    },
    {
        id: 'vcore-98',
        brand: 'Yonex',
        name: 'VCORE 98',
        tagline: 'Massive spin with predictable control',
        head: 98, weight: 305, balance: '5 pts HL', pattern: '16x20', stiffness: 65,
        power: 3, control: 4, spin: 5, comfort: 3, maneuverability: 3,
        difficulty: 4, price: 259, weightClass: 'medium',
        styles: ['baseline', 'allcourt'],
        stringRec: 'Spin polyester (e.g., Poly Tour Spin 16g) at 50–54 lbs',
        frame: '#c0392b', accent: '#1a1a1a',
        videoId: 'XqncNIcdQuQ',
        purchase: 'https://www.tennis-warehouse.com/searchresults_c.html?kwc=Yonex+VCORE+98'
    },
    {
        id: 'ultra-100',
        brand: 'Wilson',
        name: 'Ultra 100 v4',
        tagline: 'Crisp power with a forgiving feel',
        head: 100, weight: 300, balance: '4 pts HL', pattern: '16x19', stiffness: 68,
        power: 5, control: 3, spin: 4, comfort: 4, maneuverability: 3,
        difficulty: 2, price: 239, weightClass: 'medium',
        styles: ['baseline', 'allcourt'],
        stringRec: 'Multifilament at 54–58 lbs for power and control balance',
        frame: '#0a3a82', accent: '#e6e6e6',
        videoId: 'tCkj47Okxpo',
        purchase: 'https://www.tennis-warehouse.com/searchresults_c.html?kwc=Wilson+Ultra+100'
    },
    {
        id: 'prince-tour-100',
        brand: 'Prince',
        name: 'Textreme ATS Tour 100 (310g)',
        tagline: 'An underrated all-court value performer',
        head: 100, weight: 310, balance: '4 pts HL', pattern: '16x18', stiffness: 66,
        power: 4, control: 4, spin: 5, comfort: 4, maneuverability: 3,
        difficulty: 3, price: 199, weightClass: 'medium',
        styles: ['allcourt', 'baseline'],
        stringRec: 'Co-poly main and multifilament cross at 52–55 lbs',
        frame: '#0e1730', accent: '#1ea7e6',
        videoId: '4P5_geUsZhI',
        purchase: 'https://www.tennis-warehouse.com/searchresults_c.html?kwc=Prince+Textreme+Tour+100'
    }
];

// ----- Profile builder -----
function buildProfile(answers) {
    const skill = (answers.years + answers.rating) / 2 + (answers.frequency >= 3 ? 0.5 : 0);
    const skillRounded = Math.max(1, Math.min(5, Math.round(skill)));

    let comfortNeed = 2;
    if (answers.injury === 'past') comfortNeed += 1.5;
    if (answers.injury === 'current') comfortNeed += 3;
    if (answers.age === 'senior') comfortNeed += 1.5;
    if (answers.age === 'mid') comfortNeed += 0.5;
    if (answers.age === 'youth') comfortNeed += 0.5;
    if (answers.strength === 1) comfortNeed += 0.5;
    if (answers.priority === 'comfort') comfortNeed += 1.5;
    if (answers.improve === 'comfort') comfortNeed += 1;

    let powerNeed = 3;
    if (answers.improve === 'power') powerNeed += 2;
    if (answers.priority === 'power') powerNeed += 1;
    if (answers.strokes === 'compact') powerNeed += 1;
    if (answers.strokes === 'developing') powerNeed += 0.5;
    if (answers.court === 'defensive') powerNeed += 0.5;
    if (skillRounded <= 2) powerNeed += 1;

    let controlNeed = 3;
    if (answers.improve === 'control') controlNeed += 2;
    if (answers.priority === 'control') controlNeed += 1;
    if (skillRounded >= 4) controlNeed += 1;
    if (answers.strokes === 'compact') controlNeed += 0.5;

    let spinNeed = 3;
    if (answers.improve === 'spin') spinNeed += 2;
    if (answers.priority === 'spin') spinNeed += 1;
    if (answers.strokes === 'topspin') spinNeed += 1.5;
    if (answers.court === 'baseline') spinNeed += 0.5;

    let maneuverNeed = 3;
    if (answers.improve === 'maneuver') maneuverNeed += 2;
    if (answers.court === 'net') maneuverNeed += 1;
    if (answers.backhand === 'one') maneuverNeed += 0.5;
    if (answers.strength === 1) maneuverNeed += 0.5;
    if (answers.age === 'senior') maneuverNeed += 1;

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

    const skillDiff = racket.difficulty - profile.skill;
    let skillScore;
    if (skillDiff > 0) {
        skillScore = Math.max(0, 25 - skillDiff * 11);
    } else {
        skillScore = Math.max(0, 25 - Math.abs(skillDiff) * 2.5);
    }
    score += skillScore;

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

    if (racket.weightClass === profile.preferredWeight) {
        score += 8;
    } else if (
        (racket.weightClass === 'medium' && profile.preferredWeight !== 'medium') ||
        (profile.preferredWeight === 'medium' && racket.weightClass !== 'medium')
    ) {
        score += 4;
    }

    if (racket.styles.includes(profile.style)) {
        score += 6;
    }

    if (profile.injury === 'current' && racket.stiffness >= 68) {
        score -= 18;
    } else if (profile.injury === 'past' && racket.stiffness >= 70) {
        score -= 8;
    }

    if (racket.price > profile.budget) {
        score -= 100;
    }

    return Math.max(0, score);
}

function isPriorityAttr(attr, profile) {
    const map = { power: 'power', control: 'control', spin: 'spin', comfort: 'comfort', maneuverability: 'maneuver' };
    return profile.priority === map[attr] || profile.improve === map[attr];
}

function explainMatch(racket, profile) {
    const reasons = [];
    if (Math.abs(racket.difficulty - profile.skill) <= 1) reasons.push('well-matched to your level');
    if (racket.weightClass === profile.preferredWeight) reasons.push(`${racket.weightClass}-weight suits your build`);
    if (profile.priority === 'power' && racket.power >= 4) reasons.push('delivers the power you want');
    if (profile.priority === 'control' && racket.control >= 4) reasons.push('rewards precision');
    if (profile.priority === 'spin' && racket.spin >= 4) reasons.push('a generous spin window');
    if (profile.priority === 'comfort' && racket.comfort >= 4) reasons.push('a plush, arm-friendly response');
    if (profile.improve === 'spin' && racket.spin >= 4) reasons.push('helps you find more topspin');
    if (profile.improve === 'control' && racket.control >= 4) reasons.push('improves your placement');
    if (profile.improve === 'power' && racket.power >= 4) reasons.push('adds depth and pace');
    if (profile.improve === 'comfort' && racket.comfort >= 4) reasons.push('softens impact on the arm');
    if (profile.injury !== 'none' && racket.stiffness < 66) reasons.push('a flexible frame is gentle on the arm');
    if (racket.styles.includes(profile.style)) reasons.push(`fits your ${labelStyle(profile.style)} game`);
    if (reasons.length === 0) reasons.push('a balanced fit across your inputs');
    const unique = [...new Set(reasons)];
    return unique.slice(0, 3).join(' · ');
}

function labelStyle(s) {
    return ({ baseline: 'baseline', allcourt: 'all-court', net: 'net-rushing', defensive: 'defensive' })[s] || s;
}

function tailoredStringAdvice(racket, profile) {
    const baseAdvice = racket.stringRec;
    const notes = [];
    if (profile.injury === 'current') {
        notes.push('With a current injury, drop tension by 2–4 lbs and lean toward natural gut or a premium multifilament.');
    } else if (profile.injury === 'past') {
        notes.push('Given past injury, avoid stiff polyesters at high tension; multifilament or hybrid is safer.');
    }
    if (profile.priority === 'spin' && profile.skill >= 3 && racket.spin >= 4) {
        notes.push('Polyester mains will maximise spin; replace every 30–40 hours.');
    }
    if (profile.priority === 'power' && profile.skill <= 3) {
        notes.push('String 2–3 lbs lower than the midpoint for added power.');
    }
    if (profile.priority === 'control' && profile.skill >= 4) {
        notes.push('String 2–3 lbs higher for tighter control.');
    }
    return { baseAdvice, notes };
}

// ----- SVG racket renderer (refined) -----
function racketSVG(racket) {
    const { frame, accent, head } = racket;
    // Visualise head size: 95–110 -> rx scale
    const rx = 70 + (head - 95) * 1.2;
    const ry = 92 + (head - 95) * 1.6;
    const cx = 100, cy = 130;
    const stringColor = '#fbf6e7';
    const stringShadow = '#d4c89e';

    const verticals = [];
    const horizontals = [];
    for (let i = -6; i <= 6; i++) {
        const x = cx + i * (rx / 8);
        const t = (x - cx) / rx;
        if (t * t < 1) {
            const dy = ry * Math.sqrt(1 - t * t);
            verticals.push(`<line x1="${x.toFixed(1)}" y1="${(cy - dy + 4).toFixed(1)}" x2="${x.toFixed(1)}" y2="${(cy + dy - 4).toFixed(1)}" />`);
        }
    }
    for (let j = -7; j <= 7; j++) {
        const y = cy + j * (ry / 9);
        const t = (y - cy) / ry;
        if (t * t < 1) {
            const dx = rx * Math.sqrt(1 - t * t);
            horizontals.push(`<line x1="${(cx - dx + 4).toFixed(1)}" y1="${y.toFixed(1)}" x2="${(cx + dx - 4).toFixed(1)}" y2="${y.toFixed(1)}" />`);
        }
    }

    // Grip wrap stitching pattern
    const gripStitches = [];
    const gripTop = cy + ry + 78;
    const gripHeight = 84;
    for (let s = 0; s < 9; s++) {
        const y1 = gripTop + s * (gripHeight / 9);
        gripStitches.push(`<line x1="${cx - 14}" y1="${y1}" x2="${cx + 14}" y2="${(y1 - 6).toFixed(1)}" stroke="${darken(accent, 20)}" stroke-width="0.6" opacity="0.8"/>`);
    }

    const id = racket.id;

    return `<svg viewBox="0 0 200 380" xmlns="http://www.w3.org/2000/svg" aria-label="${racket.name} illustration">
        <defs>
            <linearGradient id="frame-${id}" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="${lighten(frame, 12)}"/>
                <stop offset="40%" stop-color="${frame}"/>
                <stop offset="100%" stop-color="${darken(frame, 18)}"/>
            </linearGradient>
            <linearGradient id="frame-shine-${id}" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stop-color="rgba(255,255,255,0)"/>
                <stop offset="50%" stop-color="rgba(255,255,255,0.35)"/>
                <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
            </linearGradient>
            <linearGradient id="grip-${id}" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="${lighten(accent, 8)}"/>
                <stop offset="100%" stop-color="${darken(accent, 18)}"/>
            </linearGradient>
            <radialGradient id="bed-${id}" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stop-color="rgba(255,255,255,0.55)"/>
                <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
            </radialGradient>
            <filter id="soft-${id}" x="-10%" y="-10%" width="120%" height="120%">
                <feGaussianBlur stdDeviation="0.4"/>
            </filter>
        </defs>

        <!-- string bed soft fill -->
        <ellipse cx="${cx}" cy="${cy}" rx="${rx - 6}" ry="${ry - 6}" fill="url(#bed-${id})"/>

        <!-- string shadows (for depth) -->
        <g stroke="${stringShadow}" stroke-width="0.5" opacity="0.55" filter="url(#soft-${id})">
            ${verticals.map(s => s.replace(/x1="([\d.]+)"/, 'x1="$1.5"').replace(/x2="([\d.]+)"/, 'x2="$1.5"')).join('')}
            ${horizontals.map(s => s.replace(/y1="([\d.]+)"/, 'y1="$1.6"').replace(/y2="([\d.]+)"/, 'y2="$1.6"')).join('')}
        </g>

        <!-- strings -->
        <g stroke="${stringColor}" stroke-width="0.85" opacity="0.95" stroke-linecap="round">
            ${verticals.join('')}
            ${horizontals.join('')}
        </g>

        <!-- frame outer shadow -->
        <ellipse cx="${cx}" cy="${cy + 1.5}" rx="${rx}" ry="${ry}" fill="none" stroke="rgba(0,0,0,0.18)" stroke-width="11"/>

        <!-- frame -->
        <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="url(#frame-${id})" stroke-width="9"/>

        <!-- frame highlight -->
        <ellipse cx="${cx}" cy="${cy - 2}" rx="${rx - 1.5}" ry="${ry - 1.5}" fill="none" stroke="url(#frame-shine-${id})" stroke-width="1.2" opacity="0.7"/>

        <!-- throat: refined Y-shape -->
        <path d="M ${cx - rx * 0.55} ${cy + ry * 0.92}
                 C ${cx - rx * 0.4} ${cy + ry + 4}, ${cx - 9} ${cy + ry + 12}, ${cx - 9} ${cy + ry + 22}
                 L ${cx + 9} ${cy + ry + 22}
                 C ${cx + 9} ${cy + ry + 12}, ${cx + rx * 0.4} ${cy + ry + 4}, ${cx + rx * 0.55} ${cy + ry * 0.92}
                 Z"
              fill="url(#frame-${id})"/>
        <path d="M ${cx - rx * 0.55} ${cy + ry * 0.92}
                 C ${cx - rx * 0.4} ${cy + ry + 4}, ${cx - 9} ${cy + ry + 12}, ${cx - 9} ${cy + ry + 22}
                 L ${cx + 9} ${cy + ry + 22}
                 C ${cx + 9} ${cy + ry + 12}, ${cx + rx * 0.4} ${cy + ry + 4}, ${cx + rx * 0.55} ${cy + ry * 0.92}"
              fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="0.8"/>

        <!-- shaft -->
        <rect x="${cx - 9}" y="${cy + ry + 22}" width="18" height="58" fill="url(#frame-${id})"/>
        <line x1="${cx - 7}" y1="${cy + ry + 24}" x2="${cx - 7}" y2="${cy + ry + 78}" stroke="rgba(255,255,255,0.25)" stroke-width="0.8"/>

        <!-- collar (small ring before grip) -->
        <rect x="${cx - 13}" y="${cy + ry + 78}" width="26" height="3" fill="${darken(frame, 25)}"/>

        <!-- grip (leather-like) -->
        <rect x="${cx - 13}" y="${cy + ry + 81}" width="26" height="80" rx="2" fill="url(#grip-${id})"/>

        <!-- grip diagonal stitching -->
        <g>${gripStitches.join('')}</g>

        <!-- butt cap -->
        <rect x="${cx - 14}" y="${cy + ry + 161}" width="28" height="7" rx="1" fill="${darken(accent, 30)}"/>
        <rect x="${cx - 14}" y="${cy + ry + 161}" width="28" height="2" rx="1" fill="rgba(255,255,255,0.15)"/>
    </svg>`;
}

// Color helpers (hex only)
function lighten(hex, pct) {
    return adjustHex(hex, pct);
}
function darken(hex, pct) {
    return adjustHex(hex, -pct);
}
function adjustHex(hex, pct) {
    const m = hex.replace('#', '');
    if (m.length !== 6) return hex;
    const r = parseInt(m.slice(0, 2), 16);
    const g = parseInt(m.slice(2, 4), 16);
    const b = parseInt(m.slice(4, 6), 16);
    const adj = c => {
        const v = Math.round(c + (pct / 100) * (pct > 0 ? 255 - c : c));
        return Math.max(0, Math.min(255, v));
    };
    const toHex = c => c.toString(16).padStart(2, '0');
    return `#${toHex(adj(r))}${toHex(adj(g))}${toHex(adj(b))}`;
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

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

function renderQuestion() {
    const q = QUESTIONS[state.currentIdx];
    $('questionTitle').textContent = q.title;
    $('questionHelp').textContent = q.help || '';
    $('questionStep').textContent = `Question ${ROMAN[state.currentIdx]}`;
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
    $('progressText').textContent = ROMAN[state.currentIdx] + '.';
    $('backBtn').style.visibility = state.currentIdx === 0 ? 'hidden' : 'visible';
    $('nextBtn').disabled = state.answers[q.id] === undefined;
    $('nextBtn').textContent = state.currentIdx === total - 1 ? 'See your shortlist →' : 'Next →';
}

function renderResults() {
    const profile = buildProfile(state.answers);
    const ranked = RACKETS
        .map(r => ({ racket: r, score: scoreRacket(r, profile) }))
        .sort((a, b) => b.score - a.score);

    const maxPossible = 25 + 60 * 1.4 + 8 + 6;
    const viable = ranked.filter(e => e.score >= 40);
    let top = viable.slice(0, 3);

    const summaryParts = [];
    summaryParts.push(`Skill ${profile.skill}/5`);
    summaryParts.push(`${profile.preferredWeight}-weight`);
    summaryParts.push(`${labelStyle(profile.style)} game`);
    summaryParts.push(`priority of ${profile.priority}`);
    if (profile.injury !== 'none') summaryParts.push('arm care');
    $('resultsSummary').textContent = `A profile of ${summaryParts.join(', ')}.`;

    const container = $('recommendations');
    container.innerHTML = '';

    if (top.length === 0) {
        const inBudget = ranked.filter(e => e.racket.price <= profile.budget).slice(0, 3);
        if (inBudget.length === 0) {
            container.innerHTML = `<div class="welcome-card" style="text-align:center;">
                <p class="overline">Apologies</p>
                <h3 class="display-title">No matches in your budget.</h3>
                <p class="lede">Performance frames typically begin around two hundred dollars. Consider adjusting your range.</p>
            </div>`;
            return;
        }
        top = inBudget;
    }

    top.forEach((entry, i) => {
        const r = entry.racket;
        const matchPct = Math.min(99, Math.round((entry.score / maxPossible) * 100));
        const advice = tailoredStringAdvice(r, profile);
        const reasons = explainMatch(r, profile);
        const rankClass = i === 0 ? 'top' : '';
        const rankBadge = i === 0 ? 'Top recommendation' : (i === 1 ? 'Runner-up' : 'Third');
        const badgeClass = i === 0 ? '' : (i === 1 ? 'silver' : 'bronze');

        const card = document.createElement('div');
        card.className = `rec-card ${rankClass}`;
        card.innerHTML = `
            <div class="rec-media">
                <span class="rec-rank ${badgeClass}">${rankBadge}</span>
                ${renderMedia(r)}
            </div>
            <div class="rec-body">
                <div class="rec-brand">${r.brand}</div>
                <div class="rec-name">${r.name}</div>
                <div class="rec-tagline">${r.tagline}</div>
                <div class="match-bar">
                    <div class="match-track"><div class="match-fill" style="width:${matchPct}%"></div></div>
                    <div class="match-value">${matchPct}<span class="match-value-pct">% match</span></div>
                </div>
                <div class="why">${reasons}</div>
                <div class="specs">
                    <div class="spec"><span class="spec-label">Head</span><span class="spec-value">${r.head} sq in</span></div>
                    <div class="spec"><span class="spec-label">Weight</span><span class="spec-value">${r.weight} g</span></div>
                    <div class="spec"><span class="spec-label">Balance</span><span class="spec-value">${r.balance}</span></div>
                    <div class="spec"><span class="spec-label">Pattern</span><span class="spec-value">${r.pattern}</span></div>
                    <div class="spec"><span class="spec-label">Stiffness</span><span class="spec-value">RA ${r.stiffness}</span></div>
                    <div class="spec"><span class="spec-label">Price</span><span class="spec-value">$${r.price}</span></div>
                </div>
                <div class="string-rec">
                    <span class="string-rec-label">Strings &amp; tension</span>
                    <span class="string-rec-body">${advice.baseAdvice}</span>
                    ${advice.notes.length ? `<span class="string-rec-note">${advice.notes.join(' ')}</span>` : ''}
                </div>
                <div class="rec-actions">
                    <a class="primary" href="${r.purchase}" target="_blank" rel="noopener">View on Tennis Warehouse</a>
                    <a href="https://www.google.com/search?tbm=shop&amp;q=${encodeURIComponent(r.brand + ' ' + r.name)}" target="_blank" rel="noopener">Compare prices</a>
                    <a href="https://www.google.com/search?q=${encodeURIComponent(r.brand + ' ' + r.name + ' review')}" target="_blank" rel="noopener">Read reviews</a>
                </div>
            </div>
        `;
        container.appendChild(card);
    });

    // Wire up lite-embed click-to-play handlers (mouse + keyboard).
    container.querySelectorAll('.lite-yt').forEach(el => {
        const trigger = () => activateVideo(el);
        el.addEventListener('click', trigger);
        el.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                trigger();
            }
        });
    });
}

function renderMedia(r) {
    const svgMarkup = racketSVG(r);
    const svgDataUri = `data:image/svg+xml;utf8,${encodeURIComponent(svgMarkup)}`;
    const svgFallback = svgDataUri.replace(/"/g, '&quot;');

    if (r.videoId) {
        // YouTube lite-embed: show thumbnail with play button, swap to iframe on click.
        // hqdefault.jpg is the most reliable YouTube thumbnail and is hotlink-friendly.
        const thumb = `https://i.ytimg.com/vi/${r.videoId}/hqdefault.jpg`;
        return `
            <div class="lite-yt" data-video-id="${r.videoId}" role="button" tabindex="0"
                 aria-label="Play review video for ${r.brand} ${r.name}">
                <img class="lite-yt-thumb" src="${thumb}" alt="${r.brand} ${r.name} review thumbnail"
                     loading="lazy"
                     data-fallback="${svgFallback}"
                     onerror="this.onerror=null; this.src=this.dataset.fallback; this.classList.add('is-svg');">
                <span class="lite-yt-gradient"></span>
                <button class="lite-yt-play" aria-label="Play video">
                    <svg viewBox="0 0 68 48" xmlns="http://www.w3.org/2000/svg">
                        <path class="lite-yt-play-bg" d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55C3.97 2.33 2.27 4.81 1.48 7.74 0.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z"/>
                        <path d="M 45,24 27,14 27,34" fill="#fff"/>
                    </svg>
                </button>
                <span class="lite-yt-label">Watch the review</span>
            </div>
        `;
    }

    // No video — show the SVG illustration directly.
    return `
        <div class="rec-illustration">
            <img src="${svgDataUri}" alt="${r.brand} ${r.name} illustration" loading="lazy">
            <div class="rec-illustration-note">An illustrated representation</div>
        </div>
    `;
}

function activateVideo(el) {
    if (el.dataset.activated === '1') return;
    el.dataset.activated = '1';
    const id = el.dataset.videoId;
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
    iframe.title = 'Racket review video';
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
    iframe.setAttribute('allowfullscreen', '');
    iframe.className = 'lite-yt-iframe';
    // Replace contents but keep the badge if present (badge is a sibling of .lite-yt, not a child).
    el.innerHTML = '';
    el.appendChild(iframe);
    el.classList.add('is-playing');
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
