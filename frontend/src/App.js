import "./App.css";
import "bulma/css/bulma.min.css";
import ContactList from "./components/ContactList";
import NextHoliday from "./components/NextHoliday";

function App() {
  return (
    <div className="App">
      <div className="container">
        <NextHoliday></NextHoliday>
        <div className="columns is-centered">
          <div className="column is-half">
            <h1 className="title has-text-white mt-3">My Contact List</h1>
            <ContactList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
