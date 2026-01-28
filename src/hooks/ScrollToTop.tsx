import { useEffect } from "react";

interface ScrollToTopProps {
    currentPage: string;
}

export default function ScrollToTop({ currentPage }: ScrollToTopProps): null {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPage]);

    return null;
}