// Selecting elements
const popUp = document.querySelector('.pop-up');
const popUpCloser = document.querySelector('.close-icon');
const markAsRead = document.querySelector('.p2a');
const messageElementDiv = document.querySelector('.mpesaMessage1-div');
const popupAmount = document.querySelector('.p1');
let modal1 = document.querySelector('.modal1');
let modal1Closer = document.querySelector('.modal1-closer');
let modal1Done =  document.querySelector('.done');
let profileName = document.querySelector('.profile-name');
let kshInModal1 = document.querySelector('.profile-ksh');
let transIdInModal1 = document.querySelector('.id-trans');
let firstLettersName = document.querySelector('.profile-span');




// Initializing display styles
popUp.style.display = 'none';
messageElementDiv.style.display = 'none';
modal1.style.display = 'none';

//click events
popUpCloser.addEventListener('click', () => {
    popUp.style.display = 'none';
});

markAsRead.addEventListener('click', () => {
    popUp.style.display = 'none';
});

modal1Closer.addEventListener('click', () => {
    modal1.style.display = 'none';
})
modal1Done.addEventListener('click', () => {
    modal1.style.display = 'none';
})


function uniqueId() {
    const idStrLen = 10;
    let idStr = (Math.floor((Math.random() * 25)) + 10).toString(36).toUpperCase();
    idStr += (new Date()).getTime().toString(36).toUpperCase();

    if (!idStr.startsWith("S")) {
        idStr = "S" + idStr;
    }

    while (idStr.length < idStrLen) {
        idStr += (Math.floor((Math.random() * 35))).toString(36).toUpperCase();
    }

    idStr = idStr.slice(0, idStrLen);
    return idStr;
}

// Time variables
const date = new Date();
const options = { timeStyle: 'short', hour12: true };
const dayDate = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();
const timeString = date.toLocaleTimeString('en-US', options);
const currentDate = `${dayDate}/${month}/${year}`;

// Function to print the message
function printMessage() {
    const amount = document.querySelector('.js-input3').value;
    const name = document.querySelector('.js-input1').value;
    const ID = uniqueId();
    const tel = document.querySelector('.js-input4').value;
    const balance = document.querySelector('.js-input6').value;
    const errorMessage = document.querySelector('.errorMessage');
    const popupMessage = document.querySelector('.blue-box .message-box .mpesaMessage');
    const messageElement = document.querySelector('.mpesaMessage1'); 
    const smsTime = document.querySelector('.blue-box .header .sms-time');

    //getting the first letters of each name;
    const fullName = name;
    const names = fullName.split(" ");
    const firstInitial = names[0].charAt(0);
    const lastInitial = names[names.length - 1].charAt(0);
    const initializedName = firstInitial + lastInitial;

    //name to uppercase;
    const nameInUppercase = name.toUpperCase();

    // const messageElement = document.querySelector('.mpesaMessage1'); 
    const message = document.createElement("p");

    let cost;
    if (amount <= 100) {
        cost = 0;
    } else if (amount <= 500) {
        cost = 7;
    } else if (amount <= 1000) {
        cost = 13;
    } else if (amount <= 3000) {
        cost = 25;
    } else {
        cost = 57;
    }

    // Input validation
    if (!name || !amount || !tel || !balance) {
        errorMessage.textContent = 'You are required to fill in all the fields!';
        errorMessage.style.display = 'block';
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 5000);
    } else {
        errorMessage.textContent = 'Submission successful! You will receive a confirmation message shortly';
        errorMessage.style.background = 'green';
        errorMessage.style.color = 'white';
        errorMessage.style.display = 'block';
        popUp.style.display = 'block';

        modal1.style.display = 'block';
        profileName.innerHTML = `${nameInUppercase}`;
        kshInModal1.innerHTML = `KSH. ${amount}.00 <span class="fee-span">FEE: ${cost}.00 </span>`;
        transIdInModal1.innerHTML = `ID: ${ID}`;
        firstLettersName.innerHTML = initializedName.toUpperCase();
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 4000);
        popupAmount.innerHTML = `- KSH ${amount}`;
        if (timeString)
        smsTime.innerHTML = `<p class="sms-time1">SMS &#x2022; ${timeString}</p>`;
        popupMessage.innerHTML = `Paid <span class="span3">to</span> <span class="span4">${name}</span>`;

        setTimeout(() => {
            messageElementDiv.style.display = 'block';
            message.innerHTML = `${ID} Confirmed. Ksh${amount}.00 paid to ${nameInUppercase} <span class="span5">${tel}</span> on ${currentDate} at ${timeString}. New MPESA balance is Ksh${balance}.00. Transaction cost, Ksh${cost}.00. Amount you can transact within the day is Ksh499,140.00. To move money from bank to MPESA dial *334#>Withdraw>From bank to MPESA.`;
            messageElement.appendChild(message);
        }, 4000);
    }
}

// Function to submit message on 'Enter' key press
function enterToSubmit(event) {
    if (event.key === 'Enter') {
        printMessage();
    }

}



