function init() {
  var selector = d3.select("#selDataset");

  d3.json("samples.json").then((data) => {
    console.log(data);

    var sampleNames = data.names;
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
})}

init();

function optionChanged(newSample) {
  console.log(newSample);
}

function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    var PANEL = d3.select("#sample-metadata");
      console.log(Object.keys(result));
      console.log(result["id"]);

    PANEL.html("");
      for (key of Object.keys(result)){
        console.log(key);
        PANEL.append("h6").text(key+": "+result[key]);
      }
    // PANEL.append("h6").text("ID: "+result.id);
    // PANEL.append("h6").text("Ethnicity: "+result.ethnicity);
    // PANEL.append("h6").text("Gender: "+result.gender);
    // PANEL.append("h6").text("Age: "+result.age);
    // PANEL.append("h6").text("location: "+result.location);
    // PANEL.append("h6").text("BBType: "+result.bbtype);
    // PANEL.append("h6").text("WFREQ: "+result.wfreq);

  });
}

function optionChanged(newSample) {
  buildMetadata(newSample);
  //buildCharts(newSample);
}
