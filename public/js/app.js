console.log('Client side javascript file loaded');




const weatherForm = document.querySelector('form');
const search      = document.querySelector("input");

const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');



weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const searchString = search.value;
    const location   = encodeURIComponent(searchString);
    messageOne.textContent = 'Loading.....';
    messageTwo.textContent = '';
    fetch(`/weather?address=${location}`)
        .then(response => response.json().then(data => {
            if(data.error){
                return messageOne.textContent = data.error;
            }else{
                messageOne.textContent = data.forecast;
                messageTwo.textContent = data.location
            }
        }
        ));
});