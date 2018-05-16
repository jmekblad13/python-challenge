/* data route */
var url = "/samples/BB_941";

function buildPlot() {
    Plotly.d3.json(url, function(error, response) {

        console.log(response);
        var trace1 = {
            type: "scatter",
            mode: "markers",
            marker: {size: response[0].sample_values},
            x: response[0].otu_ids,
            y: response[0].sample_values

        };
        
        var data = [trace1];

        var layout = {
           
            xaxis: {
                name: "OTU_ID",
                autorange: true
                // type: "linear"

            },
            yaxis: {
                autorange:true
                // type: "linear"
            }
        };

        Plotly.newPlot("plot", data, layout);
    });
}

buildPlot();
