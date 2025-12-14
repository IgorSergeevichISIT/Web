export class DogCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="card m-3" style="width: 20rem;">
                <img src="${data.image}" 
                    class="card-img-top" 
                    alt="${data.breed}" 
                    style="height: 220px; object-fit: cover;"
                    onerror="this.src='https://via.placeholder.com/300x220?text=No+Image'">
                
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${data.breed}</h5>
                    <p class="card-text text-muted mb-3">${data.shortDescription}</p>
                    
                    <!-- Этот div всегда будет внизу -->
                    <div class="mt-auto">
                        <div class="d-flex justify-content-between align-items-center">
                            <button class="btn btn-primary btn-sm" 
                                    id="view-dog-${data.id}" 
                                    data-id="${data.id}">
                                <i class="bi bi-eye"></i> Подробнее
                            </button>
                            
                            <button class="btn btn-danger btn-sm" 
                                    id="delete-dog-${data.id}" 
                                    data-id="${data.id}">
                                <i class="bi bi-trash"></i> Удалить
                            </button>
                        </div>
                        
                        <div class="mt-2">
                            <small class="text-muted">ID: ${data.id}</small>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

addListeners(data, viewListener, deleteListener) {
    document
        .getElementById(`view-dog-${data.id}`)
        .addEventListener("click", viewListener);
        
    document
        .getElementById(`delete-dog-${data.id}`)
        .addEventListener("click", () => {
            deleteListener(data.id, data.breed);
        });
}

    render(data, viewListener, deleteListener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, viewListener, deleteListener);
    }
}