import React, {
    FC, 
    InputHTMLAttributes,
    useState,
    useImperativeHandle,
    useRef,
    forwardRef
} from 'react'
import classNames from 'classnames'
import { state } from '../../util/state';

/**
 * Input可适应多种类型校验
 */

 type InputType = 'input' | 'block'

 type InputJudge = 'default'| 'mobilePhone'| 'adsl'| 'telphone'| 'pwd'| 'allIdCard'| 'name'| 'code'| 'idCard'

 interface BaseInputProps {
    title?: string,
    className?: string,
    type?: InputType,
    judge?: InputJudge,
    times?: number,
    onclick?: () => void,
    judgeFun?: (text: string) => boolean,
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
            times,
            onBlur,
            ...restPros
        } = props

        const [firstInput, setFirstInput] = useState(true)
        const [desc, setDesc] = useState<string>('')
        const [judgeState, setJudgeState] = useState(state.STATIC)
        const [value, setValue] = useState<string | number>('')
        const idCity =  useRef<Object>({ 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外" })

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
            'failed': (judgeState === state.FAILED && !firstInput)
        })

        const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
            e.persist()
            const text = e.target.value.replace(/\s+/g, "") as any
            
            switch(judge) {
                case "mobilePhone":
                    if((/^1[0-9]{0,}$/.test(text)) || text === "") {
                        if(text.length <= 11) {
                            setValue(() => text)
                            if(text.length === 11) {
                                setJudgeState(() => state.SUCCESS)
                            }else {
                                setJudgeState(() => state.FAILED)
                            }
                        }
                    }
                    return
                case 'pwd':
                    if((/^[0-9]{0,}$/.test(text)) || text === "") {
                        if(text.length <= 6) {
                            setValue(() => text)
                            if(text.length === 6) {
                                setJudgeState(() => state.SUCCESS)
                            }else {
                                setJudgeState(() => state.FAILED)
                            }
                        }
                    }
                    return
                case 'allIdCard': 
                    if(/\d+/.test(text)|| text === "") {
                        if(text.length <= 18) {
                            setValue(() => text)
                            if(text.length === 15 || text.length === 18) {
                                if (!/(^\d{15}$)|(^\d{17}(\d|X|x)$)/.test(text)) {
                                    setJudgeState(() => state.FAILED)
                                    setDesc('身份证长度或格式错误')
                                    return
                                }
                                if (!idCity.current[parseInt(text.substr(0, 2))]) {
                                    setJudgeState(() => state.FAILED)
                                    setDesc('身份证地区非法')
                                    return 
                                }
                                let sum = 0,
                                    weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
                                    codes = "10X98765432"
                                for (var i = 0; i < text.length - 1; i++) {
                                    sum += text[i] * weights[i];
                                }
                                var last = codes[sum % 11]; //计算出来的最后一位身份证号码
                                if (text[text.length - 1] != last) {
                                    setJudgeState(() => state.FAILED)
                                    setDesc('身份证非法')
                                    return 
                                }
                            }
                        }
                    }
                    return
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
                                    onBlur={e => {
                                        onBlur && onBlur(e)
                                        setFirstInput(() => false)
                                    }}
                                    {...restPros}
                                />
                                <span></span>
                            </React.Fragment>
                        }
                        { type === 'block' &&
                            <div>
                                { value }
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