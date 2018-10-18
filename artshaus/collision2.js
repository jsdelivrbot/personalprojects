var width = 100,
    height = 100;

var nodes = d3.range(500).map(function() { return {radius: Math.random() * 12 + 4}; }),
    root = nodes[0];

root.radius = 0;
root.fixed = true;

var force = d3.layout.force()
    .gravity(0.02)
    .charge(function(d, i) { return i ? -50 : -700; })
    .nodes(nodes)
    .size([width, height]);

force.start();

var svg = d3.select("body").append("svg")
    .attr("width", width+'vw')
    .attr("height", height+'vh');

svg.append("text")
  .text("arts haus")
  .attr("x",20)
  .attr("y",200);

svg.selectAll(".black")
    .data(nodes.slice(1))
    .enter().append("circle")
    .attr("class","black")
    .attr("r", function(d) { return d.radius; })
    .style("fill", "black");

force.on("tick", function(e) {
  var q = d3.geom.quadtree(nodes),
      i = 0,
      n = nodes.length;

  while (++i < n) q.visit(collide(nodes[i]));

  svg.selectAll(".black")
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });
});

svg.on("mousemove", function() {
  var p1 = d3.mouse(this), i=0;
  root.px = p1[0];
  root.py = p1[1];


  var m = d3.mouse(this);
  m.number = Math.random();

if (m.number>0.7){
  svg.insert("circle", "rect")
      .attr("cx", m[0])
      .attr("cy", m[1])
      .attr("r", Math.random()*30)
      .style("stroke", d3.hsl((m[1]/5) % 360, .9, .6))
      .style("fill", "black")
      .style("stroke-opacity", 1)
    .transition()
      .duration(2000)
      .ease(Math.sqrt)
      .attr("r", Math.random()*30)
      .style("opacity", 1e-6)
      .remove();

  d3.event.preventDefault();
  force.resume();
}


});

//svg.on("mousemove",particle());

function collide(node) {
  var r = node.radius + 16,
      nx1 = node.x - r,
      nx2 = node.x + r,
      ny1 = node.y - r,
      ny2 = node.y + r;
  return function(quad, x1, y1, x2, y2) {
    if (quad.point && (quad.point !== node)) {
      var x = node.x - quad.point.x,
          y = node.y - quad.point.y,
          l = Math.sqrt(x * x + y * y),
          r = node.radius + quad.point.radius;
      if (l < r) {
        l = (l - r) / l * .5;
        node.x -= x *= l;
        node.y -= y *= l;
        quad.point.x += x;
        quad.point.y += y;
      }
    }
    return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
  };
}


