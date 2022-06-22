let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function showTime() {
    const date = new Date();
    return date.getHours() + "Hrs " + date.getMinutes() + "Mins " + date.getSeconds() + "Secs";
}

function makePromiseCall(methodType, url, async = true, data = null) {
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            console.log(methodType + " Ready State: " + xhr.readyState + " Status: " + xhr.status);
            if (xhr.status.toString().match('^[2][0-9]{2}$')) {
                resolve(xhr.responseText);
            } 
            else if (xhr.status.toString().match('^[4,5][0-9]{2}$')) {
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                });
                console.log("Handle 400 Client Error or 500 Server Error at: ");
            }

            // if (xhr.readyState === 4) {
            //     // Matching all 200 Series Responses
            //     if (xhr.status === 200 ||  xhr.status === 201) {
            //         resolve(xhr.responseText);
            //     } 
            //     else if (xhr.status >= 400) {
            //         reject({
            //             status: xhr.status,
            //             statusText: xhr.statusText
            //         });   
            //         console.log("Handle 400 Client Error or 500 Server Error at: " + showTime());
            //     }
            // }
        }
        xhr.open(methodType, url, async);
        if (data) {
            console.log(JSON.stringify(data));
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data));
        }
        else xhr.send();
        console.log(methodType + " request sent to the server at: " + showTime());
    });
}

const getURl = "http://localhost:3000/employees/3";
makePromiseCall("GET", getURl, true)
    .then(responseText => {
        console.log("Get User Data at: " + showTime() + " data: " + responseText)
    })
    .catch(error => console.log("GET Error Status: " + JSON.stringify(error)));
    console.log("Made GET AJAX Call to Server at: " + showTime());

const deleteURl = "http://localhost:3000/employees/1";
makePromiseCall("DELETE", deleteURl, false)
    .then(responseText => {
        console.log();
        console.log(" Deleted User at: " + showTime() + " data: " + responseText)
    })
    .catch(error => console.log("DELETE Error Status: " + JSON.stringify(error)));
    console.log("Made DELETE AJAX Call to Server at: " + showTime());

const postURl = "http://localhost:3000/employees";
const emplData = {"name": "Harry", "salary": "5000"};    
makePromiseCall("POST", postURl, true, emplData)
    .then(responseText => {
        console.log("User Data Added: " + showTime() + " data: " + responseText)
    })
    .catch(error => console.log("POST Error Status: " + JSON.stringify(error)));
    console.log("Made POST AJAX Call to Server at: " + showTime());