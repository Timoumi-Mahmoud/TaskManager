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
      const res = await request('http://localhost:3000').get("/api/v1/tasks");
      expect(res.statusCode).toBe(200);
     // expect(res.body.task).toBeGreaterThan(0);
    });
  });
  
  describe("GET /api/v1/task/:id", () => {
    it("should return a task by it's id ", async () => {
      const res = await request('http://localhost:3000').get(
        "/api/v1/tasks/64976d69ca939c2f6837dd01"
      );
      expect(res.statusCode).toBe(200);
     // console.log(res)
      expect(res.body.task.name).toBe("salim");
    });
  });

