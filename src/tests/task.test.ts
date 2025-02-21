import request from "supertest";
import app from "../app";
import { AppDataSource } from "../database/dataSource";
import { describe, it, expect, beforeAll } from "@jest/globals";

describe("Task API Endpoints", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  it("should create a task successfully", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .send({ name: "Test Task", startDate: "2023-01-01" });
    expect(response.status).toBe(201);
    expect(response.body.name).toBe("Test Task");
  });

  it("should return all tasks", async () => {
    const response = await request(app).get("/api/tasks");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should not create a task with an invalid name", async () => {
    const response = await request(app).post("/api/tasks").send({ name: "" });
    expect(response.status).toBe(400);
  });

  it("should not create a task with an end date but no start date", async () => {
    const response = await request(app).post("/api/tasks").send({ name: "Invalid Task", endDate: "2023-01-10" });
    expect(response.status).toBe(400);
  });
});