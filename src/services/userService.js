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
                    attributes: ["email", "roleId", "password", "firstName", "lastName"],
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
                    errMessage: "Your email is already in Users",
                });
            } else {
                let hashpassword = hashUserPassword(data.password);
                db.User.create({
                    email: data.email,
                    password: hashpassword,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phoneNumber: data.phonenumber,
                    gender: data.gender,
                    roleId: data.roleId,
                    positionId: data.positionId,
                    image: data.avatar
                });
                resolve({
                    errCode: 0,
                    errMessage: "Ok",
                });
            }
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
                    errMessage: `The user isn't exist`,
                });
            }
            // await userdata.destroy(); userdata phải là instance của sequelize mới destroy được. Vì config query raw = true nên không còn là thể hiện nữa nên phải chọc trực tiếp từ db
            await db.User.destroy({ where: { id: uid } });

            resolve({
                errCode: 0,
                errMessage: "User has been deleted successfully!",
            });
        } catch (error) {
            reject(error);
        }
    });
};

let updateUserData = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            // console.log("data là: ", data);
            if (!data.id || !data.roleId || !data.positionId || !data.gender) {
                resolve({
                    errCode: 2,
                    errMessage: "Missing required parametters!",
                });
            }

            let userdata = await db.User.findOne({
                where: { id: data.id },
            });

            if (userdata) {
                await db.User.upsert({
                    id: data.id,
                    email: data.email,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    roleId: data.roleId,
                    positionId: data.positionId,
                    gender: data.gender,
                    phoneNumber: data.phoneNumber,
                    image: data.avatar
                });
                resolve({
                    errCode: 0,
                    errMessage: "Update the User succeeds!",
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: `User isn't found!`,
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

let getAllCodeService = (typeInput) => {
    return new Promise(async(resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                })
            } else {
                let res = {};
                let allcode = await db.Allcode.findAll({
                    where: { type: typeInput }
                });
                console.log("Chien: ", allcode);
                res.errCode = 0;
                res.data = allcode;
                resolve(res);
            }

        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
    getAllCodeService: getAllCodeService,
};