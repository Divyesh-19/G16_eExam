import React, { useState } from "react";
import "./CreateExaminer.css";
import axios from "axios";
import Cookies from "js-cookie";
import config from "../../config.js";
import Loading from "../Loader/Loding.jsx"

const CreateExaminer = ({ onClose, setExaminers, toast }) => {

    const [isloaderon, setisloaderon] = useState(false);
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        middlename: "",
        dob: "",
        email: "",
        mobileno: "",
        gender: "",
        username: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Regular expression to match exactly 10 digits
        const contactRegex = /^\d{10}$/;

        if (!contactRegex.test(formData.mobileno)) {
            toast.error("Contact number must be 10 digits");
            return;
        }
        setisloaderon(true);
        try {

            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Cookies.get("token")}`,
            };

            const result = await axios.post((config.BACKEND_API || "http://localhost:8000") + "/create-examiner", formData, { headers });

            // console.log(result);

            if (result.status !== 200) {
                toast.error((result?.data?.message) || ("Internal server error"));
                return;
            }

            toast.success(result.data.message);
            onClose();

            setExaminers(prev => [...prev, result.data.user]);
        } catch (e) {
            console.log(e);

            toast.error((e?.response?.data?.message) || ("Internal server error"));
        }
        setisloaderon(false);
    };

    const handleClose = () => {
        setFormData({
            firstname: "",
            lastname: "",
            middlename: "",
            dob: "",
            email: "",
            mobileno: "",
            username: "",
            role: "",
            gender: "",
            expertise: "",
        });
        // console.log("Form closed or reset");
    };

    return (
        <div className="create-examiner-container">
            {isloaderon && <Loading />}
            <h3 className="createexaminerheader">Create Examiner Profile</h3>
            <form onSubmit={handleSubmit} className="examiner-form">
                <div className="form-group">
                    <div className="half-width">
                        <label htmlFor="firstname">First Name:</label>
                        <input
                            type="text"
                            id="firstname"
                            name="firstname"
                            value={formData.firstname}
                            onChange={handleChange}
                            placeholder="Enter first name"
                            required
                        />
                    </div>
                    <div className="half-width">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter username"
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <div className="half-width">
                        <label htmlFor="middlename">Middle Name:</label>
                        <input
                            type="text"
                            id="middlename"
                            name="middlename"
                            value={formData.middlename}
                            onChange={handleChange}
                            placeholder="Enter middle name"
                            required
                        />
                    </div>

                    <div className="half-width">
                        <label htmlFor="lastname">Last Name:</label>
                        <input
                            type="text"
                            id="lastname"
                            name="lastname"
                            value={formData.lastname}
                            onChange={handleChange}
                            placeholder="Enter last name"
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <div className="half-width">
                        <label htmlFor="email">Email Address:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                            required
                        />
                    </div>
                    <div className="half-width">
                        <label htmlFor="mobileno">Mobile Number:</label>
                        <input
                            type="tel"
                            id="mobileno"
                            name="mobileno"
                            value={formData.mobileno}
                            onChange={handleChange}
                            placeholder="Enter mobile number"
                            required
                            pattern="\d{10}" // Ensures exactly 10 digits
                            title="Mobile number must be 10 digits"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <div className="half-width">
                        <label htmlFor="dob">Date of Birth:</label>
                        <input
                            type="date"
                            id="dob"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Role Selection */}
                    <div className="half-width">
                        <div className="radio-group">
                            <label>Gender:</label>
                            <div className="radio-group-div">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Male"
                                    checked={formData.gender === "Male"}
                                    onChange={handleChange}
                                    required
                                />
                                Male
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Female"
                                    checked={formData.gender === "Female"}
                                    onChange={handleChange}
                                    required
                                />
                                Female
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-group"></div>

                <button type="submit" className="submit-btn">
                    Create Examiner Profile
                </button>
                <button type="button" onClick={onClose} className="close-btn">
                    Close
                </button>
            </form>
        </div>
    );
};

export default CreateExaminer;
