{/*function isValidEmail(value) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*);
    return re.test(String(value).toLowerCase());
}*/}

let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

function validEmail(value, setEmailError) {
    if (value == "") {
        setEmailError("")
    }
    else if (re.test(value) === true) {
        setEmailError("")
    }
    else {
        setEmailError("Invalid Email")
    }
}

function validatePassword(value, setPasswordError) {
    if (value.length < 9) {
        setPasswordError("Password must be 9 characters")
    } else {
        setPasswordError("")
    }
}

const Utils = {
    validEmail,
    validatePassword
}

export default Utils;