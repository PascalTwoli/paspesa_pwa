if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js")
      .then(reg => console.log("Service Worker registered:", reg))
      .catch(err => console.error("Service Worker registration failed:", err));
  });
}

// Selecting elements
const popUp = document.querySelector('.pop-up');
const popUpCloser = document.querySelector('.close-icon');
const markAsRead = document.querySelector('.p2a');
const messageElementDiv = document.querySelector('.mpesaMessage1-div');
const popupAmount = document.querySelector('.p1');
let modal1 = document.querySelector('.modal1');
let modal1Closer = document.querySelector('.modal1-closer');
let modal1Done = document.querySelector('.done');
let profileName = document.querySelector('.profile-name');
let kshInModal1 = document.querySelector('.profile-ksh');
let transIdInModal1 = document.querySelector('.id-trans');
let firstLettersName = document.querySelector('.profile-span');
const messagesModal = document.querySelector('.messages-modal');
const fromMessages = document.querySelector('.bi-arrow-left');
const goToMessages = document.querySelector('.to-messages');
const popUpWhiteBox = document.querySelector('.white-box');
const messagesActionsBtn = document.querySelector('.messages-more');
const actionsCard = document.querySelector('.actions-card');
const deleteAllBtn = document.querySelector('.delete-all-btn');
const deleteAlert = document.querySelector('.deleteAlert');
const cancelDelete = document.querySelector('.cancel-delete');

// Initializing display styles
popUp.style.display = 'none';
messageElementDiv.style.display = 'none';
modal1.style.display = 'none';
messagesModal.style.display = 'none';
actionsCard.style.display = 'none';
deleteAlert.style.display = 'none';

// Click events
popUpCloser.addEventListener('click', () => {
  popUp.style.display = 'none';
});

markAsRead.addEventListener('click', () => {
  popUp.style.display = 'none';
});

modal1Closer.addEventListener('click', () => {
  modal1.style.display = 'none';
});

modal1Done.addEventListener('click', () => {
  modal1.style.display = 'none';
});

fromMessages.addEventListener('click', () => {
  messagesModal.style.display = 'none';
  popUp.style.display = 'none';
});

goToMessages.addEventListener('click', () => {
  messagesModal.style.display = 'block';
});

popUpWhiteBox.addEventListener('click', () => {
  messagesModal.style.display = 'block';
});

messagesActionsBtn.addEventListener('click', () => {
  if (actionsCard.style.display == 'none') {
    actionsCard.style.display ='block';
  } else {
    actionsCard.style.display = 'none';
  }

});

deleteAllBtn.addEventListener('click', () => {
  actionsCard.style.display = 'none';
  deleteAlert.style.display = 'block';
})
cancelDelete.addEventListener('click', () => {
  deleteAlert.style.display = 'none'
})

messageElementDiv.addEventListener('click', () => {
  if (actionsCard.style.display == 'block') {
    actionsCard.style.display = 'none';
  }
})

// Unique ID generation function
function uniqueId() {
  const idStrLen = 10;
  let idStr = (Math.floor(Math.random() * 25) + 10).toString(36).toUpperCase();
  idStr += new Date().getTime().toString(36).toUpperCase();

  if (!idStr.startsWith('T')) {
    idStr = 'T' + idStr;
  }

  while (idStr.length < idStrLen) {
    idStr += Math.floor(Math.random() * 35)
      .toString(36)
      .toUpperCase();
  }

  idStr = idStr.slice(0, idStrLen);
  return idStr;
}

