const consoleSpeak = (method, speed) => {
    const oldMethod = console[method];

    console[method] = (...args) => {
        const message = args.map(JSON.stringify).join(" ");
        var utterThis = new SpeechSynthesisUtterance(message);
        // utterThis.pitch = pitch.value;
        // utterThis.rate = rate.value;
        window.speechSynthesis.speak(utterThis);
    }
}

consoleSpeak("log")
consoleSpeak("error")
consoleSpeak("warn")