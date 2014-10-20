function validateLogin() {

	var username = "";
	var password = "";
	var uName = document.forms["myForm"]["username"].value;
	var pwd = document.forms["myForm"]["password"].value;
	
    if("arun@ofs" != uName || "password" != pwd) {
		alert("Invalid Username/Password.");
        return false;
	}
	return true;
}
