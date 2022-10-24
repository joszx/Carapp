//During the test the env variable is set to test
process.env.ENV = "TEST";

let mongoose = require("mongoose");
// Import contact model
let Contact = require("../contactModel");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe("Contacts", () => {
  beforeEach((done) => {
    //Before each test we empty the database
    Contact.remove({}, (err) => {
      done();
    });
  });
  /*
   * Test the /GET route
   */
  describe("/GET contact", () => {
    it("it should GET all the books", (done) => {
      chai
        .request(server)
        .get("/api/contacts")
        .end((err, res) => {
          should.exist(res.body);
          res.should.have.status(200);
          res.body.status.should.be.eql("success");
          res.body.data.should.be.a("array");
          res.body.data.length.should.be.eql(0);
          done();
        });
    });
  });

  /*
   * Test the /POST route
   */
  describe("/POST contact", () => {
    it("it should not POST a contact without a name", (done) => {
      let contact = {
        email: "dukersss@chess.com",
        phone: "08479312",
        gender: "Female",
      };
      chai
        .request(server)
        .post("/api/contacts")
        .send(contact)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("errors");
          res.body.errors.should.have.property("name");
          res.body.errors.name.should.have.property("kind").eql("required");
          done();
        });
    });
    it("it should POST a contact ", (done) => {
      let contact = {
        name: "Bobby",
        email: "bobbers@wahoo.com",
        phone: "91234567",
        gender: "Male",
      };
      chai
        .request(server)
        .post("/api/contacts")
        .send(contact)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("message").eql("New contact created!");
          res.body.data.should.have.property("name");
          res.body.data.should.have.property("gender");
          res.body.data.should.have.property("email");
          res.body.data.should.have.property("phone");
          done();
        });
    });
  });

  /*
   * Test the /GET/:id route
   */
  describe("/GET/:id contact", () => {
    it("it should GET a contact by the given id", (done) => {
      let contact = new Contact({
        name: "John Doe",
        email: "johndoe@wahoo.com",
        phone: "91234567",
        gender: "Male",
      });
      contact.save((err, contact) => {
        chai
          .request(server)
          .get("/api/contacts/" + contact.id)
          .send(contact)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.data.should.have.property("name");
            res.body.data.should.have.property("email");
            res.body.data.should.have.property("phone");
            res.body.data.should.have.property("gender");
            res.body.data.should.have.property("_id").eql(contact.id);
            done();
          });
      });
    });
  });

  /*
   * Test the /PUT/:id route
   */
  describe("/PUT/:id book", () => {
    it("it should UPDATE a contact given the id", (done) => {
      let contact = new Contact({
        name: "John Doe",
        email: "johndoe@wahoo.com",
        phone: "91234567",
        gender: "Male",
      });
      contact.save((err, contact) => {
        chai
          .request(server)
          .put("/api/contacts/" + contact.id)
          .send({
            name: "John Crow",
            email: "johncrow@wahoo.com",
            phone: "91234567",
            gender: "Male",
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have
              .property("message")
              .eql("Contact Info updated");
            res.body.data.should.have.property("name").eql("John Crow");
            res.body.data.should.have
              .property("email")
              .eql("johncrow@wahoo.com");
            done();
          });
      });
    });
  });

  /*
   * Test the /DELETE/:id route
   */
  describe("/DELETE/:id contact", () => {
    it("it should DELETE a contact given the id", (done) => {
      let contact = new Contact({
        name: "Bobby",
        email: "bobbers@wahoo.com",
        phone: "91234567",
        gender: "Male",
      });
      contact.save((err, contact) => {
        chai
          .request(server)
          .delete("/api/contacts/" + contact.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("message").eql("Contact deleted");
            res.body.should.have.property("status").eql("success");
            done();
          });
      });
    });
  });
});
