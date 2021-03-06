import React, { 
    FC,
    SVGAttributes,
    ImgHTMLAttributes,
    FunctionComponentElement
 } from 'react'
import classNames from 'classnames'
import { IconRes, IconSpecialRes } from './IconRes'
import { IconType } from './index'

export interface BaseIconProps {
    type?: keyof typeof IconRes,
    state?: IconType,
    style?: React.CSSProperties,
    className?: string,
    trigger?: boolean,
    onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void
}

type IconSvgProps = BaseIconProps & SVGAttributes<SVGSVGElement>
type IconImgProps = BaseIconProps & ImgHTMLAttributes<HTMLImageElement>
export type ButtonProps = Partial<IconSvgProps & IconImgProps>

export const Icon: FC<BaseIconProps> = props => {

     const {
        type,
        style,
        className,
        state,
        children,
        onClick,
        trigger,
        ...restProps
    } = props

    const classes = classNames('ararin-icon', className, {
        [`ararin-icon-${type}`]: type && (IconRes[type] || IconSpecialRes[type]),
        [`ararin-icon-${state}`]: state
    })

    const svgSprite = (contents: string) => `
        
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            id="__ararin_MOBILE_SVG_ICON"
            style="display:none;overflow:hidden;width:0;height:0"
        >   
            <defs>
                ${contents}
            </defs>
        </svg>
    `;

    const renderChildren = () => {
        if(type && IconRes[type]) {
            if (!document) {
                return;
            }
            const existing = document.getElementById('__ararin_MOBILE_SVG_ICON');
            const mountNode = document.body;

            const symbols = Object.keys(IconRes).map(iconName => {
                const svgContent = IconRes[iconName].split('svg')[1];
                if(className === 'showHide') {
                    return `<symbol id=${iconName}${svgContent}symbol>`;
                }
                return `<symbol id=${iconName}${svgContent}symbol>`;
            }).join('')

            if (!existing) {
                mountNode.insertAdjacentHTML('afterbegin', svgSprite(symbols));
            }
            
            return <svg>
                        <use xlinkHref={`#${type}`} />
                    </svg>
        }else if(type && IconSpecialRes[type]) {
            return React.cloneElement(IconSpecialRes[type], {
                className: trigger ? `ararin-icon-${type}-trigger-active` : '',
            })
        }else if(children){
            React.Children.only(children)
            const Icon = children as FunctionComponentElement<ImgHTMLAttributes<HTMLImageElement>>
            if(typeof Icon.type === 'string') {
                if (Icon.type === 'svg' || Icon.type === 'img') {
                    return Icon
                }
                console.error('Icon component only expected to receive a svg or imgage HTMLElement')
            }
            console.error('Icon component only expected to receive a React component')
        }
        return ''
    }

    return  <span
                style={style}
                className={classes}
                onClick={onClick}
                {...restProps}
            >
                { renderChildren() }
            </span>
}

export default Icon

Icon.defaultProps = {
    trigger: false
}