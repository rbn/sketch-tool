import ReferenceImageWorkspace from "./components/ReferenceImageWorkspace";

function App() {
  return (
    <section
      id="center"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Welcome to Sketch Tool!</h1>
      <ReferenceImageWorkspace />
    </section>
  );
}

export default App;
