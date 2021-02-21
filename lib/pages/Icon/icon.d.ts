import React from 'react';
import './icon.scss';
declare class IconPage extends React.Component<any, any> {
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    getMsg: (e: MessageEvent) => void;
    getStyle: () => string;
    render(): JSX.Element;
}
export default IconPage;
