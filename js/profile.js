 function showProfileImage(fileInput) {
	
        var files = fileInput.files;
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            var imageType = /image.*/;
            if (!file.type.match(imageType)) {
                continue;
            }
            var img=document.getElementById("profileImage");
            img.file = file;
            var reader = new FileReader();
            reader.onload = (function(aImg) {
                return function(e) {
                    aImg.src = e.target.result;
                };
            })(img);
            reader.readAsDataURL(file);
        }
    }

function saveProfile() {
	var user = new User(document.getElementById("name").value,
						document.getElementById("age").value,
						document.getElementById("phoneno").value,
						document.getElementById("email").value,
						document.getElementById("address").value,
						document.getElementById("imagefile").value);
	localStorage.setItem("profile", JSON.stringify(user));
}

function displayProfile() {

	try {
	var userData = localStorage.getItem("profile");
	var user = JSON.parse(userData);
	if(user != undefined || user != null) {
		document.getElementById("name").value = user.name;
		document.getElementById("age").value = user.age;
		document.getElementById("phoneno").value = user.phoneno;
		document.getElementById("email").value = user.email;
		document.getElementById("address").value = user.address;
		document.getElementById("imagefile").value = user.imagefile;
	}
	} catch (e) {
		console.log(e);
	}	
}

var user = { name:undefined, age:undefined, phoneno:undefined, email:undefined, address:undefined, imagefile:undefined};
function User(name, age, phoneno, email, address, imagefile) {
	this.name = name;
	this.age = age;
	this.phoneno = phoneno;
	this.email = email;
	this.address = address;
	this.imagefile = imagefile;
}
