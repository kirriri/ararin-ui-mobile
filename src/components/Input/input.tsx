import React, {
    FC, 
    InputHTMLAttributes,
    useState,
    useImperativeHandle,
} from 'react'
import classNames from 'classnames'

/**
 * Input可适应多种类型校验
 */

 type InputType = 'input' | 'block'

 type InputJudge = 'default'| 'mobilePhone'| 'adsl'| 'telPhone'| 'pwd'| 'allIdCard'| 'name'| 'code'| 'idCard'

 interface BaseInputProps {
    title?: string,
    className?: string,
    type?: InputType,
    judge?: InputJudge,
    times?: number,
    onclick?: () => void,
    codeTxt?: string
 }

 type InputProps = BaseInputProps & Omit<InputHTMLAttributes<HTMLElement>, 'type'>

 export const Input: FC<InputProps> = props => {

    const {
        title,
        className,
        type,
        judge,
        onclick,
        codeTxt,
        times
    } = props

    const [value, setValue] = useState<string | number>('')

    const classes = classNames('ararin-input', className, {
		[`ararin-input-${type}`]: type,
    })


    return  <div className={classes}>
                { title && <label>{title}</label> }
                { type === 'input' &&
                    <React.Fragment>
                        <input 
                            value={value}
                            onChange={e => { e.persist(); setValue(() => { return e.target.value })}}
                        />
                        <span></span>
                    </React.Fragment>
                }
                { judge === 'code' &&
                    ( times > 0 ?
                        <span className="ararin-disabled">
                            {times}s
                        </span> : 
                        <span 
                            onClick={onclick}
                        >
                            {codeTxt}
                        </span>
                    )
                }
            </div>
 }

 Input.defaultProps = {
    type: 'input',
    judge: 'default',
    title: '',
    placeholder: ''
}

 export default Input