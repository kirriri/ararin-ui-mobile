import React, { FC, SVGAttributes, ImgHTMLAttributes } from 'react';
import { IconRes } from './IconRes';
import { IconType } from './index';
export interface BaseIconProps {
    type?: keyof typeof IconRes;
    state?: IconType;
    style?: React.CSSProperties;
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
}
declare type IconSvgProps = BaseIconProps & SVGAttributes<SVGSVGElement>;
declare type IconImgProps = BaseIconProps & ImgHTMLAttributes<HTMLImageElement>;
export declare type ButtonProps = Partial<IconSvgProps & IconImgProps>;
export declare const Icon: FC<BaseIconProps>;
export default Icon;
