// Get references to the tbody element, input field and button
var tbody = document.querySelector("tbody");
//var myTable = document.querySelector("#myTable");
var dateInput = document.querySelector("#dateTime");
var dateSearchBtn = document.querySelector("#dateSearch");
var cityInput = document.querySelector("#city");
var citySearchBtn = document.querySelector("#citySearch");
var stateInput = document.querySelector("#state");
var stateSearchBtn = document.querySelector("#stateSearch");
var countryInput = document.querySelector("#country");
var countrySearchBtn = document.querySelector("#countrySearch");
var shapeInput = document.querySelector("#shape");
var shapeSearchBtn = document.querySelector("#shapeSearch");

// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
dateSearchBtn.addEventListener("click", handleDateSearchButtonClick);
citySearchBtn.addEventListener("click", handleCitySearchButtonClick);
stateSearchBtn.addEventListener("click", handleStateSearchButtonClick);
countrySearchBtn.addEventListener("click", handleCountrySearchButtonClick);
shapeSearchBtn.addEventListener("click", handleShapeSearchButtonClick);

// Set ufoData to data initially
var ufoData = dataSet;

// renderTable renders the ufoData to the tbody
function renderTable() {
  tbody.innerHTML = "";
  for (var i = 0; i < ufoData.length; i++) {
  //for (var i = 0; i < 50; i++) {
    // Get get the current ufoSighting object and its fields
    var ufoSighting = ufoData[i];
    var fields = Object.keys(ufoSighting);
    // Create a new row in the tbody, set the index to be i + startingIndex
    var row = tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {
      // For every field in the ufoSighting object, create a new cell at set its inner text to be the current value at the current ufoSighting's field
      var field = fields[j];
      var cell = row.insertCell(j);
      cell.innerText = ufoSighting[field];
    }
  }
}





function handleDateSearchButtonClick() {
  // Format the user's search by removing leading and trailing whitespace, lowercase the string
  var filterDate = dateInput.value.trim();
  console.log(filterDate);

  // Set ufoData to an array of all ufoSightinges whose "state" matches the filter
  ufoData = dataSet.filter(function(ufoSighting) {
    var ufoSightingDate = ufoSighting.dateTime;

    console.log(ufoSightingDate);

    // If true, add the ufoSighting to the ufoData, otherwise don't add it to ufoData
    return ufoSightingDate === filterDate;
  });

  renderTable();
}

function handleCitySearchButtonClick() {
    // Format the user's search by removing leading and trailing whitespace, lowercase the string
    var filterCity = cityInput.value.trim().toLowerCase();
  
    // Set ufoData to an array of all ufoSightinges whose "state" matches the filter
    ufoData = dataSet.filter(function(ufoSighting) {
      var ufoSightingCity = ufoSighting.city.toLowerCase();
  
      // If true, add the ufoSighting to the ufoData, otherwise don't add it to ufoData
      return ufoSightingCity === filterCity;
    });
  


  renderTable();
}





function handleStateSearchButtonClick() {
  // Format the user's search by removing leading and trailing whitespace, lowercase the string
  var filterState = stateInput.value.trim().toLowerCase();

  // Set ufoData to an array of all ufoSightinges whose "state" matches the filter
  ufoData = dataSet.filter(function(ufoSighting) {
    var ufoSightingState = ufoSighting.state.toLowerCase();

    // If true, add the ufoSighting to the ufoData, otherwise don't add it to ufoData
    return ufoSightingState === filterState;
  });



renderTable();
}

function handleCountrySearchButtonClick() {
  // Format the user's search by removing leading and trailing whitespace, lowercase the string
  var filterCountry = countryInput.value.trim().toLowerCase();

  // Set ufoData to an array of all ufoSightinges whose "state" matches the filter
  ufoData = dataSet.filter(function(ufoSighting) {
    var ufoSightingCountry = ufoSighting.country.toLowerCase();

    // If true, add the ufoSighting to the ufoData, otherwise don't add it to ufoData
    return ufoSightingCountry === filterCountry;
  });



renderTable();
}

function handleShapeSearchButtonClick() {
  // Format the user's search by removing leading and trailing whitespace, lowercase the string
  var filterShape = shapeInput.value.trim().toLowerCase();

  // Set ufoData to an array of all ufoSightinges whose "state" matches the filter
  ufoData = dataSet.filter(function(ufoSighting) {
    var ufoSightingShape = ufoSighting.shape.toLowerCase();

    // If true, add the ufoSighting to the ufoData, otherwise don't add it to ufoData
    return ufoSightingShape === filterShape;
  });



renderTable();
}




// Render the table for the first time on page load
renderTable();
