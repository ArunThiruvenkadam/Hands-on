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
		alert("URL Feed");
		detailFeed = Object.create(feed(count, "url", dateAndTime));
	} else {
		// Text Feed
		alert("Text Feed");
		var feed = new Feed(count, "text", dateAndTime);
		detailFeed = Object.create(feed);
	}
	detailFeed.content = feedValue;
	createFeed(detailFeed);
}

function createFeed(feed) {
	alert("Feed added successfully");
	feeds = feeds || [];
	feeds.push(feed);
	alert(feeds);
	localStorage.feeds= feeds;
}

function getFeeds() {
	feeds = feeds || localStorage.feeds || [];
	return localStorage.feeds;
}

function displayFeeds() {
	alert(feeds);
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