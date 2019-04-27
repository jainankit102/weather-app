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
                // result.textContent = response.location + '\n' + response.tempreture;
                const text = `<p> ${response.location} </p><p> ${response.tempreture} </p> 
                <table class="key-value-table" summary="Wrather details.">
                <caption>Weather details</caption>
                <tbody>
                    <tr>
                        <th class="width-20">Max Temmpreature:</th>
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
})

const getData = (address, callback) => {

    const url = '/weather?address=' + address;
    fetch(url).then((res) => {
        res.json().then((data) => {
            return callback(data);
        })
    })
}
