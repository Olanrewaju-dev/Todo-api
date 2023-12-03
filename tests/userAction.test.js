const supertest = require("supertest");
const app = require("../api");
const { connect } = require("./database");
// const UserModel = require("../models/user.model");

// test suite
describe("User Route Tests", () => {
  let connection;
  let token;
  // before hook
  beforeAll(async () => {
    connection = await connect();
  });

  afterEach(async () => {
    await connection.cleanup();
  });

  // after hook
  afterAll(async () => {
    await connection.disconnect();
  });

  // Test case
  it("should successfully register a user", async () => {
    const response = await supertest(app)
      .post("/views/login")
      .set("content-type", "text/html")
      .send({
        username: "oladev",
        email: "oladev@example.com",
        password: "12345678",
      });

    // expectations
    expect(response.status).toEqual(301);
    expect(response.message).toEqual("User created successfully");
  });
});
