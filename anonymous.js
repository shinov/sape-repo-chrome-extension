;(function ( Anonymous , chrome , $ ) {
    
	
	var publicVars = {
        githubAPIURL:"jqueygihub.json",
        category :['Productivity tool','Web Application Frameworks'] // decide require or not
    };
	
	
	Anonymous.loadTemplateAPI = (function(){
	  return {
	    createCategory: function(getJsonData){
		    getJsonData = getJsonData.anonymous;
		    console.log(getJsonData);
		
			var template = "";
			$("#main-category").html("");
			for(var i=0 ; i < getJsonData.length;i++){
			template = template + "<div>"+getJsonData[i]['description']+"</div>";
			}
			$("#main-category").html(template);
		}
	  }
	
	})();
	
	
	
    document.addEventListener('DOMContentLoaded', function () {
        var localData = Anonymous.StorageAPI.getStorage();
		localData.done(function( data ) {
			if(typeof data.anonymous == "undefined"){
			   console.log("nno data");
			   Anonymous.RepoSuckerAPI.fetchRepo(publicVars.githubAPIURL);
			}
			else{
			   console.log("with data");
			   Anonymous.loadTemplateAPI.createCategory(data);
			}
			Anonymous.NotificationAPI.updateTrayIcon("icon.png");
			chrome.browserAction.setBadgeText({text: ""});
		});
    });

})(window.Anonymous = window.Anonymous || {} , chrome , jQuery);


