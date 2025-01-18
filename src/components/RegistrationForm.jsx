import React, { useState } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';

const { Title } = Typography;

const RegistrationForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ first_name: firstName, last_name: lastName, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        message.success('Registration successful. You can now log in.');
        window.location.href = '/'; // Redirect to login page after successful registration
      } else {
        message.error(data.message || 'Error during registration');
      }
      
    } catch (error) {
      message.error('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <Title level={2} className="text-center mb-6">Register</Title>
        <Form
          name="register"
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            label="First Name"
            name="first_name"
            rules={[{ required: true, message: 'Please enter your first name!' }]}
          >
            <Input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="border-gray-300 rounded-md p-2"
            />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="last_name"
            rules={[{ required: true, message: 'Please enter your last name!' }]}
          >
            <Input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="border-gray-300 rounded-md p-2"
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please enter your email!' }]}
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
            rules={[{ required: true, message: 'Please enter your password!' }]}
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
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default RegistrationForm;
