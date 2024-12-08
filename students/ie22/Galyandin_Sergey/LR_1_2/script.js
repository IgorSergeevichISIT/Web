window.onload = function(){ 
    const input = document.getElementById("result")
    const numbers = document.querySelectorAll(".my_btn")
    const operators = document.querySelectorAll(".Special_btn_primary")
    const operatorsSpecial = document.querySelectorAll(".Special_btn_primary_x")
    const equal = document.getElementById("btn_op_equal")
    const clearall = document.getElementById("btn_op_clear")
    const clear = document.getElementById("btn_op_backspace")
    const sign = document.getElementById("btn_op_sign")
    const backColor = document.getElementById("back")
    const inputColor = document.getElementById("inputColor")
    let lastOperator
    let lastNumber

    numbers.forEach(item => {
        item.addEventListener("click", () => {
            if (isNaN(Number(input.innerHTML[input.innerHTML.length - 1])) && item.innerHTML == "."){
                return
            } else {
                let inputArr = input.innerHTML.split(" ")
                console.log(inputArr)
                let lastNumb = inputArr[inputArr.length - 1]
                let bool
                if (lastNumb != "") {
                    // [2, +, 2!, +, 0]
                    if (lastNumb.includes("%")) {
                        lastNumb = lastNumb.split("%")
                        bool = validation(lastNumb[1], item)
                    } else if(lastNumb.includes("!")) {
                        lastNumb =  lastNumb.split("!")
                        bool = validation(lastNumb[1], item)
                    } else if (lastNumb.includes("^")) {
                        lastNumb =  lastNumb.split("^")
                        bool = validation(lastNumb[1], item)
                    } else if (lastNumb.includes("√")) {
                        lastNumb =  lastNumb.split("√")
                        bool = validation(lastNumb[1], item)
                    } else {
                        bool = validation(lastNumb, item)
                    }
                }
                if(bool) return
                if (input.innerHTML == "0" && item.innerHTML == "." ) {
                    input.innerHTML += item.innerHTML
                }else if (input.innerHTML == "0" && item.innerHTML == "000"){
                    input.innerHTML = "0"
                }else if (input.innerHTML == "0") {
                    input.innerHTML = item.innerHTML
                } else if ((input.innerHTML[input.innerHTML.length - 1] == "." && item.innerHTML == ".") || (input.innerHTML[input.innerHTML.length - 1] == " " && item.innerHTML == ".")) {
                    return
                } else {
                    input.innerHTML += item.innerHTML
                }
                lastNumber = input.innerHTML.split(" ").slice(-1)
            }
        })
    })

    operators.forEach(item => {
        item.addEventListener("click", (event) => {
            if (!isNaN(Number(input.innerHTML[input.innerHTML.length - 1])) ){

                if (input.innerHTML[input.innerHTML.length - 1] != " " && item.innerHTML != "=") {
                    input.innerHTML += item.innerHTML
                } else if (item.innerHTML != "=") {
                    const inputArr = input.innerHTML.split(" ")
                    inputArr[inputArr.length - 2] = item.innerHTML[1]
                    input.innerHTML = inputArr.join(" ")
                }

                if (event.target.innerHTML == "=") {
                    return
                } else {
                    lastOperator = event.target.innerHTML
                }
            }
        })
    })

    operatorsSpecial.forEach(item => {
        item.addEventListener("click", (event) => {
            const res = input.innerHTML.split(" ")
            if(res[res.length - 1].includes("^") || res[res.length - 1].includes("√") || res[res.length - 1].includes("%") || res[res.length - 1].includes("!")){
                return
            }
            if (input.innerHTML[input.innerHTML.length - 1] != "^" && input.innerHTML[input.innerHTML.length - 1] != "!" && input.innerHTML[input.innerHTML.length - 1] != "%" && input.innerHTML[input.innerHTML.length - 1] != "√") {
                input.innerHTML += item.innerHTML
            } else if (input.innerHTML[input.innerHTML.length - 1] == "^" || input.innerHTML[input.innerHTML.length - 1] == "!" || input.innerHTML[input.innerHTML.length - 1] == "%" || input.innerHTML[input.innerHTML.length - 1] == "√") {
                return ""
            }
            if (event.target.innerHTML == "=") {
                return
            } else {
                lastOperator = event.target.innerHTML
            }
        
        })

    })

    equal.addEventListener("click", (event) => {
        let degree = 0
        let result1 = input.innerHTML.split(" ")
        let persentage = 0
        x= true

        for(let i = 0;i <= result1.length - 1; i++){
            if(result1[i].includes("^")){
                const arr = result1[i].split("^")
                result1[i] = Math.pow(arr[0], arr[1])
                continue
            }
            
            if(result1[i].includes("!")){
                let x = 1
                const arr1 = result1[i].split("!")
                if(arr1[0] == 0 || arr1[0] == 1){
                    result1[i] = "1"
                }
                if(arr1[0] >= 99){
                    input.innerHTML = 0
                    alert("Слишком большой факториал")
                    return
                }
                for(let k = 1; k <= arr1[0]; k++){
                    x *= k
                }
                if (!isNaN(Number(arr1[1])) && arr1[1] != ""){
                    x *= arr1[1]
                }
                result1[i] = x
                continue
            }
            if(result1[i].includes("%")){
                const arr2 = result1[i].split("%")
                result1[i] = arr2[0]/100 *arr2[1]
                continue
            }
            if(result1[i].includes("√")){
                const arr3 = result1[i].split("√")
                if(arr3[1] <= 0){
                    alert("Корень отрицательный или равен нулю")
                    return
                }
                if (arr3[0] == "") {
                    result1[i] = 1 * Math.sqrt(arr3[1])
                } else {
                    result1[i] = arr3[0] * Math.sqrt(arr3[1])
                }
                continue
            }

        }

        let result = result1.join("")
        if (input.innerHTML[input.innerHTML.length - 1].slice(-1) == " " || (input.innerHTML.split(" ").length == 1 && !input.innerHTML.includes("^") && !input.innerHTML.includes("%") && !input.innerHTML.includes("!") && !input.innerHTML.includes("√"))) {
            let clac = input.innerHTML + lastOperator + lastNumber
            input.innerHTML = eval(clac)
        } else {
            result = eval(result)
            input.innerHTML = result
        }

        if (isNaN(Number(result))){
            input.innerHTML = 0
            alert("ОШИБКА")
            return
        }

    })
    clearall.addEventListener("click", () => {
        input.innerHTML = "0"
    })

    clear.addEventListener("click", () =>{
        if (input.innerHTML[input.innerHTML.length - 1]==" ") {
            input.innerHTML = input.innerHTML.slice(0, -3)
        }
        else if (input.innerHTML.length==1){
            input.innerHTML = "0"
        }
        else {
            input.innerHTML = input.innerHTML.slice(0, -1)
        }

    })


    sign.addEventListener("click", () => {
        let inputArr = input.innerHTML.split(" ")
        if (!isNaN(Number(inputArr[inputArr.length - 1])) ){
            inputArr[inputArr.length - 1] = inputArr[inputArr.length - 1] * (-1)
            input.innerHTML = inputArr.join(" ")
        }
    })

    backColor.addEventListener("click", () => {
        changeBackground()
    })

    inputColor.addEventListener("click", () => {
        changeInput()
    })
}

function validation (lastNumb, item) {
    return (lastNumb == "0" && item.innerHTML == "0") || (lastNumb == "0" && item.innerHTML == "000") || (lastNumb.includes(".") && item.innerHTML == ".")
}

function changeBackground() {
    let backgroundImage = body.style.backgroundImage;
    if (backgroundImage == "") {
        body.style.backgroundImage = "none"
    } else if (backgroundImage == "none") {
        body.style.backgroundImage = "url(gleblox.jpg)"
    } else {
        body.style.backgroundImage = "none"
    } 
}

function changeInput() {
    let color = result.style.background;
    if (color == "") {
        result.style.background = "black"
    } else if (color == "black") {
        result.style.background = "rgb(195, 73, 200)"
    } else {
        result.style.background = "black"
    }
}