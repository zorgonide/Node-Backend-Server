import * as user from "../user";

describe("user handler", () => {
  it("should create a user", async () => {
    const req = { body: { username: "test", password: "test" } };
    const res = {
      json(token) {
        expect(token).toBeTruthy();
      },
    };
    await user.createUser(req, res, () => {});
  });
});
