const VENDORS = ['webkit', 'moz', 'ms', '0']
let lastTime = 0

for (let v = 0; v < VENDORS.length && !window.requestAnimationFrame; v++) {
    if (window[VENDORS[v] + 'RequestAnimationFrame']) {
        window.requestAnimationFrame = window[VENDORS[v] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[VENDORS[v] + 'CancelAnimationFrame'] || window[VENDORS[v] + 'CancelRequestAnimationFrame'];
        break
    }
}

if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (callback) {
        let currTime = new Date().getTime()
        let timeToCall = Math.max(0, 16 - (currTime - lastTime))
        let id = window.setTimeout(function () {
            callback(currTime + timeToCall)
        }, timeToCall)

        lastTime = currTime + timeToCall

        return id
    }
}

if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function (id) {
        clearTimeout(id)
    }
}