import { HashRouter, Route, Routes } from 'react-router-dom';
import { LoginPage } from "./pages/login/login.page";
import { RegisterPage } from "./pages/register/register.page";
// import { HomePage } from "./pages/home/home.page";
import './App.css';



function App() {
  return (
    <HashRouter >
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
      </Routes>
    </HashRouter>
  );
}

export default App;
