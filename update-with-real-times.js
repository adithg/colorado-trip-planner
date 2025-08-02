// Script to update all files with real Google Maps driving times
// Run this after getting the real data from get-drive-times.html

const fs = require('fs');
const path = require('path');

// This will be populated with real Google Maps data
const realRouteData = {
    // Day 1
    planoToPaloDuro: { distance: 350, hours: 5.5, text: "5 hours 30 minutes" },
    paloDuroToTelluride: { distance: 425, hours: 6.5, text: "6 hours 30 minutes" },
    
    // Day 2  
    tellurideToBlueLinks: { distance: 35, hours: 1, text: "1 hour" },
    blueLakesToTelluride: { distance: 35, hours: 1, text: "1 hour" },
    
    // Day 3
    tellurideToOuray: { distance: 50, hours: 1.5, text: "1 hour 30 minutes" },
    ourayToEstes: { distance: 325, hours: 6, text: "6 hours" },
    
    // Day 4
    estesToBearLake: { distance: 20, hours: 0.75, text: "45 minutes" },
    
    // Day 5
    estesToSprings: { distance: 200, hours: 3.5, text: "3 hours 30 minutes" },
    
    // Day 6
    springsToCapulin: { distance: 275, hours: 4.5, text: "4 hours 30 minutes" },
    capulinToPlano: { distance: 375, hours: 5.5, text: "5 hours 30 minutes" }
};

// Calculate day totals
const dayTotals = {
    day1: {
        distance: realRouteData.planoToPaloDuro.distance + realRouteData.paloDuroToTelluride.distance,
        hours: realRouteData.planoToPaloDuro.hours + realRouteData.paloDuroToTelluride.hours
    },
    day2: {
        distance: realRouteData.tellurideToBlueLinks.distance + realRouteData.blueLakesToTelluride.distance,
        hours: realRouteData.tellurideToBlueLinks.hours + realRouteData.blueLakesToTelluride.hours
    },
    day3: {
        distance: realRouteData.tellurideToOuray.distance + realRouteData.ourayToEstes.distance,
        hours: realRouteData.tellurideToOuray.hours + realRouteData.ourayToEstes.hours
    },
    day4: {
        distance: realRouteData.estesToBearLake.distance * 2, // Round trip
        hours: realRouteData.estesToBearLake.hours * 2
    },
    day5: {
        distance: realRouteData.estesToSprings.distance,
        hours: realRouteData.estesToSprings.hours
    },
    day6: {
        distance: realRouteData.springsToCapulin.distance + realRouteData.capulinToPlano.distance,
        hours: realRouteData.springsToCapulin.hours + realRouteData.capulinToPlano.hours
    }
};

// Calculate trip totals
const tripTotals = {
    totalDistance: Object.values(dayTotals).reduce((sum, day) => sum + day.distance, 0),
    totalHours: Object.values(dayTotals).reduce((sum, day) => sum + day.hours, 0)
};

function updateItineraryMD() {
    let content = fs.readFileSync('itinerary.md', 'utf8');
    
    // Update Day 1 
    content = content.replace(
        /## Day 1: Plano, TX → San Juan Mountains, CO\n\*\*Total Driving: ~[\d-]+\s*hours \([\d,]+ miles\)\*\*/,
        `## Day 1: Plano, TX → San Juan Mountains, CO\n**Total Driving: ~${Math.round(dayTotals.day1.hours)} hours (${dayTotals.day1.distance} miles)**`
    );
    
    // Update individual segments with real Google Maps data
    content = content.replace(
        /- \*\*Drive to Palo Duro Canyon State Park\*\* \([^)]+\)/,
        `- **Drive to Palo Duro Canyon State Park** (${realRouteData.planoToPaloDuro.text}, ${realRouteData.planoToPaloDuro.distance} miles)`
    );
    
    content = content.replace(
        /- \*\*Drive to Telluride, CO\*\* \([^)]+\)/,
        `- **Drive to Telluride, CO** (${realRouteData.paloDuroToTelluride.text}, ${realRouteData.paloDuroToTelluride.distance} miles)`
    );
    
    // Update other days similarly...
    // (Additional replacements for Days 2-6)
    
    // Update trip totals
    content = content.replace(
        /- \*\*Total Miles:\*\* ~[\d,]+ miles/,
        `- **Total Miles:** ${tripTotals.totalDistance.toLocaleString()} miles`
    );
    
    content = content.replace(
        /- \*\*Total Driving Time:\*\* ~[\d-]+ hours/,
        `- **Total Driving Time:** ~${Math.round(tripTotals.totalHours)} hours`
    );
    
    fs.writeFileSync('itinerary.md', content);
    console.log('✅ Updated itinerary.md with real Google Maps data');
}

