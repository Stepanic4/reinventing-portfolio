import {useTranslation} from 'react-i18next';

interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
}

export const Works = () => {
    const {t} = useTranslation();

    const projects: Project[] = [
        {id: 1, title: 'Project 1', description: 'Description 1', image: '/work1.jpg'},
        {id: 2, title: 'Project 2', description: 'Description 2', image: '/work2.jpg'},
        {id: 3, title: 'Project 3', description: 'Description 3', image: '/work3.jpg'},
        {id: 4, title: 'Project 4', description: 'Description 4', image: '/work4.jpg'},
        {id: 5, title: 'Project 5', description: 'Description 5', image: '/work5.jpg'},
        {id: 6, title: 'Project 6', description: 'Description 6', image: '/work6.jpg'},
    ];

    return (
        <section className="w-full max-w-7xl mx-auto px-6 py-10">
            <h2 className="text-4xl font-black mb-12 uppercase tracking-tighter dark:text-white">
                {t('nav.works')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                    <div key={project.id}
                         className="group relative aspect-video bg-slate-200 dark:bg-slate-800 rounded-2xl overflow-hidden border border-white/10 shadow-xl cursor-pointer">

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity"/>

                        <div className="absolute inset-0 flex items-center justify-center">

                            <span className="text-slate-500 font-mono">Image Placeholder</span>
                        </div>

                        <div className="absolute bottom-0 left-0 p-6 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                            <h3 className="text-white font-bold text-xl mb-1 uppercase tracking-wider">
                                {project.title}
                            </h3>
                            <p className="text-slate-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                {project.description}
                            </p>
                        </div>

                        {/* Слой стекла (Glass Crack Layer) */}
                        <div className="glass-crack-overlay absolute inset-0 z-30 pointer-events-none"></div>
                    </div>
                ))}
            </div>
        </section>
    );
};