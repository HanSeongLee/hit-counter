import React from 'react';
import { generateShieldsBadge } from '@/lib/badge';

interface Props {
    label: string;
    message: string;
    color: string;
    borderStyle?: 'square' | 'round' | 'none';
    labelBg?: string;
    labelColor?: string;
    messageColor?: string;
}

const ShieldsBadge: React.FC<Props> = ({
                                           label,
                                           message,
                                           color,
                                           borderStyle = 'round',
                                           labelBg = '#555',
                                           labelColor = '#FFFFFF',
                                           messageColor = '#FFFFFF',
                                       }) => {
    const svgString = generateShieldsBadge(
        label,
        message,
        color,
        borderStyle,
        labelBg,
        undefined,
        labelColor,
        messageColor
    );

    return (
        <div
            dangerouslySetInnerHTML={{ __html: svgString }}
            style={{ display: 'inline-block' }}
        />
    );
};

export default ShieldsBadge;
