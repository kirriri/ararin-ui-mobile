import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import { IconType } from '../Icon';
/**
 * 这个Button考虑到Canvas可使用的上限个数，故改为Css实现水波纹
 */
/**
 * Button组件的3种状态
 */
declare type ButtonState = 'loading' | 'static' | 'disabled' | 'failed';
/**
 * Button组件的大小
 */
declare type ButtonSize = 'sm' | 'md' | 'lg';
/**
 * Button组件的类型
 */
declare type ButtonType = 'primary' | 'default' | 'warning' | 'danger' | 'link' | 'success';
interface BaseButtonProps {
    icon?: React.ReactNode;
    iconState?: IconType;
    href?: string;
    type?: ButtonType;
    size?: ButtonSize;
    className?: string;
    disabled?: boolean;
    state?: ButtonState;
    children?: React.ReactNode;
    ripple?: boolean;
    style?: React.CSSProperties;
    activeClassName?: string;
    activeStyle?: React.CSSProperties;
}
declare type NativeButtonProps = BaseButtonProps & Omit<ButtonHTMLAttributes<HTMLElement>, 'type'>;
declare type AnchorButtonProps = BaseButtonProps & Omit<AnchorHTMLAttributes<HTMLElement>, 'type'>;
export declare type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
export declare const Button: FC<ButtonProps>;
export default Button;
