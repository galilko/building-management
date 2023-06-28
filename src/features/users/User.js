import { useState } from "react";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import SaveIcon from "@mui/icons-material/Save";
import {} from "react-redux";
import { useSelector } from "react-redux";
import { selectUserById } from "./usersApiSlice";
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice";
import { ROLES } from "../../config/roles";

const User = ({ userId, handleEditMode }) => {
  const user = useSelector((state) => selectUserById(state, userId));

  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();

  const [
    deleteUser,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteUserMutation();

  const [isEditable, setIsEditable] = useState(false);
  const [editedData, setEditedData] = useState({
    building: user.building,
    appartment: user.appartment,
    name: user.name,
    email: user.email,
    phone: user.phone,
    password: user.password,
    debt: user.debt,
    roles: user.roles,
    active: user.active,
  });

  const handleEdit = () => {
    handleEditMode();
    setIsEditable(true);
  };

  const handleDelete = async () => {
    await deleteUser({ id: userId });
  };

  const handleSave = async (e) => {
    handleEditMode();
    await updateUser({
      id: userId,
      building: editedData.building,
      appartment: editedData.appartment,
      name: editedData.name,
      email: editedData.email,
      phone: editedData.phone,
      password: editedData.password,
      debt: parseInt(editedData.debt),
      roles: editedData.roles,
      active: editedData.active,
    });
    setIsEditable(false);
  };

  const handleChange = (event) => {
    const { name, value, checked, type, tagName, selectedOptions } =
      event.target;
    const newValue =
      type === "checkbox"
        ? checked
        : tagName === "SELECT"
        ? Array.from(
            selectedOptions, //HTMLCollection
            (option) => option.value
          )
        : value;
    console.log(name, newValue);

    setEditedData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const errClass = isError || isDelError ? "errmsg" : "offscreen";
  const errContent = (error?.data?.message || delerror?.data?.message) ?? "";

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {" "}
        {role}
      </option>
    );
  });

  if (user) {
    return (
      <tr className="table-light">
        <td>
          <input
            className="table_input form-control"
            type="text"
            disabled={!isEditable}
            name="building"
            value={editedData.building}
            style={{ width: "50px" }}
            onChange={handleChange}
          />
        </td>
        <td>
          <input
            className="table_input form-control"
            type="text"
            disabled={!isEditable}
            name="appartment"
            value={editedData.appartment}
            style={{ width: "50px" }}
            onChange={handleChange}
          />
        </td>
        <td>
          <input
            className="table_input form-control"
            type="text"
            disabled={!isEditable}
            name="name"
            value={editedData.name}
            style={{ width: "100px" }}
            onChange={handleChange}
          />
        </td>
        <td>
          <input
            className="table_input form-control"
            type="email"
            disabled={!isEditable}
            name="email"
            value={editedData.email}
            style={{ width: "180px" }}
            onChange={handleChange}
          />
        </td>
        <td>
          <input
            className="table_input form-control"
            type="text"
            disabled={!isEditable}
            name="phone"
            value={editedData.phone}
            style={{ width: "100px" }}
            onChange={handleChange}
          />
        </td>
        {isEditable && (
          <td>
            <input
              className="table_input form-control"
              type="text"
              disabled={!isEditable}
              name="password"
              value={editedData.password}
              style={{ width: "100px" }}
              onChange={handleChange}
            />
          </td>
        )}
        <td>
          <input
            className="table_input form-control"
            type="text"
            disabled={!isEditable}
            name="debt"
            value={editedData.debt}
            style={{ width: "50px" }}
            onChange={handleChange}
          />
        </td>
        <td style={{ textAlign: "center" }}>
          <input
            type="checkbox"
            name="active"
            className="form-check-input"
            disabled={!isEditable}
            checked={editedData.active}
            style={{ transform: "scale(1.5)" }}
            onClick={handleChange}
          />
        </td>
        <td>
          <select
            name="roles"
            className="form-select"
            value={editedData.roles}
            disabled={!isEditable}
            onChange={handleChange}
            multiple={true}
            style={{ height: "80px" }}
          >
            {options}
          </select>
        </td>
        {isEditable ? (
          <td style={{ textAlign: "center" }}>
            <IconButton aria-label="save" onClick={handleSave}>
              <SaveIcon style={{ color: "green" }} />
            </IconButton>
          </td>
        ) : (
          <td style={{ textAlign: "center" }}>
            <IconButton aria-label="edit" onClick={handleEdit}>
              <EditIcon style={{ color: "grey" }} />
            </IconButton>
            <IconButton aria-label="delete" onClick={handleDelete}>
              <DeleteIcon style={{ color: "red" }} />
            </IconButton>
          </td>
        )}
        <p className={errClass}>{errContent}</p>
      </tr>
    );
  } else {
    return null;
  }
};

export default User;
