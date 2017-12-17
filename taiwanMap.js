d3.json('county.json', function(topodata) {
    const features = topojson.feature(topodata, topodata.objects['COUNTY_MOI_1060525']).features;
    console.log(features);
    const path = d3.geo.path().projection(
        d3.geo.mercator().center([121, 24]).scale(6000)
    );
    d3.select('svg').selectAll('path').data(features)
        .enter().append('path').attr('d', path);
    const density = {
        '臺北市': 9872.42,
        '嘉義市': 4487.05,
        '新竹市': 4231.45,
        '基隆市': 2798.76,
        '新北市': 1942.10,
        '桃園市': 1789.31,
        '臺中市': 1257.47,
        '彰化縣': 1193.85,
        '高雄市': 940.71,
        '金門縣': 905.04,
        '臺南市': 860.75,
        '澎湖縣': 819.81,
        '雲林縣': 535.05,
        '連江縣': 448.87,
        '新竹縣': 386.55,
        '苗栗縣': 304.49,
        '屏東縣': 299.14,
        '嘉義縣': 268.71,
        '宜蘭縣': 213.04,
        '南投縣': 122.12,
        '花蓮縣': 71.16,
        '臺東縣': 62.48,
    };
    //利用for迴圈將人口密度加入properties.density
    for (let i = features.length - 1; i >= 0; i--) {
        features[i].properties.density = density[features[i].properties.COUNTYNAME];
    };
    console.log(features);
    const color = d3.scale.linear().domain([0, 10000]).range(['#FFEDA0', '#f00']);

    function updata() {
        d3.select('svg').selectAll('path').data(features).attr({
            d: path,
            fill: function(d) {
                return color(d.properties.density);
            }
        }).on('mouseover', function(d) {
            document.getElementById('name').textContent = d.properties.COUNTYNAME;
            document.getElementById('density').textContent = d.properties.density;
            console.log(d);
        });
    }

    d3.select('svg').on('mouseover', function(e) {
        console.log(d3.mouse(this));
        updata();
    });
    updata();
});