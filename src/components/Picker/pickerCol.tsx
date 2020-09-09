import React, {
    FC,
} from 'react'

export interface BasePickerColumnProps {
    options: any[],
    name: string,
    value: any,
    itemHeight: number,
    columnHeight: number,
    onchange: (val: any) => void,
    onClick: (val: any) => void
}

export const BasePickerColumn:FC<BasePickerColumnProps> = props => {



    return (
        <ul>
            <li></li>
        </ul>
    )
}