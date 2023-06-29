import React from "react";
import { useState } from "react";
import { useAddNewUserMutation } from "./usersApiSlice";
import { ROLES } from "../../config/roles";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const AddUserForm = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    building: "",
    appartment: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    debt: "0",
    roles: ["Tenant"],
  });

  const { isAdmin } = useAuth();

  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();

  const handleAdd = async (e) => {
    e.preventDefault();
    await addNewUser({
      building: userData.building,
      appartment: userData.appartment,
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      password: userData.password,
      debt: parseInt(userData.debt),
      roles: userData.roles,
    });
    navigate("/dash/users");
  };

  const handleChange = (event) => {
    const { name, value, checked, type, tagName, selectedOptions } =
      event.target;
    console.log(selectedOptions);
    let newValue;
    if (type === "checkbox") newValue = checked;
    else if (tagName === "SELECT")
      newValue = Array.from(selectedOptions, (option) => option.value);
    else newValue = value;

    console.log(name, newValue);

    setUserData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const options = Object.values(ROLES).map((role) => {
    if (!isAdmin && role === "Admin") return null;
    return (
      <option key={role} value={role}>
        {" "}
        {role}
      </option>
    );
  });

  return (
    <div className="col-md-6">
      <form class="row g-3">
        <h2>Add New User</h2>
        <div class="col-md-6">
          <label for="email" class="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={userData.email}
            autoComplete="off"
            onChange={handleChange}
          />{" "}
        </div>
        <div class="col-md-6">
          <label for="password" class="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            name="password"
            value={userData.password}
            autoComplete="off"
            onChange={handleChange}
          />{" "}
        </div>
        <div class="col-md-6">
          <label for="name" class="form-label">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={userData.name}
            autoComplete="off"
            onChange={handleChange}
          />{" "}
        </div>
        <div class="col-md-6">
          <label for="phone" class="form-label">
            Phone Number
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={userData.phone}
            className="form-control"
            autoComplete="off"
            onChange={handleChange}
          />{" "}
        </div>
        <div class="col-md-2">
          <label for="building" class="form-label">
            Building
          </label>
          <input
            type="text"
            id="building"
            name="building"
            value={userData.building}
            className="form-control"
            autoComplete="off"
            onChange={handleChange}
          />{" "}
        </div>
        <div class="col-md-2">
          <label for="appartment" class="form-label">
            Appartment
          </label>
          <input
            type="text"
            id="appartment"
            name="appartment"
            value={userData.appartment}
            className="form-control"
            autoComplete="off"
            onChange={handleChange}
          />
        </div>
        <div class="col-md-2">
          <label for="debt" class="form-label">
            Debt
          </label>
          <input
            type="text"
            id="debt"
            name="debt"
            value={userData.debt}
            className="form-control"
            autoComplete="off"
            onChange={handleChange}
          />
        </div>
        <div class="col-md-4">
          <label for="roles" class="form-label">
            Roles
          </label>
          <select
            className="form-select"
            multiple
            id="roles"
            name="roles"
            value={userData.roles}
            onChange={handleChange}
            size="3"
          >
            {options}
          </select>{" "}
        </div>

        <div class="col-12" style={{ textAlign: "center" }}>
          <button
            class="btn btn-outline-primary"
            aria-label="save"
            onClick={handleAdd}
            style={{ marginTop: "1rem", width: "30%", fontSize: "1.2rem" }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUserForm;
