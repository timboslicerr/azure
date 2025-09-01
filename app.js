function login() {
    const username = document.getElementById('username').value;
    if (username) {
        document.querySelector('.login').style.display = 'none';
        document.querySelector('.chat').style.display = 'block';
        // Here you would typically send the username to the server for authentication
    }
}

function sendMessage() {
    const message = document.getElementById('message').value;
    if (message) {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        document.getElementById('messages').appendChild(messageElement);
        document.getElementById('message').value = '';
        // Here you would typically send the message to the server
    }
}
