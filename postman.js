console.log('This is postmaster.js');

// Utility functions:
// 1. Utility function to get element from string
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML += string;
    return div.firstElementChild;
}

// Initialize number of parameters
let addParamCount = 0;

// Hide the parameters box initially
let parametersBox = document.getElementById("parametersBox");
parametersBox.style.display = 'none';

let custom = document.getElementById('custom');
custom.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById("parametersBox").style.display = 'block'
    document.getElementById('params').style.display = 'block'
});

let get = document.getElementById('get');
get.addEventListener('click', () => {
    document.getElementById('option').style.display = 'none';
    document.getElementById('requestJsonBox').style.display = 'none'
    document.getElementById('parametersBox').style.display = 'none'
});

let post = document.getElementById('post');
post.addEventListener('click', () => {
    document.getElementById('option').style.display = 'block';
    document.getElementById('requestJsonBox').style.display = 'block'
});

let json = document.getElementById('json');
json.addEventListener('click', () => {
    document.getElementById('parametersBox').style.display = 'none';
    document.getElementById('params').style.display = 'none';
    document.getElementById('requestJsonBox').style.display = 'block'
});

// If the user clicks on plus button add more params

let addparam = document.getElementById('addparam');
addparam.addEventListener('click', (e) => {
    e.preventDefault();
    let params = document.getElementById('params');
    let string = `<div class="form-row my-2">
                    <label for="url" class="col-sm-2 col-form-label">Parameter ${addParamCount + 2}</label>
                    <div class="col-md-4">
                        <input type="text" id="parameterKey${addParamCount + 2}" class="form-control" placeholder="Enter Parameter ${addParamCount + 2} key">
                    </div>
                    <div class="col-md-4">
                        <input type="text" id="parameterValue${addParamCount + 2}" class="form-control" placeholder="Enter Parameter ${addParamCount + 2} value">
                    </div>
                    <button class="btn btn-primary size">-</button>
                </div>`;
    let paramElement = getElementFromString(string);
    params.appendChild(paramElement);

    // Delete a particular key when click on - button

    let remparam = document.getElementsByClassName('size');
    for (item of remparam) {
    }

    item.addEventListener('click', (e) => {
        let a = confirm("Do you want to delete this")
        // console.log(a);
        if (a == true) {
            e.target.parentElement.remove();
        }
    })

    // console.log(paramElement);
    addParamCount++;
});

let txt1 = document.getElementById('responseJsonText').disabled = true;
let submit = document.getElementById('submit');



submit.addEventListener('click', (e) => {
    e.preventDefault();
    let url = document.getElementById('url').value;
    url = url.trim()
    if(url != '' && url != 'https://' && url != 'https://www.'){
        // Show please wait to user
        document.getElementById('responseJsonText').value = 'We are fetching results...';
        submit.disabled = true;
        submit.style.cursor = 'not-allowed';
        submit.innerText = 'Please wait...';
        let url = document.getElementById('url').value;
        const requestType = document.querySelector("input[name='get']:checked").value;
        const contentType = document.querySelector("input[name='type']:checked").value;

        if (contentType == 'custom') {
            data = {};
            for (let i = 0; i < addParamCount + 1; i++) {
                if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                    let key = document.getElementById('parameterKey' + (i + 1)).value;
                    let value = document.getElementById('parameterValue' + (i + 1)).value;
                    data[key] = value;
                }
            }
            data = JSON.stringify(data)
        }
        else {
            data = document.getElementById('requestJsonText').value;
        }

        // console.log(data);

        if (requestType == 'GET') {
            fetch(url, {
                method: 'GET',
            })
                .then(response => response.text())
                .then((text) => {
                    document.getElementById('responseJsonText').innerHTML = text;
                    Prism.highlightAll();
                    let txt = document.getElementById('responseJsonText')
                    submit.disabled = false;
                    submit.style.cursor = 'pointer';
                    submit.innerText = 'Submit';
                    // let length = text.split(/\r\n|\r|\n/).length
                    // console.log(length);
                    txt.rows = 30;
                    txt.disabled = false

                })
                .catch(error => {
                    let errorbool = true;
                    if (errorbool == true) {
                        document.getElementById('responseJsonText').innerHTML = error;
                        Prism.highlightAll();
                        submit.disabled = false;
                        submit.style.cursor = 'pointer';
                        submit.innerText = 'Submit';
                    }
                })

        } else {
            fetch(url, {
                method: 'POST',
                body: data,
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },

            })
                .then(response => response.text())
                .then((text) => {
                    document.getElementById('responseJsonText').innerHTML = text;
                    Prism.highlightAll();
                    submit.disabled = false;
                    submit.style.cursor = 'pointer';
                    submit.innerText = 'Submit'
                    let txt = document.getElementById('responseJsonText').disabled = false
                    txt.rows = 10;
                })
                .catch(error => {
                    let errorbool = true;
                    if (errorbool == true) {
                        document.getElementById('responseJsonText').innerHTML = error;
                        Prism.highlightAll();
                        submit.disabled = false;
                        submit.style.cursor = 'pointer';
                        submit.innerText = 'Submit';
                        let txt = document.getElementById('responseJsonText').disablsed = false
                        txt.rows = 10;
                    };
                });

        };
    }
    else {
        document.getElementById('responseJsonText').innerText = 'Please check the url'
        Prism.highlightAll();
    };
});