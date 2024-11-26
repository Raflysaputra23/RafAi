const FormatText = (text) => {
    text = text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
    text = text.replace(/###(.*?)###/g, "<b>$1</b>");
    return text;
};

export default FormatText;