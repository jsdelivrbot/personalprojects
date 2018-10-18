

var width = 1000,
    height = 1000;
var i = 0;
var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

svg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .on( "mousemove", particle);

function particle() {
  var m = d3.mouse(this);

  svg.insert("circle", "rect")
      .attr("cx", m[0])
      .attr("cy", m[1])
      .attr("r", 5)
      .style("stroke", d3.hsl((m[1]) % 360), .7, .6))
      .style("fill",d3.hsl((m[1]) % 360), 0.7, .6))
      .style("stroke-opacity", 1)
    .transition()
      .duration(7000)
      .ease(Math.sqrt)
      .attr("r", 20)
      .style("opacity", 1e-6)

      .remove();

  d3.event.preventDefault();
}
