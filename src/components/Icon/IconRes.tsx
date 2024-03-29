import React from 'react'

export interface IconResProps {
    [key: string]: string
}

export const IconRes: IconResProps = {
    'close': '<svg viewBox="0 0 100 100" stroke="#b3b3b3"><path stroke-width="11" fill="none" stroke-linecap="round" d="M13 13 L87 87"></path><path stroke-width="11" fill="none" stroke-linecap="round" d="M35 65 L13 87"></path><path stroke-width="11" fill="none" stroke-linecap="round" d="M87 13 L65 35"></path></svg>',
    'failed': '<svg viewBox="0 0 100 100" stroke="#ed5a65"><circle stroke-dashoffset="564" stroke-linecap="round" stroke-dasharray="282" cx="50" cy="50" r="45" stroke-width="5" fill="none"></circle><path className="ararin-icon-loading-failed-lineOne" stroke-width="5" fill="none" stroke-linecap="round" d="M28 28 L72 72"></path><path className="ararin-icon-loading-failed-lineTwo" stroke-width="5" fill="none" stroke-linecap="round" d="M72 28 L28 72"></path></svg>',
    'search': '<svg viewBox="0 0 1025 1024"  p-id="3198"><path d="M437.178281 78.40223c-206.158604 0-373.288094 167.12949-373.288094 373.286094 0 206.164604 167.12949 373.293094 373.288094 373.293094 206.162604 0 373.292094-167.12949 373.292094-373.293094C810.471374 245.531719 643.341885 78.40223 437.178281 78.40223L437.178281 78.40223zM437.178281 751.269201c-165.188484 0-299.574878-134.391394-299.574878-299.580878 0-165.181484 134.386394-299.573878 299.574878-299.573878 165.187484 0 299.572878 134.392394 299.572878 299.573878C736.752158 616.877807 602.365765 751.269201 437.178281 751.269201L437.178281 751.269201zM437.178281 751.269201" p-id="3199" fill="#8a8a8a"></path><path d="M949.207781 896.894628 784.003297 731.657144c-15.488045 19.161056-32.703096 36.783108-51.10715 53.136156l164.197481 164.220481c7.198021 7.198021 16.624049 10.794032 26.057076 10.794032 9.432028 0 18.859055-3.596011 26.063076-10.794032C963.603823 934.618738 963.603823 911.29067 949.207781 896.894628L949.207781 896.894628zM949.207781 896.894628" p-id="3200" fill="#8a8a8a"></path></svg>',
    'success': '<svg viewBox="0 0 100 100" stroke="#67d39d"><polyline stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round" points="4,53 36,81 96,18"></polyline></svg>',
}

export const IconSpecialRes = {
    'showHide': <svg viewBox="0 0 100 100" 
                     xmlns="http://www.w3.org/2000/svg"
                     xmlnsXlink="http://www.w3.org/1999/xlink">
                    <path className="ararin-icon-showHide-lash-1" d="M24,64 19,70" fill="none" strokeLinecap="round" strokeWidth="6" ></path>
                    <path className="ararin-icon-showHide-lash-2" d="M50,70 50 78" fill="none" strokeLinecap="round" strokeWidth="6" ></path>
                    <path className="ararin-icon-showHide-lash-3" d="M76,64 81,70" fill="none" strokeLinecap="round" strokeWidth="6" ></path>
                    <path className="ararin-icon-showHide-top" fill="none" strokeLinecap="round" strokeWidth="8"></path>
                    <path className="ararin-icon-showHide-bottom" fill="none" strokeLinecap="round" strokeWidth="8" d="M10,51 Q50,90 90,51"></path>
                    <circle className="ararin-icon-showHide-eye-ball" fill="none" strokeWidth="10" cx="50" cy="50" r="15" strokeLinecap="round" transform="rotate(90 50 50)"></circle>
                </svg>,
    'loading':  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <circle cx="50" cy="50" r="45" strokeWidth="6" fill="none" stroke="#e6e6e6"></circle>
                    <circle className="ararin-circle" strokeDashoffset="330" strokeLinecap="round" strokeDasharray="282" cx="50" cy="50" r="45" strokeWidth="6" fill="none"></circle>
                    <path className="ararin-icon-loading-failed-lineOne" d="M28 28 L72 72" strokeWidth="5" fill="none" strokeLinecap="round"></path>
                    <path className="ararin-icon-loading-failed-lineTwo" d="M72 28 L28 72" strokeWidth="5" fill="none" strokeLinecap="round"></path>
                    <polyline className="ararin-icon-loading-success-line" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" points="22,53 44,71 76,35"></polyline>
                </svg>,
}