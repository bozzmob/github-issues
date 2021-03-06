var githubIssues = (function() {

	//The only function exposed to the outside world, getIssueCounts
    var publicAPI = {
        getIssueCounts: function() {
        	document.getElementById('issuesTable').hidden = false;
            var url = validURL();
            if (url) {
                var issueCount = {};
                getTotalCount("TotalCount", url);
                getLast24hrsCount("Last24hrsCount", url);
                getLast24hrsto7daysCount("Last24hrsto7daysCount", url);
                getOlderThan7daysCount("olderthan7daysCount", url);
            }
        }
    }
    return publicAPI;

    //Validating URL format
    function validURL() {
        var repoURL = document.getElementById("issuesUrlText").value;
        var errorMessageDiv = document.getElementById("errorMessage");
        if (repoURL == null || repoURL == "") {
            errorMessageDiv.innerHTML = "The URL field cannot be empty";
            return false;
        } else {
            var urlGroups = repoURL.split('/');
            if (urlGroups[0] == "https:" && urlGroups[1] == "" && urlGroups[2] == "github.com" && urlGroups[3] != "" && urlGroups[4] != "") {
                var apiurl = 'https://api.github.com/search/issues?q=is:open+repo:' + urlGroups[3] + '/' + urlGroups[4];
                errorMessageDiv.innerHTML = "";
                return apiurl;
            } else {
                errorMessageDiv.innerHTML = "Please Enter a Valid URL of the format https://github.com/USER/REPOSITORY-NAME";
                return false;
            }
        }
    }

    //Micro functions that get counts of issues in different timeframe. Basically construct URL's and invoke the API

    //Get Total Count
    function getTotalCount(key, url) {
        getDataFromURL(key, url);
    }

    //Get Last 24 hours count
    function getLast24hrsCount(key, url) {
        url += "+created:>" + moment().subtract(24, "hours").format('YYYY-MM-DD');
        getDataFromURL(key, url);
    }

    //Get count of issues between 24hrs and 7days
    function getLast24hrsto7daysCount(key, url) {
        url += "+created:" + moment().subtract(7, "days").format('YYYY-MM-DD') + ".." + moment().subtract(24, "hours").format('YYYY-MM-DD');
        getDataFromURL(key, url);
    }

    //Get count of issues that are older than 7days
    function getOlderThan7daysCount(key, url) {
        url += "+created:<" + moment().subtract(7, "days").format('YYYY-MM-DD');
        getDataFromURL(key, url);
    }

    //Get's total count from the custom URL(which is the API) passed.
    function getDataFromURL(key, url) {
        console.log(" URL " + url);
        var fetchDataPromise = new Promise(function(resolve, reject) {
            var request = new XMLHttpRequest();

            request.open('GET', url);
            request.onload = function() {
                if (request.status === 200) {
                    resolve(request.response);
                } else {
                    reject('No response');
                }
            };
            request.onerror = function() {
                reject('Invalid request');
            }
            request.send();
        });

        fetchDataPromise.then(function(result) {
            console.log("resolve " + JSON.parse(result).total_count)
            var total_count = JSON.parse(result).total_count;
            document.getElementById(key).innerHTML = total_count;
        }, function(result) {
            console.error("reject " + result);
        });
    }
})();