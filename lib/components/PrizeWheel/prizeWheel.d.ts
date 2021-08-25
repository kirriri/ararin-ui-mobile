import React from 'react';
/**
 * data属性规范
 */
export interface dataProps {
    title: string;
    img?: string | JSX.Element;
    index?: number;
    bgColor?: string;
    txtColor?: string;
}
export interface BasePrizeWheelProps {
    autoResize?: boolean;
    style?: React.CSSProperties;
    bgImg?: string | JSX.Element;
    bgStyle?: React.CSSProperties;
    arrowImg?: string | JSX.Element;
    arrowStyle?: React.CSSProperties;
    className?: string;
    data: Array<dataProps>;
    width?: number;
    onClick?: () => void;
    successFun?: (award: any) => void;
    fontSize?: number;
}
export interface prizeWheelRefProps {
    reset: () => void;
    setPrize: (awardIndex: number) => void;
}
export declare const PrizeWheel: React.ForwardRefExoticComponent<BasePrizeWheelProps & React.CanvasHTMLAttributes<HTMLCanvasElement> & React.RefAttributes<prizeWheelRefProps>>;
export default PrizeWheel;