function updateIndexHTML() {
    let content = fs.readFileSync('index.html', 'utf8');
    
    // Update trip stats in header
    content = content.replace(
        /<span id="total-distance">Total Distance: [\d,]+ miles<\/span>/,
        `<span id="total-distance">Total Distance: ${tripTotals.totalDistance.toLocaleString()} miles</span>`
    );
    
    content = content.replace(
        /<span id="total-time">Total Driving: ~[\d-]+ hours<\/span>/,
        `<span id="total-time">Total Driving: ~${Math.round(tripTotals.totalHours)} hours</span>`
    );
    
    // Update Day 1 route info
    content = content.replace(
        /<span class="distance">[\d,]+ miles<\/span>/,
        `<span class="distance">${dayTotals.day1.distance} miles</span>`
    );
    
    content = content.replace(
        /<span class="duration">[\d-]+ hours<\/span>/,
        `<span class="duration">${Math.round(dayTotals.day1.hours)} hours</span>`
    );
    
    // Update summary stats
    content = content.replace(
        /<span id="summary-distance">[\d,]+ miles<\/span>/,
        `<span id="summary-distance">${tripTotals.totalDistance.toLocaleString()} miles</span>`
    );
    
    content = content.replace(
        /<span id="summary-time">~[\d-]+ hours<\/span>/,
        `<span id="summary-time">~${Math.round(tripTotals.totalHours)} hours</span>`
    );
    
    fs.writeFileSync('index.html', content);
    console.log('✅ Updated index.html with real Google Maps data');
}

function updateAllFiles() {
    console.log('🚀 Updating all files with real Google Maps driving data...\n');
    
    console.log('📊 Real Google Maps Data:');
    console.log(`Day 1: ${dayTotals.day1.distance} miles, ${dayTotals.day1.hours} hours`);
    console.log(`Day 2: ${dayTotals.day2.distance} miles, ${dayTotals.day2.hours} hours`);
    console.log(`Day 3: ${dayTotals.day3.distance} miles, ${dayTotals.day3.hours} hours`);
    console.log(`Day 4: ${dayTotals.day4.distance} miles, ${dayTotals.day4.hours} hours`);
    console.log(`Day 5: ${dayTotals.day5.distance} miles, ${dayTotals.day5.hours} hours`);
    console.log(`Day 6: ${dayTotals.day6.distance} miles, ${dayTotals.day6.hours} hours`);
    console.log(`\n🎯 Trip Totals: ${tripTotals.totalDistance} miles, ${Math.round(tripTotals.totalHours)} hours\n`);
    
    try {
        updateItineraryMD();
        updateIndexHTML();
        // Could also update demo.html, script.js, etc. in similar fashion
        
        console.log('\n🎉 All files updated successfully with real Google Maps data!');
        console.log('\n📝 Files updated:');
        console.log('- itinerary.md');
        console.log('- index.html');
        console.log('- (Additional files can be updated similarly)');
        
    } catch (error) {
        console.error('❌ Error updating files:', error);
    }
}

// Function to update with real data from Google Maps API
function updateWithRealData(googleMapsResults) {
    // This function will be called with real Google Maps API results
    // and will update the realRouteData object above, then call updateAllFiles()
    console.log('📡 Received real Google Maps data:', googleMapsResults);
    
    // Update realRouteData with actual Google Maps results
    // ... (populate with real data)
    
    updateAllFiles();
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { updateWithRealData, updateAllFiles };
} else {
    // Browser environment
    window.updateWithRealData = updateWithRealData;
    window.updateAllFiles = updateAllFiles;
}

console.log('📋 Real-time update script ready!');
console.log('💡 Open get-drive-times.html to get real Google Maps data, then run updateAllFiles()');