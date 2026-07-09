import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { Home, Radio, Scissors, Share2, User } from "lucide-react";
import Header from "./components/Header";
import HomePage from "./pages/Home";
import StudioPage from "./pages/Studio";
import EditorPage from "./pages/Editor";
import SocialPage from "./pages/Social";
import AccountPage from "./pages/Account";

const NAV = [
  { to: "/",        icon: Home,     label: "Home"   },
  { to: "/studio",  icon: Radio,    label: "Studio" },
  { to: "/editor",  icon: Scissors, label: "Editor" },
  { to: "/social",  icon: Share2,   label: "Social" },
  { to: "/account", icon: User,     label: "Account"},
];

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen" style={{ backgroundColor: "#0D0D14" }}>
        <Header />

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar — desktop */}
          <nav
            className="hidden md:flex flex-col w-52 py-5 gap-1 px-3 shrink-0"
            style={{
              backgroundColor: "#13131E",
              borderRight: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {NAV.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? "text-white"
                      : "text-white/40 hover:text-white/70 hover:bg-white/5"
                  }`
                }
                style={({ isActive }) =>
                  isActive
                    ? {
                        background: "linear-gradient(135deg, rgba(0,212,133,0.18) 0%, rgba(0,212,133,0.06) 100%)",
                        border: "1px solid rgba(0,212,133,0.22)",
                        color: "#00D485",
                      }
                    : {}
                }
              >
                <Icon size={17} />
                {label}
              </NavLink>
            ))}

            {/* Version tag at bottom */}
            <div className="mt-auto pt-4">
              <p className="text-white/20 text-xs text-center font-medium tracking-widest">
                CLC v1.0
              </p>
            </div>
          </nav>

          {/* Main content */}
          <main className="flex-1 overflow-y-auto" style={{ backgroundColor: "#0D0D14" }}>
            <Routes>
              <Route path="/"        element={<HomePage />} />
              <Route path="/studio"  element={<StudioPage />} />
              <Route path="/editor"  element={<EditorPage />} />
              <Route path="/social"  element={<SocialPage />} />
              <Route path="/account" element={<AccountPage />} />
            </Routes>
          </main>
        </div>

        {/* Bottom nav — mobile */}
        <nav
          className="md:hidden flex shrink-0"
          style={{
            backgroundColor: "#13131E",
            borderTop: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {NAV.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `flex-1 flex flex-col items-center py-2.5 gap-0.5 text-xs font-semibold transition-all ${
                  isActive ? "text-jade-500" : "text-white/35"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={20} className={isActive ? "text-jade-500" : "text-white/35"} />
                  <span className="mt-0.5 text-[10px]">{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </BrowserRouter>
  );
}
