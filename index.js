let buttons = document.querySelectorAll('.buttons button');
let display = document.querySelector('input');
let storageDrawer = document.querySelector('.main .storage');
let storage = document.querySelector('.main .storage .data');
let bar = document.querySelector(".display .icon");
let cancel = document.querySelector(".storage .icon");

document.addEventListener("DOMContentLoaded", () => {
    display.value = 0;
    insertDataInStorage();
});

bar.addEventListener('click', () => {
    storageDrawer.classList.add('active-storage');
});

cancel.addEventListener('click', () => {
    storageDrawer.classList.remove('active-storage');
});

const replaceInputValue = (inputString) => {
    let change1 = inputString.replace('*', "X");
    let change2 = change1.replace('/', "÷");

    return change2;
};

const replaceResultValue = (inputString) => {
    let change1 = inputString.replace('X', "*");
    let change2 = change1.replace("÷", "/");

    return change2;
};

const insertDataInStorage = () => {
    storage.innerHTML = "";
    let dataArray = JSON.parse(localStorage.getItem('data')) || [];
    dataArray.reverse().forEach(data => {
        let { key, value } = data;
        let keyTag = document.createElement("p");
        let valueTag = document.createElement("h3");
        let valueBox = document.createElement("div");

        keyTag.innerHTML = key + " = ";
        valueTag.innerHTML = value;

        valueBox.appendChild(keyTag);
        valueBox.appendChild(valueTag);

        storage.appendChild(valueBox);
    });
};

const setDataInLocalStorage = (key, value) => {
    let prevData = JSON.parse(localStorage.getItem('data')) || [];
    localStorage.setItem('data', JSON.stringify([...prevData, { key, value }]));
    insertDataInStorage();
};

buttons.forEach(button => {
    button.addEventListener('click', () => {
        let buttonValue = button.value;
        if (buttonValue === "CLEAR") {
            display.value = 0;
        } else if (buttonValue === "BACKSPACE") {
            let displayValue = display.value;
            display.value = displayValue.slice(0, -1);
        } else if (buttonValue === "EQUAL") {
            try {
                let dValue = display.value;
                let modifiedValue = replaceResultValue(display.value);
                let result = eval(modifiedValue);
                display.value = Number.isInteger(result) ? result : result.toFixed(2);
                setDataInLocalStorage(dValue, display.value);
            } catch (error) {
                display.value = "Error";
            }
        } else {
            if (display.value == 0 || display.value === "Error") {
                display.value = replaceInputValue(buttonValue);
            } else {
                display.value += replaceInputValue(buttonValue);
            }
        }
        display.scrollLeft = display.scrollWidth;
    });
});
