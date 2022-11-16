import './App.css';
import Dashboard from './pages/dashboard.js'
import Navbar from './pages/navbar';
import Signup from './pages/Signup';
import Login from './pages/login.js';
import WebcamCapture from './pages/WebcamCapture';

// import Signup from './pages/signup'
function App() {
  let Component
  console.log(window.location.pathname)
  // eslint-disable-next-line default-case
  switch(window.location.pathname){
    case "/":
     Component=<Dashboard/>
     break
    // eslint-disable-next-line no-fallthrough
    case "/signup":
    Component=<Signup />
    break
    // eslint-disable-next-line no-fallthrough
    case "/login":
      // eslint-disable-next-line no-unused-vars
      Component=<Login />
      break
      default:
        Component=<Dashboard/>
        break
      
      
     
  }
  return (
      <div >
        <Dashboard/>
        { <Navbar />}
        <WebcamCapture/>
       {Component} 
    </div>
  );
}

export default App;
