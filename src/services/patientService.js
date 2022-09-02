import db from "../db/models/index";
require('dotenv').config();


let postBookAppointment = (data) => {
    return new Promise(async(resolve, reject) => {
        try {

            if (!data.email || !data.doctorId || !data.timeType ||
                !data.date
            ) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing Parameter",
                });
            } else {
                //upsert patient
                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: "R3"
                    }
                });
                console.log("Chien check User: ", user[0]);

                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: { patientId: user[0].id },
                        defaults: {
                            statusId: "S1",
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType
                        }
                    })
                }
                resolve({
                    errCode: 0,
                    errMessage: "Save infor patient succeed!"
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};


module.exports = {
    postBookAppointment: postBookAppointment
};