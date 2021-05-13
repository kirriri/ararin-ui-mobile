import React from 'react';
export interface NoticeProps {
    content?: React.ReactNode;
    duration?: number;
    type: string;
    onClose?: () => void;
    mask?: boolean;
    className?: string;
}
export declare const iconType: {
    [propsNames: string]: string;
};
export declare class Notify {
    private static instance;
    private constructor();
    private notificationInstance;
    private type;
    private timer;
    static needClose: boolean;
    private contentRef;
    static getInstance(): Notify;
    static info: (content: React.ReactNode, duration?: number, onClose?: () => void, mask?: boolean, className?: string) => void;
    static loading: (content: React.ReactNode, duration?: number, onClose?: () => void, mask?: boolean, className?: string) => void;
    static success: (content: React.ReactNode, duration?: number, onClose?: () => void, mask?: boolean, className?: string) => void;
    static failed: (content: React.ReactNode, duration?: number, onClose?: () => void, mask?: boolean, className?: string) => void;
    static animateSuccess: (content: React.ReactNode, duration?: number, onClose?: () => void, mask?: boolean, className?: string) => void;
    static animateFailed: (content: React.ReactNode, duration?: number, onClose?: () => void, mask?: boolean, className?: string) => void;
    static hide: () => void;
    private notice;
    private renderNotification;
}
export default Notify;
