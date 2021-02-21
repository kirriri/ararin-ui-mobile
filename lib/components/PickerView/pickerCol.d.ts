import { FC } from 'react';
export interface BasePickerColumnProps {
    prefixCls?: string;
    colData: any[];
    colHeight: number;
    itemHeight: number;
    index: number;
    selectIndex: number;
    onSelected: (colIndex: number, selectedIndex: number) => void;
}
export declare const BasePickerColumn: FC<BasePickerColumnProps>;
export default BasePickerColumn;
