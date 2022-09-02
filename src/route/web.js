import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";

let router = express.Router();

const initWebRoute = (app) => {
    router.get("/", homeController.getHomePage);
    router.get("/crud", homeController.getFormCRUD);
    router.post("/post-crud", homeController.postCRUD);
    router.get("/get-crud", homeController.getCRUD);
    router.get("/edit-crud", homeController.editCRUD);
    router.post("/put-crud", homeController.putCRUD);
    router.get("/delete-crud", homeController.deleteCRUD);

    router.post("/api/login", userController.handleLogin);
    router.get("/api/get-all-users", userController.handleGetAllUsers);
    router.post("/api/create-new-user", userController.handleCreateNewUser);
    router.put("/api/edit-user", userController.handleEditUser);
    router.delete("/api/delete-user", userController.handleDeleteUser);
    router.get("/api/allcode", userController.getAllcode);
    router.get("/api/top-doctor-home", doctorController.getTopDoctorHome);
    router.get("/api/get-all-doctors", doctorController.getAllDoctors);
    router.post("/api/save-infor-doctors", doctorController.postInforDoctor);
    router.get("/api/get-detail-doctor-by-id", doctorController.getDetailDoctorById);
    router.post("/api/bulk-create-schedule", doctorController.bulkCreateSchedule);
    router.get("/api/get-schedule-doctor-by-date", doctorController.getScheduleByDate);
    router.get("/api/get-extra-infor-doctor-by-id", doctorController.getExtraInforDoctorById);

    return app.use("/", router);
};

module.exports = initWebRoute;