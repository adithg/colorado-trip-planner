# Colorado Trip Planner

An interactive web application for planning and visualizing your 6-day Colorado road trip from Plano, Texas.

## Features

- **Interactive Map**: Visual route planning with Google Maps integration
- **Detailed Itinerary**: Day-by-day breakdown with times, distances, and descriptions
- **Editable Stops**: Modify locations, times, and descriptions
- **Add New Stops**: Insert additional stops into any day
- **Route Optimization**: Automatically optimize driving routes
- **Drive Time Calculation**: Real-time distance and time calculations
- **Print-Friendly**: Print your itinerary for offline use
- **Mobile Responsive**: Works on desktop, tablet, and mobile devices

## Quick Start

1. **Open the website**: Double-click `index.html` to open in your browser
2. **View your itinerary**: Browse through the 6-day trip using the day tabs
3. **Edit stops**: Click "Edit" on any stop to modify details
4. **Add stops**: Use the "Add New Stop" section to insert new destinations

## Google Maps Setup (Optional)

For full map functionality including route visualization and distance calculations:

1. **Get a Google Maps API Key**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable the following APIs:
     - Maps JavaScript API
     - Places API
     - Directions API
     - Geocoding API
   - Create credentials (API Key)
   - Restrict the key to your domain for security

2. **Add your API key**:
   - Open `index.html` in a text editor
   - Find the line: `<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places,geometry&callback=initMap" async defer></script>`
   - Replace `YOUR_API_KEY` with your actual Google Maps API key

3. **Refresh the page** to see the interactive map

## Trip Overview

### Day 1: Plano, TX → Telluride, CO (580 miles, 8-9 hours)
- **Stop**: Palo Duro Canyon State Park
- **Destination**: Telluride, CO

### Day 2: San Juan Mountains - Telluride Area (70 miles local)
- **Highlights**: Bridal Veil Falls, Lower Blue Lakes Hike
- **Base**: Telluride

### Day 3: Telluride → Estes Park (280 miles, 4.5 hours)
- **Scenic Route**: Million Dollar Highway (US-550)
- **Stop**: Ouray, CO
- **Destination**: Estes Park

### Day 4: Rocky Mountain National Park (60 miles local)
- **Activities**: Emerald Lake Trail, Trail Ridge Road, Alpine Visitor Center
- **Base**: Estes Park

### Day 5: Estes Park → Colorado Springs (180 miles, 3 hours)
- **Highlights**: Garden of the Gods, Pikes Peak
- **Base**: Colorado Springs

### Day 6: Colorado Springs → Plano, TX (580 miles, 8 hours)
- **Stop**: Capulin Volcano National Monument, NM
- **Destination**: Home in Plano, TX

## Using the Website

### Navigation
- **Day Tabs**: Click on Day 1-6 to view each day's itinerary
- **Map View**: Interactive map shows your complete route
- **Stop Details**: Each stop shows time, location, and description

### Editing Your Trip
1. **Edit Existing Stops**:
   - Click "Edit" button next to any stop
   - Modify location, time, or description
   - Click "Save Changes"

2. **Add New Stops**:
   - Scroll to "Add New Stop" section
   - Enter location, time, and description
   - Select which day to add it to
   - Click "Add Stop"

3. **Delete Stops**:
   - Click "Edit" on the stop you want to remove
   - Click "Delete Stop" button
   - Confirm deletion

### Map Controls
- **Optimize Route**: Automatically reorder stops for shortest driving time
- **Reset Route**: Return to original route
- **Print Itinerary**: Generate printer-friendly version

## Best Practices

### Timing
- **Best Season**: Late May through September for optimal weather
- **Trail Ridge Road**: May be closed November through late May
- **Peak Season**: July-August (expect crowds and higher prices)

### Packing
- **Clothing**: Layers for varying elevations and weather
- **Footwear**: Hiking boots and comfortable walking shoes
- **Essentials**: Water bottles, snacks, sunscreen, camera
- **High Altitude**: Consider altitude sickness remedies

### Planning Tips
- **Accommodations**: Book early, especially in Telluride and Estes Park
- **Weather**: Check conditions before departure
- **Vehicle**: Ensure good condition for mountain driving
- **Reservations**: Some attractions may require advance booking

## File Structure

```
Colorado Trip/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
├── itinerary.md        # Detailed written itinerary
└── README.md           # This file
```

## Troubleshooting

### Map Not Loading
- Check if you've added your Google Maps API key
- Ensure your API key has the required APIs enabled
- Check browser console for error messages

### Location Not Found
- Try using more specific addresses
- Include city and state in location names
- Use landmark names for better recognition

### Route Calculation Issues
- Ensure all stops have valid addresses
- Check if any locations are too remote for driving directions
- Try refreshing the page if calculations seem stuck

## Customization

### Adding Your Own Stops
The website is fully customizable. You can:
- Add any number of stops to any day
- Modify existing stop descriptions
- Change timing and scheduling
- Add your own photos and notes

### Extending the Trip
- Add Day 7, 8, etc. by modifying the HTML
- Include additional states or attractions
- Plan multiple trip variations

## Support

If you encounter any issues:
1. Check the browser console for error messages
2. Ensure all files are in the same directory
3. Verify your Google Maps API key is working
4. Try refreshing the page

## Attribution

- Map data and routing: Google Maps
- Trip planning and research: Custom itinerary
- Icons and styling: Custom CSS design

---

**Have a great trip to Colorado!** 🏔️🚗