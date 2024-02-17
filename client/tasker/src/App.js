import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SuperAdminLogin from './pages/superAdminLogin/SuperAdminLogin';
import Login from './pages/login/Login';
import AdminDashboard from './pages/adminDashboard/AdminDashboard';
import SuperAdminWrapper from './wrapper/superAdminWrapper';
import SAloginWrapper from './wrapper/SAloginWrapper';
import Adduser from './components/Adduser/Adduser';
import Tasker from './components/tasker/Tasker';
import LoginWrapper from './wrapper/loginWrapper';
import UserHome from './pages/userHome/userHome';
import UserWrapper from './wrapper/userWrapper';
import UserTask from './components/userTask/UserTask';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<LoginWrapper />}>
          <Route path="/" element={<Login />} />
          </Route>


          <Route path="/" element={<UserWrapper />}>
             <Route path="home" element={<UserHome />} /> 
             <Route path="task" element={<UserTask />} />   

          </Route>


          <Route path="/superadmin" element={<SAloginWrapper />}>
          <Route index element={<SuperAdminLogin />} />
          </Route>

          <Route path="/superadmin/" element={<SuperAdminWrapper />}>
             <Route path="dashboard" element={<AdminDashboard />} />   
             <Route path="adduser" element={<Adduser />} />
             <Route path="tasker" element={<Tasker />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
