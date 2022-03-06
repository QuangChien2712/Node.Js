import connection from '../configs/connectDB'

let getHomePage = (req, res) => {
    let data = []
    connection.query(
        'SELECT * FROM `users`',
        function(err, results, fields) {
            results.map((row) => {
                data.push({
                    id: row.id,
                    firtName: row.firtName,
                    lastName: row.lastName,
                    email: row.email,
                    createdAt: row.createdAt,
                    updatedAt: row.updatedAt
                })
            })
            return res.render("index.ejs", { dataUser: JSON.stringify(data) })
        }
    );

}

module.exports = {
    getHomePage
}