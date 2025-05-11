import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Search from "./pages/Search";
import Game from "./pages/Game";
import Profile from "./pages/Profile";
import GameList from "./pages/GameList";
import AppLayout from "./ui/AppLayout";
import Results from "./pages/Results";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Navigate replace to="search" />} />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<Login />} />
            <Route path="/results" element={<Results />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/list/:id" element={<GameList />} />
            <Route path="/game/:id" element={<Game />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
