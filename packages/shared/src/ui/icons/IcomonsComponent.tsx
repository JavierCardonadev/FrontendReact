import React from "react";
import IcomoonReact from "icomoon-react";
import iconSet from "./selection.json";

interface IcomonsProps {
    icon: string;
    size?: number;
    color?: string;
    className?: string;
    onClick?: () => void;
}

const Icomons: React.FC<IcomonsProps> = ({ icon, size = 24, color = "black", className = "", onClick }) => {
    return (
        <IcomoonReact
            iconSet={iconSet}
            icon={icon}
            size={size}
            color={color}
            className={className}
            onClick={onClick}
        />
    );
};

export default Icomons;