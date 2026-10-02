import ImageWorkspace from "./components/ImageWorkspace";

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
      <ImageWorkspace />
    </section>
  );
}

export default App;
