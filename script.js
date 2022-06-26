document.addEventListener("DOMContentLoaded", () => {
    const total = [];
    let totalValue = 0;
    const customTipAmount = [];
    let tipAmount = 0.15;

    createBtn();
    function createBtn(){
        const numbers = document.querySelector(".number-btns");
        console.log(numbers)
        for(let i=0; i<12; i++) {
            let numBtn = document.createElement("button");
            numBtn.setAttribute("id", (12-i)-3);
            numBtn.classList.add("number-btn")
            numBtn.innerHTML = numBtn.id;
            numbers.appendChild(numBtn)
            if(numBtn.id == -1){
                numBtn.innerHTML = "";
                let icon = document.createElement("img");
                icon.setAttribute("src", "images/arrow-left.svg");
                numBtn.appendChild(icon);
            }
            else if(numBtn.id == -2) {
                numBtn.innerHTML = "";
                let icon = document.createElement("img");
                icon.setAttribute("src", "images/ellipse.svg");
                numBtn.appendChild(icon);
            }
        }
    }


    $(".number-btn").click((e)=>{
        let currentNum = e.target.id;
        selectedArray = total;
        if(document.getElementById("-2").disabled) {
            console.log("dis");
            selectedArray = customTipAmount;
        }
        console.log(currentNum);
        if (currentNum == -1) {
            removeNum(selectedArray)
        }
        else if (currentNum == -2) {
            if (!selectedArray.includes(".")) {
                selectedArray.push(".");
            }
        }
        else {
            selectedArray.push(currentNum)
        }

        console.log(selectedArray)
        let num = selectedArray.join("");
        (selectedArray == customTipAmount)? 
        document.getElementById("tip-value").innerHTML = num + "% tip" :
        (document.getElementById("total-before-tip").innerHTML = "$"+num)&&(totalValue=parseFloat(num));
        calculateTip();
        
    })

    function calculateTip() {
        if (!isNaN(totalValue)){
            document.getElementById("calculated-tip").innerHTML = (totalValue*tipAmount).toFixed(2);
            document.getElementById("calculated-final").innerHTML = (totalValue + (totalValue*tipAmount)).toFixed(2);
        }
    }
        

    function removeNum(selectedArray) {
        if (selectedArray.length > 0) {
            total.pop()
        }
        console.log(selectedArray + "hi");
    }

    $(".tip-amount").click((e) =>{
        let numOfTips = document.getElementsByClassName("tip-amount");
        for(i=0; i<4; i++) {
            numOfTips[i].classList.remove("selected-tip");
        }
        let tipID = e.target.id;
        tipAmount = tipID;
        document.getElementById("tip-value").innerHTML = tipAmount*100 + "% tip";
        e.target.classList.add('selected-tip')
        calculateTip();
    })

    $(".custom-tip").click((e) => {
        console.log(e.target);
        e.target.classList.add("selected-custom")
        
    })

    $(".custom-tip").dblclick((e) => {
        console.log("double trouble");
        e.target.style.display = "none";
        document.getElementById("save").style.display = "flex";
        document.getElementById("-2").disabled = true;
    })

    $("#save").click((e) => {
        e.target.style.display = "none";
        document.querySelector(".custom-tip").style.display = "flex";
        document.getElementById("-2").disabled = false;
        tipAmount = customTipAmount.join("")/100;
        document.querySelector(".custom-tip").setAttribute("id", customTipAmount.join("")/100);
        calculateTip();
    }
    )
})