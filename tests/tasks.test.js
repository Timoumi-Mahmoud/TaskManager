const mongoose = require("mongoose");
const request = require("supertest");



const app = require('../app');

require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });
  
  /* Closing database connection after each test. */
  afterEach(async () => {
    await mongoose.connection.close();
  });

  

  describe("GET /api/v1/tasks", () => {
    it("should return all Tasks", async () => {
      const res = await request(app).get("/api/v1/tasks");
      expect(res.statusCode).toBe(200);
     // expect(res.body.task).toBeGreaterThan(0);
    });
  });
  
  describe("GET /api/v1/task/:id", () => {
    it("should return a task by it's id ", async () => {
      const res = await request(app).get(
        "/api/v1/tasks/64976d69ca939c2f6837dd01"
      );
      expect(res.statusCode).toBe(200);
     // console.log(res)
      expect(res.body.task.name).toBe("salim");
    });
  });

  
describe("PUT /api/v1/tasks/:id", () => {
  it("should update a task", async () => {
    const res = await request(app)
      .patch("/api/v1/tasks/649776aacf12d53a282917a2")
      .send({
        name: "task 4",
       // description: "Description 4",
      });
    expect(res.statusCode).toBe(200);
   // expect(res.body.task.name).toBe(104);
  });
});
/*
describe("DELETE /api/v1/tasks/:id", () => {
  it("should delete a task", async () => {
    const res = await request(app).delete(
     "/api/v1/tasks/6498563fd230db2f5836df89"
    );
    expect(res.statusCode).toBe(200);
  });
});*/


describe("POST /api/v1/tasks", () => {
  it("should create a new task", async () => {
    const res = await request(app).post("/api/v1/tasks").send({
      name: "testJSET",
      description: "Description 2",
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.task.name).toBe("testJSET");
  });
});