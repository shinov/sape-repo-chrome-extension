(function($, window, document, undefined) {

    'use strict';

  /* ----------------------------------------------------------------------------- *\
     Private Properties
  \* ----------------------------------------------------------------------------- */
  var anonymous , defaults = {
    sourceURL:"jqueygihub.json",
    caregory :['Productivity tool','Web Application Frameworks']
  };


  function Anonymous() {
    this.init();
  };



  Anonymous.prototype.init =  function() {
      var thisInit =  this;
    thisInit.repoFetch(defaults.sourceURL);
    thisInit.initAlarm();

  }

  Anonymous.prototype.repoFetch =  function(getUrl) {
      var thisInit =  this;
    var getJSsonRepo = this.ajaxObj(getUrl);




      getJSsonRepo.done(function(){
       thisInit.loadTemplateCategory(getJSsonRepo.responseJSON , "main-category");



       chrome.storage.local.set({'value': getJSsonRepo.responseJSON} , function() {
          // Notify that we saved.
          console.log('Settings saved');
        });

    chrome.storage.local.get('value', function(obj , items) {
          // Notify that we saved.
          console.log(obj);
       console.log(items);
       console.log('Settings get');
        });

    chrome.storage.onChanged.addListener(function(changes, namespace) {
       console.log("data updated")
        });


    });
  }

  Anonymous.prototype.ajaxObj =  function(getUrl) {
    return $.ajax({
             url:getUrl,
       dataType:'json',
       async: true
    });

  };


  Anonymous.prototype.initAlarm =  function() {
      var thisinitAlarm = this;


    chrome.alarms.create('periodicSucker', {
          delayInMinutes : .3,
                periodInMinutes: .3
    });

    chrome.alarms.onAlarm.addListener(function (alarm) {
        if (alarm.name == 'periodicSucker') {
          thisinitAlarm.repoFetch(defaults.sourceURL);
          }
    });


  };


  Anonymous.prototype.loadTemplateCategory =  function(getObjData , element) {
    var template = "";
    $("#main-category").html("");
    for(var i=0 ; i < getObjData.length;i++){
        template = template + "<div>"+getObjData[i]['description']+"</div>";
    }
    $("#main-category").html(template);


  };

  //document.addEventListener('DOMContentLoaded', function () {
    new Anonymous();
  //});

})(jQuery, window, document,undefined);
