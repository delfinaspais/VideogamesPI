import Landing from './components/Landing/Landing';
import Detail from './components/Detail/Detail';
import Home from './components/Home/Home';
import Form from './components/Form/Form';
import {Route} from "react-router-dom" // useLocation
import './App.css';
// import NavBar from './components/NavBar/NavBar';

function App() {
  // const location = useLocation();

  return (
    <div className="App">
      {/* {location.pathname !== "/" && <NavBar />} */}
      
      <Route exact path="/"> <Landing /> </Route>
      <Route exact path="/home"> <Home /> </Route>   
      <Route path="/home/:id"> <Detail /> </Route>   
      <Route path="/create"> <Form /> </Route>   

    </div>
  );
}

export default App;

// <Route path="/home" render={() => <Home />}>
// <Route path="/home" component={Home} />
