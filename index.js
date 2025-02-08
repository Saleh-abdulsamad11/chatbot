const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatBox = document.querySelector(".chatbox");

let userMessage;
const API_KEY = "w9G1C7cBe4bkW15BMDCAT3BlbkFJF6ApB2d0x3lUhkQYv6sdTEp1e4C6RdFvUMV8wHgzuVPtjyT8WOicQB0TnAn944zlmhi14-eu0A";

const createChatLi = (message, className) => {
    // Create a class list element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContext = className === "outgoing" ? `<p>${message}</p>` : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
    chatLi.innerHTML = chatContext;
    return chatLi;
}

const generateResponse = () => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            "Autorization" : `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            /* model: "gpt-4o-mini", */
            messages: [{role: "sytem", content: userMessage}] 
        })
    }
    // Send post request to API, get response
    fetch(API_URL, requestOptions).then(res => res.json()).then(date => {
        console.log(date)
    }).catch((error) => {
        console.log(error);
    })
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if(!userMessage) return;

    // Append the user message to the box
    chatBox.appendChild(createChatLi(userMessage, "outgoing"));
    setTimeout(() => {
        // Display Thinking message while waiting for response
        chatBox.appendChild(createChatLi("Thinking...", "incoming"));
        generateResponse();
    }, 600);
}

sendChatBtn.addEventListener("click", handleChat)