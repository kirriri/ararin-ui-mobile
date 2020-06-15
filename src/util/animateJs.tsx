export const requestAnimFrame = (function() {
    return  window.requestAnimationFrame || 
            window.webkitRequestAnimationFrame || 
            // @ts-ignore
            window.mozRequestAnimationFrame || 
            // @ts-ignore
            window.oRequestAnimationFrame || 
            // @ts-ignore
            window.msRequestAnimationFrame ||
        function(callback: Function) {
            return window.setTimeout(callback, 1000 / 60);
        };
    }
)()

export const canCelRequestAnimFrame = (function () {
    return  window.cancelAnimationFrame ||
            // @ts-ignore
            Window.webkitCancelAnimationFrame ||
            // @ts-ignore
            window.mozCancelAnimationFrame ||
            // @ts-ignore
            window.msCancelAnimationFrame ||
            // @ts-ignore
            window.oCancelAnimationFrame ||
            function( id ){
                //为了使setTimteout的尽可能的接近每秒60帧的效果
                window.clearTimeout( id );
            }
    }
)()