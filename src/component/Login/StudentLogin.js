import React from "react";

export default function StudentLogin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-light">
      <form className="form-child">
        <h1 className="form-title">STUDENT</h1>

        {/* Admin ID */}
        <div className="mb-5 relative">
          <label
            htmlFor="id"
            className="form-label"
          >
            Student ID
          </label>
          <input
            id="id"
            type="text"
            placeholder="Enter Admin ID"
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
