import classNames from 'classnames';
import { ReactNode } from 'react';

export interface TagProps {
    color: string;
    children: ReactNode;
    enabled: boolean;
    onClick: (enabled: boolean) => void;
}

const Tag = ({ color, enabled, children, onClick }: TagProps) => {
    const handleClock = () => {
        onClick?.(!enabled);
    };

    return (
        <span
            className={classNames(
                `select-none rounded-full cursor-pointer text-xs p-2 text-center text-white m-1 border-solid border-2`,
                enabled
                    ? `text-white border-${color}-500 bg-${color}-500`
                    : `text-black border-${color}-300 bg-slate-100`
            )}
            onClick={handleClock}
            role="checkbox"
        >
            {children}
        </span>
    );
};

export default Tag;
