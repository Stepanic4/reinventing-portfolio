import {useTranslation} from 'react-i18next';
import {PixelSlider} from '../features/PixelSlider/PixelSlider'; // Импортируем его сюда

export const Hero = () => {
    const {t} = useTranslation();

    return (
        <section className="flex flex-col items-center justify-center pt-32 pb-16 px-6">
            {/* Блок с фото */}
            <div className="relative mb-10">
                <div className="absolute inset-0 bg-blue-500/20 blur-[80px] rounded-full"></div>
                <div
                    className="relative w-40 h-40 md:w-52 md:h-52 rounded-[3rem] overflow-hidden border border-white/10 bg-[#0f172a]/40 backdrop-blur-sm">
                    <img src="/avatar.jpg" alt="Me"
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                        onError={(e) => {
                            e.currentTarget.src = "https://ui-avatars.com/api/?name=Dev&background=0f172a&color=fff&size=200";
                        }}/>
                </div>
            </div>

            {/* Текст */}
            <div className="text-center max-w-3xl mb-16">
                <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-white">
                    {t('hero.title')}
                </h1>
                <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
                    {t('hero.description')}
                </p>
            </div>

                <PixelSlider />

        </section>
    );
};