export class BadgesComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getBadgeClass(badgeType) {
        const badgeClasses = {
            'новинка': 'bg-primary',
            'хит': 'bg-danger', 
            'акция': 'bg-success',
            'популярное': 'bg-warning text-dark',
            'рекомендуем': 'bg-info',
            'премиум': 'bg-purple text-white',
            'сезонное': 'bg-pink text-white'
        };
        
        return badgeClasses[badgeType] || 'bg-secondary';
    }

    getHTML(badges) {
        return `
            <div class="d-flex flex-wrap gap-1">
                ${badges.map(badge => `
                    <span class="badge ${this.getBadgeClass(badge)}">${badge}</span>
                `).join('')}
            </div>
        `;
    }

    render(badges) {
        const html = this.getHTML(badges);
        this.parent.insertAdjacentHTML('beforeend', html);
    }
}