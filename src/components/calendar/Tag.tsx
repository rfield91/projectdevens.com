import classNames from "classnames";
import type { ReactNode } from "react";

export interface TagProps {
    eventType: string;
    color: string;
    children: ReactNode;
    enabled: boolean;
    onClick: (key: string, isEnabled: boolean) => void;
}

const Tag = ({ eventType, color, enabled, children, onClick }: TagProps) => {
    const c = classNames(
        `m-1 cursor-pointer select-none rounded-full border-2 border-solid p-2 text-center text-xs`,
        enabled
            ? `text-white border-${color}-500 bg-${color}-500`
            : `text-black border-${color}-300 bg-slate-100`
    );

    return (
        <span
            className={c}
            onClick={() => onClick(eventType, !enabled)}
            role="checkbox"
            aria-checked={enabled}
        >
            {children}
        </span>
    );
};

export default Tag;
