import React from "react";
import { useGetUsersQuery } from "./usersApiSlice";
import User from "./User";
import { useState } from "react";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddUser from "./AddUser";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { PulseLoader } from "react-spinners";

function UsersList() {
  const [isEditable, setIsEditable] = useState(false);
  const navigate = useNavigate();
  const { isAdmin, isManager, building, email } = useAuth();

  const handleEditMode = () => {
    setIsEditable(!isEditable);
  };

  const handleAdd = () => navigate("/dash/users/new");

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery("usersList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading)
    return (
      <PulseLoader
        color="var(--bs-primary)"
        loading
        margin={10}
        size={40}
        speedMultiplier={0.7}
      />
    );
  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids, entities } = users;

    let filteredIds;
    if (isAdmin) filteredIds = ids;
    else if (isManager)
      filteredIds = ids.filter((id) => entities[id].building === building);
    else filteredIds = ids.filter((id) => entities[id].email === email);

    const tableContent =
      filteredIds?.length &&
      filteredIds.map((userId) => (
        <User key={userId} userId={userId} handleEditMode={handleEditMode} />
      ));

    content = (
      <div className="container mt-3">
        <p scope="col">
          <button
            className="btn btn-outline-primary"
            aria-label="save"
            onClick={handleAdd}
          >
            Add New User{" "}
          </button>
        </p>
        <div className="table-responsive-sm">
          <table className="table table-hover table-bordered text-center align-middle">
            <thead>
              <tr className="table-dark" style={{ verticalAlign: "middle" }}>
                <th scope="col">Building</th>
                <th scope="col">Appartment</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone Number</th>
                {isEditable && <th scope="col">Password</th>}
                <th scope="col">Debt</th>
                <th style={{ textAlign: "center" }} scope="col">
                  Roles
                </th>
                <th
                  style={{ textAlign: "center", verticalAlign: "center" }}
                  scope="col"
                >
                  Edit
                </th>
              </tr>
            </thead>
            <tbody>{tableContent}</tbody>
          </table>
        </div>
      </div>
    );
  }

  return content;
}

export default UsersList;
