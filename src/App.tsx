import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Education from "./components/Education";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

/**
 * The main app for Dylan Reid's personal website.
 */
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="body">
          <Routes>
            {/* home */}
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />

            {/* education */}
            <Route path="/education">
              <Route index element={<Navigate to="/education/uni" replace />} />
              <Route path="uni" element={<Education />} />
              <Route path="highschool" element={<Education />} />
            </Route>

            {/* skills */}
            <Route path="/skills" element={<Navigate to="/skills/languages" replace />} />
            <Route path="/skills/:category" element={<Skills />} />
            <Route path="/skills/:category/:detail" element={<Skills />} />

            {/* experience */}
            <Route
              path="/experience"
              element={<Navigate to="/experience/teaching_assistant" replace />}
            />
            <Route path="/experience/:category" element={<Experience />} />
            <Route path="/experience/:category/:detail" element={<Experience />} />

            {/* legacy nested redirects */}
            <Route path="/skills/skills" element={<Navigate to="/skills" replace />} />
            <Route
              path="/skills/skills/:category"
              element={<Navigate to="/skills" replace />}
            />
            <Route
              path="/skills/skills/:category/:detail"
              element={<Navigate to="/skills" replace />}
            />
            <Route
              path="/skills/experience"
              element={<Navigate to="/experience" replace />}
            />
            <Route
              path="/skills/experience/:category"
              element={<Navigate to="/experience" replace />}
            />
            <Route
              path="/skills/experience/:category/:detail"
              element={<Navigate to="/experience" replace />}
            />

            {/* contact */}
            <Route path="/contact" element={<Contact />} />

            {/* Not found */}
            <Route
              path="*"
              element={
                <div>
                  <h3 className="sectionHeading">Page not found</h3>
                  <div className="sectionBlock">
                    <p>
                      The page you're looking for does not exist. Please
                      navigate
                      using the navigation bar at the top of the page.
                    </p>
                  </div>
                </div>
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
