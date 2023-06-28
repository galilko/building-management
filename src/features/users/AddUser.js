import React from "react";
import { useState } from "react";
import { IconButton } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useAddNewUserMutation } from "./usersApiSlice";
import { ROLES } from "../../config/roles";
import { ta } from "date-fns/locale";

const AddUser = ({ handleEditMode, handleAddMode }) => {
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

  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();

  const handleAdd = async (e) => {
    console.log(userData);
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
    handleEditMode(false);
    handleAddMode(false);
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
    return (
      <option key={role} value={role}>
        {" "}
        {role}
      </option>
    );
  });
  return (
    <tr className="table-light">
      <td>
        <input
          type="text"
          name="building"
          value={userData.building}
          autoComplete="off"
          style={{ width: "50px" }}
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          type="text"
          name="appartment"
          value={userData.appartment}
          autoComplete="off"
          style={{ width: "50px" }}
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          type="text"
          name="name"
          value={userData.name}
          autoComplete="off"
          style={{ width: "100px" }}
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          type="email"
          name="email"
          value={userData.email}
          autoComplete="off"
          style={{ width: "180px" }}
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          type="text"
          name="phone"
          value={userData.phone}
          autoComplete="off"
          style={{ width: "100px" }}
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          type="text"
          name="password"
          className="form-control"
          value={userData.password}
          autoComplete="off"
          style={{ width: "100px" }}
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          type="text"
          name="debt"
          className="form-control"
          value={userData.debt}
          autoComplete="off"
          style={{ width: "50px" }}
          onChange={handleChange}
        />
      </td>
      <td style={{ textAlign: "center" }}>
        <input
          type="checkbox"
          name="active"
          checked
          disabled
          className="form-check-input"
          style={{ transform: "scale(1.5)" }}
          onClick={handleChange}
        />
      </td>
      <td>
        <select
          className="form-select"
          multiple
          name="roles"
          value={userData.roles}
          onChange={handleChange}
          size="3"
        >
          {options}
        </select>
      </td>
      <td style={{ textAlign: "center" }}>
        <IconButton aria-label="save" onClick={handleAdd}>
          <SaveIcon style={{ color: "green" }} />
        </IconButton>
      </td>
    </tr>
  );
};

export default AddUser;
