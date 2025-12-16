import "./App.css";
import FlightsComponent from "flights/Flights";
function App() {
  return (
    <>
      <div>
        <h1>Host Client Application (Shell) </h1>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "cetner",
        }}
      >
        <div
          style={{
            border: "1px solid black",
            height: "80vh",
            width: "50vw",
            overflow: "auto",
          }}
        >
          <FlightsComponent />
        </div>
        <div
          style={{ border: "1px solid black", height: "80vh", width: "50vw" }}
        ></div>
      </div>
    </>
  );
}

export default App;
