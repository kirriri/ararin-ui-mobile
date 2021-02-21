import React, { FC } from 'react';
export interface BaseSelectProps {
    colDatas: any[];
    selectedIndex: number[];
}
export interface BaseDataProps {
    text?: string;
    value?: any;
    children?: BaseDataProps[];
}
export interface BasePickerViewProps {
    dataOnChange?: (val: BaseSelectProps) => void;
    linkage?: boolean;
    data: BaseDataProps[];
    visible?: boolean;
    style?: React.CSSProperties;
    className?: string;
    prefixCls?: string;
}
export declare const PickerView: FC<BasePickerViewProps>;
export default PickerView;
