console.log("Client side js");

function longitude() {
    console.log(this);
    const data = new FormData();
}

const weatherForm = document.querySelector('form');
const inputEle = document.querySelector('input');
const errorMessge = document.getElementById('errorMessage');
const result = document.getElementById('summary');
const details = document.getElementById('details');
const autoRefreshCheckbox = document.getElementById('autoRefresh');

let lastAPIHitTime;
let autoRefreshInterval;

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const address = inputEle.value;
    if (!address.trim()) {
        errorMessge.textContent = 'Please provide the locatio'
    } else {
        lastAPIHitTime = new Date();
        result.textContent = 'Loading...'
        updateDetails(address);
    }
})
autoRefreshCheckbox.addEventListener('change', (event) => {
    event.preventDefault();
    const status = event.target.checked;
   
    if (status) {
        autoRefreshInterval = setInterval(() => {
            const address = inputEle.value;
            if (address) {
                updateDetails(address);
            }
        }, 10000)
    } else {
        clearInterval(autoRefreshInterval);
    }
})


function updateDetails(address) {
    getData(address, (response) => {
        result.textContent = ''
        if (response.hasOwnProperty('error')) {
            errorMessge.textContent = response.error;
        } else {
            const dateObj = new Date()
            const text = `<p> ${response.location} </p><p> ${response.tempreture} </p>
            <table class="key-value-table" summary="Wrather details.">
            <caption>Weather details</caption>
            <tbody>
                <tr>
                    <th>Current Time</th>
                    <td>${dateObj.getHours()}:${dateObj.getMinutes().toString().padStart(2,0)}:${dateObj.getSeconds().toString().padStart(2,0)}</td>
                </tr>
                <tr>
                    <th class="width-20">Max Temmpreature</th>
                    <td>${response.maxTemepratue}</td>
                </tr>
                <tr>
                    <th>Min Tempreture</th>
                    <td>${response.minTemepratue}</td>
                </tr>
                <tr>
                    <th>Wind speed</th>
                    <td>${response.windSpeed}</td>
                </tr>
                <tr>
                    <th>Humidity</th>
                    <td>${response.humidity}</td>
                </tr>
            </tbody>
        </table>`;
            details.innerHTML = text;
        }
    });
}


const getData = (address, callback) => {

    const url = '/weather?address=' + address;
    fetch(url).then((res) => {
        res.json().then((data) => {
            return callback(data);
        })
    })
}
