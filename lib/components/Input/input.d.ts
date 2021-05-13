import { FC, InputHTMLAttributes } from 'react';
/**
 * Input可适应多种类型校验
 */
declare type InputType = 'input' | 'block';
declare type InputJudge = 'default' | 'mobilePhone' | 'adsl' | 'telphone' | 'pwd' | 'allIdCard' | 'name' | 'code' | 'idCard';
interface BaseInputProps {
    title?: string;
    className?: string;
    type?: InputType;
    judge?: InputJudge;
    times?: number;
    onClick?: () => void;
    judgeFun?: (text: string) => boolean;
    codeTxt?: string;
    noHide?: boolean;
    noJudge?: boolean;
    initValue?: string;
}
declare type InputProps = BaseInputProps & Omit<InputHTMLAttributes<HTMLElement>, 'type'>;
export declare const Input: FC<InputProps>;
export default Input;
