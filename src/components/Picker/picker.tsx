import React, {
    FC,
    useRef,
    useEffect
} from 'react'
import Popup from '../dialog/popup'
import classNames from 'classnames'
import TouchFeedback from 'rmc-feedback';
import BScroll from 'better-scroll'

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

    let index = 0

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

    useEffect(() => {
        if(wrapper) {
            console.log(wrapper.current)
            if(PickerBaseData) {
                if(data.length < PickerBaseData.current.ITEM_MIN_NUM) {
                    PickerBaseData.current.CONTENT_HEIGHT = Math.max(PickerBaseData.current.CONTENT_HEIGHT, PickerBaseData.current.ITEM_MIN_NUM)
                } else if(data.length > PickerBaseData.current.ITEM_MAX_NUM) {
                    PickerBaseData.current.CONTENT_HEIGHT = Math.max(PickerBaseData.current.CONTENT_HEIGHT, PickerBaseData.current.ITEM_MIN_NUM)
                }else {
                    PickerBaseData.current.CONTENT_HEIGHT = data.length
                }
                if(wrapper.current) {
                    wrapper.current.style.height = PickerBaseData.current.CONTENT_HEIGHT * PickerBaseData.current.ITEM_HEIGHT + 'vw'
                }
                const wheel = new BScroll(wrapper.current, {
                    wheel: {
                      selectedIndex: 0,
                      wheelWrapperClass: 'wheel-scroll',
                      wheelItemClass: 'wheel-item',
                      wheelDisabledItemClass: 'wheel-disabled-item',
                      rotate: 0,
                      click: false,
                      swipeTime: 1000,
                      bindToWrapper: true
                    },              
                    observeDOM: true
                })  
                wheel.on('scrollEnd', () => {
                    //滚动完成之后获取当前选取的索引值
                    console.log(wheel.getSelectedIndex())
                })  
            }
        }
        return () => {
            
        }
    }, [visible, data])

    const wrapper = useRef(null)
    const Scroll = useRef(null)
    const PickerBaseData = useRef({
        CONTENT_HEIGHT: 0,
        ITEM_HEIGHT: 10,
        ITEM_MIN_NUM: 5,
        ITEM_MAX_NUM: 7
    })


    const renderSelect = () => {
        return  <ul 
                    className={`${prefixCls}-data-item wheel-scroll`}
                    style={{marginTop: '20vw'}}
                >
                    {data.map((item, index) => 
                        <li className="wheel-item">
                            {item.text}
                        </li>
                    )}
                </ul>
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
                    <div className={`${prefixCls}-data-content wheel-scroll`} ref={wrapper}>
                        {renderSelect()}
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