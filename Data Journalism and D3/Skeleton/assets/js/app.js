// D3 Scatterplot Assignment

// Students:
// =========
// Follow your written instructions and create a scatter plot with D3.js.

// When the browser window is resized, makeResponsive() is called.
d3.select(window).on("resize", makeResponsive);

// When the browser loads, makeResponsive() is called.
makeResponsive();

// // Initial Params
var chosenXAxis = "meanHHincome";



function renderAxes(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale)

  xAxis.transition()
    .duration(1000)
    .call(bottomAxis)

  return xAxis
};

function renderCircles(circlesGroup, newXScale, chosenXaxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]))

  return circlesGroup
};




// The code for the chart is wrapped inside a function that
// automatically resizes the chart
function makeResponsive() {

  // if the SVG area isn't empty when the browser loads,
  // remove it and replace it with a resized version of the chart
  var svgArea = d3.select("iframeContainer").select("svg");

  // clear svg is not empty
  if (!svgArea.empty()) {
    svgArea.remove();
  }

  // SVG wrapper dimensions are determined by the current width and
  // height of the browser window.
  var svgWidth = window.innerWidth;
  var svgHeight = window.innerHeight;

  margin = {
    top: 25,
    bottom: 100,
    right: 25,
    left: 100
  };

  var height = svgHeight - margin.top - margin.bottom;
  var width = svgWidth - margin.left - margin.right;

  // Append SVG element
  var svg = d3
    .select(".chart")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

  // Append group element
  var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);



// function used for updating x-scale var upon click on axis label
  function xScale(myData, chosenXAxis) {
    // create scales
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(myData, d => d[chosenXAxis]) * 0.8,
        d3.max(myData, d => d[chosenXAxis]) * 1.2
      ])
      .range([0, width])

    return xLinearScale
  };

// function used for updating xAxis var upon click on axis label


// function used for updating circles group with a transition to
// new circles





// function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, circlesGroup) {

  if (chosenXAxis == "meanHHincome") {
    var label = "Mean Household Income:"
  } else if (chosenXAxis == "noenglish") {
    var label = "Homes without an english speaker:"
  } else {
    var label = "Percentage of People with less than highschool education:"
  }

  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function (d) {
      return (`${d.state}<br>${label} ${d[chosenXAxis]}<hr>${d.normalWeight}% at Normal Weight`);
    });


  circlesGroup.call(toolTip);

  circlesGroup.on("mouseover", function (data) {
      toolTip.show(data);
    })
    // onmouseout event
    .on("mouseout", function (data, index) {
      toolTip.hide(data);
    });

  return circlesGroup
};


  // Read CSV
  d3.csv("data/data.csv", function(err, myData) {
    if (err) throw err;
    // create date parser
    //var dateParser = d3.timeParse("%d-%b");

    // parse data
    myData.forEach(function(data){
      data.normalWeight = +data.normalWeight;
      data.meanHHincome = +data.meanHHincome;
      data.nodentist = +data.nodentist;
      data.noenglish = +data.noenglish;
      data.smokeeveryday = +data.smokeeveryday;
      data.lessthanhighschool = +data.lessthanhighschool;
    });

  // // xLinearScale function above csv import
    var xLinearScale = xScale(myData, chosenXAxis);

    // // create scales
    // var xLinearScale = d3.scaleLinear()
    //   .domain(d3.extent(myData, d => d.meanHHincome))
    //   .range([0, width]);

    var yLinearScale = d3.scaleLinear().domain(d3.extent(myData, d => d.normalWeight)).range([height, 0]);

    // create axes  
    var xAxis = d3.axisBottom(xLinearScale).ticks(6);
    var yAxis = d3.axisLeft(yLinearScale).ticks(6);

    // append axes
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis);

    chartGroup.append("g")
      .call(yAxis);



    // append circles
    var circlesGroup = chartGroup.selectAll("circle")
      .data(myData)
      .enter()
      .append("circle")
      .attr("cx", d => xLinearScale(d.meanHHincome))
      .attr("cy", d => yLinearScale(d.normalWeight))
      .attr("r", "10")
      .attr("fill", "lightblue");

    var textGroup = chartGroup.selectAll("text")
      .data(myData)
      .enter()
      .append("text")
      .attr("x", d => xLinearScale(d.meanHHincome-.1))
      .attr("y", d => yLinearScale(d.normalWeight-.1))
      .attr("font-family", "sans-serif")
      .attr("font-size", "8px")
      .attr("fill", "white")
      .text(d => d.abbreviation);

    

    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (svgHeight / 2))
      .attr("dy", "1em")
      .classed("axis-text", true)
      .text("Population at Normal Weight (%)");

    var labelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${width/2}, ${height + 20})`)

    var income = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .attr("value", "meanHHincome") //value to grab for event listener
    .classed("active", true)
    .text("Mean Household Income");

    var english = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 40)
    .attr("value", "noenglish") //value to grab for event listener
    .classed("inactive", true)
    .text("Households who do not have an English-speaker");

    var highschool = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 60)
    .attr("value", "lessthanhighschool") //value to grab for event listener
    .classed("inactive", true)
    .text("Less than highschool education (%)");
    
    // Step 1: Initialize Tooltip
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d){
        return (`<strong>${d.state}<strong><hr>$${d.meanHHincome} Mean Household Income<hr>${d.normalWeight}% at Normal Weight`)
      })

    // Step 2: Create the tooltip in chartGroup.
    chartGroup.call(toolTip)

    // Step 3: Create "mouseover" event listener to display tooltip
    circlesGroup.on("mouseover", function(d){
        toolTip.show(d)
    })
    // Step 4: Create "mouseout" event listener to hide tooltip
      .on("mouseout", function(d){
        toolTip.hide(d)
      });

    var circlesGroup = updateToolTip(chosenXAxis, circlesGroup)

    labelsGroup.selectAll("text")
    .on("click", function () {
      // get value of selection
      var value = d3.select(this).attr("value")
      if (value != chosenXAxis) {

        // replaces chosenXAxis with value
        chosenXAxis = value;

        // console.log(chosenXAxis)

        // functions here found above csv import
        // updates x scale for new data
        xLinearScale = xScale(myData, chosenXAxis);

        // updates x axis with transition
        xAxis = renderAxes(xLinearScale, xAxis);

        // updates circles with new x values
        circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

        // updates tooltips with new info
        circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

        // changes classes to change bold text
        if (chosenXAxis == "meanHHincome") {
          income
            .classed("active", true)
            .classed("inactive", false)
          english
            .classed("active", false)
            .classed("inactive", true)
          highschool
            .classed("active", false)
            .classed("inactive", true)
        } 
        else if (chosenXAxis == "noenglish") {
          income
            .classed("active", false)
            .classed("inactive", true)
          english
            .classed("active", true)
            .classed("inactive", false)
          highschool
            .classed("active", false)
            .classed("inactive", true)
        }
        else {
          income
            .classed("active", false)
            .classed("inactive", true)
          english
            .classed("active", false)
            .classed("inactive", true)
          highschool
            .classed("active", true)
            .classed("inactive", false)
        };
      };
    });
  });
};
  
