// Colorado Trip Planner JavaScript

let map;
let directionsService;
let directionsRenderer;
let currentEditingStop = null;

// Trip data structure
let tripData = {
    stops: [
        { id: 0, location: "Plano, TX", name: "Plano, TX", time: "8:00 AM", description: "Departure point", day: 1, lat: 33.0198, lng: -96.6989 },
        { id: 1, location: "Palo Duro Canyon State Park, TX", name: "Palo Duro Canyon State Park", time: "10:00 AM - 12:00 PM", description: "Second largest canyon in the US. Quick rim trail walk or Lighthouse Trail.", day: 1, lat: 34.9847, lng: -101.6608 },
        { id: 2, location: "Telluride, CO", name: "Telluride, CO", time: "7:00-8:00 PM", description: "Check into accommodation, dinner downtown", day: 1, lat: 37.9375, lng: -107.8123 },
        { id: 3, location: "Bridal Veil Falls, Telluride, CO", name: "Bridal Veil Falls", time: "8:00 AM", description: "Colorado's tallest free-falling waterfall (365 feet). 4WD or moderate hike.", day: 2, lat: 37.9514, lng: -107.7931 },
        { id: 4, location: "Lower Blue Lake Trailhead, Ridgway, CO", name: "Lower Blue Lakes Hike", time: "12:00 PM - 4:00 PM", description: "3.5 miles roundtrip. Stunning alpine lakes with mountain backdrop.", day: 2, lat: 38.1539, lng: -107.7544 },
        { id: 5, location: "Telluride, CO", name: "Return to Telluride", time: "Evening", description: "Gondola ride for sunset views, dinner", day: 2, lat: 37.9375, lng: -107.8123 },
        { id: 6, location: "Million Dollar Highway, CO", name: "Million Dollar Highway (US-550)", time: "8:00 AM - 12:00 PM", description: "One of America's most scenic drives. Stop in Ouray.", day: 3, lat: 37.7442, lng: -107.6717 },
        { id: 7, location: "Ouray, CO", name: "Ouray - Switzerland of America", time: "12:00 PM - 1:00 PM", description: "Lunch and optional hot springs visit", day: 3, lat: 38.0228, lng: -107.6717 },
        { id: 8, location: "Estes Park, CO", name: "Arrive in Estes Park", time: "6:00 PM", description: "Check in, dinner, early rest", day: 3, lat: 40.3772, lng: -105.5217 },
        { id: 9, location: "Bear Lake, Rocky Mountain National Park, CO", name: "Emerald Lake Trail", time: "8:00 AM - 12:00 PM", description: "3.2 miles roundtrip. Passes Nymph, Dream, and Emerald Lakes.", day: 4, lat: 40.3131, lng: -105.6442 },
        { id: 10, location: "Trail Ridge Road, Rocky Mountain National Park, CO", name: "Trail Ridge Road & Alpine Visitor Center", time: "1:00 PM - 5:00 PM", description: "Highest paved road in US (12,183 ft). Multiple scenic stops.", day: 4, lat: 40.4178, lng: -105.7608 },
        { id: 11, location: "Garden of the Gods, Colorado Springs, CO", name: "Garden of the Gods", time: "11:30 AM - 3:00 PM", description: "FREE admission. Red rock formations, visitor center, multiple trails.", day: 5, lat: 38.8719, lng: -104.8856 },
        { id: 12, location: "Pikes Peak, Colorado Springs, CO", name: "Pikes Peak", time: "3:30 PM - 7:00 PM", description: "14,115 ft summit. Drive or Cog Railway. Famous summit donuts!", day: 5, lat: 38.8405, lng: -105.0442 },
        { id: 13, location: "Capulin Volcano National Monument, NM", name: "Capulin Volcano National Monument", time: "12:00 PM - 2:30 PM", description: "$7 entrance fee. 2-mile spiral drive to rim, crater rim trail.", day: 6, lat: 36.7828, lng: -103.9711 },
        { id: 14, location: "Plano, TX", name: "Arrive home in Plano, TX", time: "7:30 PM", description: "End of trip", day: 6, lat: 33.0198, lng: -96.6989 }
    ]
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    updateItineraryDisplay();
});

// Initialize Google Maps
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 6,
        center: { lat: 37.0902, lng: -95.7129 }, // Center of US
        mapTypeId: 'roadmap'
    });

    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer({
        suppressMarkers: false,
        draggable: true
    });
    directionsRenderer.setMap(map);

    // Add markers for all stops
    addMarkersToMap();
    
    // Calculate and display route
    calculateRoute();

    // Listen for route changes
    directionsRenderer.addListener('directions_changed', function() {
        updateRouteInfo();
    });
}

// Add markers to map
function addMarkersToMap() {
    tripData.stops.forEach(stop => {
        const marker = new google.maps.Marker({
            position: { lat: stop.lat, lng: stop.lng },
            map: map,
            title: stop.name,
            label: {
                text: stop.day.toString(),
                color: 'white',
                fontWeight: 'bold'
            }
        });

        const infoWindow = new google.maps.InfoWindow({
            content: `
                <div style="max-width: 250px;">
                    <h4>${stop.name}</h4>
                    <p><strong>Time:</strong> ${stop.time}</p>
                    <p>${stop.description}</p>
                </div>
            `
        });

        marker.addListener('click', function() {
            infoWindow.open(map, marker);
        });
    });
}

