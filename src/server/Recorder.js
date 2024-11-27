

const Recorder = () => {
    if(!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
        console.log("Speech Recognition is not supported in this browser.");
        return false;
    } else {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.lang = "id-ID";
        recognition.interimResults = true;
        return recognition;
    }
}

export default Recorder;