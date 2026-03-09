import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Faq from "@/pages/faq";
import NotFound from "@/pages/not-found";
import logoImg from "@assets/image_1772686996744.png";

function Header() {
  const [location, setLocation] = useLocation();

  return (
    <header className="header" data-testid="header">
      <div className="header-left">
        <img
          src={logoImg}
          alt="Cushman & Wakefield"
          className="header-logo"
          onClick={() => setLocation("/")}
          data-testid="header-logo"
        />
      </div>
      <nav className="header-nav" data-testid="header-nav">
        <button
          className={`nav-btn${location === "/" ? " active" : ""}`}
          onClick={() => setLocation("/")}
          data-testid="nav-wpr"
        >
          WPR
        </button>
        <button
          className={`nav-btn${location === "/faq" ? " active" : ""}`}
          onClick={() => setLocation("/faq")}
          data-testid="nav-faq"
        >
          FAQ
        </button>
      </nav>
    </header>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/faq" component={Faq} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <div className="layout" data-testid="layout-container">
          <Header />
          <Router />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
