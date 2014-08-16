define(['jquery','jmask','string'],function($,S)
{
	return {

				init		: 	function () 
								{ 
									Validation.results.length = 0;
									for (index in Validation.controls) $(Validation.controls[index]).parent().removeClass("has-error");
									Validation.controls.length = 0;
								}

				,required	: 	function(control,fieldName) 
								{
									var error = "El campo " + fieldName + " es obligatorio";
									value = $(control).val();
									var exp = (value !== '') && (value !== null) && (value !== undefined) && (value.toString().length > 0);
									Validation.evaluate(exp,error,control);
									return exp;
								}

				,requiredVar: 	function(value,fieldName,control) 
								{
									var error = "El campo " + fieldName + " es obligatorio";
									var exp = (value !== '') && (value !== null) && (value !== undefined) && (value.toString().length > 0);
									Validation.evaluate(exp,error,control);
									return exp;
								}
				,len 		:  	function(control,fieldName,pLen) 
								{
									var error = "El campo " + fieldName + " debe ser de " + pLen + " caracteres";
									value = $(control).val();
									var exp = (value.toString().length == pLen) || (S(value).isEmpty());
									Validation.evaluate(exp,error,control);
									return exp;
								}					


				,number		: 	function(control,fieldName, errorMessage) 
								{
									var exp = false;
									var error = errorMessage || "El campo " + fieldName + " solo puede contener numeros" ;
									value = $(control).val();
									if ((value === "") || (value === null) || (value === undefined))  exp = true;
									else  exp = $.isNumeric(value);
									Validation.evaluate(exp,error,control);
									return exp
								}

				,email 		: 	function(control,fieldName)
								{
									var exp = false;
									var error = "El campo " + fieldName + " debe contener un Email valido";
									value = $(control).val();
									var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/;
			    					exp = (regex.test(value)) ? true : false;
									Validation.evaluate(exp,error,control);
									return exp
								}
				,multiEmail : 	function(control, fieldName)
								{
									var exp = false;
									var error = "El campo " + fieldName + " debe ser Emails separados por coma";
									value = $(control).val();
									exp = validateMultipleEmailsCommaSeparated(value,',');
									Validation.evaluate(exp,error,control);
									return exp	
								}

				,greaterthan: 	function(control,minvalue,fieldName)
								{
									value = $(control).val();
									return Validation.greaterthanvar(value,minvalue,control,fieldName);
								}

				,greaterthanvar: 	function(value,minvalue,control,fieldName)
									{
										var exp = false;
										var error = "El campo " + fieldName + "<br /> Debe ser mayor a " + minvalue;
										
										if ( S(value).isEmpty() || S(minvalue).isEmpty() )  exp = true;
										else  
										{
											value = parseFloat( S(value).replaceAll("/","") );
											minvalue = parseFloat( S(minvalue).replaceAll("/","") );	
											exp = (value > minvalue)
										};

										Validation.evaluate(exp,error,control);
										return exp;
									}

				,lessthan 	: 	function(control,maxvalue,fieldName)
								{
									value = $(control).val();
									return Validation.lessthanvar(value,maxvalue,control,fieldName);
								}

				,lessthanvar 	: 	function(value,maxvalue,control,fieldName)
									{
										var exp = false;
										var error = "El campo " + fieldName + "<br /> Debe ser menor a " + maxvalue;
										
										if ( S(value).isEmpty() || S(maxvalue).isEmpty() )  exp = true;
										else  
										{
											value = parseFloat(S(value).replaceAll("/",""));
											maxvalue = parseFloat(S(maxvalue).replaceAll("/",""));
											exp = (value < maxvalue);
										}

										Validation.evaluate(exp,error,control);
										return exp;
									}

				,evaluate 	: 	function(exp,error,control) 
								{
									if (!exp) 
									{
										$().messagebox('showError' , error);
										$(control).parent().addClass("has-error");
										Validation.controls.push(control);
									}
									Validation.results.push(exp);
								}					

				,results		: 	[]
				,controls		: 	[]

				,run 			: 	function()
									{
										var result = true;

										for(var i=0; i < Validation.results.length ;i++)
										{
											result = (result && Validation.results[i]);
										}
										return result;
									}

				,expresion 		: 	{   
										numericRegex 			: /^[0-9]+$/
										,integerRegex 			: /^\-?[0-9]+$/
										,decimalRegex 			: /^\-?[0-9]*\.?[0-9]+$/
										,emailRegex 			: /^[a-zA-Z0-9.!#$%&amp;'*+\-\/=?\^_`{|}~\-]+@[a-zA-Z0-9\-]+(?:\.[a-zA-Z0-9\-]+)*$/
										,alphaRegex 			: /^[a-z]+$/i
										,alphaNumericRegex 		: /^[a-z0-9]+$/i
										,alphaDashRegex 		: /^[a-z0-9_\-]+$/i
										,naturalRegex 			: /^[0-9]+$/i
										,naturalNoZeroRegex 	: /^[1-9][0-9]*$/i
										,ipRegex 				: /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/i
										,base64Regex 			: /[^a-zA-Z0-9\/\+=]/i
										,numericDashRegex 		: /^[\d\-\s]+$/
										,urlRegex 				: /^((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/
									}
				,validateEmail 	: 	function (field) 
									{
			    						var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/;
			    						return (regex.test(field)) ? true : false;
									}

				,validateMultipleEmailsCommaSeparated : function (value, seperator) 
									{
									    if (value != '') {
									        var result = value.split(seperator);
									        for (var i = 0; i < result.length; i++) {
									            if (result[i] != '') {
									                if (!validateEmail(result[i])) {
									                    return false;
									                }
									            }
									        }
									    }
									    return true;
									}
	};
});