window.onload = function(){
    var nextPosFont = 1;
    const lengths = [0 , 5,12];
    const fontSizes = ["3.8rem", "2rem","1.7rem"];
    const operations = ["+", "-", "%", "*","/"];
    var isAnimated = false;
    var outputElement = document.getElementById("result");
    outputElement.innerHTML = "0";
    let clearButton = document.getElementById("btn_clear");
    let backButton = document.getElementById("btn_back");
    let resultButton = document.getElementById("btn_equal");
    let buttonTheme = document.getElementById("btn_them");
    let digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]');
    let operationButtons = document.querySelectorAll('[id ^= "btn_op_"]');
    AddEventButton(digitButtons,WriteNum);
    AddEventButton(operationButtons,WriteOperation);
    clearButton.addEventListener("click",ClearResualt);
    backButton.addEventListener("click",BackSymbol);
    buttonTheme.addEventListener("click",ChangeTheme);
    resultButton.addEventListener("click",GetResult)
    document.body.addEventListener("transitionend", () => {isAnimated=false;});
    document.body.addEventListener("transitionrun", () => {isAnimated=true;});
    function ClearResualt(){
        outputElement.innerHTML= "0";
        curPosFont = 0;
        nextPosFont = 1;
        outputElement.style.fontSize = fontSizes[curPosFont];
    }
    function BackSymbol()
    {
        if(outputElement.innerHTML.length == 1) outputElement.innerHTML = "0";
        else outputElement.innerHTML = outputElement.innerHTML.substring(0,outputElement.innerHTML.length-1); 
        CheckLenResult();
    }
    function GetResult() {
        if(outputElement.innerHTML[outputElement.innerHTML.length-1] == '.')return;
        let persentNumStr = "";
        let numOfPersentStr = "";
        let havePersent = false;
        let pos = outputElement.innerHTML.length;
        while(pos >=0 ){
            if(outputElement.innerHTML[pos] == "%") {
                let isOperation = false;
                pos--
                havePersent = true;
                while(pos>=0)
                {
                    for(let j = 0; j<operations.length;j++){
                        if(operations[j] == outputElement.innerHTML[pos]){
                            isOperation = true;
                        }
                    }
                    if(isOperation)break;
                    persentNumStr +=outputElement.innerHTML[pos]
                    pos--;
                }
                break;
            }
            pos--;
        }
        if(pos == -1&&havePersent) {
            outputElement.innerHTML = "0";
            CheckLenResult();
            return;
        }
        if(havePersent)
        {
            let priorityOperation = false;
            if(outputElement.innerHTML[pos] == "*"||outputElement.innerHTML[pos] == "/") priorityOperation = true;
            let newPos = 0;
            for(let i =pos-1; i >=0;i-- ){
                if((outputElement.innerHTML[i] == "+"||outputElement.innerHTML[i] == "-")&&priorityOperation){
                    newPos=i;
                    break;
                }
                numOfPersentStr +=outputElement.innerHTML[i];
            }
            let persentNum = parseFloat(persentNumStr.split('').reverse().join(''));
            let numOfPersent = parseFloat(eval(numOfPersentStr.split('').reverse().join('')));
            let percent = String((persentNum*numOfPersent)/100);
            if(priorityOperation)outputElement.innerHTML = outputElement.innerHTML.substring(0, newPos+1) + percent;
            else outputElement.innerHTML = outputElement.innerHTML.substring(0, pos+1) + percent;
            console.log(outputElement.innerHTML);
        }
        outputElement.innerHTML = eval(outputElement.innerHTML);
        if(outputElement.innerHTML =="NaN")outputElement.innerHTML = "0";
        
        CheckLenResult();
    }
    function ChangeTheme(){
        if(isAnimated == false){
            let infos = document.getElementsByClassName("info");
            if(document.body.style.backgroundImage == 'url("Кавказские горы _ 4к таймлапс (1).jpg")' ){
                document.body.style.backgroundImage = 'url("Кавказские горы _ 4к таймлапс.jpg")';
                outputElement.style.background = "#F8F4FF";
                outputElement.style.color = "rgb(67, 65, 55)";
                for(let i = 0;i<infos.length;i++){
                    infos[i].style.color = "rgb(0,0,0)";
                }
                
                for(let i = 0;i<digitButtons.length;i++){
                    digitButtons[i].style.background = "#F8F4FF";
                    digitButtons[i].style.color = "rgb(67, 65, 55)";
                }
            }
            else{
                document.body.style.backgroundImage = 'url("Кавказские горы _ 4к таймлапс (1).jpg")';
                outputElement.style.background = "rgb(67, 65, 55)";
                outputElement.style.color = "#FFFFFF";
                for(let i = 0;i<infos.length;i++){
                    infos[i].style.color = "#FFFFFF";
                }
                for(let i = 0;i<digitButtons.length;i++){
                    digitButtons[i].style.background = "rgb(67, 65, 55)";
                    digitButtons[i].style.color = "#FFFFFF";
                }
            }
        }
    }
    function AddEventButton(buttons,func)
    {
        for(let i = 0;i<buttons.length;i++){
            buttons[i].addEventListener("click",() =>func(buttons[i].textContent));
        }
    }
    function CheckLenResult(){
        if(outputElement.innerHTML.length > lengths[nextPosFont]){
            outputElement.style.fontSize = fontSizes[nextPosFont];
            nextPosFont++;
        }
        else if( outputElement.innerHTML.length <= lengths[nextPosFont-1]){
            if(nextPosFont>1) nextPosFont--;
            outputElement.style.fontSize = fontSizes[nextPosFont-1];
        }
        
    }
    function WriteNum(num){
        let lastIsOperation = false;
        if(outputElement.innerHTML.length > 2)
        {
            for(let i = 0; i<operations.length;i++){
                if(operations[i] == outputElement.innerHTML[outputElement.innerHTML.length-2])lastIsOperation = true;
            }
        }
        let count = 0;
        for(let i =outputElement.innerHTML.length-1; i >=0;i-- ){
            if(outputElement.innerHTML[i] == ".") count++
            let isOperation = false;
            for(let j = 0; j<operations.length;j++){
                if(operations[j] == outputElement.innerHTML[i])isOperation = true;
            }
            if(isOperation)break;
        }
        if(count>0&&num==".") return;
        for(let i = 0; i<operations.length;i++){
            if(operations[i] == outputElement.innerHTML[outputElement.innerHTML.length-1]&&num==".")return;
        }
        if(outputElement.innerHTML == "0"&&num!="."||outputElement.innerHTML =="Infinity"){
            outputElement.innerHTML = num;
        }
        else if(outputElement.innerHTML[outputElement.innerHTML.length-1] == "0" && lastIsOperation && num !="."){
            outputElement.innerHTML=outputElement.innerHTML.substring(0, outputElement.innerHTML.length-1) + num;
        }
        else {         
            outputElement.innerHTML += num;
        }
        CheckLenResult();
        outputElement.scrollLeft = outputElement.scrollWidth ;
    }
    function WriteOperation(operation){
        let lastNum = "";
        let operationPos = 0;
        for(let i =outputElement.innerHTML.length-1; i >=0;i-- ){
            let isOperation = false;
            for(let j = 0; j<operations.length;j++){
                if(operations[j] == outputElement.innerHTML[i]){
                    operationPos =i;
                    isOperation = true;
                    break;
                }
            }
            if(isOperation) break;
            lastNum +=outputElement.innerHTML[i];
        }
        if(operation == "√" ){
            if(outputElement.innerHTML[operationPos] == "-"&&operationPos == 0)outputElement.innerHTML = "NaN";
            else if(operationPos == 0)outputElement.innerHTML = String(Math.sqrt(parseFloat(lastNum.split('').reverse().join(''))));
            else if(lastNum.length>0)outputElement.innerHTML=outputElement.innerHTML.substring(0,operationPos+1) + String(Math.sqrt(parseFloat(lastNum.split('').reverse().join(''))));
            return;
        }
        else if(operation == "x²"){
            if(operationPos == 0)outputElement.innerHTML = String(Math.pow(parseFloat(lastNum.split('').reverse().join('')),2));
            else if(lastNum.length>0)outputElement.innerHTML=outputElement.innerHTML.substring(0,operationPos+1) + String(Math.pow(parseFloat(lastNum.split('').reverse().join('')),2));
            return;
        }
        else if(operation == "x!"){
            let res = 1;
            if(lastNum.split('').reverse().join('') >100){
                outputElement.innerHTML = "Infinity";
                return;
            }
            for(let i = 2;i<=parseFloat(lastNum.split('').reverse().join(''));i++) res*=i;
            if(operationPos == 0)outputElement.innerHTML = String(res);
            else if(lastNum.length>0)outputElement.innerHTML=outputElement.innerHTML.substring(0,operationPos+1) + String(res);
            return;

        }
        
        if(operation == "%")
        {
            outputElement.innerHTML +=operation;
            GetResult();
            return;
        }
        if(outputElement.innerHTML[outputElement.innerHTML.length-1] == '.')return;
        if(operation == "x") operation = "*";
        let lastIsOperation = false;
        for(let i = 0; i < operations.length;i++){
            if(outputElement.innerHTML[outputElement.innerHTML.length-1] == operations[i]){
                lastIsOperation = true;
            } 
        }
        if(operation != "+/-"){
            if(lastIsOperation) outputElement.innerHTML= outputElement.innerHTML.substring(0, outputElement.innerHTML.length-1)+operation; 
            else outputElement.innerHTML += operation;
            
        }
        else{
            for(let i =outputElement.innerHTML.length-1; i >=0;i-- ){
                let isOperation = false;
                for(let j = 0; j<operations.length;j++){
                    if(operations[j] == outputElement.innerHTML[i])isOperation = true;
                }
                if(i == 0){
                    if(outputElement.innerHTML[i] == "-"){
                        outputElement.innerHTML = outputElement.innerHTML.substring(i+1,outputElement.innerHTML.length);
                    }
                    else{
                        if(outputElement.innerHTML[i] !="0")outputElement.innerHTML = "-"+outputElement.innerHTML.substring(i,outputElement.innerHTML.length)
                    }
                    
                }
                if(isOperation){
                    if(outputElement.innerHTML[i] == "-"){
                        outputElement.innerHTML = outputElement.innerHTML.substring(0,i) +"+"+outputElement.innerHTML.substring(i+1,outputElement.innerHTML.length);
                    }
                    else if(outputElement.innerHTML[i] == "+"){
                        outputElement.innerHTML = outputElement.innerHTML.substring(0,i) +"-"+outputElement.innerHTML.substring(i+1,outputElement.innerHTML.length)
                    }
                    break;
                }
                
            }
        }
        CheckLenResult();
        outputElement.scrollLeft = outputElement.scrollWidth ;
     
    }
}

