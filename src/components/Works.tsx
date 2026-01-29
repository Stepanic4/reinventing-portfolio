import { useTranslation } from 'react-i18next';
import { GlassCard } from '../features/GlassShatter/GlassCard.tsx';
import { projectsData } from '../data/Projects';

export const Works = () => {
    const { t } = useTranslation();

    return (
        <section className="w-full max-w-6xl mx-auto px-6 py-20">
            <h2 className="text-4xl font-black mb-12 dark:text-white uppercase tracking-tighter">
                {t('nav.works')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
                {projectsData.map((project) => (
                    <GlassCard
                        key={project.id}
                        imageSrc={project.img}
                        title={t(project.title)}
                        description={t(project.desc)}
                        link={project.link}
                    />
                ))}
            </div>
        </section>
    );
};