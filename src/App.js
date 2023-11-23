import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Navbar from './components/navbar'
import TasksList from './components/tasksList.js'
import EditTask from './components/editTask.js'
import CreateTask from './components/createTask.js'
import CreateUser from './components/createUser.js'
// import Docs from './components/personalDocs/docs.js'

function App() {
  return (
    <Router>
      <Navbar/>
      <div className="container">
        <Routes>
          <Route path='/' element={<TasksList/>}/>
          <Route path='/edit/:id' element={<EditTask/>}/>
          <Route path='/create' element={<CreateTask/>}/>
          <Route path='/user' element={<CreateUser/>}/>
          {/* <Route path='/docs' element={DirList}/> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
