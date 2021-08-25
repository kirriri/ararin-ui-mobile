
export type loadType = 'STATIC' | 'SUCCESS' | 'FAILED' | 'LOADING'

export const LOAD_STATE: {
    [propsName: string] : loadType
} = {
    LOADING: 'LOADING',
    STATIC: 'STATIC',
    SUCCESS: 'SUCCESS',
    FAILED: 'FAILED'
}