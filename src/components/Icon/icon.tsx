import React, { FC } from 'react'
import classNames from 'classnames'

export interface BaseIconProps {
    type: string | ,
    style?: React.CSSProperties,
    className?: string,
}

export const Icon: FC<BaseIconProps> = props => {

    const {
        type,
        style,
        className
    } = props

    const classes = classNames('ararin-icon', {
           
    })

    return  <span

            >
                <i></i>
            </span>
}