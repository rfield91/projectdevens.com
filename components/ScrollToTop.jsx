import { useEffect, useState } from "react";

const ScrollToTop = () => {
    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        setVisible(document.documentElement.scrollTop > 300);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisible);
    });

    return (
        <button
            className={`fixed bottom-2 bg-blue-600 text-white rounded-3xl p-1 mx-auto inset-x-0 w-8 text-center ${
                visible ? "" : "hidden"
            }`}
            onClick={scrollToTop}
        >
            &uarr;
        </button>
    );
};

export default ScrollToTop;
