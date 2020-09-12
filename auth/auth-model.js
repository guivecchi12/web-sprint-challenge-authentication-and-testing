const db = require("../database/dbConfig")

async function add(user) {
	const [id] = await db("users").insert(user)
	return findById(id)
}

function findBy(filter) {
	return db("users")
		.select("id", "username", "password")
        .where(filter)
}

function findById(id) {
	return db("users")
		.select("id", "username")
		.where({ id })
		.first()
}
function findAll() {
	return db("users").select("id", "username")
}

module.exports = {
    add,
    findBy,
    findById,
    findAll
}