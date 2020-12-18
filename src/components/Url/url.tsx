import React from 'react'
import './url.scss'

export const Url = (props: any) => {
    return  <>
                <div className="url_wrapper">
                    <div className="url_content">
                        <div className="url">
                            {props.url}
                        </div>
                    </div>
                </div>
            </>
}