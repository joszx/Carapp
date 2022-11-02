import "./App.css";
import "bulma/css/bulma.min.css";
import ContactList from "./components/ContactList";

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-half">
            <h1 className="title has-text-white">My Contact List</h1>
            <ContactList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
