const supertest = require("supertest")
const server = require("../api/server")
const db = require("../database/dbConfig")

afterAll(async () => {
	// close the database connection so the test process doesn't hang or give a warning
	await db.destroy()
})

describe("integration tests", async () => {
	it("register", async() => {
		const res = await supertest(server)
			.post("/api/auth/register")
			.send({ username: "Gaara", password: "sand coffin" })
		// expect(res.statusCode).toBe(201)
		// expect(res.body.name).toBe("Gaara")
		// expect(res.req.method).toBe('POST')
		console.log(res)
	})
})