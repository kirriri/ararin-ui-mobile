import React, { FC, CanvasHTMLAttributes } from 'react';
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
/**
 * PrizeWheel组件大小
 */
declare type PrizeWheelSize = 'sm' | 'md' | 'lg';
interface lotteryPromiseProps {
    flag: boolean;
    index?: number;
}
export interface BasePrizeWheelProps {
    style?: React.CSSProperties;
    className?: string;
    onClick?: () => Promise<lotteryPromiseProps>;
    bgImg?: string | JSX.Element;
    arrowImg?: string | JSX.Element;
    data: Array<dataProps>;
    size?: PrizeWheelSize;
    arrowStyle?: React.CSSProperties;
    width?: number;
    successFun?: (award: any) => void;
    failedFun?: () => void;
}
declare type PrizeWheelProps = BasePrizeWheelProps & CanvasHTMLAttributes<HTMLCanvasElement>;
export declare const PrizeWheel: FC<PrizeWheelProps>;
export default PrizeWheel;
