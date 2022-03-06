import db from '../db/models/index'

let getHomePage = async(req, res) => {
    try {
        let data = await db.User.findAll();
        console.log(data); // In kết quả ra console
        return res.render("index.ejs", { data: JSON.stringify(data) });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getHomePage
}