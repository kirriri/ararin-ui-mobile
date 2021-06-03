export var refreshRate = function (callback, opt_sampleCount) {
    var hz;
    var time;
    var sample = opt_sampleCount || 45;
    var typicalHz = [0, 24, 25, 30, 50, 60, 72, 96, 100, 120, 144, 240, 300];
    var startTime = performance.now();
    var getFrame = function (now) {
        if (sample--) {
            requestAnimationFrame(getFrame);
            return false;
        }
        time = now - startTime;
        hz = typicalHz[0] = 1000 / (time / opt_sampleCount) + 0.5 << 0;
        typicalHz.sort(sortNumber);
        callback(hz, typicalHz[typicalHz.indexOf(hz) + 1] || typicalHz[typicalHz.length - 1]);
    };
    var sortNumber = function (a, b) {
        return a - b;
    };
    requestAnimationFrame(getFrame);
};
