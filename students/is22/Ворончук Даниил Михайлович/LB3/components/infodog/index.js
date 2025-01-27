export class InfoDogComponent {
    constructor(parent) {
        this.parent = parent
    }

    getHTML(data) {
        return (
            `
                <div class="tw-container tw-flex tw-border-2 tw-mb-3">
                        <div class="tw-basis-1/3">
                            <img src="${data.src}" class="tw-w-full tw-h-auto" alt="картинка">
                        </div>
                        <div class="tw-basis-2/3 tw-px-5 tw-py-2">
                            <h1 class="tw-text-2xl">${data.title}</h5>
                            <p class="">${data.text}</p>
                        </div>
                </div>
            `
        )
    }

    render(data) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
    }
}

