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
// import ViewAllStudent from "./component/Admin/ViewAllStudent";
function App() {
  return (
    <div>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/choosetheuser" element={<ChooseTheUser/>}/>
          {/*Login's routers */}
          <Route path="/login/admin" element={<AdminLogin/>} />
          <Route path="/login/teachers" element={ <TeacherLogin /> } />
          <Route path="/login/students" element={<StudentLogin />} />
          {/*Admin routers */}
          <Route path="/admin/dashboard" element={ <AdminDashBoard />} />
          <Route path="/admin/dashboard/create/teacher" element={<CreateTeacher />} />
          <Route path="/admin/dashboard/create/student" element={<CreateStudent />} /> 
          <Route path="/admin/dashboard/view/details/:category" element={<ViewDetails/>} />
          {/* <Route path="/admin/dashboard/view/all/details/in/student" element={<ViewAllStudent />} /> */}
          <Route path="/admin/dashboard/view/details/oneclass/:standard/:section" element={ <ViewOneClass />} />
          <Route path="/admin/dashboard/view/details/oneStudent/:studentId" element={ <OneStudent/>} />
          <Route path="/admin/dashboard/view/details/oneStudent/delete/by/studentid/:studentId" element={<DeleteStudent/>} />
          <Route path="/admin/dashboard/view/details/oneStudent/edit/by/studentid/:studentId" element={<EditStudent/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
