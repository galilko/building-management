import React from "react";
import { useState } from "react";
import { useAddNewReportMutation } from "./reportsApiSlice";
import { ROLES } from "../../config/roles";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const AddReportForm = () => {
  const navigate = useNavigate();
  const { id } = useAuth();
  const [reportData, setReportData] = useState({
    user: id,
    title: "",
    text: "",
  });

  const [addNewReport, { isLoading, isSuccess, isError, error }] =
    useAddNewReportMutation();

  const handleAdd = async (e) => {
    e.preventDefault();
    await addNewReport({
      user: reportData.user,
      title: reportData.title,
      text: reportData.text,
    });
    navigate("/dash/reports");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newValue = value;
    setReportData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {" "}
        {role}
      </option>
    );
  });

  return (
    <div className="col-md-6">
      <h2>Report an issue</h2>
      <form onSubmit={handleAdd}>
        <div>
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={reportData.title}
            onChange={handleChange}
          />
        </div>
        <div className="mt-3">
          <label htmlFor="text" className="form-label">
            Content
          </label>
          <textarea
            className="form-control"
            id="text"
            name="text"
            rows="5"
            value={reportData.text}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mt-4" style={{ textAlign: "center" }}>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReportForm;
