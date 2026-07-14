import { HashRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import TrackDetail from "./pages/TrackDetail.jsx";
import Register from "./pages/Register.jsx";
import Venue from "./pages/Venue.jsx";

// HashRouter (not BrowserRouter) is used deliberately: it produces URLs like
// yoursite.com/#/tracks/STRM-SYS. That means every route just works on plain
// static hosting (GitHub Pages, S3, etc.) with zero server rewrite config,
// including hard refreshes on a deep link. BrowserRouter would need a
// 404.html fallback trick on GitHub Pages to avoid "File not found" on refresh.
export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-ink text-[#DCE7E2] font-body">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tracks/:code" element={<TrackDetail />} />
          <Route path="/register" element={<Register />} />
          <Route path="/venue" element={<Venue />} />
        </Routes>
        <Footer />
      </div>
    </HashRouter>
  );
}
