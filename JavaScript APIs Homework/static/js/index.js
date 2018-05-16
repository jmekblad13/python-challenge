// Get references to the tbody element, input field and button
var tbody = document.querySelector("tbody");
var url = "/metadata/940";


function renderTable() {
    Plotly.d3.json(url, function(error, response) {
        console.log(response);
        tbody.innerHTML = "";
        var row = tbody.insertRow(0);
        var cell = row.insertCell(0);
        cell.innerText = "AGE:";
        var cell = row.insertCell(1);
        cell.innerText = response[0].AGE;

        var row = tbody.insertRow(1);
        var cell = row.insertCell(0);
        cell.innerText = "BBTYPE:";
        var cell = row.insertCell(1);
        cell.innerText = response[0].BBTYPE;

        var row = tbody.insertRow(2);
        var cell = row.insertCell(0);
        cell.innerText = "ETHNICITY:";
        var cell = row.insertCell(1);
        cell.innerText = response[0].ETHNICITY;

        var row = tbody.insertRow(3);
        var cell = row.insertCell(0);
        cell.innerText = "GENDER:";
        var cell = row.insertCell(1);
        cell.innerText = response[0].GENDER;

        var row = tbody.insertRow(4);
        var cell = row.insertCell(0);
        cell.innerText = "ID:";
        var cell = row.insertCell(1);
        cell.innerText = response[0].ID;

        var row = tbody.insertRow(5);
        var cell = row.insertCell(0);
        cell.innerText = "LOCATION:";
        var cell = row.insertCell(1);
        cell.innerText = response[0].LOCATION;


    });
}

renderTable();


// Get references to the tbody element, input field and button
var selectList = document.querySelector("#selDataset");
var url = "/api/otu";


function renderDropDown() {
    Plotly.d3.json(url, function(error, response) {
        console.log(response[0]);
        for (var i = 0; i < response.length; i++) {
            var todoListItem = document.createElement("option");

            // Retrieve todo object from todos list
            var todo = response[i];
        
            // Update todoListItem's innerHTML w/ the text of the todo object
            todoListItem.innerHTML = todo;
        
            // Add todo to the list
            selectList.appendChild(todoListItem);
        }


    });
}

renderDropDown();


