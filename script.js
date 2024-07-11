document.addEventListener('DOMContentLoaded', () => {
    let isDarkMode = false;
    const dataStore = {};

    const toggleThemeButton = document.getElementById('toggle-theme');
    const formAdd = document.getElementById('form-add');
    const inputString = document.getElementById('input-string');
    const inputNum1 = document.getElementById('input-num1');
    const inputNum2 = document.getElementById('input-num2');
    const resultString = document.getElementById('result-string');
    const resultNum1 = document.getElementById('result-num1');
    const resultNum2 = document.getElementById('result-num2');

    // Theme Toggle
    toggleThemeButton.addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        document.body.classList.toggle('dark', isDarkMode);
        document.body.classList.toggle('light', !isDarkMode);
    });

    // Initialize QR scanner
    const qrCodeReader = new Html5Qrcode("scanner");

    document.getElementById('btn-scan').addEventListener('click', () => {
        qrCodeReader.start(
            { facingMode: "environment" },
            {
                fps: 10,    // Optional, frame per seconds for qr code scanning
                qrbox: 250  // Optional, if you want bounded box UI
            },
            qrCodeMessage => {
                fillForm(qrCodeMessage);
                qrCodeReader.stop();
            },
            errorMessage => {
                console.warn(errorMessage);
            }
        ).catch(err => {
            console.error(err);
        });
    });

    // Fill form with data from QR code
    function fillForm(data) {
        const savedData = dataStore[data];
        if (savedData) {
            resultString.textContent = savedData.stringValue;
            resultNum1.textContent = savedData.numValue1;
            resultNum2.textContent = savedData.numValue2;
        }
    }

    // Add data to store
    formAdd.addEventListener('submit', (e) => {
        e.preventDefault();
        const stringValue = inputString.value;
        const numValue1 = inputNum1.value;
        const numValue2 = inputNum2.value;
        if (stringValue && numValue1 && numValue2) {
            dataStore[stringValue] = {
                stringValue: stringValue,
                numValue1: Number(numValue1),
                numValue2: Number(numValue2),
            };
            inputString.value = '';
            inputNum1.value = '';
            inputNum2.value = '';
            alert('Data added successfully');
        }
    });
});
