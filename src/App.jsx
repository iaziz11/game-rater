import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Search from "./pages/Search";
import Game from "./pages/Game";
import Profile from "./pages/Profile";
import GameList from "./pages/GameList";
import AppLayout from "./ui/AppLayout";
import Results from "./pages/Results";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate replace to="search" />} />
          <Route path="search" element={<Search />} />
          <Route path="results" element={<Results />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/list" element={<GameList />} />
          <Route path="/game/:id" element={<Game />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
