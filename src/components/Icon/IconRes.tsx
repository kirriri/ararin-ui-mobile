import React from 'react'

export interface IconResProps {
    [key: string]: string
}

export const IconRes: IconResProps = {
    'close': '<svg viewBox="0 0 1024 1024" fill="rgba(0,0,0,.5)"><path d="M947.608 0l-438.13 438.13L71.348 0 0.026 71.323l438.13 438.13L0.025 947.583l71.324 71.322 438.13-438.129 438.129 438.13 71.323-71.324-438.13-438.13 438.13-438.129z"/></svg>',
    'failed': '<svg viewBox="0 0 1024 1024" fill="#ed5a65"><path d="M512 947.2C271.36 947.2 76.8 752.64 76.8 512S271.36 76.8 512 76.8 947.2 271.36 947.2 512 752.64 947.2 512 947.2M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512S793.6 0 512 0" fill="#ed5a65" p-id="966"></path><path d="M716.8 353.28l-61.44-46.08L512 455.68 368.64 307.2l-61.44 46.08L455.68 512 307.2 665.6l61.44 51.2L512 568.32 655.36 716.8l61.44-51.2L563.2 512z"></path></svg>',
    'search': '<svg viewBox="0 0 1025 1024"  p-id="3198"><path d="M437.178281 78.40223c-206.158604 0-373.288094 167.12949-373.288094 373.286094 0 206.164604 167.12949 373.293094 373.288094 373.293094 206.162604 0 373.292094-167.12949 373.292094-373.293094C810.471374 245.531719 643.341885 78.40223 437.178281 78.40223L437.178281 78.40223zM437.178281 751.269201c-165.188484 0-299.574878-134.391394-299.574878-299.580878 0-165.181484 134.386394-299.573878 299.574878-299.573878 165.187484 0 299.572878 134.392394 299.572878 299.573878C736.752158 616.877807 602.365765 751.269201 437.178281 751.269201L437.178281 751.269201zM437.178281 751.269201" p-id="3199" fill="#8a8a8a"></path><path d="M949.207781 896.894628 784.003297 731.657144c-15.488045 19.161056-32.703096 36.783108-51.10715 53.136156l164.197481 164.220481c7.198021 7.198021 16.624049 10.794032 26.057076 10.794032 9.432028 0 18.859055-3.596011 26.063076-10.794032C963.603823 934.618738 963.603823 911.29067 949.207781 896.894628L949.207781 896.894628zM949.207781 896.894628" p-id="3200" fill="#8a8a8a"></path></svg>',
    'success': '<svg viewBox="0 0 1024 1024" version="1.1" p-id="2517"><path d="M348.637867 761.0368l-223.232-223.232a25.6 25.6 0 0 0-36.181334 36.181333l241.322667 241.322667a25.6 25.6 0 0 0 36.181333 0L921.6 273.066667a25.6 25.6 0 1 0-36.181333-36.181334L348.603733 761.002667z" p-id="2518" fill="#289431"></path></svg>',
}

export const IconSpecialRes = {
    'showHide': <svg viewBox="0 0 100 100">
                    <path className="ararin-icon-showHide-top" fill="none" stroke-linecap="round" stroke-width="8"></path>
                    <path className="ararin-icon-showHide-bottom" fill="none" stroke-linecap="round" stroke-width="8" d="M10,51 Q50,90 90,51"></path>
                    <circle className="ararin-icon-showHide-eye-ball" fill="none" stroke-width="10" cx="50" cy="50" r="15" stroke-linecap="round" transform="rotate(90 50 50)"></circle>
                </svg>,
    'loading':  <svg viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" stroke-width="5" fill="none" stroke="rgba(0,0,0, .1)"></circle>
                    <circle className="ararin-circle" stroke-dashoffset="330" stroke-linecap="round" stroke-dasharray="282" cx="50" cy="50" r="45" stroke-width="5" fill="none"></circle>
                    <path className="ararin-lineOne" stroke-width="5" fill="none" stroke-linecap="round"></path>
                    <path className="ararin-lineTwo" stroke-width="5" fill="none" stroke-linecap="round"></path>
                </svg>
}