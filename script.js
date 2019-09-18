function journeyPlanner(form){
    
    // var fromPostcode = form.fromPostcode.value;
    // var toPostcode = form.toPostcode.value;
    // var journeyPreference = form.journeyPreference.value;
    //var accessibility = form.accessibility.value;
    var fromPostcode = "UB5 5DD";
    var toPostcode = "EC2A 1NT";
    const journeyPreference = 'leasttime';
    const accessibilityPreference = 'stepFreeToPlatform';
    const app_id = '70020f2';
    const app_key = '0ad0be8e2fd2ff1e875dff40d2beec28';

    fromPostcode = fromPostcode.trim().toUpperCase();
    toPostcode = toPostcode.trim().toUpperCase();

    if (!validatePostcode(fromPostcode)){
        //print error message
        return false;
    }
    
    if (!validatePostcode(toPostcode)){
        //print error message
        return false;
    }


    const encodedFromPostcode = encodeURI(fromPostcode);
    const encodedToPostcode = encodeURI(toPostcode);
    
    var data = null;
    var xhr = new XMLHttpRequest();
    
    xhr.addEventListener("readystatechange", function () {
      if (xhr.readyState === 4) {
        console.log(JSON.parse(xhr.responseText));
      }
    });
    
    // var apiURL = `http://api.tfl.gov.uk/Journey/JourneyResults/${encodedFromPostcode}/to/${encodedToPostcode}?app_id=${app_id}&app_key=${app_key}&journeyPreference=${journeyPreference}&accessibilityPreference=${accessibilityPreference}`;
    var apiURL = "https://cors-anywhere.herokuapp.com/http://api.tfl.gov.uk/Journey/JourneyResults/UB55DD/to/EC2A1NT?app_id=70020f2b&app_key=0ad0be8e2fd2ff1e875dff40d2beec28&journeyPreference=leastwalking&accessibilityPreference=stepFreeToPlatform"
    xhr.open("GET", apiURL, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
    xhr.send(data);
}

document.addEventListener('input', function (event) {

    if (event.target.attributes["name"].value == "fromPostcode" || event.target.attributes["name"].value == "toPostcode") {
        if((/\W/).test(event.data)) {
            event.target.value = event.target.value.substring(0, event.target.value.length - 1);
        }
    }
}, false);


document.getElementById('fromPostcode').addEventListener('input', (event) => {
    // get the value of the target 
    
    
});

function validatePostcode(postcode){
    const regex = /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i;
    return regex.test(postcode) 
}
