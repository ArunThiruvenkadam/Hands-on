function validateLogin() {

	var username = "";
	var password = "";
	var uName = document.forms["myForm"]["username"].value;
	var pwd = document.forms["myForm"]["password"].value;
	
    if ((uName == null || uName == "") && (pwd == null || pwd == "")) {
        alert("Enter the Username & Password.");
        return false;
    } else if (uName==null || uName=="") {
	   alert("Enter the Username.");
        return false;
	} else if (pwd==null || pwd=="") {
	   alert("Enter the Password.");
        return false;
	} else if("arun@ofs" != uName || "pass" != pwd) {
		alert("Invalid Username/Password.");
        return false;
	}
	return true;
}
