import Signup from "./Components/Signup/Signup";
import Home from "./Pages/Home";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./Pages/Login";
import { useEffect, useContext } from "react"
import { AuthContext, FirebaseContext } from "./store/fireBaseContext";
import Create from "./Components/Create/Create";
import ViewPost from "./Pages/ViewPost";
import Post from "./store/postContext"
function App() {
  const { user, setUser } = useContext(AuthContext)
  const { firebase } = useContext(FirebaseContext)
  useEffect(() => {
    firebase.auth().onAuthStateChanged((authUser: any) => {
      setUser(authUser)
    })
  }, [user])
  return (
    <div>
      <Post>
        <Router>
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Create />} path="/create" />
            <Route element={user ? <Navigate to="/" /> : <Signup />} path="/signup" />
            <Route element={user ? <Navigate to="/" /> : <LoginPage />} path="/login" />
            <Route element={<ViewPost />} path="/view" />
          </Routes>
        </Router>
      </Post>
    </div>
  )
}

export default App