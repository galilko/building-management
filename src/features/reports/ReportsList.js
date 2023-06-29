import React from "react";
import { useGetReportsQuery } from "./reportsApiSlice";
import { useGetUsersQuery } from "../users/usersApiSlice";
import Report from "./Report";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { PulseLoader } from "react-spinners";

function ReportsList() {
  const navigate = useNavigate();
  const { id: user_id, isAdmin, isManager, building, email } = useAuth();

  const handleAdd = () => navigate("/dash/reports/new");

  const {
    data: reports,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetReportsQuery("reportsList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const { data: users } = useGetUsersQuery("usersList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading)
    return (
      <PulseLoader
        color="#87aebb"
        cssOverride={{}}
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
    const { ids, entities } = reports;
    const { entities: usersEntities } = users;

    let filteredIds;
    if (isAdmin) filteredIds = ids;
    else if (isManager)
      filteredIds = ids.filter(
        (id) => usersEntities[entities[id].user].building === building
      );
    else filteredIds = ids.filter((id) => entities[id].user === user_id);

    // Sort the filteredIds array by createdAt and prioritize incomplete reports
    filteredIds = filteredIds.slice().sort((id1, id2) => {
      const report1 = entities[id1];
      const report2 = entities[id2];

      if (report1.completed && !report2.completed) {
        return 1; // report1 is completed, report2 is incomplete, report2 comes first
      } else if (!report1.completed && report2.completed) {
        return -1; // report1 is incomplete, report2 is completed, report1 comes first
      }
      // Both reports have the same completion status
      else {
        // Sort by createdAt in descending order (most recent first)
        const createdAtComparison =
          new Date(report2.createdAt) - new Date(report1.createdAt);

        if (createdAtComparison !== 0) {
          return createdAtComparison;
        } else {
          return 0;
        }
      }
    });

    const tableContent =
      filteredIds.length &&
      filteredIds.map((reportId, index) => (
        <Report key={reportId} reportId={reportId} counter={index + 1} />
      ));

    content = (
      <div className="container mt-3">
        <div class="accordion" id="accordionExample">
          {tableContent}
        </div>
      </div>
    );
  }

  return content;
}

export default ReportsList;
