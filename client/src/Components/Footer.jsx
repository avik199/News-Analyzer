import React, { useState, useRef } from 'react'
import botimg from '../assets/chatBot.png'
export default function Footer() {
    const [botExtended, setbotExtended] = useState(false)
    const iframeRef = useRef(null);

    // Function to handle manipulation of the iframe
    const manipulateIframe = () => {
        // Access the iframe DOM node using the ref
        console.log("Hello")
        const iframe = iframeRef.current;

        // Check if the iframe exists
        if (iframe) {
            iframe.contentWindow.postMessage({ action: 'manipulateDOM' }, '*');
            // Example: Access content inside the iframe (assuming it's from the same origin)
            const iframeDocument = iframe.contentWindow
                ? iframe.contentWindow.document
                : iframe.contentDocument;
            const input = iframeDocument.querySelector('query');
            console.log(input)
            input.placeHolder = "My text.."
            iframeBody.style.backgroundColor = 'lightblue';
        }
    };
    // Event listener to handle messages from the iframe

    function toggleBot() {
        setbotExtended(prev => {
            // if (!prev)
            // manipulateIframe()
            return !prev
        })
    }
    const botStyle = {
        position: 'fixed',
        top: '75%',
        left: 'calc(100% - 320px)',
        transform: 'translateY(-50%)',

        padding: '20px',

    };
    return (
        <df-messenger
            intent="Greetings"
            chat-title="ChatBot"
            agent-id="712f5f71-5788-4d64-bdc6-4497779cdc21"
            language-code="en"
        ></df-messenger>
    )
}
