function validateSignin(email, password) {
    var emailformat = /^\w([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(email.value.match(emailformat) && password.value.length > 6) {
        if(verifyUser()) {           
            return true;
        } else {
         document.getElementById("signinerror").innerHTML="Wrong email id and password. If you are new user, please signup.";
            return false;
        } 
    } 
    if(!email.value.match(emailformat)) {
        document.getElementById("signinemailerror").innerHTML="Please enter valid email address";
    }     
    if(password.value.length <= 6) {
        document.getElementById("signinpassworderror").innerHTML="Password must contain greater than 6 characters";
    }
    return false;    
}

function verifyUser() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var userjson = localStorage.getItem(email);
    if(userjson) {
        var user = JSON.parse(userjson);
        if(user.password === password) {
            sessionStorage.setItem("user", email);
            return true;
        }        
    }
    return false;
}

function validateSignup(email, password, confirmpassword) {
    var correctPassword = true;
    var emailformat = /^\w([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(email.value.match(emailformat) && password.value.length > 6 && confirmpassword.value.length > 6 && password.value === confirmpassword.value) {
        storeUserData();
        return true;
    } 
    if(!email.value.match(emailformat)) {
        document.getElementById("signupemailerror").innerHTML="Please enter valid email address";
    }    
    if(password.value.length <= 6) {
        correctPassword = false;
        document.getElementById("signuppassworderror").innerHTML="Password must contain greater than 6 characters";
    }
    if(password.value.length <= 6) {
        correctPassword = false;
        document.getElementById("signupconfirmpassworderror").innerHTML="Password must contain greater than 6 characters";
    }
    if(password.value !== confirmpassword.value && correctPassword == true) {
        document.getElementById("signupconfirmpassworderror").innerHTML="Password and Confirm Password must be equal";
    }
    return false;    
}

function updateProfile() {
    storeUserData();
    initializeProfileForm();
}

function storeUserData() {
    var email = document.getElementById("email");
    var firstname = document.getElementById("firstname");
    var lastname = document.getElementById("lastname");
    var gender = (function() {
        var genderVal = document.getElementsByName('gender');
        for(i = 0; i < genderVal.length; i++) {
            console.log(genderVal[i].value);
            if(genderVal[i].checked)
                return genderVal[i].value;
        }
    })();    
    var address = document.getElementById("address");
    var password = document.getElementById("password");
    var userimage = document.getElementById("preview-img");
    
    var user = {};

    user["email"] = email.value;
    user["firstname"] = firstname.value;
    user["lastname"] = lastname.value;
    user["gender"] = gender;
    user["address"] = address.value;
    alert(firstname.value);
    if(password != null) {
        user["password"] = password.value;
    } else {
        user["password"] = JSON.parse(localStorage.getItem(email.value))['password'];
    }
    
    user["userimageurl"] = getBase64Image(userimage);
    
    try {
        localStorage.setItem(email.value, JSON.stringify(user));
    }
    catch(e) {
        console.log("Storage failed: " + e);
    }
}

function getBase64Image(userimage) {
    var imgCanvas = document.createElement("canvas"),
    imgContext = imgCanvas.getContext("2d");

    imgCanvas.width = userimage.width;
    imgCanvas.height = userimage.height;

    imgContext.drawImage(userimage, 0, 0, userimage.width, userimage.height);

    var imgAsDataURL = imgCanvas.toDataURL("image/png");
    
    return imgAsDataURL;
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            document.getElementById("preview-img").setAttribute('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function initializeProfileForm() {
    var userEmail = sessionStorage.getItem("user");
    var user = JSON.parse(localStorage.getItem(userEmail));
    document.getElementById("email").defaultValue = user["email"];
    document.getElementById("firstname").defaultValue = user["firstname"];
    document.getElementById("lastname").defaultValue = user["lastname"];
    document.getElementById("address").defaultValue = user["address"];
    if(user["gender"] === "Male") {
        document.getElementById("male").checked = true;
    } else {
        document.getElementById("female").checked = true;
    }
    document.getElementById("preview-img").setAttribute('src', user["userimageurl"]);
}
