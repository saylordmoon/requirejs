define(['jquery','pickadate'], function() {

	$(".datepicker").pickadate({
		format:"yyyy/mm/dd"
		,formatSubmit: 'yyyy/mm/dd'
		,monthsFull: [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre' ]
		,monthsShort: [ 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Dic' ]
		,weekdaysFull: [ 'Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado' ]
		,weekdaysShort: [ 'Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab' ]
		,today: 'Hoy'
		,clear: 'Borrar'
	});

	$(".datepicker").attr("style","cursor: pointer;");
	
});