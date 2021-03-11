import React, {
    FC, 
    InputHTMLAttributes,
    useState,
    useImperativeHandle,
    forwardRef
} from 'react'
import classNames from 'classnames'
import { state } from '../../util/state';

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

 export const Input: FC<InputProps> = 
    forwardRef((props, ref) => {

        const {
            title,
            className,
            type,
            judge,
            onclick,
            codeTxt,
            times
        } = props

        const [firstInput, setFirstInput] = useState(true)
        const [judgeState, setJudgeState] = useState(state.STATIC)
        const [value, setValue] = useState<string | number>('')


        useImperativeHandle(ref, () => ({
            setJudgeState: v => {
                setJudgeState(() => v)
                setFirstInput(() => false)
            },
            getJudgeState: () => judgeState,
            getValue: () => value,
            setValue: (v: (number | string)) => v
        }))
    
        const classes = classNames('ararin-input', className, {
            [`ararin-input-${type}`]: type,
        })

        const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
            e.persist()
            const text = e.target.value.replace(/\s+/g, "")
            
            switch(judge) {

                case 'default':
                    setValue(() => text)
            }
        }
        
    
        return  <div className={classes}>
                    { title && <label>{title}</label> }
                    <div className="ararin-input-zone">
                        { type === 'input' &&
                            <React.Fragment>
                                <input 
                                    value={value}
                                    onChange={handleInput}
                                />
                                <span></span>
                            </React.Fragment>
                        }
                        { type === 'block' &&
                            <div>
    
                            </div>
                        }
                    </div>
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
     })

 Input.defaultProps = {
    type: 'input',
    judge: 'default',
    title: '',
    placeholder: ''
}

 export default Input