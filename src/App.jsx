import { getDatabase, ref, onValue } from "firebase/database";
import { Route, Routes } from "react-router-dom"
import Login from './Login.jsx'

function App() {
  return (
    <>
      <Routes>
      <Route path = "/DECA-web-project" element ={<Login/>}/>
      <Route  path = "/DECA-web-project/Home" element ={<Login/>}>
        <Route path = "Learn" element = {<Login/>}/>
        <Route path = "Teach" element = {<Login/>}/>
        <Route path = "Dashboard" element = {<Login/>}/>
      </Route>
      </Routes>
    </>
  )
}

export default App
