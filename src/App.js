import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom';

// Components
import Navbar from './components/navbar';
import ExerciseList from './components/exerciseList';
import EditExercise from './components/edit-exercise';
import CreateExercise from './components/create-exercise';
import CreateUser from './components/create-user';


function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route path="/" exact component={ExerciseList}/>
        <Route path="/edit/:id" component={EditExercise}/>
        <Route path="/creates" component={CreateExercise}/>
        <Route path="/users" component={CreateUser}/>
      </div>
    </Router>
    
  );
}

export default App;
