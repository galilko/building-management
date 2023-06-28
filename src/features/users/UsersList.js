import React from "react";
import { useGetUsersQuery } from "./usersApiSlice";
import User from "./User";
import { useState } from "react";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddUser from "./AddUser";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function UsersList() {
  const [isEditable, setIsEditable] = useState(false);
  const [isAddClicked, setIsAddClicked] = useState(false);
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
  } = useGetUsersQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading) content = <p>Loading...</p>;

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
        <style>
          {`
  tr {
    vertical-align: middle;
  }
  `}
        </style>
        {!isAddClicked && (
          <p scope="col">
            <button
              className="btn btn-primary"
              aria-label="save"
              onClick={handleAdd}
            >
              Add New User{" "}
            </button>
          </p>
        )}
        <table
          className="table table-hover"
          style={{ verticalAlign: "middle" }}
        >
          <thead>
            <tr className="table-dark">
              <th scope="col">Building</th>
              <th scope="col">Appartment</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone Number</th>
              {(isEditable || isAddClicked) && <th scope="col">Password</th>}
              <th scope="col">Debt</th>
              <th style={{ textAlign: "center" }} scope="col">
                Active
              </th>
              <th style={{ textAlign: "center" }} scope="col">
                Roles
              </th>
              <th
                style={{ textAlign: "center", verticalAlign: "center" }}
                scope="col"
              >
                Operations
              </th>
            </tr>
          </thead>
          <tbody>
            {isAddClicked ? (
              <AddUser
                handleEditMode={setIsEditable}
                handleAddMode={setIsAddClicked}
              />
            ) : (
              tableContent
            )}
          </tbody>
        </table>
      </div>
    );
  }

  return content;
}

export default UsersList;
