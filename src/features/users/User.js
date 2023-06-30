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
import { useGetUsersQuery } from "./usersApiSlice";

const User = ({ userId, handleEditMode }) => {
  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId],
    }),
  });

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

  const checkboxRoles = Object.values(ROLES).map((role) => {
    return (
      <div key={role} className="form-check m-1">
        <input
          className="form-check-input"
          type="checkbox"
          name="roles"
          value={role}
          checked={user.roles.includes(role)}
          disabled
        />
        <label className="form-check-label">{role}</label>
      </div>
    );
  });

  if (user) {
    return (
      <tr className={`${user.active ? "table-success" : "table-danger"}`}>
        <td>{user.building}</td>
        <td>{user.appartment}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.phone}</td>
        <td>{user.debt}</td>

        {/*isEditable && (
          <td>
            <input
              className="table_input form-control"
              type="text"
              disabled={!isEditable}
              name="password"
              value={editedData.password}
              onChange={handleChange}
            />
          </td>
        )*/}

        <td>
          <div style={{ display: "flex" }}>{checkboxRoles}</div>
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
            {/*<IconButton aria-label="delete" onClick={handleDelete}>
              <DeleteIcon style={{ color: "red" }} />
        </IconButton>*/}
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
