const dBound = (fn, wait) => {
    let timeOutId;
    return (...arg) => {
        if (timeOutId) {
            clearTimeout(timeOutId)
        }
        timeOutId = setTimeout(() => {
            fn.apply(null, arg)
        }, wait);
    }
}

export default dBound