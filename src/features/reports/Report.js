import React from "react";
import { useGetReportsQuery, useUpdateReportMutation } from "./reportsApiSlice";
import { useGetUsersQuery } from "../users/usersApiSlice";
import { useState } from "react";

const Report = ({ reportId, counter }) => {
  const { report } = useGetReportsQuery("reportsList", {
    selectFromResult: ({ data }) => ({
      report: data?.entities[reportId],
    }),
  });

  const { reporter } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      reporter: data?.entities[report.user],
    }),
  });

  const [updateReport, { isLoading, isSuccess, isError, error }] =
    useUpdateReportMutation();
  const [isCompleted, setIsCompleted] = useState(report.completed);

  const handleComplete = async (e) => {
    await updateReport({
      id: reportId,
      user: report.user,
      title: report.title,
      text: report.text,
      completed: !isCompleted,
    });
    setIsCompleted(!isCompleted);
  };

  const created = new Date(report.createdAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <div class="accordion-item">
      <h2 class="accordion-header" id={`heading${counter}`}>
        <button
          className={`accordion-button collapsed ${
            !report.completed
              ? "bg-red-400 text-white"
              : "bg-green-400 text-white"
          }`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#collapse${counter}`}
          aria-expanded="false"
          aria-controls={`collapse${counter}`}
        >
          <strong>
            {`${report.title} - ${reporter.name} - Building: ${reporter.building} - Appartment: ${reporter.appartment} - ${created}`}
          </strong>
        </button>
      </h2>
      <div
        id={`collapse${counter}`}
        class="accordion-collapse collapse"
        aria-labelledby={`heading${counter}`}
        data-bs-parent="#accordionExample"
      >
        <div class="accordion-body">
          <p>{`${report.text}`}</p>
          <div
            style={{
              display: "flex",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            <p className="alert alert-success">
              <input
                type="checkbox"
                name="completed"
                className="form-check-input"
                checked={isCompleted}
                onClick={handleComplete}
              />
              <label
                className="form-check-label"
                style={{ marginLeft: "15px" }}
              >
                Mark As Completed
              </label>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