// Function to print the message
function printMessage() {
  const amount = document.querySelector('.js-input3').value;
  const name = document.querySelector('.js-input1').value;
  const ID = uniqueId();
  const tel = document.querySelector('.js-input4').value;
  const balance = document.querySelector('.js-input6').value;
  const errorMessage = document.querySelector('.errorMessage');
  const popupMessage = document.querySelector(
    '.blue-box .message-box .mpesaMessage'
  );
  const max_payable_amount = 500000 - amount;
  const messageElement = document.querySelector('.mpesaMessage1');
  const smsTime = document.querySelector('.blue-box .header .sms-time');

  // Get the current date and time when the message is triggered
  const date = new Date();
  const dayDate = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const currentDate = `${dayDate}/${month}/${year}`;
  //time in 12hr clock
  const options = { timeStyle: 'short', hour12: true }; 
  const timeString = date.toLocaleTimeString('en-US', options); 
  //time in 24 hour clock
  // const timeString24 = date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}); 
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const timeString24 = `${hours}:${minutes}`;
  const messageTime = `${currentDate} at ${timeString24}`;

  // Getting the first letters of each name
  const fullName = name;
  const names = fullName.split(' ');
  const firstInitial = names[0].charAt(0);
  const lastInitial = names[names.length - 1].charAt(0);
  const initializedName = firstInitial + lastInitial;

  // Name to uppercase
  const nameInUppercase = name.toUpperCase();

  // Calculate transaction cost
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
    errorMessage.textContent =
      'Submission successful! You will receive a confirmation message shortly';
    errorMessage.style.background = 'green';
    errorMessage.style.color = 'white';
    errorMessage.style.display = 'block';
    popUp.style.display = 'block';

    modal1.style.display = 'block';
    profileName.innerHTML = `${nameInUppercase}`;
    kshInModal1.innerHTML = `KSH. ${amount}.00 <span class="fee-span">FEE: ${cost}.00 </span>`;
    transIdInModal1.innerHTML = `ID: ${ID}<i class="bi bi-copy"></i>`;
    firstLettersName.innerHTML = initializedName.toUpperCase();

    setTimeout(() => {
      errorMessage.style.display = 'none';
    }, 4000);

    popupAmount.innerHTML = `- KSH ${amount}`;
    if (timeString)
      smsTime.innerHTML = `<p class="sms-time1">SMS &#x2022; ${timeString}</p>`;

    popupMessage.innerHTML = `Paid <span class="span3">to</span> <span class="span4">${name}</span>`;

    const messageText = `${ID} Confirmed. Ksh${amount}.00 sent to ${nameInUppercase} <span class="span5">${tel}</span> on <span class="span5"> ${currentDate} at ${timeString}.</span> New M-PESA balance is Ksh${balance}.00. Transaction cost, Ksh${cost}.00. Amount you can  transact within the day is ${max_payable_amount}.00. Sign up for Lipa Na M-PESA Till online.`;

    setTimeout(() => {
      messageElementDiv.style.display = 'block'; // Make the message container visible
      addMessageToDisplay(messageText, messageTime, timeString24);
    }, 4000);
  }
}

// Function to save messages and time to local storage
function saveMessageToLocalStorage(messageText, messageTime, timeString24) {
  let messages = JSON.parse(localStorage.getItem('messages')) || [];

  const exists = messages.some(msg => msg.text === messageText && msg.time === messageTime);
  if (!exists) {
    messages.push({ text: messageText, time: messageTime, time24: timeString24 });
    localStorage.setItem('messages', JSON.stringify(messages));
  }
}


// Call loadMessages when the page loads
document.addEventListener('DOMContentLoaded', loadMessages);

// Function to submit message on 'Enter' key press
function enterToSubmit(event) {
  if (event.key === 'Enter') {
    printMessage();
  }
}

// Adding event listener for Enter key
document.querySelector('.js-input1').addEventListener('keydown', enterToSubmit);

// Function to clear messages if needed
function clearMessages() {
  localStorage.removeItem('messages');
  loadMessages(); // Refresh the displayed messages
}

// Example of attaching clearMessages to a button click
document
  .querySelector('.clear-messages-button')
  .addEventListener('click', clearMessages);

  //////---------//////

  // Function to handle the deletion of a message
function deleteMessage(messageElement, messageText) {
  // Remove the message from localStorage
  let messages = JSON.parse(localStorage.getItem('messages')) || [];
  messages = messages.filter(msg => msg.text !== messageText);
  localStorage.setItem('messages', JSON.stringify(messages));

  // Remove the message from the DOM
  messageElement.remove();
}

