import React from 'react';
export interface FooterBaseProps {
    text?: string;
    style?: React.CSSProperties;
    activeStyle?: React.CSSProperties;
    higlight?: boolean;
    onPress?: (e: React.MouseEvent) => void;
    className?: string;
}
declare type DialogAnimation = 'bounce' | 'scale' | 'fall';
export interface DialogBaseProps {
    afterClose?: () => void;
    activeClassName?: string;
    wrapClassName?: string;
    animation?: DialogAnimation;
    prefixCls?: string;
    className?: string;
    visible?: boolean;
    style?: React.CSSProperties;
    closeIcon?: boolean;
    title?: React.ReactNode;
    maskAnimation?: string;
    maskClosable?: boolean;
    footer?: FooterBaseProps[];
    onClose?: (e: React.MouseEvent<HTMLSpanElement>) => void;
}
export declare const Dialog: React.FC<DialogBaseProps>;
export default Dialog;
