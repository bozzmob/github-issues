
function getIssueCounts(){
var url = validURL();
if(url){
		var issueCount = {};
}
}

function validURL(){
	var repoURL = document.getElementById("issuesUrlText").value;
var errorMessageDiv = document.getElementById("errorMessage");
if(repoURL == null || repoURL == ""){
	errorMessageDiv.innerHTML = "The URL field cannot be empty";
	return false;
}
else{
	var urlGroups = repoURL.split('/');
	if(urlGroups[0] == "https:" && urlGroups[1] == "" && urlGroups[2] == "github.com" && urlGroups[3] != "" && urlGroups[4] != ""){
		var apiurl = 'https://api.github.com/search/issues?q=is:open+repo:' + words[3]+ '/' + words[4];
		return apiurl;
	}
	else{
		errorMessageDiv.innerHTML = "Please Enter a Valid URL of the format https://github.com/USER/REPOSITORY-NAME";
		return false;
	}
}
}