import {useState} from 'react';
import {Header} from './components/Header';
import {Hero} from './components/Hero';
import {Footer} from "./components/Footer.tsx";

function App() {
       const [currentPage, setCurrentPage] = useState('main');

     return (
         <div className="flex flex-col min-h-screen transition-colors duration-500 bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-slate-200 selection:bg-blue-500/30">

            <Header currentPage={currentPage} setPage={setCurrentPage}/>

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

                {currentPage === 'cv' && (
                    <div className="flex justify-center pt-40">
                        <h2 className="text-3xl font-bold">Резюме (Coming Soon)</h2>
                    </div>
                )}
            </main>

            <Footer/>
        </div>
    );
}

export default App;