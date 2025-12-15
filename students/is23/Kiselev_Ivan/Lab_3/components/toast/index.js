export class ToastComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        const { title, message, type = "info" } = data;
        const bgClass = type === "error" ? "bg-danger" : "bg-success";
        const icon = type === "error" ? "❌" : "✅";

        return `
            <div class="toast show ${bgClass} text-white" role="alert" aria-live="assertive" aria-atomic="true" style="min-width: 320px; max-width: 400px; animation: slideIn 0.3s ease-out;">
                <div class="toast-header">
                    <strong class="me-auto">${icon} ${title}</strong>
                    <small>Только что</small>
                    <button type="button" class="btn-close btn-close-white ms-2 mb-1" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                    ${message}
                </div>
            </div>
        `;
    }

    render(data) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        
        setTimeout(() => {
            const toastEl = this.parent.lastElementChild;
            if (toastEl) {
                toastEl.classList.remove('show');
                setTimeout(() => toastEl.remove(), 300);
            }
        }, 5000);
    }
}