import logo from './logo.svg';
import './App.css';
import {Route,BrowserRouter as Router} from 'react-router-dom'
import AddNotes from './Components/addNotes';
import GetNotes from './Components/getNotes';
import Update from './Components/update';

function App() {
  return (
    <div className="App">
      <Router>
      <Route exact path="/" component={AddNotes}/>
      <Route exact path="/getnotes" component={GetNotes}/>
      <Route exact path="/update" component={Update}/>
      </Router>
     
    </div>
  );
}

export default App;
