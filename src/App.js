import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage } from "./pages/login/login.page";
import { RegisterPage } from "./pages/register/register.page";
import './App.css';



function App() {
  return (
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
