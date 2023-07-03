import app from "../server";
import supertest from "supertest";

describe("GET /", () => {
  it("should return hello", async () => {
    const res = await supertest(app).get("/");
    expect(res.status).toEqual(200);
    expect(res.body.message).toEqual("hello");
  });
});
