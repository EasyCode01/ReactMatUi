import { Container } from "@mui/material";
import Navbar from "./components/Navbar";
import { Routes } from "./config/Routes";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Container maxWidth="xl">
        <Routes />
      </Container>
    </div>
  );
}

export default App;
