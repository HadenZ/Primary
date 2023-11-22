// ProfileForm.js

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Profile.css";

const ProfileForm = ({ profile }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    postcode: "",
    country: "",
    stateRegion: "",
    experience: "",
    additionalDetails: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/profile", formData);
      alert("Profile data submitted successfully!");
    } catch (error) {
      console.error("Error submitting profile form:", error);
    }
    navigate("/home");
  };

  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        mobileNumber: profile.mobileNumber || "",
        email: profile.email || "",
        addressLine1: profile.addressLine1 || "",
        addressLine2: profile.addressLine2 || "",
        postcode: profile.postcode || "",
        country: profile.country || "",
        stateRegion: profile.stateRegion || "",
        experience: profile.experience || "",
        additionalDetails: profile.additionalDetails || "",
      });
    }
  }, [profile]);

  return (
    <div className="profile-container rounded bg-white mt-5 mb-5">
      <div className="row">
        <div className="col-md-3 border-right">
          <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            <img
              className="profile-image"
              width="150px"
              src="https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2220431045.jpg"
              alt="Profile"
            />
          </div>
        </div>
        <div className="col-md-5 ">
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="profile-text">Profile Settings</h4>
            </div>
            <div className="row mt-2">
              <div className="col-md-6">
                <label className="profile-label">First Name</label>
                <label className="profile-label">Last Name</label>
                <br />
                <div className="d-flex">
                  <input
                    type="text"
                    className="profile-form-control"
                    placeholder="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    className="profile-form-control ml-2"
                    placeholder="Surname"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              

              <div className="col-md-6">
                <label className="profile-label">Mobile Number</label>
                <br />
                <input
                  type="text"
                  className="profile-form-control"
                  placeholder="Enter Phone Number"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                />
              </div>

              <div className="col-md-6">
                <label className="profile-label">Email ID</label>
                <br />
                <input
                  type="text"
                  className="profile-form-control"
                  placeholder="Enter Email ID"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="profile-label-AD">Address Line 1</label>
                  <label className="profile-label-AD">Address Line 2</label>
                  <br />
                  <div className="d-flex">
                    <input
                      type="text"
                      className="profile-form-control"
                      placeholder="Enter Address Line 1"
                      name="addressLine1"
                      value={formData.addressLine1}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      className="profile-form-control"
                      placeholder="Enter Address Line 2"
                      name="addressLine2"
                      value={formData.addressLine2}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="profile-label">Postcode</label>
                  <br />
                  <input
                    type="text"
                    className="profile-form-control"
                    placeholder="Enter Postcode"
                    name="postcode"
                    value={formData.postcode}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="profile-label">Country</label>
                  <br />
                  <input
                    type="text"
                    className="profile-form-control"
                    placeholder="Enter Country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="profile-label">State/Region</label>
                  <br />
                  <input
                    type="text"
                    className="profile-form-control"
                    placeholder="Enter State/Region"
                    name="stateRegion"
                    value={formData.stateRegion}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="profile-label">Experience</label>
                  <br />
                  <input
                    type="text"
                    className="profile-form-control"
                    placeholder="Experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="profile-label">Additional Details</label>
                  <br />
                  <input
                    type="text"
                    className="profile-form-control"
                    placeholder="Additional Details"
                    name="additionalDetails"
                    value={formData.additionalDetails}
                    onChange={handleInputChange}
                  />
                </div>
              </div>




            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-3 py-5">
            <div className="mt-5 text-center">
              <button
                className="btn btn-primary profile-save-button"
                type="button"
                onClick={handleSubmit}
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
