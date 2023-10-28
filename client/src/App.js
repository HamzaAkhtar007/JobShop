
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './pages/Home.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';

import Notfound from './pages/Notfound.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoutes from './components/Routes/PrivateRoutes';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import AdminDashboard from './pages/AdminDashboard';
import Users from './pages/Users';
import Companies from './pages/Companies';
import Jobs from './pages/Jobs.js';
import Adminjob from './pages/Adminjob';
import AdminCompany from './pages/AdminCompany';
import BrowserJobs from './pages/BrowserJobs';
import Searchpage from './pages/Searchpage';
function App() {
  let { user } = useSelector((state) => state.presistedReducer.auth);


  if (user === null) {
    return (
      <div >
        <ToastContainer />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Register' element={<Register />} />
          <Route path="/browsejobs/:id" element={<BrowserJobs />} />
          <Route path='*' element={<Navigate to="/Login" />} />
          <Route path="/searchresult" element={<Searchpage />} />



        </Routes>
      </div >
    );
  }
  else if (user.userType === 'Employer') {

    return (<div > <ToastContainer />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/Login' element={<Login />} />

        <Route path='/dashboard' element={<PrivateRoutes> <AdminDashboard /></PrivateRoutes>} />

        <Route path='/companies' element={<PrivateRoutes> <Companies /></PrivateRoutes>} />
        <Route path='/jobs' element={<PrivateRoutes> <Jobs /></PrivateRoutes>} />
        <Route path='/addjob' element={<PrivateRoutes> <Adminjob /></PrivateRoutes>} />
        <Route path='/addcompany' element={<PrivateRoutes> <AdminCompany /></PrivateRoutes>} />
        <Route path="/browsejobs/:id" element={<BrowserJobs />} />
        <Route path="/searchresult" element={<Searchpage />} />
      </Routes></div>);


  }
  else {
    return (<div > <ToastContainer />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/Login' element={<Login />} />

        <Route path='/dashboard' element={<PrivateRoutes> <AdminDashboard /></PrivateRoutes>} />
        <Route path='/user' element={<PrivateRoutes> <Users /></PrivateRoutes>} />
        <Route path='/companies' element={<PrivateRoutes> <Companies /></PrivateRoutes>} />
        <Route path='/jobs' element={<PrivateRoutes> <Jobs /></PrivateRoutes>} />
        <Route path='/addjob' element={<PrivateRoutes> <Adminjob /></PrivateRoutes>} />
        <Route path='/addcompany' element={<PrivateRoutes> <AdminCompany /></PrivateRoutes>} />
        <Route path="/browsejobs/:id" element={<BrowserJobs />} />
        <Route path="/searchresult" element={<Searchpage />} />
      </Routes></div>);

  }
}




export default App;
