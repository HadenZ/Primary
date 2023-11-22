const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://shrihari163:ajhrc5678@cluster0.mrfybz7.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });

// User and Profile schemas and models
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const profileSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  addressLine1: {
    type: String,
    required: true,
  },
  addressLine2: {
    type: String,
    required: true,
  },
  postcode: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  stateRegion: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  additionalDetails: {
    type: String,
    required: true,
  },
});

const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
  },
});

const eventSchema = new mongoose.Schema({
  event: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
const Profile = mongoose.models.Profile || mongoose.model("Profile", profileSchema);
const TodoModel = mongoose.models.Todo || mongoose.model("Todo", todoSchema);
const EventModel = mongoose.models.Event || mongoose.model("Event", eventSchema);

module.exports = { User, Profile, TodoModel, EventModel };
