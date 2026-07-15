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
      <div className="flex flex-col h-screen overflow-hidden" style={{ background: "#080812" }}>

        {/* ── Aurora background blobs ── */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
          <div
            className="aurora-blob-1 absolute rounded-full"
            style={{
              width: 700, height: 700,
              top: -200, left: -200,
              background: "radial-gradient(circle, rgba(0,212,133,0.09) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          <div
            className="aurora-blob-2 absolute rounded-full"
            style={{
              width: 600, height: 600,
              bottom: -100, right: -100,
              background: "radial-gradient(circle, rgba(124,92,246,0.09) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          <div
            className="aurora-blob-3 absolute rounded-full"
            style={{
              width: 400, height: 400,
              top: "40%", left: "50%",
              background: "radial-gradient(circle, rgba(255,107,157,0.06) 0%, transparent 70%)",
              filter: "blur(30px)",
            }}
          />
          {/* Subtle dot grid */}
          <div className="absolute inset-0 grid-dots opacity-40" />
        </div>

        {/* ── Content shell ── */}
        <div className="relative flex flex-col h-full" style={{ zIndex: 1 }}>
          <Header />

          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar — desktop */}
            <nav
              className="hidden md:flex flex-col w-56 py-6 gap-1 px-3 shrink-0"
              style={{
                background: "rgba(8,8,18,0.85)",
                backdropFilter: "blur(20px)",
                borderRight: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {NAV.map(({ to, icon: Icon, label }, i) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === "/"}
                  className="relative flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all"
                  style={({ isActive }) => isActive
                    ? {
                        background: "linear-gradient(135deg, rgba(0,212,133,0.15) 0%, rgba(0,212,133,0.05) 100%)",
                        border: "1px solid rgba(0,212,133,0.3)",
                        color: "#00D485",
                        boxShadow: "0 0 20px rgba(0,212,133,0.12), inset 0 1px 0 rgba(0,212,133,0.1)",
                      }
                    : {
                        border: "1px solid transparent",
                        color: "rgba(255,255,255,0.35)",
                      }
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <div
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-full"
                          style={{ height: 24, background: "#00D485", boxShadow: "0 0 8px #00D485" }}
                        />
                      )}
                      <Icon size={17} />
                      <span>{label}</span>
                      {isActive && (
                        <div
                          className="ml-auto w-1.5 h-1.5 rounded-full"
                          style={{ background: "#00D485", boxShadow: "0 0 6px #00D485" }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}

              <div className="mt-auto pt-4 px-3">
                <div
                  className="text-center py-2 rounded-xl"
                  style={{ background: "rgba(0,212,133,0.05)", border: "1px solid rgba(0,212,133,0.1)" }}
                >
                  <p className="text-xs font-bold tracking-widest" style={{ color: "rgba(0,212,133,0.5)" }}>
                    CLC · v1.0
                  </p>
                </div>
              </div>
            </nav>

            {/* Main content */}
            <main className="flex-1 overflow-y-auto" style={{ background: "transparent" }}>
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
            className="md:hidden flex shrink-0 relative"
            style={{
              background: "rgba(8,8,18,0.92)",
              backdropFilter: "blur(20px)",
              borderTop: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {/* Gradient top line */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(0,212,133,0.4), rgba(124,92,246,0.4), transparent)" }}
            />
            {NAV.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className="flex-1 flex flex-col items-center py-3 gap-1 relative"
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <div
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full"
                        style={{ background: "#00D485", boxShadow: "0 0 8px #00D485" }}
                      />
                    )}
                    <Icon
                      size={20}
                      style={{ color: isActive ? "#00D485" : "rgba(255,255,255,0.3)" }}
                    />
                    <span
                      className="text-[10px] font-bold tracking-wide"
                      style={{ color: isActive ? "#00D485" : "rgba(255,255,255,0.3)" }}
                    >
                      {label}
                    </span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </BrowserRouter>
  );
}
