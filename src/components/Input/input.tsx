import React, {
    FC, 
    InputHTMLAttributes,
    useState,
    useImperativeHandle,
    useRef,
    forwardRef,
    useEffect
} from 'react'
import classNames from 'classnames'
import { JUDE_STATE } from '../../util/state';
import Icon from '../Icon';

/**
 * Input可适应多种类型校验
 */

 type InputType = 'input' | 'block'

 type InputJudge = 'default'| 'mobilePhone'| 'adsl'| 'telphone'| 'pwd'| 'allIdCard'| 'name'| 'msgCode'| 'idCard' | 'imgCode'

 interface BaseInputProps {
    title?: string,
    className?: string,
    type?: InputType,
    judge?: InputJudge,
    times?: number,
    onClick?: () => void,
    RegExp?: string,
    codeTxt?: string,
    noHide?: boolean,
    noJudge?: boolean,
    lengthMode?: [number, 'less' | 'equal' | 'more'],
    initValue?: string,
    imgCodeSrc?: string,
    refresh?: boolean
 }

 type InputProps = BaseInputProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>

 export const Input = forwardRef<any, InputProps>((props, ref) => {
        let {
            title,
            className,
            type,
            judge,
            onClick,
            codeTxt,
            times,
            onBlur,
            onFocus,
            noHide,
            noJudge,
            RegExp,
            maxLength,
            lengthMode,
            imgCodeSrc,
            initValue,
            ...restPros
        } = props

    const [firstInput, setFirstInput] = useState(true)
    const [desc, setDesc] = useState<string>('')
    const [judgeState, setJudgeState] = useState(JUDE_STATE.STATIC)
    const [value, setValue] = useState<string>('')
    const [showHide, setShowHide] = useState<boolean>(true)
    const idCity =  useRef<{[propsName: number]: string}>({ 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外" })
    const hideJudge = useRef<string[]>(['pwd'])
    const imgCodeRef = useRef<any>(null)
    const timeSign = useRef<string>(`${new Date().getTime()}`)

        useImperativeHandle(ref, () => ({
            setJudgeState: v => {
                setJudgeState(() => v)
                setFirstInput(() => false)
            },
            getJudgeState: () => judgeState,
            getValue: () => value,
            setValue: (v:  string) => setValue(() => v),
            getDesc: () => desc
        }))
    
        const classes = classNames('ararin-input', className, {
            [`ararin-input-${type}`]: type,
            'failed': (judgeState === JUDE_STATE.FAILED && !firstInput)
        })

        useEffect(() => {
            setValue(() => initValue)
        }, [])
        
        const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
            e.persist()
            const text = e.target.value.replace(/\s+/g, "") as any
            if(noJudge) {
                setValue(() => text)
                return
            }
            if(!RegExp) {
                switch(judge) {
                    case "mobilePhone":
                        if((/^1[0-9]{0,}$/.test(text)) || text === "") {
                            if(text.length <= 11) {
                                setValue(() => text)
                                if(text.length === 11) {
                                    setJudgeState(() => JUDE_STATE.SUCCESS)
                                }else {
                                    setJudgeState(() => JUDE_STATE.FAILED)
                                }
                            }
                        }
                        return
                    case "name":
                        if(text.length <= 10) {
                            setValue(() => text)
                            if(text.length <= 6 && /[\u4e00-\u9fa5]+$/.test(text)) {
                                setJudgeState(() => JUDE_STATE.SUCCESS)
                            }else {
                                setJudgeState(() => JUDE_STATE.FAILED)
                                setDesc('身份证长度或格式错误')
                                return
                            }
                        }
                        return
                    case 'pwd':
                        if((/^[0-9]{0,}$/.test(text)) || text === "") {
                            if(text.length <= 6) {
                                // if()
                                setValue(() => text)
                                if(text.length === 6) {
                                    setJudgeState(() => JUDE_STATE.SUCCESS)
                                }else {
                                    setJudgeState(() => JUDE_STATE.FAILED)
                                }
                            }
                        }
                        return
                    case 'allIdCard': 
                        if(/\d+/.test(text)|| text === "") {
                            if(text.length <= 18) {
                                setValue(() => text)
                                if(text.length >= 15) {
                                    if (!/(^\d{15}$)|(^\d{17}(\d|X|x)$)/.test(text)) {
                                        setJudgeState(() => JUDE_STATE.FAILED)
                                        setDesc('身份证长度或格式错误')
                                        return
                                    }
                                    if (!idCity.current[parseInt(text.substr(0, 2))]) {
                                        setJudgeState(() => JUDE_STATE.FAILED)
                                        setDesc('身份证地区非法')
                                        return 
                                    }
                                    let sum = 0,
                                        weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
                                        codes = "10X98765432"
                                    for (let i = 0; i < text.length - 1; i++) {
                                        sum += text[i] * weights[i];
                                    }
                                    let last = codes[sum % 11]; //计算出来的最后一位身份证号码
                                    if (text[text.length - 1] != last) {
                                        setJudgeState(() => JUDE_STATE.FAILED)
                                        setDesc('身份证非法')
                                        return 
                                    }
                                    setJudgeState(() => JUDE_STATE.SUCCESS)
                                }else {
                                    setJudgeState(() => JUDE_STATE.FAILED)
                                    setDesc(() => '身份证长度错误')
                                }
                            }
                        }
                        return
                    case 'msgCode':
                        if((/[0-9a-zA-Z]{0,4}$/.test(text)) || text === "") {
                            if(text.length <= 4) {
                                setValue(() => text)
                                if(text.length == 4) {
                                    setJudgeState(() => JUDE_STATE.SUCCESS)
                                }else {
                                    setJudgeState(() => JUDE_STATE.FAILED)
                                }
                            }
                        }else {
                            setJudgeState(() => JUDE_STATE.FAILED)
                            setDesc(() => '验证码格式错误')
                        }
                        return
                    case 'imgCode':
                        if((/[0-9a-zA-Z]{0,4}$/.test(text)) || text === "") {
                            if(text.length <= 4) {
                                setValue(() => text)
                                if(text.length == 4) {
                                    setJudgeState(() => JUDE_STATE.SUCCESS)
                                }else {
                                    setJudgeState(() => JUDE_STATE.FAILED)
                                }
                            }
                        }else {
                            setJudgeState(() => JUDE_STATE.FAILED)
                            setDesc(() => '验证码格式错误')
                        }
                        return
                    case 'default':
                        setValue(() => text)
                }
            }else {
                let reg = new window.RegExp(RegExp,"g");
                setValue(() => text)
                if(text.match(reg)) {
                    setJudgeState(() => JUDE_STATE.SUCCESS)
                }else {
                    setJudgeState(() => JUDE_STATE.FAILED)
                }
            }
        }

    useEffect(() => {
        if(!lengthMode || value == undefined || value == null) return
        switch(lengthMode[1]) {
            case 'less':
                if(value.length < lengthMode[0])
                    setJudgeState(() => JUDE_STATE.SUCCESS)
                else
                    setJudgeState(() => JUDE_STATE.FAILED)
                return
            case 'equal':
                if(value.length == lengthMode[0])
                    setJudgeState(() => JUDE_STATE.SUCCESS)
                else
                    setJudgeState(() => JUDE_STATE.FAILED)
                return
            case 'more':
                if(value.length > lengthMode[0])
                    setJudgeState(() => JUDE_STATE.SUCCESS)
                else
                    setJudgeState(() => JUDE_STATE.FAILED)
                return
        }
    }, [value])
    
    return  <div className={classes}>
                { title && <label>{title}</label> }
                <div className="ararin-input-zone">
                    { type === 'input' &&
                        <React.Fragment>
                            <input 
                                type={noHide ? '' : (hideJudge.current.indexOf(judge) !== -1 && showHide) ? 'password' : ''}
                                value={value}
                                onChange={handleInput}
                                onFocus={ e => {
                                    onFocus && onFocus(e)
                                    // setFirstInput(() => false)
                                }}
                                maxLength={maxLength}
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
                { judge === 'msgCode' &&
                    ( times > 0 ?
                        <span className="ararin-disabled ararin-input-code">
                            {times}s
                        </span> : 
                        <span 
                            style={{cursor: 'pointer'}}
                            className="ararin-input-code"
                            onClick={onClick}
                        >
                            {codeTxt}
                        </span>
                    )
                }
                { judge === 'imgCode' &&
                    <span 
                        style={{cursor: 'pointer', width: '30%'}}
                        className="ararin-input-code"
                        onClick={() => imgCodeRef.current.src = `${imgCodeSrc}${'?time=' + new Date().getTime()}`}
                    >
                        <img ref={imgCodeRef} src={`${imgCodeSrc}${'?time=' + timeSign.current}`} alt="" style={{width: '100%'}}/>
                    </span>
                }
                { !noHide && hideJudge.current.indexOf(judge) !== -1 &&
                    <Icon 
                        type="showHide" 
                        onClick={() => setShowHide(() => !showHide)} 
                        trigger={showHide}
                    />
                }
            </div>
 })

 Input.defaultProps = {
    type: 'input',
    judge: 'default',
    title: '',
    placeholder: '',
    noHide: false,
    noJudge: false,
}

 export default Input