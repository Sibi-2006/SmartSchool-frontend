import { BrowserRouter , Routes , Route } from "react-router-dom"
import Home from "./component/Home";
import Header from "./component/Header";
import ChooseTheUser from "./component/ChooseTheUser";
import AdminLogin from "./component/Login/AdminLogin";
import TeacherLogin from "./component/Login/TeacherLogin";
import StudentLogin from "./component/Login/StudentLogin";
import AdminDashBoard from "./component/Admin/AdminDashBoard"
import CreateTeacher from "./component/Admin/CreateTeacher";
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
