export class ToastComponent {
    private parent: HTMLElement;

    constructor(parent: HTMLElement) {
        this.parent = parent;
    }

    private getHTML(message: string): string {
        return `
        <div class="toast-container position-fixed top-0 start-50 translate-middle-x p-3" style="z-index: 2000;">
            <div id="liveToast" class="toast align-items-center text-bg-success border-0 show" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body">
                        ${message}
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
        </div>
        `;
    }
    render(message: string): void {
        // Удаляем старый тост, если он уже есть
        const existing = document.querySelector('.toast-container');
        if (existing) existing.remove();

        // Добавляем новый
        this.parent.insertAdjacentHTML('beforeend', this.getHTML(message));

        // Показываем тост через Bootstrap API
        const toastElement = document.getElementById('liveToast');
        if (toastElement) {
            // @ts-ignore
            const toast = new bootstrap.Toast(toastElement, { delay: 3000 });
            toast.show();
        }
    }
}
