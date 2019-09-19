function journeyPlanner(form){
    var fromPostcode = form.fromPostcode.value;
    var toPostcode = form.toPostcode.value;
    var journeyPreference = form.journeyPreference.value;
    var accessibilityPreference = (form.accessible.value)?('stepFreeToPlatform'):('NoRequirements');
    console.log([fromPostcode,toPostcode,journeyPreference,accessibilityPreference]);
    //var fromPostcode = "UB5 5DD";
    //var toPostcode = "EC2A 1NT";
    //const journeyPreference = 'leasttime';
    //const accessibilityPreference = 'stepFreeToPlatform';
    const app_id = '70020f2b';
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

    // const routeContainer = document.getElementById('routeContainer');
    resetJourneySteps();

/*---------------------------------------------JOURNEY-------------------------------------*/

    var data = null;
    var xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
      if (xhr.readyState === 4) {
          let outputText = JSON.parse(xhr.responseText).journeys["0"];
          console.log(outputText);
          addJourneySteps(`Leave at ${outputText.startDateTime} to arrive at ${outputText.arrivalDateTime}. Duration = ${outputText.duration}`);
          for (let leg = 0; leg < outputText.legs.length; leg++){
            addJourneySteps(outputText.legs[leg].instruction.summary);
            //     let node = document.createElement("LI");
        //     console.log(leg.instruction.summary);
        //     var textnode = document.createTextNode(leg.instruction.summary);
        //     node.appendChild(textnode);
        //     document.getElementById("routeList").appendChild(node);
        }
      }
    });
    
    var apiURL = `https://cors-anywhere.herokuapp.com/http://api.tfl.gov.uk/Journey/JourneyResults/${encodedFromPostcode}/to/${encodedToPostcode}?app_id=${app_id}&app_key=${app_key}&journeyPreference=${journeyPreference}&accessibilityPreference=${accessibilityPreference}`;
    
    xhr.open("GET", apiURL, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
    xhr.send(data);

/*---------------------------------------------END OF JOURNEY-------------------------------------*/

/*---------------------------------------------STATUS-------------------------------------*/
checkLineStatus('victoria');
/*---------------------------------------------END OF STATUS-------------------------------------*/
}

document.addEventListener('input', function (event) {

    if (event.target.attributes["name"].value == "fromPostcode" || event.target.attributes["name"].value == "toPostcode") {
        if((/\W/).test(event.data)) {
            event.target.value = event.target.value.substring(0, event.target.value.length - 1);
        }
    }

}, false);


function validatePostcode(postcode){
    const regex = /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i;
    return regex.test(postcode) 
}

const checkLineStatus = (line) => {
        
    var dataStatus = null;
    var xhrStatus = new XMLHttpRequest();
    
    xhrStatus.addEventListener("readystatechange", function () {
      if (xhrStatus.readyState === 4) {
        let outputTextStatus = JSON.parse(xhrStatus.responseText);
        console.log(outputTextStatus);
      }
    });
    
    var apiURLStatus = `https://cors-anywhere.herokuapp.com/http://api.tfl.gov.uk/Line/${line}/Status?app_id=70020f2b&app_key=0ad0be8e2fd2ff1e875dff40d2beec28`;

    xhrStatus.open("GET", apiURLStatus, true);
    xhrStatus.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
    xhrStatus.send(dataStatus);
};

const addJourneySteps = (message) => {
    // const routeContainer = document.getElementById('routeContainer');
    const msg1 = document.createElement("P");
    const node1 = document.createTextNode(message);
    // msg1.classList.add(''); //ADD CLASS NAME TO P ELEMENT.
    msg1.appendChild(node1);
    document.getElementById('routeContainer').appendChild(msg1);
};


// var apiURLStatus = `https://cors-anywhere.herokuapp.com/http://api.tfl.gov.uk/Line/${line}/Status?app_id=70020f2b&app_key=0ad0be8e2fd2ff1e875dff40d2beec28`;
// var apiURLJourney = `https://cors-anywhere.herokuapp.com/http://api.tfl.gov.uk/Journey/JourneyResults/${encodedFromPostcode}/to/${encodedToPostcode}?app_id=${app_id}&app_key=${app_key}&journeyPreference=${journeyPreference}&accessibilityPreference=${accessibilityPreference}`;
    

// apiCalls = () => {
//     const app_id = '70020f2b';
//     const app_key = '0ad0be8e2fd2ff1e875dff40d2beec28';

// };

const journeyType = () => {
    if (legs["0"].mode.id !== 'walking') {
        return `Catch the ${legs["0"].instruction.summary}`;
    }

};

const resetJourneySteps = () => {
    document.getElementById('routeContainer').innerHTML = '';
};