// functionality for deleting a message by swiping left or right
function addSwipeToDelete(messageElement, messageText) {
  let startX, startY;  

  messageElement.addEventListener('touchstart', function(event) { 
    event.preventDefault();
    startX = event.touches[0].clientX;  
    startY = event.touches[0].clientY;  
  }, false);  

  messageElement.addEventListener('touchend', function(event) { 
    event.preventDefault(); 
    const endX = event.changedTouches[0].clientX;  
    const endY = event.changedTouches[0].clientY;  
    const deltaX = endX - startX;  
    const deltaY = endY - startY;  

    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {  
      // Swipe detected  
      if (deltaX > 0) {  
        // console.log('Swiped right');  
        const confirmDelete = confirm("Do you want to delete this message?");
        if (confirmDelete) {
          deleteMessage(messageElement, messageText);
        }
      } else {  
        // console.log('Swiped left'); 
        const confirmDelete = confirm("Do you want to delete this message?");
        if (confirmDelete) {
          deleteMessage(messageElement, messageText);
        } 
      }  
    }  
  }, false);
}
//-------------------------------------------------------------------//

///////////////////////////////////////////////////

  // Function to group messages by date
function addMessageToDisplay(messageText, messageTime, timeString24) {
  const messageContainer = document.querySelector('.mpesaMessage1-div');
  const messageDate = messageTime.split(' at ')[0]; // Extract date from time string

  //get today and yesterday in the same format
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const todayString = `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`;
  const yesterdayString = `${yesterday.getDate()}/${yesterday.getMonth()+1}/${yesterday.getFullYear()}`;

  // Determine the display text for the date group;
  let dateGroupHeaderText;
  if (messageDate === todayString) {
    dateGroupHeaderText = 'Today';
  } else if (messageDate === yesterdayString) {
    dateGroupHeaderText ='Yesterday';
  } else {
    dateGroupHeaderText = messageDate;
  }

  // Check if there's already a group for the current date
  let dateGroup = document.querySelector(`.date-group[data-date='${messageDate}']`);
  if (!dateGroup) {
    // Create a new date group if it doesn't exist
    dateGroup = document.createElement('div'); 
    dateGroup.classList.add('date-group');
    dateGroup.setAttribute('data-date', messageDate);

    // Add a date header
    const dateHeader = document.createElement('h4');
    dateHeader.textContent = dateGroupHeaderText;
    dateHeader.classList.add('date-group-header')

    // Append the header to the date group
    dateGroup.appendChild(dateHeader);
    messageContainer.appendChild(dateGroup);
  }

  // Create a message card
  const messageCard = document.createElement('div');
  messageCard.classList.add('message-card');

  // Create a paragraph for the message text
  const message = document.createElement('p');
  message.innerHTML = messageText;
  message.classList.add('message-card-p-content');
  

  // Create an element for the time
  const timeElement = document.createElement('span');
  timeElement.classList.add('each-message-time');
  // timeElement.textContent = messageTime;
  timeElement.innerHTML = `${timeString24} <i class="bi bi-dot"></i> <span>Safaricom</span>`;

  // Append the message and time to the message card
  messageCard.appendChild(message);
  messageCard.appendChild(timeElement);

   // Attach double-click event for deletion
   addSwipeToDelete(messageCard, messageText);

  // Append the message card to the corresponding date group
  dateGroup.appendChild(messageCard);

  // Save the message to local storage
  saveMessageToLocalStorage(messageText, messageTime, timeString24);

  // event listener to hide and expose messageTime;
  timeElement.style.display = 'none';
  messageCard.addEventListener('click', () => {
    if (timeElement.style.display == 'none') {
      timeElement.style.display = 'block';
    } else {
      timeElement.style.display = 'none';
    }
  })
}

