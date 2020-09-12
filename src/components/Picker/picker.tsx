import React, {
    FC,
    useRef,
    useEffect,
    useState,
} from 'react'
import Popup from '../dialog/popup'
import PickerView from '../PickerView/pickerView'
import classNames from 'classnames'
import TouchFeedback from 'rmc-feedback';
import { BaseSelectProps } from '../PickerView/pickerView'

export interface BaseDataProps {
    text?: string,
    value?: any,
    children?: BaseDataProps[]
}

export interface BasePickerProps {
    linkage?: boolean,
    cancelText?: string,
    okText?: string,
    cancelPress?: () => void,
    okPress?: (val: any) => void,
    data?: BaseDataProps[],
    visible?: boolean,
    history?: boolean,
    style?: React.CSSProperties,
    className?: string,
    title?: React.ReactNode,
    prefixCls?: string,
    maskClosable?: boolean,
}

export const Picker: FC<BasePickerProps> = props => {

    const {
        data,
        linkage,
        className,
        style,
        title,
        cancelText,
        cancelPress,
        okText,
        okPress,
        prefixCls,
        history,
        maskClosable,
        ...restProps
    } = props


    const [visible, setVisible] = useState(props.visible)
    const [currentData, setCurrentData] = useState({
        colDatas: [],
        selectedIndex: []
    })

    useEffect(() => {
        setVisible(props.visible)
    }, [props.visible])

    // 取消事件
    const handleCancelClick = () => {
        if(cancelPress) {
            cancelPress()
        }else {
            setVisible(() => false)
        }
    }

    // 确认事件
    const handleOkClick = () => {
        let selectData = JSON.parse(JSON.stringify(currentData.colDatas))
            .map((item, index) => currentData.selectedIndex[index] !== -1 ? (delete item[currentData.selectedIndex[index]].children,item[currentData.selectedIndex[index]]) : '' )
            .filter(item => Object.prototype.toString.call(item) === '[object Object]')
        if(okPress) {
            okPress(selectData)
        }else {
            setVisible(() => false)
        }
    }
    
    //  渲染title
    let reTit
    if(typeof title === 'string' || !title) {
        reTit = 
            <h3 className={`${prefixCls}-header`}>
                <TouchFeedback activeClassName={`${prefixCls}-header-item-active`}>
                    <span onClick={handleCancelClick} className={`${prefixCls}-header-item`}>{cancelText}</span>
                </TouchFeedback>
                <span>{title}</span>
                <TouchFeedback activeClassName={`${prefixCls}-header-item-active `}>
                    <span 
                        onClick={handleOkClick}
                        className={`${prefixCls}-header-item ${prefixCls}-header-item-highlight`}
                    >{okText}</span>
                </TouchFeedback>
            </h3>
    }else {
        reTit = title
    }

    const onChange = (val: BaseSelectProps) => {
        setCurrentData(() => val)
    }
    
    
    return <>
                <Popup
                    {...restProps}
                    maskClosable={maskClosable}
                    onClose={handleCancelClick}
                    visible={visible}
                    title={reTit}
                >
                    <PickerView
                        dataOnChange={onChange}
                        data={data}
                    />
                </Popup>
           </>
}

Picker.defaultProps = {
    prefixCls: 'apk',
    cancelText: '取消',
    okText: '确定',
    maskClosable: true,
    linkage: true,
    data: [],
    history: false
}

export default Picker