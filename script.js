/**
 * Shipwreck Finder - Core Application Logic
 * Coordinates interactive maps, tooltips, and historical timelines.
 */

// 1. Data Repositories
const wreckData = {
    rhone: {
        title: "RMS Rhone",
        meta: "Depth: 25 Meters | Sank: 1867",
        desc: "An early commercial iron sail-steamer hull. Excellent shallow light visibility allows comprehensive coral encrustation research."
    },
    britannic: {
        title: "HMHS Britannic",
        meta: "Depth: 120 Meters | Sank: 1916",
        desc: "Titanic's sister ship. Rests mostly intact on her starboard side within the Aegean Sea, offering massive structural archeological insights."
    },
    lusitania: {
        title: "RMS Lusitania",
        meta: "Depth: 93 Meters | Sank: 1915",
        desc: "Located off the Irish coast. Significant collapse presents engineers with critical data on lightning-fast kinetic underwater structural collapses."
    },
    indy: {
        title: "USS Indianapolis",
        meta: "Depth: 5,500 Meters | Sank: 1945",
        desc: "Discovered resting in the Philippine Sea abyssal plains. Highly preserved hull armor fragments sit under pitch black high-pressure conditions."
    }
};

const timelineData = {
    "1867": {
        title: "RMS Rhone",
        desc: "An iron-hulled sail-steamer that fell victim to a massive Caribbean category cyclone. Serves as an exceptional model for analyzing biological coral grafting on historical wrought iron architecture.",
        img: "images/rms rhone.jpg"
    },
    "1916": {
        title: "HMHS Britannic",
        desc: "A massive Olympic-class ocean liner converted into a hospital ship during WWI. Sunk via underwater mine contact, its structural footprint shows mechanical compression traits from seabed collision impacts.",
        img: "images/Britannic shipwreck.jpg"
    },
    "1945": {
        title: "USS Indianapolis (CA-35)",
        desc: "A decorated Portland-class heavy cruiser lost in deep water near the end of WWII. Located miles down, items like storage crates remain clear and legible due to absent biological decomposition activity.",
        img: "images/USS Indianapolis.jpg"
    },
    "2022": {
        title: "USS Samuel B. Roberts / Johnston",
        desc: "Historic deep-sea submersibles surveyed combat ships resting beyond 6,000 meters down in the Philippine Trench. These represent the lowest known structural remains ever documented by oceanographers.",
        img: "images/USS Samuel B. Roberts shpiwreck.jpg"
    }
};

// 2. DOM Element Selectors
const pins = document.querySelectorAll('.map-pin');
const tooltip = document.getElementById('map-tooltip');
const tTitle = document.getElementById('tooltip-title');
const tMeta = document.getElementById('tooltip-meta');
const tDesc = document.getElementById('tooltip-desc');

const timeBtns = document.querySelectorAll('.time-btn');
const labelYear = document.getElementById('timeline-year-label');
const labelTitle = document.getElementById('timeline-title');
const labelDesc = document.getElementById('timeline-desc-text');
const frameImg = document.getElementById('timeline-img-frame');

// 3. Interactive Map Controller
pins.forEach(pin => {
    pin.addEventListener('click', function() {
        // Toggle active states on pins
        pins.forEach(p => p.classList.remove('active-pin'));
        this.classList.add('active-pin');

        // Fetch and inject map data
        const key = this.getAttribute('data-wreck');
        const info = wreckData[key];
        
        if (info) {
            tooltip.classList.remove('hidden');
            tTitle.textContent = info.title;
            tMeta.textContent = info.meta;
            tDesc.textContent = info.desc;
        }
    });
});

// 4. Chronological Timeline Controller
timeBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Toggle active navigation states
        timeBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        // Fetch and inject timeline details
        const year = this.getAttribute('data-year');
        const currentData = timelineData[year];

        if (currentData) {
            labelYear.textContent = year;
            labelTitle.textContent = currentData.title;
            labelDesc.textContent = currentData.desc;
            frameImg.style.backgroundImage = `url('${currentData.img}')`;
        }
    });
});