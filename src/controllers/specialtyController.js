import specialtyService from "../services/specialtyService";

let createSpecialty = async(req, res) => {
    try {
        let infor = await specialtyService.createSpecialty(req.body);
        return res.status(200).json(infor);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: "Error from the server"
        })
    }
}

let getAllSpecialty = async(req, res) => {
    try {
        let infor = await specialtyService.getAllSpecialty();
        console.log("Infor data specialtyController là: ", infor);
        return res.status(200).json(infor);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: "Error from the server"
        })
    }
}

module.exports = {
    createSpecialty: createSpecialty,
    getAllSpecialty: getAllSpecialty
}