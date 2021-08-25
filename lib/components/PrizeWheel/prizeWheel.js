var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useEffect, useState, useRef, useImperativeHandle, forwardRef, } from 'react';
import classNames from 'classnames';
import { requestAnimationFrame, canCelRequestAnimFrame } from '../../util/animateJs';
import { wheelBg, arrowBg } from './imgRes';
//底盘图片名称
var arrowImgSrc = arrowBg;
//指针图标名称
var bgImgSrc = wheelBg;
export var PrizeWheel = forwardRef(function (props, ref) {
    var style = props.style, bgStyle = props.bgStyle, className = props.className, children = props.children, onClick = props.onClick, data = props.data, width = props.width, bgImg = props.bgImg, arrowImg = props.arrowImg, arrowStyle = props.arrowStyle, successFun = props.successFun, autoResize = props.autoResize, fontSize = props.fontSize, restProps = __rest(props
    // 用于触发回调刷新加载图片
    , ["style", "bgStyle", "className", "children", "onClick", "data", "width", "bgImg", "arrowImg", "arrowStyle", "successFun", "autoResize", "fontSize"]);
    // 用于触发回调刷新加载图片
    var _a = useState(0), loadRefresh = _a[0], setLoadRefresh = _a[1];
    // canvas对象实例
    var canvasRef = useRef(null);
    // 动画id
    var animateRef = useRef();
    // 外层wrapper
    var prizeWheelWrapperRef = useRef();
    // 设置转盘宽度
    var _b = useState(0), renderWidth = _b[0], setRenderWidth = _b[1];
    // 设置渲染数据
    var _c = useState(), renderData = _c[0], setRenderData = _c[1];
    // 设置奖品位置
    // const [index, setIndex] = useState<number>(0)
    // 设置类名
    var classes = classNames('ararin-prize-wheel', className, {
    // [`ararin-wheel-${size}`]: size,
    });
    var _d = useState({
        startRadian: -90 * Math.PI / 180,
        wheeling: false,
        awardIndex: -1,
    }), state = _d[0], setState = _d[1];
    useImperativeHandle(ref, function () { return ({
        reset: function () { onLoad(); },
        setPrize: function (awardIndex) {
            if (!state.wheeling) {
                setPrize(awardIndex);
            }
        }
    }); });
    useEffect(function () {
        setRenderWidth(function () { return prizeWheelWrapperRef.current.offsetWidth; });
    }, []);
    window.onresize = function () {
        if (autoResize) {
            setRenderWidth(function () { return prizeWheelWrapperRef.current.offsetWidth; });
            canCelRequestAnimFrame(animateRef.current);
        }
    };
    useEffect(function () {
        if (renderWidth) {
            if (state.wheeling) {
                state.startRadian = 0;
                var distance = distanceToStop(state.awardIndex);
                rotatePanel(distance);
            }
            else {
                onLoad();
            }
        }
    }, [renderWidth]);
    // 如果传入width，size属性，则设置渲染宽度或者渲染倍数
    useEffect(function () {
        if (width) {
            setRenderWidth(function () { return width; });
        }
    }, [width]);
    // 检测到传入data变化，开始处理为实际渲染data
    useEffect(function () {
        if (data && data.length) {
            setRenderData(function () {
                return data.map(function (item, index) {
                    var imgCTX = new Image();
                    if (typeof item.img === 'string') {
                        imgCTX.src = item.img;
                    }
                    else {
                        imgCTX.src = item.img.props.src;
                    }
                    imgCTX.onload = function () {
                        setLoadRefresh(function (t) { return t + 1; });
                    };
                    return __assign(__assign({}, item), { img: imgCTX, index: index });
                });
            });
        }
        return function () {
        };
    }, [data]);
    // 坚挺到页面大小变化，刷新页面
    useEffect(function () {
        loadRefresh && onLoad();
    }, [loadRefresh]);
    // 实际渲染data改变触发初次加载
    useEffect(function () {
        if (renderData && canvasRef) {
            onLoad();
        }
    }, [renderData]);
    // 初次加载
    var onLoad = function (actualRenderWidth) {
        if (actualRenderWidth === void 0) { actualRenderWidth = renderWidth; }
        if (!renderData)
            return;
        var canvas = canvasRef.current;
        var context = canvas.getContext('2d');
        canvas.style.width = actualRenderWidth + "px";
        canvas.style.height = actualRenderWidth + "px";
        var circlepointPos = actualRenderWidth / 2 * devicePixelRatio;
        var startRadian = state.startRadian;
        context.save();
        context.beginPath();
        // 设置填充转盘用的颜色,fill是填充而不是绘制
        context.fillStyle = '#fff';
        // 绘制一个圆,有六个参数,分别表示:圆心的x坐标,圆心的y坐标,圆的半径,开始绘制的角度,结束的角度,绘制方向(false表示顺时针)
        context.arc(circlepointPos, circlepointPos, circlepointPos - actualRenderWidth * 0.1 * devicePixelRatio, 0, 2 * Math.PI, false);
        context.fill();
        // 将画布的状态恢复到上一次save()时的状态
        context.restore();
        // 第一个奖品色块开始绘制时开始的弧度及结束的弧度
        var RadianGap = Math.PI * 2 / renderData.length, endRadian = startRadian + RadianGap;
        // 开角两点间直线长度
        var RadianWidth = 2 * Math.PI * circlepointPos / renderData.length;
        var _loop_1 = function (i) {
            context.save();
            context.beginPath();
            // 为了区分不同的色块,使用颜色作为色块的填充色
            context.fillStyle = renderData[i].bgColor;
            // 这里需要使用moveTo方法将初始位置定位在圆点处,这样绘制的圆弧都会以圆点作为闭合点
            context.moveTo(circlepointPos, circlepointPos);
            // 画圆弧时,每次都会自动调用moveTo,将画笔移动到圆弧的起点,半径设置的比转盘稍小一点
            context.arc(circlepointPos, circlepointPos, circlepointPos - actualRenderWidth * 0.1 * devicePixelRatio, startRadian, endRadian, false);
            context.fill();
            context.restore();
            // 开始绘制文字
            context.save();
            //设置文字颜色
            context.fillStyle = renderData[i].txtColor;
            //设置文字样式
            context.font = actualRenderWidth / 300 * fontSize * devicePixelRatio + "px bold Arial";
            // 改变canvas原点的位置,translate到哪个坐标点,那么那个坐标点就将变为坐标(0, 0)
            context.translate(circlepointPos + Math.cos(startRadian + RadianGap / 2) * circlepointPos, circlepointPos + Math.sin(startRadian + RadianGap / 2) * circlepointPos);
            // 旋转角度,这个旋转是相对于原点进行旋转的.
            context.rotate(startRadian + RadianGap / 2 + Math.PI / 2);
            // 这里就是根据获取的各行的文字进行绘制,maxLineWidth取140,相当与一行最多展示7个文字
            var tmpLine = 1;
            getLineTextList(context, renderData[i].title, RadianWidth).forEach(function (line, index) {
                // 绘制文字的方法,三个参数分别带:要绘制的文字,开始绘制的x坐标,开始绘制的y坐标
                context.fillText(line, -context.measureText(line).width / 2, circlepointPos * 0.22 + (++index * circlepointPos * 0.16));
                tmpLine = index;
            });
            context.drawImage(renderData[i].img, // 渲染图片源
            -RadianWidth * 0.18, // 渲染图片左偏移量（为了保持居中，一般是奖品图片的一半）
            (tmpLine + 2) * circlepointPos * 0.15, // 渲染图片相对圆边顶部偏移量
            RadianWidth * 0.36, RadianWidth * 0.36 / renderData[i].img.width * renderData[i].img.height // 图片高度
            );
            context.restore();
            // 每个奖品色块绘制完后,下个奖品的弧度会递增
            startRadian += RadianGap;
            endRadian += RadianGap;
        };
        for (var i = 0; i < renderData.length; i++) {
            _loop_1(i);
        }
    };
    var setPrize = function (awardIndex) {
        if (state.wheeling || // 正在出奖
            !renderData.length || // 没有奖品
            awardIndex < 0 || // 出奖index不应该小于0   
            awardIndex > renderData.length - 1 // 出奖index不应该大于 奖品数
        )
            return;
        state.wheeling = true;
        state.awardIndex = awardIndex;
        setState(function (props) { return (__assign(__assign({}, props), { awardIndex: awardIndex })); });
        state.startRadian = 0;
        var distance = distanceToStop(awardIndex);
        rotatePanel(distance);
    };
    var rotatePanel = function (distance) {
        startWhell(distance);
        function startWhell(distance) {
            var changeRadian = (distance - state.startRadian) / 40;
            setState(function (props) { return (__assign(__assign({}, props), { startRadian: state.startRadian += changeRadian })); });
            // 当最后的目标距离与startRadian之间的差距低于0.001时，就默认奖品抽完了，可以继续抽下一个了。
            if (distance - state.startRadian <= 0.01) {
                successFun && successFun({
                    awardIndex: state.awardIndex,
                    title: renderData[state.awardIndex].title,
                    imgSrc: data[state.awardIndex].img
                });
                setState(function (props) { return (__assign(__assign({}, props), { wheeling: false })); });
                return;
            }
            // 初始角度改变后，需要重新绘制
            onLoad(renderWidth);
            animateRef.current = requestAnimationFrame(function () { return startWhell(distance); });
        }
        // 这里用一个缓动函数来计算每次绘制需要改变的角度，这样可以达到一个转盘从块到慢的渐变的过程
        // 循环调用rotatePanel函数，使得转盘的绘制连续，造成旋转的视觉效果
    };
    // 转盘旋转路径计算
    var distanceToStop = function (awardIndex) {
        // middleDegrees为奖品块的中间角度（最终停留都是以中间角度进行计算的）距离初始的startRadian的距离，distance就是当前奖品跑到指针位置要转动的距离。
        var middleDegrees = 0, distance = 0;
        // 映射出每个奖品的middleDegrees
        var awardsToDegreesList = renderData.map(function (item, index) {
            var awardRadian = (Math.PI * 2) / renderData.length;
            return awardRadian * index + (awardRadian * (index + 1) - awardRadian * index) / 2;
        });
        // 指针停留处
        middleDegrees = awardsToDegreesList[awardIndex];
        // 因为指针是垂直向上的，相当坐标系的Math.PI/2,所以这里要进行判断来移动角度
        distance = Math.PI * 3 / 2 - middleDegrees;
        distance = distance > 0 ? distance : Math.PI * 2 + distance;
        // 这里额外加上后面的值，是为了让转盘多转动几圈，看上去更像是在抽奖
        return distance + Math.PI * 40;
    };
    //绘制文字，文字过长进行换行，防止文字溢出
    var getLineTextList = function (context, text, maxLineWidth) {
        var wordList = text.split(''), tempLine = '', lineList = [];
        for (var i = 0; i < wordList.length; i++) {
            if (context.measureText(tempLine).width >= maxLineWidth) {
                lineList.push(tempLine);
                maxLineWidth -= context.measureText(text[0]).width;
                tempLine = '';
            }
            tempLine += wordList[i];
        }
        lineList.push(tempLine);
        return lineList;
    };
    // 获取底部图片，箭头图片
    var getBaseLotteryImg = function (img, className, style, onClick) {
        if (!img || typeof img === 'string') {
            return React.createElement("img", { src: img, className: className, style: __assign(__assign({}, style), arrowStyle), onClick: onClick, alt: "" });
        }
        return React.cloneElement(img, { className: className, style: style, onClick: onClick });
    };
    return React.createElement("div", { ref: prizeWheelWrapperRef, className: classes + " ararin-prizeWheel-wrapper", style: style },
        React.createElement("div", { style: { width: renderWidth || '', height: renderWidth || '' }, className: "ararin_prizeWheel_box" },
            getBaseLotteryImg(bgImg, 'ararin-pw-wheel-bg', __assign({}, bgStyle)),
            React.createElement("div", { className: "wheel_zone" },
                React.createElement("canvas", __assign({ height: renderWidth * devicePixelRatio, width: renderWidth * devicePixelRatio, ref: canvasRef }, restProps))),
            getBaseLotteryImg(arrowImg, 'ararin-pw-arrow-bg', __assign({ width: renderWidth * 0.33 }, arrowStyle), onClick)));
});
PrizeWheel.defaultProps = {
    data: [],
    bgImg: bgImgSrc,
    fontSize: 18,
    autoResize: true,
    arrowImg: arrowImgSrc,
};
export default PrizeWheel;
