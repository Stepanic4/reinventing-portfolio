export interface Project {
    id: number;
    title: string;
    img: string;
    desc: string;
    link: string;
}

export const projectsData: Project[] = [
    {
        id: 1,
        title: 'projects.p1_t',
        img: '/avatar.jpg',
        desc: 'projects.p1_d',
        link: '#'
    },
    {
        id: 2,
        title: 'projects.p2_t',
        img: '/avatar.jpg',
        desc: 'projects.p2_d',
        link: '#'
    },
    {
        id: 3,
        title: 'projects.p3_t',
        img: '/avatar.jpg',
        desc: 'projects.p3_d',
        link: '#'
    },
    {
        id: 4,
        title: 'projects.p4_t',
        img: '/avatar.jpg',
        desc: 'projects.p4_d',
        link: '#'
    }
];