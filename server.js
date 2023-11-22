const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// MongoDB connection for User and Profile
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

const User = mongoose.model("User", userSchema);
const Profile = mongoose.model("Profile", profileSchema);


// TodoModel for to-do list
const { TodoModel } = require("./mongo");

// EventModel for event planner
const { EventModel } = require("./mongo");

// Login and Signup routes
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (user && user.password === password) {
      // Fetch user's profile details
      const profile = await Profile.findOne({ email: email });

      res.json({ status: "exist", profile: profile || null });
    } else {
      res.json({ status: "notexist" });
    }
  } catch (e) {
    console.error("Error:", e);
    res.json({ status: "fail" });
  }
});

app.post("/signup", async (req, res) => {
  const { email, password, username } = req.body;

  console.log("Received signup request:", { email, password, username });

  const userData = {
    username: username,
    email: email,
    password: password,
  };

  try {
    const check = await User.findOne({ email: email });

    if (check) {
      console.log("User already exists");
      res.json("exist");
    } else {
      await User.create(userData);
      console.log("User created successfully");
      res.json("notexist");
    }
  } catch (e) {
    console.error("Error:", e);
    res.json("fail");
  }
});

// Profile route
app.post("/profile", async (req, res) => {
  const {
    email,
    username,
    firstName,
    lastName,
    mobileNumber,
    addressLine1,
    addressLine2,
    postcode,
    country,
    stateRegion,
    experience,
    additionalDetails,
  } = req.body;

  const profileData = {
    username: username,
    email: email,
    firstName: firstName,
    lastName: lastName,
    mobileNumber: mobileNumber,
    addressLine1: addressLine1,
    addressLine2: addressLine2,
    postcode: postcode,
    country: country,
    stateRegion: stateRegion,
    experience: experience,
    additionalDetails: additionalDetails,
  };

  try {
    const check = await Profile.findOne({ email: email });
    if (check) {
      res.json("exist");
    } else {
      await Profile.create(profileData);
      res.json("notexist");
    }
  } catch (e) {
    console.error("Error:", e);
    res.json("fail");
  }
});

// To-do list routes
app.get("/getTodoList", (req, res) => {
  TodoModel.find({})
    .then((todoList) => res.json(todoList))
    .catch((err) => res.json(err));
});

app.post("/addTodoList", (req, res) => {
  TodoModel.create({
    task: req.body.task,
    status: req.body.status,
    deadline: req.body.deadline,
  })
    .then((todo) => res.json(todo))
    .catch((err) => res.json(err));
});

app.post("/updateTodoList/:id", (req, res) => {
  const id = req.params.id;
  const updateData = {
    task: req.body.task,
    status: req.body.status,
    deadline: req.body.deadline,
  };
  TodoModel.findByIdAndUpdate(id, updateData)
    .then((todo) => res.json(todo))
    .catch((err) => res.json(err));
});

app.delete("/deleteTodoList/:id", (req, res) => {
  const id = req.params.id;
  TodoModel.findByIdAndDelete({ _id: id })
    .then((todo) => res.json(todo))
    .catch((err) => res.json(err));
});

// Event planner routes
app.get("/getEventList", (req, res) => {
  EventModel.find({})
    .then((eventList) => res.json(eventList))
    .catch((err) => res.json(err));
});

app.post("/addEventList", (req, res) => {
  const { event, location, startDate, endDate } = req.body;

  if (!event || !location || !startDate || !endDate) {
    return res.status(400).json({ error: "All fields must be filled out." });
  }

  EventModel.create({
    event,
    location,
    startDate,
    endDate,
  })
    .then((event) => res.json(event))
    .catch((err) => res.json(err));
});

app.post("/updateEventList/:id", (req, res) => {
  const id = req.params.id;
  const { event, location, startDate, endDate } = req.body;

  if (!event || !location || !startDate || !endDate) {
    return res.status(400).json({ error: "All fields must be filled out." });
  }

  const updateData = {
    event,
    location,
    startDate,
    endDate,
  };

  EventModel.findByIdAndUpdate(id, updateData)
    .then((event) => res.json(event))
    .catch((err) => res.json(err));
});

app.delete("/deleteEventList/:id", (req, res) => {
  const id = req.params.id;
  EventModel.findByIdAndDelete({ _id: id })
    .then((event) => res.json(event))
    .catch((err) => res.json(err));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});