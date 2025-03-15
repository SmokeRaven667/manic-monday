import logo from './logo.svg';
import './App.css';
import MondayApiCall from './components/mondayBoards';
import diagram from './assets/manic-monday.drawio'

function App() {
  
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
      <body>
        <img src={diagram} alt="diagram" />
<MondayApiCall />
      </body>
    </div>
  );
}

export default App;
