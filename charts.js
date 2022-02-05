function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    console.log(data);

    var sampleNames = data.names;
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildCharts2(firstSample);
    buildCharts3(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  buildCharts2(newSample);
  buildCharts3(newSample);

}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;

    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts2(sample) {

  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {

    // 3. Create a variable that holds the samples array. 
    var samplesArray = data.samples;
    console.log(samplesArray);

    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var filteredArray = samplesArray.filter(data => data.id == sample);
    console.log(filteredArray);

    //  5. Create a variable that holds the first sample in the array.
    var firstSample = filteredArray[0];

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids = firstSample.otu_ids;
    var otu_labels = firstSample.otu_labels;
    var sample_values = firstSample.sample_values;


    // 7. Create the yticks for the bar chart.
    var yticks = otu_ids.slice(0, 10).map(id => "OTU" + id).reverse();
    console.log(yticks);


    // 8. Create the trace for the bar chart.

    var trace1 = {
      y: yticks,
      x: sample_values.slice(0, 10).reverse(),
      text: otu_labels.slice(0, 10).reverse(),
      type: "bar",
    };

    var barData = [trace1];
    console.log(barData);

    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Bacterial Species",
    };

    console.log("hi");
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);
  });
}

// Bar and Bubble charts
// Create the buildCharts function.
function buildCharts3(sample) {

  // Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {


    // 1. Create the trace for the bubble chart.
    var samplesArray = data.samples;
    var filteredArray = samplesArray.filter(data => data.id == sample);
    var firstSample = filteredArray[0];
    var otu_ids = firstSample.otu_ids;
    var otu_labels = firstSample.otu_labels;
    var sample_values = firstSample.sample_values;

    var trace2 = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: "Earth"
      }
    };

    var bubbleData = [trace2];
    console.log(bubbleData);

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: 'Bacteria Cultures Per Sample',
      showlegend: false,
      xaxis: { title: "OTU ID", automargin: true },
      yaxis: { automargin: true },
      margin: { t: 50, r: 50, l: 50, b: 50 },
      hovermode: "closest"
    };
    console.log(bubbleLayout);
    console.log("hi3");

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
  });
}


// Create the buildChart function.
function buildCharts(sample) {

  // Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);

    // Create a variable that holds the samples array. 
    // Create a variable that filters the samples for the object with the desired sample number.

    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metadata_SelId = data.metadata.filter(data => data.id == sample);
    console.log(metadata_SelId);

    // 3. Create a variable that holds the washing frequency.
    var washFreq = +metadata_SelId[0].wfreq;

    // 4. Create the trace for the gauge chart.
    var gaugeData = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: washFreq,
        title: { text: "<b>Belly Button Washing Frequency</b><br>Scrubs per week" },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
          axis: {
            range: [null, 10],
            tickmode: "array",
            tickvals: [0, 2, 4, 6, 8, 10],
            ticktext: [0, 2, 4, 6, 8, 10]
          },
          bar: { color: "black" },
          steps: [
            { range: [0, 2], color: "red" },
            { range: [2, 4], color: "orange" },
            { range: [4, 6], color: "yellow" },
            { range: [6, 8], color: "lime" },
            { range: [8, 10], color: "green" }]
        }
      }
    ];

    // 5. Create the layout for the gauge chart.
    var gaugeLayout = {
      autosize: true,
      annotations: [{
        xref: 'paper',
        yref: 'paper',
        x: 0.5,
        xanchor: 'center',
        y: 0,
        yanchor: 'center',
        text: "The gauge displays your belly button weekly washing frequency",
        showarrow: false
      }]
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout, { responsive: true });
  });
}