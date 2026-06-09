import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { Home, Radio, Scissors, Music, Share2, Palette, User } from "lucide-react";
import Header from "./components/Header";
import HomePage from "./pages/Home";
import StudioPage from "./pages/Studio";
import EditorPage from "./pages/Editor";
import MusicPage from "./pages/Music";
import SocialPage from "./pages/Social";
import SkinsPage from "./pages/Skins";
import AccountPage from "./pages/Account";

const NAV = [
  { to: "/",       icon: Home,     label: "Home"    },
  { to: "/studio", icon: Radio,    label: "Studio"  },
  { to: "/editor", icon: Scissors, label: "Editor"  },
  { to: "/music",  icon: Music,    label: "Music"   },
  { to: "/social", icon: Share2,   label: "Social"  },
  { to: "/skins",  icon: Palette,  label: "Skins"   },
  { to: "/account",icon: User,     label: "Account" },
];

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen bg-jade-50 relative">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar — desktop */}
          <nav className="hidden md:flex flex-col w-48 bg-white border-r border-jade-100 py-4 gap-1 px-2 shrink-0">
            {NAV.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-jade-500 text-white shadow"
                      : "text-gray-500 hover:bg-jade-50 hover:text-jade-700"
                  }`
                }
              >
                <Icon size={18} />
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Main content */}
          <main className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/"        element={<HomePage />} />
              <Route path="/studio"  element={<StudioPage />} />
              <Route path="/editor"  element={<EditorPage />} />
              <Route path="/music"   element={<MusicPage />} />
              <Route path="/social"  element={<SocialPage />} />
              <Route path="/skins"   element={<SkinsPage />} />
              <Route path="/account" element={<AccountPage />} />
            </Routes>
          </main>
        </div>

        {/* Bottom nav — mobile */}
        <nav className="md:hidden flex border-t border-jade-100 bg-white">
          {NAV.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `flex-1 flex flex-col items-center py-2 text-xs font-semibold transition-all ${
                  isActive ? "text-jade-600" : "text-gray-400"
                }`
              }
            >
              <Icon size={20} />
              <span className="mt-0.5">{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </BrowserRouter>
  );
}
