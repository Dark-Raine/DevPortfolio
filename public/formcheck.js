
function formValidate(){
    var email = document.getElementById("email");
    var telNum = document.getElementById("phone");
    

    if( email.value.indexOf('@' , 0) <= 0 || email.value.indexOf('.', 0) <= 0){
        email.classList.add("error");
        
        return false;
    };

    if (isNaN(telNum.innerHTML)){
        telNum.classList.add("error");

        return false;
    };

    telNum.classList.remove("error");
    email.classList.remove("error");
    return true;
};