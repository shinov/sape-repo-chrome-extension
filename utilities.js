/**
 * API's created with revealing modular pattern
 * Storage , Alaram , Notifications , Repo Sucker & Processed JSON
 * These Wrapper API's will be used for both Background Script & Content Scripts
 */

;(function ( Anonymous , chrome  ) {

    //Public vars
    var publicVars = {
        githubAPIURL:"https://api.github.com/orgs/sape-repo/",
        category :['Productivity tool','Web Application Frameworks'] // decide require or not
    };

    // Public functions here ... can be used inside modules


    Anonymous.StorageAPI = (function(){


        // Private functions here ... which can only be used in side those public

        // expose only those functions which are required , and  encapsulate other
        return {

            setStorage : function ( keyName , keyValue ) {
                //chrome.storage.set()

            },

            getStorage : function () {

            },

            onStorageChange : function () {

            },

            removeItem : function () {

            },

            clearStorage : function () {

            }
        };

    })();

    Anonymous.NotificationAPI = (function(){

        // Private functions here ... which can only be used in side those public

        // expose only those functions which are required , and  encapsulate other
        return {

            setStorage : function ( keyName , keyValue ) {
                //chrome.storage.set()

            }

        };
    })();

    Anonymous.AlaramAPI = (function(){

        // Private functions here ... which can only be used in side those public

        // expose only those functions which are required , and  encapsulate other
        return {

            setAlaram : function ( keyName , keyValue ) {
                //chrome.alaram.set()

            }

        };

    })();

    Anonymous.RepoSuckerAPI = (function(){

        // Private functions here ... which can only be used in side those public

        // expose only those functions which are required , and  encapsulate other
        return {

            setStorage : function ( keyName , keyValue ) {
                //chrome.storage.set()

            }

        };
    })();

    Anonymous.RefineJSONAPI = (function(){

        // Private functions here ... which can only be used in side those public

        // expose only those functions which are required , and  encapsulate other
        return {

            setStorage : function ( keyName , keyValue ) {
                //chrome.storage.set()

            }
        };

    })();

    // call alaram init function below


})(window.Anonymous = window.Anonymous || {} , chrome );


