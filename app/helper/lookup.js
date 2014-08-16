define(['jquery'], function(){ 

	
	function cmb(pUrl,pControl,pInitValue,pIdName,pTextName)
	{
		var loaded = 	$.getJSON(pUrl).done(function(data)
						{
							cmbl(data,pControl,pInitValue,pIdName,pTextName);
						});

		return loaded;
	}

	function lst(pName,pUrl,pControl,pIdName,pTextName)
	{
		var loaded = $.getJSON(pUrl).done(function(data)
		{
			lstl(pName,data,pControl,pIdName,pTextName);
		});

		return loaded;
	}

	function cmbl(pData,pControl,pInitValue,pIdName,pTextName)
	{
		$(pControl).empty();

		if ( pInitValue !== "" && pInitValue !== undefined )
			$(pControl).append('<option value="-">' + pInitValue + '</option>');

		for ( index in pData )
		{
			var html = '<option value="' + pData[index][pIdName] + '">' + pData[index][pTextName] + '</option>';
			$(pControl).append(html);
		}
	}


	function lstl(pName,pData,pControl,pIdName,pTextName)
	{
		$(pControl).empty();

		for ( index in pData )
		{
			var html = '<a href="#" class="' + pName + ' list-group-item" data-id="' + pData[index][pIdName] + '">' + pData[index][pTextName] + '</a>';
			$(pControl).append(html);
		}
	}

	function lookupDep(parent,control,url,pInitValue)
	{
		var deferral;
		function cmbDep()
		{
			if ( S($(parent).val()).isNumeric() )
			{
				var data = { Id: $(parent).val() }
				deferral = $.getJSON(url,data).done(function(data)
				{
					cmbl(data,control,pInitValue,"id","name");
				});
			}
		}
		$(parent).change(function(){ cmbDep(); });

		return deferral;
	}

	function lookupDep2(parent,control,url,pInitValue)
	{
		function cmbDep()
		{
			if ( S($(parent).val()).isNumeric() )
			{
				$.getJSON(url +"/"+ $(parent).val()).done(function(data)
				{
					cmbl(data,control,pInitValue,"id","name");
				});
			}
		}
		$(parent).change(function(){ cmbDep(); });
	}

	function lookupTmpl(pName,pControl,pTemplate,pInitValue)
	{
		$(pControl).empty();
		var template = $(pTemplate).html();
		$.getJSON("/" + pName + "/lookup").done(function(data)
		{
			for ( index in data )
			{
				var html = S(template).template(data[index]).replaceAll('null','').s;
				$(pControl).append(html);
			}
		});
	}

	function listTmpl(pURL,pControl,pTemplate,pInitValue)
	{
		$(pControl).empty();
		var template = $(pTemplate).html();
		$.getJSON(pURL).done(function(data)
		{
			for ( index in data )
			{
				var html = S(template).template(data[index]).replaceAll('null','').s;
				$(pControl).append(html);
			}
		});
	}


	function lookup(pName,pControl,pInitValue)
	{
		if (pName.toLowerCase() === "rol")
		{
			return cmb("/rol/lookup",pControl,pInitValue,"id","nombre");
		} 
		else if (pName.toLowerCase() === "rol-list")
		{
			return lst(pName,"/rol/lookup",pControl,"id","nombre");
		}
		else if (pName.toLowerCase() === "user")
		{
			return cmb("/usuario/lookup/",pControl,pInitValue,"id","usuario");
		}
		else if (pName.toLowerCase() === "user-list")
		{
			return lst(pName,"/usuario/lookup/",pControl,"id","usuario");
		}
		else
		{
			return cmb( "/" + pName + "/lookup" ,pControl,pInitValue,"id","name");
		}
	}

	return lookup;
});