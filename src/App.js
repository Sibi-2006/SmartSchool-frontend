import { BrowserRouter , Routes , Route } from "react-router-dom"
import Home from "./component/Home";
import Header from "./component/Header";
import ChooseTheUser from "./component/ChooseTheUser";
import AdminLogin from "./component/Login/AdminLogin";
import TeacherLogin from "./component/Login/TeacherLogin";
import StudentLogin from "./component/Login/StudentLogin";
import AdminDashBoard from "./component/Admin/AdminDashBoard"
import CreateTeacher from "./component/Admin/CreateTeacher";
import CreateStudent from "./component/Admin/Student/CreateStudent";
import ViewDetails from "./component/Admin/ViewDetails";
import ViewOneClass from "./component/Admin/ViewOneClass";
import OneStudent from "./component/Admin/OneStudent";
import DeleteStudent from "./component/Admin/DeleteStudent";
import EditStudent from "./component/Admin/Student/EditStudent";
import OneTeacher from "./component/Admin/OneTeacher";
import DeleteTeacher from "./component/Admin/Teacher/DeleteTeacher";
import EditTeacher from "./component/Admin/Teacher/EditTeacher";
import CreateAdmin from "./component/Admin/CreateAdmin";
import DashBoard from "./component/Teacher/DashBoard";
import Attendance from "./component/Teacher/Attendance";
import AddMarkes from "./component/Teacher/AddMarkes";
import TeacherProfile from "./component/Teacher/TeacherProfile";
import EditProfile from "./component/Teacher/EditProfile";
import StudentDashBoard from "./component/Student/StudentDashBoard";
import StudentProfile from "./component/Student/StudentProfile";
import MarkHome from "./component/Student/MarkHome";
import Result from "./component/Student/Result";
import StudentAttendance from "./component/Student/StudentAttendance";
import TimeTableInStudent from "./component/Student/TimeTableInStudent";
import CreateTimeTable from "./component/Admin/CreateTimeTable";
import ViewAllTimeTable from "./component/Admin/TimeTable/ViewAllTimeTable";
import OneClassTimeTable from "./component/Admin/TimeTable/OneClassTimeTable";
import DeleteTimeTable from "./component/Admin/TimeTable/DeleteTimeTable";
import EditTimeTable from "./component/Admin/TimeTable/EditTimeTable";
import AmountDetails from "./component/Admin/AmountDetails";
import CreateParent from "./component/Admin/Parent/CreateParent";
import { Toaster } from "react-hot-toast";
import ParentLogin from "./component/Login/ParentLogin";
import ParentDashBoard from "./component/Admin/Parent/ParentDashBoard";
import ServerError from "./component/ServerError";
import ForgetPassword from "./component/forgetPassword/ForgetPassword";
import AdminHome from "./component/AdminHome";
import TeacherHome from "./component/Teacher/TeacherHome";
// import ViewAllStudent from "./component/Admin/ViewAllStudent";
function App() {
  return (
    <div>
      <BrowserRouter>
      <Header />
      <Toaster position="top-center" reverseOrder={false} />
      
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/choosetheuser" element={<ChooseTheUser/>}/>
          {/*Login's routers */}
          <Route path="/login/admin" element={<AdminLogin/>} />
          <Route path="/login/teachers" element={ <TeacherLogin /> } />
          <Route path="/login/student" element={<StudentLogin />} />
          <Route path="/login/parent" element={<ParentLogin/>} />
          {/*Admin routers */}
          <Route path="/admin/dashboard" element={ <AdminHome/>} />
          <Route path="/admin/dashboard/create/teacher" element={<CreateTeacher />} />
          <Route path="/admin/dashboard/create/student" element={<CreateStudent />} /> 
          <Route path="/admin/dashboard/create/admin" element={<CreateAdmin />} /> 
          <Route path="/admin/dashboard/create/parent" element={<CreateParent/>} />
          <Route path="/admin/dashboard/view/details/:category" element={<ViewDetails/>} />
          <Route path="/admin/amount/details" element={<AmountDetails/>} />
          <Route path="/admin/all-details" element={<AdminDashBoard/>}/>
          {/* <Route path="/admin/dashboard/view/all/details/in/student" element={<ViewAllStudent />} /> */}
          <Route path="/admin/dashboard/view/details/oneclass/:standard/:section/:category" element={ <ViewOneClass />} />
          <Route path="/admin/dashboard/view/details/oneStudent/:studentId/:category" element={ <OneStudent/>} />
          <Route path="/admin/dashboard/view/details/oneStudent/delete/by/studentid/:studentId" element={<DeleteStudent/>} />
          <Route path="/admin/dashboard/view/details/oneStudent/edit/by/studentid/:studentId" element={<EditStudent/>} />
          {/* teachers */}
          <Route path="/admin/dashboard/view/details/oneteacher/:teacherId" element={ <OneTeacher />} />
          <Route path="/admin/dashboard/view/details/oneteacher/delete/by/studentid/:teacherId" element={ <DeleteTeacher />} />
          <Route path="/admin/dashboard/view/details/oneteacher/edit/by/studentid/:teacherId" element={ <EditTeacher />} />
          {/* time-table */}
          <Route path="/admin/dashboard/create/time-table" element={<CreateTimeTable/>}/>
          <Route path="/admin/dashboard/view/details/time-table" element={<ViewAllTimeTable/>} />
          <Route path="/admin/view/oneclass/time-table/:standard/:section" element={<OneClassTimeTable/>} />
          <Route path="/admin/delete/time-table/:id/:section/:standard" element={<DeleteTimeTable/>} />
          <Route path="/admin/edit/time-table/:id/:section/:standard" element={<EditTimeTable/>} />

          {/* teacher  */}
          <Route path="/dashBoard" element={<TeacherHome/>}/>
          <Route path="/teacher/:from" element={ <DashBoard />} />
          <Route path="/teacher/view/class/:standard/:section/:category" element={<ViewOneClass/> } />
          <Route path="/teacher/view/details/oneStudent/:studentId/:category" element={ <OneStudent/>} />
          <Route path="/teacher/view/class/mark-attendance/:standard/:section/:teacherId" element={<Attendance/> } />
          <Route path="/teacher/view/class/add-marks/:standard/:section/:teacherId" element={<AddMarkes/> } />
          <Route path="/teacher/profile/:teacherId" element={<TeacherProfile/>} />
          <Route path="/teacher/profile/:teacherId/edit" element={<EditProfile/>} />
          {/* student */}
          <Route path="/student/dashboard" element={<StudentDashBoard/>} />
          <Route path="/student/profile/:id/:from" element={<StudentProfile/>} />
          <Route path="/student/mark-home/:id/:from" element={<MarkHome/>} />
          <Route path="/student/attandance/:id/:standard/:section/:from" element={<StudentAttendance />} />
          <Route path="/student/mark/:id/:examType/:from" element={<Result/>} />
          <Route path="/student/time-table/:standard/:section/:from" element={<TimeTableInStudent/>}/>

          {/* parent */}
          <Route path="/parent/dashBoard" element={<ParentDashBoard/>} />
          {/* error */}
          <Route path="/error/404-on/fetching/data" element={<ServerError/>}/>
          {/* forget password */}
          <Route path="/forget/password/:from" element={<ForgetPassword/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
