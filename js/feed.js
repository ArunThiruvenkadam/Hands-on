var feeds;

var signout = function() {
	var isSignout = confirm("Do you want to sign out?");
	if(isSignout) window.location="index.html";
}

var feedBtn = function() {
	
	buttonHighlights("transparentButton2", "transparentButton3");
	showAndHide("feed", "profile");
}

var profileBtn = function() {
	
	buttonHighlights("transparentButton3", "transparentButton2");
	showAndHide("profile", "feed");
}

var defaultBtnStatus = function() {
	buttonHighlights("transparentButton2", "transparentButton3");
	showAndHide("feed", "profile");
	getFeeds();
	displayFeeds();
	displayProfile();
}

function buttonHighlights(btnToHighlight, btnToTransparent) {

	document.getElementById(btnToHighlight).style.backgroundColor="grey";
	document.getElementById(btnToTransparent).style.backgroundColor="transparent";
}

function showAndHide(showID, hideID) {
  document.getElementById(hideID).style.display="none";
  document.getElementById(showID).style.display="block";
}

var feed = { _id:undefined, _type:undefined, _time:undefined};
function Feed(id, type, time) {
	this._id = id;
	this._type = type;
	this._time = time;
}
Feed.protype = {
	getId: function() { return this._id;},
	getType: function() { return this._type;}
};

var count = 0;
function addFeed() {
	
	count ++;
	var feedValue = document.getElementById("feedText").value;
	if(feedValue == null || feedValue == "") {
		alert("Feed Should not be empty!!!");
		return;
	}
	
	var currentTime = new Date();
	var year = currentTime.getFullYear();
	var month = currentTime.getMonth() + 1;
	var date = currentTime.getDate();
	var time = formatAMPM(currentTime);
	var dateAndTime = month+"/"+date+"/"+year+" "+time;
	
	var detailFeed = undefined;
	if (validUrl(feedValue)) {
		// URL FEED
		
		var feed = new Feed(count, "url", dateAndTime)
		detailFeed = Object.create(feed);
	} else {
		// Text Feed
		
		var feed = new Feed(count, "text", dateAndTime);
		detailFeed = Object.create(feed);
	}
	detailFeed.content = feedValue;
	createFeed(detailFeed);
}

function createFeed(feed) {

	feeds = feeds || [];
	feeds.push(feed);
	document.getElementById("feedText").value = ""; 
	displayFeeds();
}

function getFeeds() {
	feeds = feeds || [];
}

function deleteFeed(id) {
	
	feeds.splice(id, 1);
	displayFeeds();
}

function displayFeeds() {
	
	var listStr = "";
	if(feeds.length == 0) {
		document.getElementById("feedList").innerHTML = "";
		return;
	}
	for (var i = 0; i < feeds.length; i++) {
			var currentFeed = feeds[i];
			var listStartTag = "<li>";
			if (currentFeed._type == "text") {
				var divStartTag = "<div id=\"textitem\">";
			} else {
				var divStartTag = "<div id=\"urlitem\">";
			}
			var userImageTag = "<img src=\"images\/user.jpg\" id=\"userImage\" align=\"center\">";
			var feedValuesTag = "";
			if (currentFeed._type == "text") {
				feedValuesTag = "<label id=\"feedValues\">"+currentFeed.content+"</label>";
			} else {
				feedValuesTag = "<label id=\"feedValues\" onClick=\"navigateTo( "+i+" )\">"+currentFeed.content+"</label>"; 
			}
			var closeBtmTag = "<img src=\"images\/delete.jpg\" id=\"closeBtn\" onClick=\" deleteFeed("+ i +")\">";		
			var timeTag = "<label id=\"feedTime\">"+"10/21/2014 12:30 pm"+"</label>";
			var divEndTag = "</div>";
			var listEndTag = "</li>";
			var listItem = listStartTag + divStartTag + userImageTag + feedValuesTag + closeBtmTag + timeTag + divEndTag + listEndTag;
			listStr += listItem;
	
			document.getElementById("feedList").innerHTML = listStr;
	} 
}

function navigateTo(i) {
	
	var selectedFeed = feeds[i];
	window.open(selectedFeed.content, "_blank");
}

function validUrl(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  if(!pattern.test(str)) {
    return false;
  } else {
    return true;
  }
}

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}