// Calculate route using Google Maps Directions API
function calculateRoute() {
    const waypoints = tripData.stops.slice(1, -1).map(stop => ({
        location: { lat: stop.lat, lng: stop.lng },
        stopover: true
    }));

    const request = {
        origin: { lat: tripData.stops[0].lat, lng: tripData.stops[0].lng },
        destination: { lat: tripData.stops[tripData.stops.length - 1].lat, lng: tripData.stops[tripData.stops.length - 1].lng },
        waypoints: waypoints,
        travelMode: google.maps.TravelMode.DRIVING,
        optimizeWaypoints: false
    };

    directionsService.route(request, function(result, status) {
        if (status === 'OK') {
            directionsRenderer.setDirections(result);
            updateRouteInfo(result);
        } else {
            console.error('Directions request failed due to ' + status);
        }
    });
}

// Update route information
function updateRouteInfo(result) {
    if (!result) return;

    let totalDistance = 0;
    let totalDuration = 0;

    result.routes[0].legs.forEach(leg => {
        totalDistance += leg.distance.value;
        totalDuration += leg.duration.value;
    });

    // Convert to miles and hours
    const totalMiles = Math.round(totalDistance * 0.000621371);
    const totalHours = Math.round(totalDuration / 3600);

    document.getElementById('total-distance').textContent = `Total Distance: ${totalMiles} miles`;
    document.getElementById('total-time').textContent = `Total Driving: ~${totalHours} hours`;
    document.getElementById('summary-distance').textContent = `${totalMiles} miles`;
    document.getElementById('summary-time').textContent = `~${totalHours} hours`;
}

// Initialize event listeners
function initializeEventListeners() {
    // Day tab switching
    document.querySelectorAll('.day-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            switchDay(this.dataset.day);
        });
    });

    // Edit stop buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('edit-stop')) {
            const stopId = parseInt(e.target.dataset.stop);
            openEditModal(stopId);
        }
    });

    // Add stop button
    document.getElementById('add-stop-btn').addEventListener('click', addNewStop);

    // Modal close
    document.querySelector('.close').addEventListener('click', closeModal);
    document.getElementById('edit-modal').addEventListener('click', function(e) {
        if (e.target === this) closeModal();
    });

    // Edit form submission
    document.getElementById('edit-form').addEventListener('submit', saveStopEdit);

    // Delete stop button
    document.getElementById('delete-stop').addEventListener('click', deleteStop);

    // Map control buttons
    document.getElementById('optimize-route').addEventListener('click', optimizeRoute);
    document.getElementById('reset-route').addEventListener('click', resetRoute);
    document.getElementById('print-itinerary').addEventListener('click', printItinerary);
}

// Switch between day tabs
function switchDay(day) {
    // Update tab buttons
    document.querySelectorAll('.day-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-day="${day}"]`).classList.add('active');

    // Update day panels
    document.querySelectorAll('.day-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    document.getElementById(`day-${day}`).classList.add('active');
}

// Open edit modal
function openEditModal(stopId) {
    const stop = tripData.stops.find(s => s.id === stopId);
    if (!stop) return;

    currentEditingStop = stopId;
    document.getElementById('edit-location').value = stop.location;
    document.getElementById('edit-time').value = stop.time;
    document.getElementById('edit-description').value = stop.description;
    document.getElementById('edit-modal').style.display = 'block';
}

// Close modal
function closeModal() {
    document.getElementById('edit-modal').style.display = 'none';
    currentEditingStop = null;
}

// Save stop edit
function saveStopEdit(e) {
    e.preventDefault();
    
    if (currentEditingStop === null) return;

    const stop = tripData.stops.find(s => s.id === currentEditingStop);
    if (!stop) return;

    stop.location = document.getElementById('edit-location').value;
    stop.time = document.getElementById('edit-time').value;
    stop.description = document.getElementById('edit-description').value;

    // Geocode new location if changed
    geocodeLocation(stop.location, function(lat, lng) {
        if (lat && lng) {
            stop.lat = lat;
            stop.lng = lng;
        }
        
        updateItineraryDisplay();
        if (typeof google !== 'undefined') {
            map.getDiv().innerHTML = '';
            initMap();
        }
    });

    closeModal();
}

// Delete stop
function deleteStop() {
    if (currentEditingStop === null) return;
    
    if (confirm('Are you sure you want to delete this stop?')) {
        tripData.stops = tripData.stops.filter(s => s.id !== currentEditingStop);
        updateItineraryDisplay();
        
        if (typeof google !== 'undefined') {
            map.getDiv().innerHTML = '';
            initMap();
        }
    }
    
    closeModal();
}

// Add new stop
function addNewStop() {
    const location = document.getElementById('new-location').value.trim();
    const time = document.getElementById('new-time').value.trim();
    const description = document.getElementById('new-description').value.trim();
    const day = parseInt(document.getElementById('add-to-day').value);

    if (!location || !time) {
        alert('Please enter at least a location and time.');
        return;
    }

    geocodeLocation(location, function(lat, lng) {
        const newStop = {
            id: Math.max(...tripData.stops.map(s => s.id)) + 1,
            location: location,
            name: location,
            time: time,
            description: description,
            day: day,
            lat: lat || 0,
            lng: lng || 0
        };

        tripData.stops.splice(-1, 0, newStop); // Insert before the last stop
        updateItineraryDisplay();

        // Clear form
        document.getElementById('new-location').value = '';
        document.getElementById('new-time').value = '';
        document.getElementById('new-description').value = '';

        if (typeof google !== 'undefined') {
            map.getDiv().innerHTML = '';
            initMap();
        }
    });
}

// Geocode location using Google Maps API
function geocodeLocation(location, callback) {
    if (typeof google === 'undefined') {
        callback(null, null);
        return;
    }

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: location }, function(results, status) {
        if (status === 'OK' && results[0]) {
            const lat = results[0].geometry.location.lat();
            const lng = results[0].geometry.location.lng();
            callback(lat, lng);
        } else {
            console.error('Geocoding failed: ' + status);
            callback(null, null);
        }
    });
}

