import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Dashboard from './Dashboard/dashboard.tsx';
import Reservation from './reservation/reservation.tsx';
import Header from './Header/header.tsx';
import UseCallBack from './Components/UseCallBack';
import UseMemo from './Components/UseMemo.tsx';
import ChatbotFlowBuilder from './Components/chatBotFlowBuilder'
import "./reservation/style.scss"
function App() {
  return (
    <div className="App">
      <Header/>
      <BrowserRouter>
        <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="reservation" element={<Reservation />} />
            <Route path="useCallBack" element={<UseCallBack />} />
            <Route path="useMemo" element={<UseMemo />} />
            <Route path="ChatBotFlowBuilder" element={<ChatbotFlowBuilder />} />
            <Route exact path="/" element={<Navigate to="/dashboard" />}/>
            <Route path="*" element={<Navigate to="/dashboard" />}/>
        </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
