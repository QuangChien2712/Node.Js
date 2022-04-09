import db from '../db/models/index'
import CRUDService from '../services/CRUDService'


let getHomePage = async(req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render("index.ejs", { data: JSON.stringify(data) });
    } catch (error) {
        console.log(error);
    }
}

let getFormCRUD = (req, res) => {
    return res.render('displayFormCRUD.ejs');
}

let postCRUD = (req, res) => {
    CRUDService.createNewUser(req.body);
    return res.send('Post HTTP');
}

let getCRUD = async(req, res) => {
    let data = await CRUDService.getAllUser();
    return res.render('displayGetCRUD.ejs', {
        dataTable: data
    });
}

let editCRUD = async(req, res) => {
    let userid = req.query.id;
    if (userid) {
        let UserbyId = await CRUDService.getUserbyId(userid);
        return res.render('displayEditCRUD.ejs', {
            user: UserbyId
        });
    } else {
        return res.send('User not found!')
    }
}

let putCRUD = async(req, res) => {
    let data = req.body;
    await CRUDService.updateUserData(data);
    return res.send('Đã cập nhật hệ thống');
}

let deleteCRUD = async(req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDService.deleteUserbyId(id);
        // return res.send('Delete success!');
        let data = await CRUDService.getAllUser();
        return res.render('displayGetCRUD.ejs', {
            dataTable: data
        });
    } else {
        res.send('User not found!')
    }
}

module.exports = {
    getHomePage: getHomePage,
    getFormCRUD: getFormCRUD,
    postCRUD: postCRUD,
    getCRUD: getCRUD,
    editCRUD: editCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD
}