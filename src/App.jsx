import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Search from "./pages/Search";
import Game from "./pages/Game";
import Profile from "./pages/Profile";
import GameList from "./pages/GameList";
import AppLayout from "./ui/AppLayout";
import Results from "./pages/Results";
import Login from "./pages/Login";
import Home from "./pages/Home"
import Register from "./pages/Register";
import RequireAuth from "./auth/RequireAuth";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                  <Home />
              }
            />
            <Route
              path="/search"
              element={
                <RequireAuth>
                  <Search />
                </RequireAuth>
              }
            />
            <Route
              path="/results"
              element={
                <RequireAuth>
                  <Results />
                </RequireAuth>
              }
            />
            <Route
              path="/profile"
              element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              }
            />
            <Route
              path="/list/:id"
              element={
                <RequireAuth>
                  <GameList />
                </RequireAuth>
              }
            />
            <Route
              path="/game/:id"
              element={
                <RequireAuth>
                  <Game />
                </RequireAuth>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
