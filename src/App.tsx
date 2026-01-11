import {useState} from 'react';
import {Header} from './components/Header';
import {Hero} from './components/Hero';
import {Footer} from "./components/Footer.tsx";

function App() {
       const [currentPage, setCurrentPage] = useState('main');

    return (
        /* Добавляем flex flex-col и min-h-screen, чтобы всё приложение занимало минимум всю высоту экрана */
        <div className="flex flex-col min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30">

            {/* Фоновые градиенты */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full"></div>
                <div
                    className="absolute top-[20%] -right-[10%] w-[30%] h-[50%] bg-indigo-900/10 blur-[120px] rounded-full"></div>
            </div>

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