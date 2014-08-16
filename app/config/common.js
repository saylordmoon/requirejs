requirejs.config({
    
    baseUrl	: '/content/js/app',
    
    paths	: {
                text        : 'lib/text',
    			jquery 		: 'lib/jquery.min',
    			string 		: 'lib/string.min',
    			jmask 		: 'lib/jquery.mask.min',
    			pickadate 	: 'lib/pickadate.min',
    			messagebox 	: 'lib/jquery.messagebox',
    			bootstrap 	: 'lib/bootstrap.min'
	},

	shim 	: {
				jmask		: {deps: ['jquery'],exports: 'JMask'},
				pickadate 	: {deps: ['jquery'],exports: 'Pickadate'},
				messagebox 	: {deps: ['jquery'],exports: 'Messagebox'},
				bootstrap 	: {deps: ['jquery'],exports: 'Bootstrap'}
	}
});