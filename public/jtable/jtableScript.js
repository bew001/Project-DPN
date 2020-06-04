$(document).ready(function() {
	$('#RawData').jtable({
		title : 'List Corona Raw Data',
		actions : {
			listAction : 'listing',
			createAction : 'createAction',
			updateAction : 'updateAction',
			deleteAction : 'deleteAction'
		},

		fields : {
			country : {
				title : 'Country',
				width : '30%',
				key : true,
				list : true,
				edit : false,
			},
			totalcases : {
				title : 'total cases',
				width : '30%',
				edit : true
			}
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