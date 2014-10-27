function validateLogin() {

	var username = "";
	var password = "";
	var uName = document.forms["myForm"]["username"].value;
	var pwd = document.forms["myForm"]["password"].value;
	
	if((uName == null || uName == "") && (pwd == null || pwd == "")) {
		alert("Enter username & password");
		return false;
	}
	if(uName == null || uName == "") {
		alert("Enter username");
		return false;
	}
	if(pwd == null || pwd == "") {
		alert("Enter password");
		return false;
	}
	if(pwd.length < 6) {
		alert("Password should be atleast 6 characters minimum");
		return false;
	}
    if("arun@ofs" != uName || "password" != pwd) {
		alert("Invalid Username/Password.");
        return false;
	}
	return true;
}
