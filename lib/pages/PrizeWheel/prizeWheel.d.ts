import React from 'react';
import './prizeWheel.scss';
declare class PrizeWheelPage extends React.Component<any, any> {
    constructor(props: any);
    lottery: () => Promise<any>;
    componentDidMount(): void;
    componentWillUnmount(): void;
    getMsg: (e: MessageEvent) => void;
    getResetStyle: () => string;
    render(): JSX.Element;
}
export default PrizeWheelPage;
