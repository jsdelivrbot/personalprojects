var filename = "YRBSS_CigData.json";
console.log("begin");
d3.json(filename, function(data) {startMap(data)});

function startMap(data){
var map = d3.geomap.choropleth()
    .geofile('/d3-geomap/topojson/countries/USA.json')
    .projection(d3.geo.albersUsa)
    .column('2012')
    .unitId('fips')
    .scale(1000)
    .legend(true);

}

