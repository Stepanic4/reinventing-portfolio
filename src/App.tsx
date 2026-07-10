import { useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Footer } from "./components/Footer";
import { Resume } from "./components/Resume";
import { Works } from "./components/Works";
import ScrollToTop from "./components/ScrollToTop.tsx";

function App() {
  const [currentPage, setCurrentPage] = useState("main");

  return (
                   <div className="flex flex-col min-h-screen transition-colors duration-500 dark:bg-[#020617]  selection:bg-blue-500/30">
      <ScrollToTop currentPage={currentPage} />
          <div className="print:hidden">
        <Header currentPage={currentPage} setPage={setCurrentPage} />
      </div>

      <main className="relative pt-20 grow">
        {currentPage === "main" && (
          <div className="flex flex-col items-center">
            <Hero />
           </div>
        )}

        {currentPage === "works" && (
          <div className="flex justify-center">
            <Works />
          </div>
        )}

        {currentPage === "resume" && (
          <div className="flex justify-center pt-10">
            {currentPage === "resume" && <Resume />}
          </div>
        )}
      </main>
      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}

export default App;
