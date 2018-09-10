    //specify projection
    var mheight = 500;
    var mwidth = 800;
    d3.select("#map").style("height",mheight).style("width",mwidth);

    var path = d3.geo.path().projection(d3.geo.albersUsa().scale([900]));


    //load in data
    d3.json("states.json",function(error, us){
     var map = d3.select("#map").selectAll("path")
        .data(us.features) //bind geoJson data to path
        .enter()
        .append("path")
        .attr("d",path)
        .on("mouseover",function(e){d3.select(this).style("opacity", "0.9")})
        .on("mouseover",function(e){d3.select(this).style("fill", "red")})
        .on("mouseout", function(e) {d3.select(this).style("opacity","1")})
        .on("mouseout", function(e) {d3.select(this).style("fill","#000000")});

    //^ at this point map should be created

    d3.json("YRBSS_CigData.json", function(error,data){
      getData(data, us);
    })
  });

   function getData(data,us) {
      var cig = [];
      for(var i = 0; i < data.length;i++) {
        if ((data[i].YEAR == "2015")  && (data[i].TopicDesc == "Cigarette Use (Youth)")&& (data[i].Response == "Frequent") && (data[i].Gender =="Overall"))  {
            cig.push(data[i]);
          }
        }
      bindData(cig,us);
    }

  function bindData(cig,us){
    //Merge the cig data and topoJSON
    //Loop through once for each cig data value
     var color = d3.scale.quantize()
              .range(["rgb(237,248,233)", "rgb(186,228,179)",
               "rgb(116,196,118)", "rgb(49,163,84)", "rgb(0,109,44)"]);
      color.domain([
          d3.min(cig, function(d) {return d.Data_Value; }),
          d3.max(cig, function(d) { return d.Data_Value; })
        ]);

    for (var i = 0; i < cig.length; i++) {
      var dataState = cig[i].LocationDesc;
      var dataValue = parseFloat(cig[i].Data_Value);
      //find corresponding state in topoJSON
      for (var j =0; j <us.features.length;j++ ){
        var usState = us.features[j].properties.name;
        if (dataState == usState){
          //Copy the data value into the JSON
          us.features[j].properties.value = dataValue;
          //Stop looking through the JSON
          break;
        }
      }
    }


     d3.select("#map").selectAll("path")
           .data(us.features)
           .enter()
           .append("path")
           .attr("d", path)
           .style("fill", function(d) { //whyyyyyyyy is it not going
       console.log("hiii")
               //Get data value
               var value = d.properties.value;
               if (value > 2) {
                   //If value exists…
                   return color(value);
               } else {
                   //If value is undefined…
                   return "#ccc";
               }
           });
    console.log(us);


    /* function(d) { //whyyyyyyyy is it not going
       console.log("hiii")
               //Get data value
               var value = d.properties.value;
               if (value > 2) {
                   //If value exists…
                   return color(value);
               } else {
                   //If value is undefined…
                   return "#ccc";
               }
           }*/




  }






