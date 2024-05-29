import chai, { use, request } from "chai";
import chaiHttp from "chai-http";
import app from "../app";
import { User, Item } from "../models";

use(chaiHttp);
const { expect } = chai;

let token;
let itemId;

before(async () => {
  await Item.sync({ force: true });
  await User.sync({ force: true });

  const res = await request(app).post("/users/register").send({
    username: "testUser2024",
    email: "testuser2024@example.com",
    password: "T3stP@ssw0rd!2024",
  });

  token = res.body.token;
});

describe("Item Routes", () => {
  it("should create a new item", (done) => {
    request(app)
      .post("/items")
      .set("Authorization", `Bearer ${token}`)
      .field("name", "Test Item")
      .field("description", "This is a test item")
      .field("startingPrice", "10")
      .field(
        "endTime",
        new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      ) // 24 hours from now
      .attach("image", "test/fixtures/test-image.jpg")
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property("id");
        expect(res.body.name).to.equal("Test Item");
        itemId = res.body.id;
        done();
      });
  });

  it("should get all items", (done) => {
    request(app)
      .get("/items")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        expect(res.body.length).to.be.above(0);
        done();
      });
  });

  it("should get a specific item by ID", (done) => {
    request(app)
      .get(`/items/${itemId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("id");
        expect(res.body.id).to.equal(itemId);
        done();
      });
  });

  it("should update an item by ID", (done) => {
    request(app)
      .put(`/items/${itemId}`)
      .set("Authorization", `Bearer ${token}`)
      .field("name", "Updated Test Item")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.name).to.equal("Updated Test Item");
        done();
      });
  });

  it("should delete an item by ID", (done) => {
    request(app)
      .delete(`/items/${itemId}`)
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("message", "Item deleted");
        done();
      });
  });
});
