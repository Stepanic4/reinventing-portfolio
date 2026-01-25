import { useTranslation } from 'react-i18next';
import { GlassCard } from './GlassCard';

export const Works = () => {
    const { t } = useTranslation();

    // ВАЖНО: Используй /avatar.jpg (он у тебя в папке public)
    const projects = [
        { id: 1, title: 'My Identity', img: '/avatar.jpg' },
        { id: 2, title: 'Creative Work', img: '/avatar.jpg' },
        { id: 3, title: 'UI/UX Design', img: '/avatar.jpg' },
    ];

    return (
        <section className="w-full max-w-6xl mx-auto px-6 py-20">
            <h2 className="text-4xl font-black mb-12 dark:text-white uppercase tracking-tighter">
                {t('nav.works')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                    <GlassCard
                        key={project.id}
                        imageSrc={project.img}
                        title={project.title}
                    />
                ))}
            </div>
        </section>
    );
};