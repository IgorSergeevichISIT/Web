export class NavBar {
    constructor(parent, nav) {
        this.parent = parent;
        this.nav = nav
    }
    
    getHTML() {
        return (
            `
                <div class="container-fluid">
                    <span class="navbar-brand" href="#">SelectCat.meow</span>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link-active" aria-current="page" href="#" id="home">Home</a>
                            </li>
                        </ul>
                    </div>
                </div>
            `
        )
    }

    render() {
        const html = this.getHTML()
        this.nav.insertAdjacentHTML('beforeend', html);
    }
}