import { Outlet, Link } from "react-router-dom";

export default function Layout() {
  return (
    <div className="app">
      <nav>
        <Link to="/">Doctors</Link>
      </nav>
      <main>
        <Outlet /> {/* This renders child routes */}
      </main>
    </div>
  );
}