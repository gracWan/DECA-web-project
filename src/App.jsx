import { getDatabase, ref, onValue } from "firebase/database";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from "react-router-dom"
import Login from './Login.jsx'
import Home from './Home.jsx'
import Register from './Register.jsx'

function App() {
  return (
    <>
      <Routes>
      <Route path = "/DECA-web-project" element ={<Login/>}/>
      <Route path = "/DECA-web-project/Register" element ={<Register/>}/>
      <Route  path = "/DECA-web-project/Home" element ={<Home/>}>
        <Route path = "Learn" element = {<Login/>}/>
        <Route path = "Teach" element = {<Login/>}/>
        <Route path = "Dashboard" element = {<Login/>}/>
      </Route>
      </Routes>
    </>
  )
}

export default App
