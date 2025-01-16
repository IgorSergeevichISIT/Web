export class Product {
    constructor(parent) {
        this.parent = parent
    }

    getHTML(data) {
        return (
            // `
            //     <div class="card mb-3" style="width: 840px;">
            //         <div class="row g-0">
            //             <div class="col-md-8">
            //                 <img src="${data.src}" class="img-fluid" alt="картинка">
            //             </div>
            //             <div class="col-md-4">
            //                 <div class="card-body">
            //                     <h5 class="card-title">${data.title}</h5>
            //                     <p class="card-text">${data.text}</p>
            //                 </div>
            //             </div>

            //         </div>
            //     </div>
            //     <div id="liveAlertPlaceholder"></div>
            //     <button type="button" class="btn btn-primary" id="liveAlertBtn">Show live alert</button>
            // `

            `
            <div class="card mb-3" style="width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${data.src}" class="img-fluid" alt="картинка">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${data.title} ${data.text}</h5>
                        </div>
                    </div>
                </div>
            </div>
            `
        )
    }

    render(data) {
        const html = this.getHTML(data)
        
        this.parent.insertAdjacentHTML('beforeend', html)

        const alertPlaceholder = document.getElementById('liveAlertPlaceholder')

        const appendAlert = (message, type) => {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" setTimeout="2" role="alert">`,
            `   <div>${message}</div>`,
            '</div>'
        ].join('')

        alertPlaceholder.append(wrapper)


        }

        const alertTrigger = document.getElementById('liveAlertBtn')
        if (alertTrigger) {
        alertTrigger.addEventListener('click', () => {
            
            if(data.title == "Кот 1")
            {
            appendAlert('Слышь, э! Где еда ?', 'success')
            }
            else if (data.title == "Кот 2")
            {
                appendAlert('МУР', 'info')
            }
            else if (data.title == "Кот 3")
            {
                appendAlert('Как жить в этом бренном мире?', 'info')
            }
            setTimeout(() => {
                alertPlaceholder.innerHTML = ''
            }, 2000);
            
            
        })
}
        }


}