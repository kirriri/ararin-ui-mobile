import React, { FC } from 'react';
export interface BaseSelectProps {
    colDatas: any[];
    selectedIndex: number[];
}
export interface BaseDataProps {
    text: string;
    value: any;
    children?: BaseDataProps[];
}
export interface BasePickerProps {
    linkage?: boolean;
    cancelText?: string;
    okText?: string;
    cancelPress?: () => void;
    okPress?: (val: any) => void;
    data?: BaseDataProps[] | {
        text: string;
        value: any;
    }[][];
    visible?: boolean;
    history?: boolean;
    style?: React.CSSProperties;
    className?: string;
    title?: React.ReactNode;
    prefixCls?: string;
    maskClosable?: boolean;
}
export declare const Picker: FC<BasePickerProps>;
export default Picker;
