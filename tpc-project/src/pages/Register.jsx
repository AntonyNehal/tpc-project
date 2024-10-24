import React, { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    nationality: "",
    gender: "",
    differentlyAbled: "",
    areaOfInterest: "",
    phone: "",
    email: "",
    year: "",
    semester: "",
    branch: "",
    registerNumber: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/user/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Registration successful!");
        console.log(data); // Confirm successful response
        setFormData({
          name: "",
          dob: "",
          nationality: "",
          gender: "",
          differentlyAbled: "",
          areaOfInterest: "",
          phone: "",
          email: "",
          year: "",
          semester: "",
          branch: "",
          registerNumber: "",
        });
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-2xl font-semibold text-center mb-6">Student Registration</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField id="name" label="Name:" value={formData.name} onChange={handleInputChange} />
          <InputField id="dob" type="date" label="Date of Birth:" value={formData.dob} onChange={handleInputChange} />
          <InputField id="nationality" label="Nationality:" value={formData.nationality} onChange={handleInputChange} />
          <SelectField
            id="gender"
            label="Gender:"
            value={formData.gender}
            onChange={handleInputChange}
            options={["Female", "Male", "Other"]}
          />
          <SelectField
            id="differentlyAbled"
            label="Differently Abled:"
            value={formData.differentlyAbled}
            onChange={handleInputChange}
            options={["Yes", "No"]}
          />
          <InputField id="areaOfInterest" label="Area of Interest:" value={formData.areaOfInterest} onChange={handleInputChange} />
          <InputField id="phone" type="tel" label="Phone Number:" value={formData.phone} onChange={handleInputChange} />
          <InputField id="email" type="email" label="Email ID:" value={formData.email} onChange={handleInputChange} />
          <InputField id="year" label="Year:" value={formData.year} onChange={handleInputChange} />
          <InputField id="semester" label="Semester:" value={formData.semester} onChange={handleInputChange} />
          <InputField id="branch" label="Branch:" value={formData.branch} onChange={handleInputChange} />
          <InputField id="registerNumber" label="Register Number:" value={formData.registerNumber} onChange={handleInputChange} />

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-500"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

const InputField = ({ id, label, type = "text", value, onChange }) => (
  <label className="block">
    <span className="text-gray-700">{label}</span>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      required
    />
  </label>
);

const SelectField = ({ id, label, value, onChange, options }) => (
  <label className="block">
    <span className="text-gray-700">{label}</span>
    <select
      id={id}
      value={value}
      onChange={onChange}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      required
    >
      {options.map((option) => (
        <option key={option} value={option.toLowerCase()}>
          {option}
        </option>
      ))}
    </select>
  </label>
);

export default Register;
