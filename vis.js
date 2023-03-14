// Define the size and margins for the visualization
const margin = { top: 20, right: 20, bottom: 20, left: 20 };
const width = 600 - margin.left - margin.right;
const height = 600 - margin.top - margin.bottom;

// Append an SVG element to the body of the page
const svg = d3.select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")

// Define the scales for the visualization
const barScale = d3.scaleRadial()
    .range([0, height / 2])
    .domain([0, 100]); // assuming temperatures are in Fahrenheit and range from 0 to 100

const colorScale = d3.scaleLinear()
    .range(["#fee5d9", "#fcae91", "#fb6a4a", "#de2d26", "#a50f15"]) // example color scheme
    .domain([0, 40, 60, 80, 100]); // example temperature breakpoints

// Load the data for each city
// d3.csv("Weather Data/CLT.csv", function (data1) {
//     d3.csv("CQT.csv", function (data2) {
//         d3.csv("IND.csv", function (data3) {
//             d3.csv("JAX.csv", function (data4) {
//                 d3.csv("KHOU.csv", function (data5) {
//                     d3.csv("KNYC.csv", function (data6) {
//                         d3.csv("KSEA.csv", function (data7) {
//                             d3.csv("MDW.csv", function (data8) {
//                                 d3.csv("PHL.csv", function (data9) {
//                                     d3.csv("PHX.csv", function (data10) {
//                                         // Merge the data into a single array
//                                         const data = data1.concat(data2, data3, data4, data5, data6, data7, data8, data9, data10);

//                                         // Your code for creating the visualization goes here...
//                                     });
//                                 });
//                             });
//                         });
//                     });
//                 });
//             });
//         });
//     });
// });


Promise.all([d3.csv("../WeatherData/CLT.csv"),
d3.csv("../WeatherData/CQT.csv"),
d3.csv("../WeatherData/IND.csv"),
d3.csv("../WeatherData/JAX.csv"),
d3.csv("../WeatherData/KHOU.csv"),
d3.csv("../WeatherData/KNYC.csv"),
d3.csv("../WeatherData/KSEA.csv"),
d3.csv("../WeatherData/MDW.csv"),
d3.csv("../WeatherData/PHL.csv"), 
d3.csv("../WeatherData/PHX.csv")]).then(function(files) {   
    
// set up the svg container  var width = 960,  height = 600;  var svg = d3...

// Compute the average record high temperature for each city for each month
const cityMonthAverages = [];
cities.forEach(city => {
    const cityData = data.filter(d => d.City === city);
    const months = d3.map(cityData, d => d.Month).keys();
    months.forEach(month => {
        const monthData = cityData.filter(d => d.Month === month);
        const averageTemperature = d3.mean(monthData, d => d.RecordHigh);
        cityMonthAverages.push({ city, month, averageTemperature });
    });
});

// 


});