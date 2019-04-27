console.log("Client side js");

function longitude() {
    console.log(this);
    const data = new FormData();
}

const weatherForm = document.querySelector('form');
const inputEle = document.querySelector('input');
const errorMessge = document.getElementById('message-1');
const result = document.getElementById('message-2');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const address = inputEle.value;
    if (!address.trim()) {
        errorMessge.textContent = 'Please provide the locatio'
    } else {
        result.textContent = 'Loading...'
        getData(address, (response) => {
            if (response.hasOwnProperty('error')) {
                errorMessge.textContent = response.error;
                result.textContent = ''
            } else {
                result.textContent = response.location + '\n' + response.tempreture;
            }
        });
    }
})

const getData = (address, callback) => {

    const url = '/weather?address=' + address;
    fetch(url).then((res) => {
        res.json().then((data) => {
            return callback(data);
        })
    })
}
