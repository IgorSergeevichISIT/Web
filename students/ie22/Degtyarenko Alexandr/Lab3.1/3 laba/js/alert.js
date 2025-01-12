function showAlert(message) {
    const notificationContainer = document.getElementById('notificationContainer');

    const notification = document.createElement('div');
    notification.className = 'notification bubble-notification bg-green-500 text-white p-2 rounded-lg shadow';
    notification.textContent = message;

    notificationContainer.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 2000);
}
