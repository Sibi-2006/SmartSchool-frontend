import React from "react";

export default function TeacherLogin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-light">
      <form className="form-child">
        <h1 className="form-title">TEACHER</h1>

        {/* Admin ID */}
        <div className="mb-5 relative">
          <label
            htmlFor="id"
            className="form-label"
          >
            TEACHER ID
          </label>
          <input
            id="id"
            type="text"
            placeholder="Enter TEACHER ID"
            className="form-input"
          />
        </div>

        {/* Password */}
        <div className="mb-6 relative">
          <label
            htmlFor="password"
            className="form-label"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter Password"
            className="form-input"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-primary hover:bg-secondary text-white font-semibold py-2 rounded-lg transition-all duration-200"
        >
          LOG IN
        </button>
      </form>
    </div>
  );
}
