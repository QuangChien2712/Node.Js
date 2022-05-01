import db from "../db/models/index";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
    let hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
};

let handleUserLogin = (email, password) => {
    return new Promise(async(resolve, reject) => {
        try {
            let userData = {};

            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    attributes: ["email", "roleId", "password"],
                    where: { email: email },
                    raw: true,
                });
                if (user) {
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = "Ok";

                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = "Wrong password";
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `User's not found`;
                }
            } else {
                userData.errCode = 1;
                userData.errMessage = `Your's Email isn't exist in your system. Please try other email!`;
            }
            resolve(userData);
        } catch (e) {
            reject(e);
        }
    });
};

let checkUserEmail = (userEmail) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail },
            });
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    });
};

let getAllUsers = (userId) => {
    return new Promise(async(reslove, reject) => {
        try {
            let users = "";
            if (userId === "All") {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ["password"],
                    },
                });
            }

            if (userId && userId !== "All") {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ["password"],
                    },
                });
            }
            reslove(users);
        } catch (error) {
            reject(error);
        }
    });
};

let createNewUser = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    message: "Your email is already in Users",
                });
            }
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
            resolve({
                errCode: 0,
                message: "Ok",
            });
        } catch (error) {
            reject(error);
        }
    });
};

let deleteUser = (uid) => {
    return new Promise(async(resolve, reject) => {
        try {
            let userdata = await db.User.findOne({
                where: { id: uid },
            });
            if (!userdata) {
                resolve({
                    errCode: 2,
                    message: `The user isn't exist`,
                });
            }
            // await userdata.destroy(); userdata phải là instance của sequelize mới destroy được. Vì config query raw = true nên không còn là thể hiện nữa nên phải chọc trực tiếp từ db
            await db.User.destroy({ where: { id: uid } });

            resolve({
                errCode: 0,
                message: "User has been deleted successfully!",
            });
        } catch (error) {
            reject(error);
        }
    });
};

let updateUserData = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    message: "Missing required parametters!",
                });
            }

            let userdata = await db.User.findOne({
                where: { id: data.id },
            });

            if (userdata) {
                await db.User.upsert({
                    id: data.id,
                    email: data.email,
                    firstName: data.firstname,
                    lastName: data.lastname,
                    address: data.address,
                });
                resolve({
                    errCode: 0,
                    message: "Update the User succeeds!",
                });
            } else {
                resolve({
                    errCode: 1,
                    message: `User isn't found!`,
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
};