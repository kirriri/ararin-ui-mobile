import React from 'react';
import './button.scss';
declare class ButtonPage extends React.Component<any, any> {
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    getMsg: (e: MessageEvent) => void;
    getResetStyle: () => string;
    render(): JSX.Element;
}
export default ButtonPage;
