/**
 * API's created with revealing modular pattern
 * Storage , Alaram , Notifications , Repo Sucker & Processed JSON
 * These Wrapper API's will be used for both Background Script & Content Scripts
 */

;(function ( Anonymous , chrome  ) {

    //Public vars
    var publicVars = {
        githubAPIURL:"jqueygihub.json",
        category :['Productivity tool','Web Application Frameworks'] // decide require or not
    };

    // Public functions here ... can be used inside modules


    Anonymous.StorageAPI = (function(){


        // Private functions here ... which can only be used in side those public

        // expose only those functions which are required , and  encapsulate other
        return {

            setStorage : function (getData) {
				chrome.storage.local.set({'anonymous': getData});		
            },

            getStorage : function () {
			    var dfd = $.Deferred();
				chrome.storage.local.get('anonymous',function(obj){
					dfd.resolve( obj );
				});
				return dfd.promise();
            },

            onStorageChange : function () {
				chrome.storage.onChanged.addListener(function(changes, namespace) {
					  Anonymous.NotificationAPI.showNotification();
					  Anonymous.NotificationAPI.updateTrayIcon("iconN.png");
					  if(typeof Anonymous.loadTemplateAPI != "undefined"){
						  var localData = Anonymous.StorageAPI.getStorage();
						  localData.done(function(data) {
							Anonymous.loadTemplateAPI.createCategory(data);
						  });
					  }
				});
            },

            removeItem : function () {
                
            },

            clearStorage : function () {
				chrome.storage.local.remove("anonymous");		
            }
        };

    })();

    Anonymous.NotificationAPI = (function(){

        // Private functions here ... which can only be used in side those public

        // expose only those functions which are required , and  encapsulate other
        return {

            showNotification : function ( keyName , keyValue ) { 
				chrome.notifications.create(
					'update-notification',{   
					type: 'basic', 
					iconUrl: 'logo.png', 
					title: "Sape Repo", 
					message: "New Updates In Sape Repo" 
					},

				function() {} 

				);
				chrome.notifications.onClosed.addListener(function(notification, byUser){
				   chrome.notifications.clear("update-notification", function(){
				      // cleared notification
				   });
				});

            },
			updateTrayIcon:function(getImg){
				chrome.browserAction.setIcon({path:getImg});
				chrome.browserAction.setBadgeText({text: "U"});
			}
			

        };
    })();

    Anonymous.AlaramAPI = (function(){

        // Private functions here ... which can only be used in side those public

        // expose only those functions which are required , and  encapsulate other
        return {

            setAlaram : function ( delay , period ) {	
				var thisinitAlarm = this;
				chrome.alarms.create('periodicSucker', {
						delayInMinutes : delay,
						periodInMinutes: period
				});
				chrome.alarms.onAlarm.addListener(function (alarm) {
						if (alarm.name == 'periodicSucker') {
							Anonymous.RepoSuckerAPI.fetchRepo(publicVars.githubAPIURL);
						}
				});
			}
        };
    })();

    Anonymous.RepoSuckerAPI = (function(){

        // Private functions here ... which can only be used in side those public

        // expose only those functions which are required , and  encapsulate other
        return {

            fetchRepo : function ( getUrl) {
                var thisInit =  this;
		        var getJSsonRepo = thisInit.ajaxObj(getUrl);
				getJSsonRepo.done(function(){
				    Anonymous.RefineJSONAPI.refineJson(getJSsonRepo.responseJSON);
				});
            },
			
			ajaxObj: function(getFetchUrl){
				return $.ajax({
					url:getFetchUrl,
					dataType:'json',
					async: true
				});	
			}
        };
    })();

    Anonymous.RefineJSONAPI = (function(){

        // Private functions here ... which can only be used in side those public

        // expose only those functions which are required , and  encapsulate other
        return {

            refineJson : function ( getJsonData ) {
			
			    // after refining save to local storage
			
			    Anonymous.StorageAPI.setStorage(getJsonData);
            }
			
        };

    })();

    // call alaram init function below
	
	Anonymous.AlaramAPI.setAlaram(.01,.3);
	Anonymous.StorageAPI.onStorageChange();
	

})(window.Anonymous = window.Anonymous || {} , chrome );