// Update itinerary display
function updateItineraryDisplay() {
    // Group stops by day
    const stopsByDay = {};
    tripData.stops.forEach(stop => {
        if (!stopsByDay[stop.day]) {
            stopsByDay[stop.day] = [];
        }
        stopsByDay[stop.day].push(stop);
    });

    // Update each day panel
    for (let day = 1; day <= 6; day++) {
        const dayPanel = document.getElementById(`day-${day}`);
        const stopsContainer = dayPanel.querySelector('.stops');
        
        if (stopsByDay[day]) {
            stopsContainer.innerHTML = '';
            stopsByDay[day].forEach(stop => {
                const stopElement = createStopElement(stop);
                stopsContainer.appendChild(stopElement);
            });
        }
    }
}

// Create stop element
function createStopElement(stop) {
    const stopDiv = document.createElement('div');
    stopDiv.className = 'stop';
    stopDiv.dataset.location = stop.location;
    
    stopDiv.innerHTML = `
        <div class="stop-time">${stop.time}</div>
        <div class="stop-details">
            <div>
                <strong>${stop.name}</strong>
                <p>${stop.description}</p>
            </div>
            <button class="edit-stop" data-stop="${stop.id}">Edit</button>
        </div>
    `;
    
    return stopDiv;
}

// Optimize route
function optimizeRoute() {
    if (typeof google === 'undefined') {
        alert('Google Maps is not loaded yet. Please wait a moment and try again.');
        return;
    }

    const waypoints = tripData.stops.slice(1, -1).map(stop => ({
        location: { lat: stop.lat, lng: stop.lng },
        stopover: true
    }));

    const request = {
        origin: { lat: tripData.stops[0].lat, lng: tripData.stops[0].lng },
        destination: { lat: tripData.stops[tripData.stops.length - 1].lat, lng: tripData.stops[tripData.stops.length - 1].lng },
        waypoints: waypoints,
        travelMode: google.maps.TravelMode.DRIVING,
        optimizeWaypoints: true
    };

    directionsService.route(request, function(result, status) {
        if (status === 'OK') {
            directionsRenderer.setDirections(result);
            updateRouteInfo(result);
            
            // Reorder stops based on optimization
            const waypointOrder = result.routes[0].waypoint_order;
            const middleStops = tripData.stops.slice(1, -1);
            const optimizedMiddleStops = waypointOrder.map(index => middleStops[index]);
            
            tripData.stops = [
                tripData.stops[0],
                ...optimizedMiddleStops,
                tripData.stops[tripData.stops.length - 1]
            ];
            
            updateItineraryDisplay();
        }
    });
}

// Reset route to original
function resetRoute() {
    location.reload();
}

// Print itinerary
function printItinerary() {
    window.print();
}

// Fallback for when Google Maps doesn't load
window.addEventListener('load', function() {
    setTimeout(function() {
        if (typeof google === 'undefined') {
            document.getElementById('map').innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #f8f9fa; color: #666; flex-direction: column; text-align: center; padding: 20px;">
                    <h3>Map Not Available</h3>
                    <p>To view the interactive map, you'll need to:</p>
                    <ol style="text-align: left; margin: 20px 0;">
                        <li>Get a Google Maps API key from <a href="https://developers.google.com/maps/documentation/javascript/get-api-key" target="_blank">Google Cloud Console</a></li>
                        <li>Replace "YOUR_API_KEY" in the HTML file with your actual API key</li>
                        <li>Reload the page</li>
                    </ol>
                    <p><em>The itinerary is still fully functional without the map!</em></p>
                </div>
            `;
            
            // Hide map controls
            document.querySelector('.map-controls').style.display = 'none';
        }
    }, 3000);
});