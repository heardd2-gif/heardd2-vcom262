const shipwreckDataset = [
  {
    id: "titanic",
    name: "RMS Titanic",
    lat: 41.7269,
    lng: -49.9482,
    image: "../images/titanic shipwreck.jpg", 
    type: "Ocean Liner",
    depth: "3,800 meters",
    fact: "Discovered in 1985 by a joint French-American expedition led by Robert Ballard sitting in two main pieces."
  },
  {
    id: "britannic",
    name: "HMHS Britannic",
    lat: 37.7011,
    lng: 24.2839,
    image: "../images/Britannic shipwreck.jpg",
    type: "Hospital Ship / Ocean Liner",
    depth: "122 meters",
    fact: "Titanic's sister ship; rests largely intact on her starboard side in the Aegean Sea."
  },
  {
    id: "lusitania",
    name: "RMS Lusitania",
    lat: 51.4110,
    lng: -8.5470,
    image: "../images/RMS Lusitania shipwreck.jpg",
    type: "Ocean Liner",
    depth: "93 meters",
    fact: "Lies off the Old Head of Kinsale, Ireland; heavily deteriorated due to underwater tides and past depth-charge actions."
  },
  {
    id: "bismarck",
    name: "Bismarck",
    lat: 48.1670,
    lng: -16.2000,
    image: "../images/Bismarck shipwreck.jpg",
    type: "Battleship",
    depth: "4,791 meters",
    fact: "Discovered upright in 1989 resting on the slopes of an extinct underwater volcano within the Porcupine Abyssal Plain."
  },
  {
    id: "johnston",
    name: "USS Johnston (DD-557)",
    lat: 11.2331,
    lng: 126.1511,
    image: "../images/USS Johnston.jpg",
    type: "Destroyer",
    depth: "6,460 meters",
    fact: "Fought heroically in the Battle off Samar; located deep in the Philippine Trench using deep-submergence assets."
  },
  {
    id: "samuel-b-roberts",
    name: "USS Samuel B. Roberts (DE-413)",
    lat: 11.2411,
    lng: 126.2419,
    image: "../images/USS Samuel B. Roberts shpiwreck.jpg",
    type: "Destroyer Escort",
    depth: "6,895 meters",
    fact: "Known as the 'Sammy B'. Found resting structurally broken on a steep abyssal slope, making it one of the deepest identified wrecks."
  },
  {
    id: "indianapolis",
    name: "USS Indianapolis (CA-35)",
    lat: 12.0333,
    lng: 134.8000,
    image: "../images/USS Indianapolis.jpg",
    type: "Heavy Cruiser",
    depth: "5,500 meters",
    fact: "Located in the North Pacific Ocean; hull components and internal markings remain highly identifiable due to dark, freezing anoxic water."
  },
  {
    id: "gairsoppa",
    name: "SS Gairsoppa",
    lat: 50.0000,
    lng: -14.0000,
    image: "../images/SS Gairsoppa shipwreck.jpg",
    type: "Steam Cargo Ship",
    depth: "4,700 meters",
    fact: "Torpedoed carrying a massive wartime cargo of silver bullion; targeted successfully during an historic deep-ocean commercial salvage."
  },
  {
    id: "rhone",
    name: "RMS Rhone",
    lat: 18.3742,
    lng: -64.5372,
    image: "../images/rms rhone.jpg",
    type: "Royal Mail Packet Steamer",
    depth: "25 meters",
    fact: "Sunk by a hurricane in 1867 in the British Virgin Islands. Now a highly accessible shallow diving site with heavy coral colonization."
  }
];

const map = L.map('map', {
    center: [25.0, -10.0], 
    zoom: 3,
    minZoom: 2,
    maxZoom: 12,
    
    dragging: true,
    inertia: true,
    inertiaDeceleration: 3400, 
    inertiaMaxSpeed: Infinity,
    
    scrollWheelZoom: true,
    wheelDebounceTime: 40,    
    wheelPxPerZoomLevel: 60,   
    
    boxZoom: true,
    doubleClickZoom: true,
    keyboard: true,
    keyboardPanDelta: 80       
});

L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
}).addTo(map);


const anchorIcon = L.divIcon({
    html: '<span style="font-size: 24px; line-height: 1;">⚓</span>',
    className: 'custom-anchor-marker', 
    iconSize: [30, 30],                 
    iconAnchor: [15, 15],               
    popupAnchor: [0, -15]               
});

shipwreckDataset.forEach(wreck => {
    
    const marker = L.marker([wreck.lat, wreck.lng], { icon: anchorIcon }).addTo(map);

    const popupCardContent = `
        <div class="wreck-popup">
            <h3>${wreck.name}</h3>
            <p><span class="meta-label">Classification:</span> ${wreck.type}</p>
            <p><span class="meta-label">Discovery Depth:</span> ${wreck.depth}</p>
            <img src="${wreck.image}" alt="Archival viewport of ${wreck.name}" />
            <p class="fact-text">${wreck.fact}</p>
        </div>
    `;

    marker.bindPopup(popupCardContent, {
        maxWidth: 280,
        className: "custom-wreck-window"
    });
    
    
    marker.on('mouseover', function(e) {
        e.target.openPopup();
    });
});

const telemetryDisplay = document.getElementById('telemetry-status');

function logMapInteractionMetrics(e) {
    const lat = e.latlng.lat.toFixed(4);
    const lng = e.latlng.lng.toFixed(4);
    const zoom = map.getZoom();
    
    telemetryDisplay.innerHTML = `LAT: ${lat}<br>LNG: ${lng}<br>ZOOM LEVEL: ${zoom}`;
}

map.on('click', logMapInteractionMetrics);
map.on('moveend', () => {
    const center = map.getCenter();
    telemetryDisplay.innerHTML = `Map Panned to:<br>LAT: ${center.lat.toFixed(4)}<br>LNG: ${center.lng.toFixed(4)}<br>ZOOM: ${map.getZoom()}`;
});