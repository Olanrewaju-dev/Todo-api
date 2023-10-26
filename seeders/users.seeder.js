const UserModel = require("../model/user.model");
const db = require("../config/dbConfig");

const activateSeeders = async () => {
  db.connectToMongoDB();
  try {
    await UserModel.insertMany([
      {
        email: "olabalogun@realidan.com",
        password: "12132@3#3a;lk",
        created_at: Date.now(),
      },
    ]);
    console.log("added to db successfully");
    process.exit(1);
  } catch (err) {
    console.log("Error seeding", err);
  }
};

activateSeeders();
