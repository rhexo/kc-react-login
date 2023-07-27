import logo from './logo.svg';
import './App.css';

// import { useKeycloak } from '@react-keycloak/web';
import keycloak from "./keycloak";
import Login from './Login';

function App() {

  // const { keycloak, initialized } = useKeycloak();

  // if (!initialized) {
  //   return <div>Loading...</div>;
  // }

  if (!keycloak.authenticated) {
    return <Login />;
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