// Function to load messages from local storage on page load
function loadMessages() {
  const messages = JSON.parse(localStorage.getItem('messages')) || [];
  const messageContainer = document.querySelector('.mpesaMessage1-div');
  // Clear any existing messages
  messageContainer.innerHTML = '';
  // Loop through stored messages and group them by date
  messages.forEach((msgObj) => {
    addMessageToDisplay(msgObj.text, msgObj.time, msgObj.time24);
  });
  // make messages visible on loading
  messageContainer.style.display = 'block';
  setTimeout ( () => {
    messageContainer.scrollTop = messageContainer.scrollHeight;
  }, 2000);
}
/////////////////////////////////////////////////////

// Call loadMessages when the page loads
document.addEventListener('DOMContentLoaded', () => {
  if (!window.messagesLoaded) {
    loadMessages();
    window.messagesLoaded = true; // Prevent reloading messages multiple times
  }
});

// Function to clear all the messages
function clearAllMessages () {
  //remove messages from the local storage
  localStorage.removeItem('messages');
  //clear the message container  on the page
  const messageContainer = document.querySelector('.mpesaMessage1-div');
  messageContainer.innerHTML = '';
  if (deleteAlert.style.display == 'block') {
    deleteAlert.style.display = 'none';
  }
}



  // // Function to display a message
// function addMessageToDisplay(messageText, messageTime, timeString24) {
//   const messageContainer = document.querySelector('.mpesaMessage1-div');
//   const messageDate = messageTime.split(' at ')[0];

//   // Date grouping logic...
//   const today = new Date();
//   const yesterday = new Date();
//   yesterday.setDate(today.getDate() - 1);

//   const todayString = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
//   const yesterdayString = `${yesterday.getDate()}/${yesterday.getMonth() + 1}/${yesterday.getFullYear()}`;

//   let dateGroupHeaderText;
//   if (messageDate === todayString) {
//     dateGroupHeaderText = 'Today';
//   } else if (messageDate === yesterdayString) {
//     dateGroupHeaderText = 'Yesterday';
//   } else {
//     dateGroupHeaderText = messageDate;
//   }

//   let dateGroup = document.querySelector(`.date-group[data-date='${messageDate}']`);
//   if (!dateGroup) {
//     dateGroup = document.createElement('div');
//     dateGroup.classList.add('date-group');
//     dateGroup.setAttribute('data-date', messageDate);

//     const dateHeader = document.createElement('h4');
//     dateHeader.textContent = dateGroupHeaderText;
//     dateHeader.classList.add('date-group-header') /////////added the line
//     dateGroup.appendChild(dateHeader);
//     messageContainer.appendChild(dateGroup);
//   }

//   const message = document.createElement('div');
//   // message.classList.add('message');
//   message.classList.add('message-card');
//   message.innerHTML = `
//     <p class="message-card-p-content">${messageText}</p> 
//     <span class="each-message-time">${timeString24} <i class="bi bi-dot"></i> <span>Safaricom</span></span>
//   `; 
//   // const thisMessage = document.querySelector('.message-card-p-content');
//   // const timeElement = document.querySelector('.each-message-time'); 

//   // console.log("thiuds time element:"+  timeElement.textContent);

//   // timeElement.style.display = 'none';
//   // thisMessage.addEventListener('click', () => {
//   //   if (timeElement.style.display == 'none') {
//   //     timeElement.style.display = 'block';
//   //   } else {
//   //     timeElement.style.display = 'none';
//   //   }
//   // })

//   // Attach double-click event for deletion
//   addDoubleClickToDelete(message, messageText);

//   // Append the message card to the corresponding date group
//   dateGroup.appendChild(message);

//   // Save the message to local storage
//   saveMessageToLocalStorage(messageText, messageTime, timeString24);
// }

// // Function to load messages from localStorage
// function loadMessages() {
//   const messages = JSON.parse(localStorage.getItem('messages')) || [];
//   const messageContainer = document.querySelector('.mpesaMessage1-div');
//   messageContainer.innerHTML = ''; // Clear existing messages

//   messages.forEach(({ text, time, time24 }) => {
//     addMessageToDisplay(text, time, time24);
//   });
// }