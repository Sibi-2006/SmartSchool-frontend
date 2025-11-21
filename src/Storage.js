export const setTeacherToken = (token) => localStorage.setItem("teacherToken", token);
export const getTeacherToken = () => localStorage.getItem("teacherToken");
export const logoutTeacher = () => { localStorage.removeItem("teacherToken") }

export const setStudentToken = (token) => localStorage.setItem("studentToken", token);
export const getStudentToken = () => localStorage.getItem("studentToken");
export const logoutStudent = () => { localStorage.removeItem("studentToken") }