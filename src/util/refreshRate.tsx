    export const refreshRate = (callback: Function, opt_sampleCount: number) => {
		let hz;
		let time;
		let sample = opt_sampleCount || 45;
		let typicalHz = [0,24,25,30,50,60,72,96,100,120,144];
		let startTime = performance.now();
		
		const getFrame = (now: number) => {
			if (sample--) {
				requestAnimationFrame(getFrame);
				return false;
			}
			time = now - startTime;
			hz = typicalHz[0] = 1000 / (time / opt_sampleCount) + 0.5 << 0;
			typicalHz.sort(sortNumber);
			callback(hz, typicalHz[typicalHz.indexOf(hz) + 1] || typicalHz[typicalHz.length - 1]);
		}
		
		const sortNumber = (a: number, b :number) => {
			return a - b;
        }
        
        requestAnimationFrame(getFrame);
	}