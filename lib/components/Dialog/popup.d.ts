import React from 'react';
export interface FooterBaseProps {
    text?: string;
    style?: React.CSSProperties;
    activeStyle?: React.CSSProperties;
    higlight?: boolean;
    onPress?: (e: React.MouseEvent) => void;
    className?: string;
}
declare type DialogAnimation = 'slide-up' | 'slide-down';
export interface DialogBaseProps {
    style?: React.CSSProperties;
    afterClose?: () => void;
    activeClassName?: string;
    wrapClassName?: string;
    animation?: DialogAnimation;
    prefixCls?: string;
    className?: string;
    visible?: boolean;
    closeIcon?: boolean;
    title?: React.ReactNode;
    maskAnimation?: string;
    maskClosable?: boolean;
    footer?: FooterBaseProps[];
    onClose?: (e: React.MouseEvent<HTMLSpanElement>) => void;
}
export declare const Popup: React.FC<DialogBaseProps>;
export default Popup;
