// Import necessary libraries
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
    const history = useNavigate();
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState(''); // Add username state
  
    const isEmailValid = () => {
      // Basic email validation using regular expression
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
  
    const submit = async (e) => {
      e.preventDefault();
  
      if (!isEmailValid()) {
        alert("Invalid email address");
        return;
      }
  
      try {
        const response = await axios.post("http://localhost:3000/signup", {
            username,
            email,
            password,
        });
    
        console.log("Response from server:", response); // Log the entire response
    
        if (response.data === "exist") {
            alert("User already exists");
        } else if (response.data === "notexist") {
            history("/profile");
            // Pass username to Home (you might want to modify this logic)
        }
    } catch (error) {
        console.error("Error during signup:", error);
        alert("Failed to sign up. Please try again.");
    }
    };
  
    return (
      <div className="login">
  
        <h1>Create Account</h1>
  
        <form action="POST">
          <input type="text" onChange={(e) => { setUsername(e.target.value) }} placeholder="Username" /> {/* Add username input field */}
          <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email" />
          <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" />
          <input type="submit" onClick={submit} />
  
        </form>
  
        
        <p>Already have an account?<Link to="/">Sign In</Link></p>
        
  
        
  
      </div>
    );
  }
  
  export default Signup;
  
