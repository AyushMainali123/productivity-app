

onmessage = (event) => {
    let intervalID;
    
    if (event.data.type === "START") {
        let minute = event.data.minute;
        let second = event.data.second;
        intervalID = setInterval(() => {
            postMessage("STARTED!!", minute, second)
            minute--;
            second--;
        }, 1000)
    }

    if (event.data.type === "STOP") {
        clearInterval(intervalID);
        postMessage("ENDED")
    }
    
}

export {}