// Set up the chart dimensions
const margin = { top: 20, right: 20, bottom: 50, left: 50 };
const width = 600 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

// Create the SVG element
const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Load the data
d3.csv("weatherdata.csv", (d) => ({
    month: d.month,
    HOU: +d.HOU,
    NYC: +d.NYC,
    SEA: +d.SEA,
    MDW: +d.MDW,
    PHL: +d.PHL,
    PHX: +d.PHX,
})).then((data) => {

    // Define the x and y scales
    const xScale = d3.scaleBand()
        .domain(data.map((d) => d.month))
        .range([0, width])
        .padding(0.2);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, (d) => d.HOU)])
        .range([height, 0]);

    // Create the x and y axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg.append("g")
        .attr("transform", function () {
            return "translate(0, " + height + ")"
        })
        .call(xAxis);

    svg.append("g")
        .call(yAxis);

    // Add x-axis title
    svg.append("text")
        .attr("class", "x-axis-title")
        .attr("text-anchor", "middle")
        .attr("x", width / 2)
        .attr("y", height + margin.top + 20)
        .text("Month");

    // Add y-axis title
    svg.append("text")
        .attr("class", "y-axis-title")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", -margin.left + 15)
        .text("Temperature (°F)");


    // Define a color scale
    const colorScale = d3.scaleSequential()
        .domain([d3.min(data, d => d.HOU), d3.max(data, d => d.HOU)])
        .interpolator(d3.interpolateReds);


    // Create the bars
    let bars = svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", (d) => xScale(d.month))
        .attr("width", xScale.bandwidth())
        .attr("y", (d) => yScale(d.HOU))
        .attr("height", (d) => height - yScale(d.HOU))
        .attr("fill", (d) => colorScale(d.HOU));

    // Add a class to the dropdown for styling purposes
    d3.select("#cities")
        .classed("dropdown", true);

    // Add interactivity to the chart
    d3.select("#cities").on("change", () => {
        const selectedCity = d3.select("#cities").node().value;

        // Update the y scale based on the selected city
        yScale.domain([0, d3.max(data, (d) => d[selectedCity])]);

        // Update the color scale based on the selected city
        colorScale.domain([d3.min(data, d => d[selectedCity]), d3.max(data, d => d[selectedCity])]);

        // Update the bars' positions, heights, and colors based on the selected city
        bars.data(data)
            .transition()
            .duration(500)
            .attr("y", (d) => yScale(d[selectedCity]))
            .attr("height", (d) => height - yScale(d[selectedCity]))
            .attr("fill", (d) => colorScale(d[selectedCity]));
    });
});
