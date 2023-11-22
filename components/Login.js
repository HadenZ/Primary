import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
    const history = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function submit(e) {
        e.preventDefault();
    
        try {
            const response = await axios.post("http://localhost:3000/login", {
                email,
                password,
            });
            
            console.log("Login Response:", response);
    
            if (response.data.status === "exist") {
                history("/home");
            } else if (response.data.status === "notexist") {
                alert("User has not signed up");
            } else {
                alert("Unexpected response from the server");
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("Failed to log in. Please try again.");
        }
    }
    

    return (
        <div className="login">
            <h1>Sign In</h1>
            <form action="POST">
                <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <input type="submit" onClick={submit} />
            </form>
            
            <p>Don't have an account?<Link to="/signup">Create Account</Link> </p>
            
            
        </div>
    );
}

export default Login;
