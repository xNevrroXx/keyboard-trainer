function validate(data, isName, isPassword) {
    const errors = {};
    const nameRegex = /^\D{2,}$/ig, emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if ("name" in data && data.name && nameRegex.test(data.name.trim())) {
        console.log("name is Ok");
    }
    else if (isName) {
        errors.name = "Name incorrect";
    }
    if (emailRegex.test(data.email.trim())) {
        console.log("email is Ok");
    }
    else {
        errors.email = "Email incorrect";
    }
    if ("password" in data && data.password && passwordRegex.test(data.password.trim())) {
        console.log("password is Ok");
    }
    else if (isPassword) {
        errors.password = "Password should include !@#$%^&* and be greater than 6 characters";
    }
    return errors;
}
export default validate;
