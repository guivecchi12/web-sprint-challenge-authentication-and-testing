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
			.send({ username: "new5", password: "pass" })
		expect(res.statusCode).toBe(201)
		expect(res.body.username).toBe("new5")
		expect(res.req.method).toBe('POST')
	})
	it("login", async() => {
		const res = await supertest(server)
			.post("/api/auth/login")
			.send({ username: "new2", password: "pass" })
		expect(res.statusCode).toBe(200)
		expect(res.body.message).toBe("Welcome new2!")
	})
})