import React, {
    FC,
    useRef
} from 'react'
import Popup from '../Dialog/popup'
import classNames from 'classnames'
import TouchFeedback from 'rmc-feedback';

export interface BaseDataProps {
    text?: string,
    value?: any
}

export interface BasePickerProps {
    cancelText?: string,
    okText?: string,
    cancelPress?: (val: any) => void,
    okPress?: (val: any) => void,
    data?: BaseDataProps[],
    visible?: boolean,
    style?: React.CSSProperties,
    className?: string,
    title?: React.ReactNode,
    prefixCls?: string,
    maskClosable?: boolean,
    
}

export const Picker: FC<BasePickerProps> = props => {

    const {
        data,
        className,
        style,
        visible,
        title,
        cancelText,
        cancelPress,
        okText,
        okPress,
        prefixCls,
        ...restProps
    } = props

    console.log(data)

    const PickerBaseData = useRef({
        
    })

    const renderSelect = () => {
        return data.map((item, index) => {
            return (
                <div className={`${prefixCls}-`}>

                </div>
            )
        })
    }
    
    let reTit
    if(typeof title === 'string' || !title) {

        reTit = 
            <h3 className={`${prefixCls}-header`}>
                <TouchFeedback activeClassName={`${prefixCls}-header-item-active`}>
                    <span onClick={cancelPress} className={`${prefixCls}-header-item`}>{cancelText}</span>
                </TouchFeedback>
                <span>{title}</span>
                <TouchFeedback activeClassName={`${prefixCls}-header-item-active `}>
                    <span className={`${prefixCls}-header-item ${prefixCls}-header-item-highlight`}>{okText}</span>
                </TouchFeedback>
            </h3>
    }else {
        reTit = title
    }

    return <>
                <Popup
                    onClose={cancelPress}
                    visible={visible}
                    title={reTit}
                    {...restProps}
                >
                    <div className={`${prefixCls}-content`}>
                        <div>
                            {renderSelect()}
                        </div>
                    </div>
                </Popup>
           </>
}

Picker.defaultProps = {
    prefixCls: 'apk',
    cancelText: '取消',
    okText: '确定',
    maskClosable: true
}

export default Picker