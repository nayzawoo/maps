var labels = {
	labelColor: '#fff',
	fontSize: 18,
	fontFamily: 'Ours-Unicode',
	customLabelText: {
		'MM.SA': "စစ်ကိုင်းတိုင်း",
		'MM.MD': "မန္တလေးတိုင်း",
		'MM.YA': "ရန်ကုန်တိုင်း",
	}
}

var bubbles = [{
	name: 'Monywa',
	radius: 10,
	fillKey: 'MM.SA',
	latitude: 22.1065893,
	longitude: 95.0789498,
	fillOpacity: 0.3
}]

var onClickRegion = function(geography) {
	Toastify({
  		text: `${geography.properties.name}`
	})
	.showToast()
}

// Events
var done = function(datamap) {
	datamap.svg.selectAll('.datamaps-subunit').on('click', onClickRegion)
}

var map = new Datamap({
	done: done,
	responsive: true,
	fills: {
		// defaultFill: 'rgb(34, 34, 44)'
	},
	element: document.getElementById('map'),
	scope: 'mmr',
	setProjection: function(element) {
		var projection = d3.geo.equirectangular()
			.center([97, 19])
			.scale(1800)
			.translate([element.offsetWidth / 2, element.offsetHeight / 2])
		var path = d3.geo.path().projection(projection);

		return {
			path: path,
			projection: projection
		}
	},
})

map.labels(labels)

map.bubbles(bubbles, {
	popupTemplate: function(geo, data) {
		return '<div class="hoverinfo">' + data.name + '</div>'
	}
})

// Responsive
// Pure JavaScript
window.addEventListener('resize', function() {
	map.resize()
})
