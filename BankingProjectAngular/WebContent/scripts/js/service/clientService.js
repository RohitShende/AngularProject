/***	Common Elements - Header / Footer	***/
/** * Directives ** */
angular.module('clientServiceModule', [])
.service('clientService', function() {
	  var cilent = null;
	  this.setClient= function(clientVar)
	  {
		  client = clientVar;
	  };
	  
	  this.getClient =  function()
	  {
		  return client;
	  };
	 
	});