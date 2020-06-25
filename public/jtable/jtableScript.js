$(document).ready(function() {
	$('#RawData').jtable({
		title : 'List Corona Raw Data',
		actions : {
			listAction : 'listing',
			//createAction : 'createAction',
			//updateAction : 'updateAction',
			//deleteAction : 'deleteAction'
		},

		fields : {
			country : {
				title : 'Country',
				width : '25%',
				key : true,
				list : true,
				edit : false,
			},
			totalcases : {
				title : 'Total Cases',
				width : '25%',
				edit : false,

			},
			newcases : {
				title : 'New Cases',
				width : '20%',
				edit : false,

			},
			newdeaths : {
				title : 'New Deaths',
				width : '20%',
				edit : false,

			},
			continent : {
				title : 'continent',
				width : '10%',
				edit : false,
				list : true,

			},

			// ,
			// cognome : {
			// 	title : 'Cognome',
			// 	width : '30%',
			// 	edit : true
			// },
			// telefono : {
			// 	title : 'Telefono',
			// 	width : '20%',
			// 	edit : true
			// }
		}
	});


	$('#RawData').jtable('load');
});