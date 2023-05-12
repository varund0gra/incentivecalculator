import { Output , HomePage,DashBoard} from './Components';
import './App.css'
import { BrowserRouter , Route,Routes} from "react-router-dom";
import Dashboard from './Components/Dashboard2.0';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/admin/addperformance' element={<DashBoard/>}/>
      <Route path='/app/dashboard' element={<Dashboard/>}/>
    </Routes>
    </BrowserRouter>

      
  );
}

export default App;
