import React, { HTMLAttributes } from 'react';

interface ICustomComponentProps extends HTMLAttributes<HTMLDivElement> {
    text?: string;
}

const CustomComponent: React.FC<ICustomComponentProps> = ({ text = 'CustomComponent', className, ...props }) => {
    return (
        <div className={className}
             {...props}
        >
            {text}
        </div>
    );
};

export default CustomComponent;
