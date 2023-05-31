import { AddedUsers, AddUserStats, CreateUsers,LoginAdmin, UserLogin} from "./Components";
import DashBoardContent from "./Components/UserSide/Dashboard";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginAdmin />} />
        <Route path="/admin/createuser" element={<CreateUsers />} />
        <Route path="/admin/userlist" element={<AddedUsers />} />
        <Route path="/admin/addstats" element={<AddUserStats />} />
        <Route path="/app/signin" element={<UserLogin />} />
        <Route path='/app/dashboard' element={<DashBoardContent/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
