define(['jquery'],function(){

	$(".uppercase")	.attr('style','text-transform: uppercase');
	$(".number")	.mask("#",{maxlength: false});
	$(".currency")	.mask("999999999.99",{maxlength: false});
	$(".dni")		.mask("00000000");
	$(".ruc")		.mask("00000000000");
	$(".grados")	.mask("00° 00' "+'00.000"',{placeholder:"__° __' __.___"+'"'});
	$(".telefonos")	.mask("99999999999 / 99999999999");

});