import bcrypt from "bcryptjs";
import db from "../db/models";
const salt = bcrypt.genSaltSync(10);

//POST -> CREATE
let createNewUser = (data) => {
    let hashpassword = hashUserPassword(data.password);
    db.User.create({
        email: data.email,
        password: hashpassword,
        firstName: data.firstname,
        lastName: data.lastname,
        address: data.address,
        phoneNumber: data.phonenumber,
        gender: data.gender === "1" ? true : false,
        roleId: data.roleId,
    });
};

let hashUserPassword = (password) => {
    let hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
};

//GET -> READ
let getAllUser = () => {
    return new Promise(async(resolve, reject) => {
        try {
            let users = await db.User.findAll({
                raw: true, // biểu hiện "Hàng". Không có raw là "Thể hiện"
            });
            resolve(users);
        } catch (error) {
            reject(error);
        }
    });
};

//EDIT -> UPDATE
let getUserbyId = (userid) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userid },
            });
            if (user) {
                resolve(user);
            } else {
                resolve([]);
            }
        } catch (error) {
            reject(error);
        }
    });
};

let updateUserData = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            let userdata = await db.User.findOne({
                where: { id: data.id },
            });
            if (userdata) {
                userdata.firstName = data.firstname;
                userdata.lastName = data.lastname;
                userdata.address = data.address;
                await userdata.save();
            }
            resolve();
        } catch (error) {
            console.log(error);
        }
    });
};

////  DELETE
let deleteUserbyId = (uid) => {
    return new Promise(async(resolve, reject) => {
        try {
            let userdata = await db.User.findOne({
                where: { id: uid },
            });
            if (userdata) {
                await userdata.destroy();
            }
            resolve();
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    createNewUser,
    getAllUser,
    getUserbyId,
    updateUserData,
    deleteUserbyId,
};