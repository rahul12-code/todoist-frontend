import React, { useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { Link } from "react-router-dom";

const { Title } = Typography;

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem("token", data.token); // Store JWT token
        window.location.href = "/my-projects"; // redirect after login
      } else {
        message.error(data.message || "Invalid email or password");
      }
    } catch (error) {
      message.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <Title level={2} className="text-center mb-6">
          Login
        </Title>
        <Form name="login" layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter your email!" }]}
          >
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-gray-300 rounded-md p-2"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-gray-300 rounded-md p-2"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md p-2"
            >
              Login
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center mt-4">
          <span>Don't have an account? </span>
          <Link to="/register" className="text-blue-500 hover:text-blue-700">
            Register
          </Link>
        </div>

      </div>
    </div>
  );
};

export default LoginForm;
