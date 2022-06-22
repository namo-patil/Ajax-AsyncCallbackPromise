let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function showTime() {
    const date = new Date();
    return date.getHours() + "Hrs " + date.getMinutes() + "Mins " + date.getSeconds() + "Secs";
}

function makeAJAXCall(methodType, url, callback, async = true, data = null) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        console.log(methodType + " Ready State: " + xhr.readyState + " Status: " + xhr.status);
        if (xhr.readyState === 4) {
            // Matching all 200 Series Responses
            if (xhr.status === 200 ||  xhr.status === 201) {
                callback(xhr.responseText);
            } else if (xhr.status >= 400) {
                console.log();
                console.log("Handle 400 Client Error or 500 Server Error");
            }
        }
    }
    xhr.open(methodType, url, async);
    if (data) {
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
    }
    else {
    xhr.send();
    }
    console.log(methodType + " request sent to the server at: " + showTime());
}

const getURl = "http://localhost:3000/employees/1";
function getUserDetails(data) {
    console.log("Get User Data at: " + showTime() + " data: " + data);
}
makeAJAXCall("GET", getURl, getUserDetails, true);
console.log("Made GET AJAX Call to Server at: " + showTime());
 
const deleteURl = "http://localhost:3000/employees/4";
function userDeleted(data) {
    console.log();
    console.log("User Deleted: " + data);
}
makeAJAXCall("DELETE", deleteURl, userDeleted, false);
console.log("Made DELETE AJAX Call to Server at: " + showTime());

const postURl = "http://localhost:3000/employees";
const emplData = {"name": "Harry", "salary": "5000"};
function userAdded(data) {
    console.log("User Added: " + data);
}
makeAJAXCall("POST", postURl, userAdded, true, emplData);
console.log("Made POST AJAX Call to Server at: " + showTime());
