import bcrypt from 'bcryptjs';
import db from '../db/models';
const salt = bcrypt.genSaltSync(10);

let createNewUser = (data) => {
    let hashpassword = hashUserPassword(data.password);
    db.User.create({
        email: data.email,
        password: hashpassword,
        firstName: data.firstname,
        lastName: data.lastname,
        address: data.address,
        phoneNumber: data.phonenumber,
        gender: data.gender === '1' ? true : false,
        roleId: data.roleId
    })
}

let hashUserPassword = (password) => {
    let hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
}

module.exports = { createNewUser }