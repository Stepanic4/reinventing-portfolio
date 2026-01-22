import {useState} from 'react';
import {Header} from './components/Header';
import {Hero} from './components/Hero';
import {Footer} from "./components/Footer.tsx";
import {Resume} from "./components/Resume.tsx";

function App() {
       const [currentPage, setCurrentPage] = useState('main');

     return (
         <div className="flex flex-col min-h-screen transition-colors duration-500 dark:bg-[#020617]  selection:bg-blue-500/30">

              <div className="print:hidden">
                 <Header currentPage={currentPage} setPage={setCurrentPage}/>
             </div>

            {/* Добавляем flex-grow. Этот блок растянется и вытолкнет футер вниз */}
            <main className="relative pt-20 flex-grow">
                {/* Главная страница */}
                {currentPage === 'main' && (
                    <div className="flex flex-col items-center">
                        <Hero/>
                    </div>
                )}

                {/* Заглушки для других страниц */}
                {currentPage === 'works' && (
                    <div className="flex justify-center pt-40">
                        <h2 className="text-3xl font-bold">Мои работы (Coming Soon)</h2>
                    </div>
                )}

                {currentPage === 'resume' && (
                    <div className="flex justify-center pt-40">
                        {currentPage === 'resume' && <Resume />}
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