import React, { useState, useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'
import { LOAD_STATE, loadType } from '../../config/state'

interface sketchProps {
    mask: React.ReactNode,
    show: loadType,
    children?: React.ReactNode,
    timeOut?: number,
    className?: string
    allowErr?: boolean,
    noReset?: boolean,
    style?: React.CSSProperties
}

export const Sketch: React.FC<sketchProps> = (props) => {

    const { 
        style,
        children,
        mask,
        show,
        timeOut,
        className,
        allowErr,
        noReset
    } = props
    
    const [ready, setReady] = useState(false)

    const getStyle = () => {
        return `
            .${className}-enter,
            .${className}-appear {
                opacity: 1;
            }
            
            .${className}-enter-active,
            .${className}-appear-active {
                opacity: 0;
                transition: opacity ${timeOut}ms ease;
            }
            
            .${className}-enter-done {
                opacity: 0;
                pointer-events: none

            }

            .${className}-exit {
                opacity: 0;
                pointer-events: none;
            }
            
            .${className}-exit-active {
                transition: all ${timeOut}ms ease;
                opacity: 1;
            }
            
            .${className}-exit-done {
                opacity: 1;
            }
        `
    }

    // useEffect(() => {
    //     if(show == LOAD_STATE.LOADING) {
    //         setReady(() => false)
    //     }
    // }, [show])

    const render = () => {
        return <React.Fragment>
                    { className && <style dangerouslySetInnerHTML={{__html: getStyle()}}></style> }
                    <div style={{position: "relative", overflow: 'hidden', ...style}}>
                        { !ready && <CSSTransition
                                in={ allowErr ? ((show === LOAD_STATE.SUCCESS) || (show === LOAD_STATE.FAILED)) : (show === LOAD_STATE.SUCCESS) }
                                onEntered={() => noReset && setReady(() => true)}
                                classNames={className || 'fade'}
                                timeout={timeOut || 500}
                                appear={true}
                            >
                            {mask}
                        </CSSTransition> }
                        { children }
                    </div>
                </React.Fragment>
    }

    return <div>
                { render() }
           </div>
}

Sketch.defaultProps = {
    show: LOAD_STATE.LOADING,
    noReset: false
}

export default Sketch