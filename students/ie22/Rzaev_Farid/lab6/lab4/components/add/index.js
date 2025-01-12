export class AddPageComponent {
    constructor(parent) {
        this.parent = parent
    }

    getHTML() {
        return (
            `
            <form>
                <label for="input1">url :</label>
                <input type="text" id="input1" name="input1"><br><br>
                <label for="input2">title:</label>
                <input type="text" id="input2" name="input2"><br><br>
                <label for="input3">text:</label>
                <input type="text" id="input3" name="input3"><br><br>
            </form>
            
            `
        )
    }
   
    render() {
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
        
    }
}