import React, {
    FC, InputHTMLAttributes
} from 'react'
import classNames from 'classnames'

/**
 * Input可适应多种类型校验
 */

 type InputType = 'inpit' | 'block'

 type InputJudge = 'default'| 'mobilePhone'| 'adsl'| 'telPhone'| 'pwd'| 'allIdCard'| 'name'| 'code'| 'idCard'

 interface BaseInputProps {
    title?: string,
    className?: string,
    type?: InputType,
    judge?: InputJudge
 }

 type InputProps = BaseInputProps & Omit<InputHTMLAttributes<HTMLElement>, 'type'>

 export const Input: FC<InputProps> = props => {

     const {
         title,
         className,
         type,
         judge
     } = props

    const classes = classNames('ararin-input', className, {
		[`ararin-button-${type}`]: type,
	})

    return  <div className={classes}>
                <label></label>
                <input></input>
            </div>
 }