document.addEventListener('DOMContentLoaded', () => {
    // Create a new WebSocket connection to the server
    const ws = new WebSocket('ws://localhost:3000');

    // Get references to the messages container and the message input field
    const messagesDiv = document.getElementById('messages');
    const messageInput = document.getElementById('messageInput');

    // Listen for incoming messages from the server
    ws.onmessage = (event) => {
        // Create a new message element using the received data
        const messageElement = createMessageElement(event.data);

        // Append the message element to the messages container
        messagesDiv.appendChild(messageElement);

        // Scroll to the bottom of the messages container
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    };

    // Listen for keypress events on the message input field
    messageInput.addEventListener('keypress', (event) => {
        // Check if the pressed key is "Enter" and the input field has a non-empty value
        if (event.key === 'Enter' && messageInput.value.trim()) {
            // Send the message to the server
            ws.send(messageInput.value);

            // Clear the input field
            messageInput.value = '';
        }
    });

    // Helper function to create a message element
    const createMessageElement = (message) => {
        // Create a new div element for the message
        const messageElement = document.createElement('div');

        // Set the message text as the content of the element
        messageElement.textContent = message;

        // Add the "message" class to the element
        messageElement.classList.add('message');

        // Check if the message starts with "User:" or "Bot:"
        if (message.startsWith('User:')) {
            // If it starts with "User:", add the "user" class
            messageElement.classList.add('user');
        } else if (message.startsWith('Bot:')) {
            // If it starts with "Bot:", add the "bot" class
            messageElement.classList.add('bot');
        }

        // Return the created message element
        return messageElement;
    };
});