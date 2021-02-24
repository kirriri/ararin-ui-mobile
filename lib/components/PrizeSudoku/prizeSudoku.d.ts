import React, { FC } from 'react';
/**
 * 传入的data属性规范
 */
export interface dataProps {
    title: string;
    img?: string | React.ReactElement<HTMLImageElement>;
    txtColor?: string;
}
/**
 * 实际渲染的属性规范
 */
export interface renderDataProps {
    title: string;
    img?: string | React.ReactElement<HTMLImageElement>;
}
/**
 * 点击事件返回promise类型
 */
interface lotteryPromiseProps {
    flag: boolean;
    index?: number;
}
/**
 * PrizeSudokul组件大小
 */
declare type PrizeSudokulSize = 'sm' | 'md' | 'lg';
export interface BasePrizeSudokuProps {
    className?: string;
    style?: React.CSSProperties;
    data: Array<dataProps>;
    size?: PrizeSudokulSize;
    onClick?: () => Promise<lotteryPromiseProps>;
    successFun?: (award: any) => void;
    failedFun?: () => void;
}
export declare const PrizeSudoku: FC<BasePrizeSudokuProps>;
export default PrizeSudoku;
