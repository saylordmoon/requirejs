define([	'jquery',
			'helper/lookup', 
			'text!template/test.html',
			'helper/validation',
			'messagebox',
			'config/date'
], 

function($,lookup,test,Validation){

	lookup('personal','#sel-personal');
	lookup("rol","#sel-rol");

	$("#btn-guardar").click(function()
	{
		Validation.init();

		var usuario = {
						usuario 			: $("#txt-usuario").val()
						,password 			: $('#txt-password').val()
						,activo 			: true
						,personalId 		: $('#sel-personal').val()
					}
		$.post('/usuario/add',usuario).done(function()
		{

			//$().messagebox('showSuccess', "Se guardo con éxito!!");
		});

	});

});