import SignUp from "./SignUp";
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthProvider';
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes> 
          <Route exact path="/" element={<PrivateRoute><Dashboard/></PrivateRoute>} />
          <Route path="/update-profile" element={<PrivateRoute><UpdateProfile/></PrivateRoute>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
        </Routes>
      </AuthProvider>
    </Router>

  )

}

export default App;
