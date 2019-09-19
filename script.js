window.addEventListener("load", () => {

    const app_id = '70020f2b';
    const app_key = '0ad0be8e2fd2ff1e875dff40d2beec28';
    let dataStatus = null;
    let xhrStatus = new XMLHttpRequest();

    xhrStatus.addEventListener("readystatechange", () => {
        const colours=['#B36305', '#E32017', '#FFD300', '#00782A', '#F3A9BB', '#A0A5A9', '#9B0056', '#000000', '#0098D4', '#95CDBA']
        if (xhrStatus.readyState === 4) {
            let outputTextStatus = JSON.parse(xhrStatus.responseText);

            const table = document.createElement("table");
            const tableBody = document.createElement("tbody");
            
            for (let line = 0; line < outputTextStatus.length; line++){
                const tableRow = document.createElement("tr");
                tableRow.style.backgroundColor = colours[line]
                if (line == 7){
                    tableRow.style.color = '#FFF'
                }
                const tableCellLeft = document.createElement("td");
                const tableCellLeftText = document.createTextNode(outputTextStatus[line].name);
                tableCellLeft.appendChild(tableCellLeftText);
                tableRow.appendChild(tableCellLeft);

                for (let lineStatus = 0; lineStatus < outputTextStatus[line].lineStatuses.length; lineStatus++){
                    const tableCellRight = document.createElement("td");
                    const tableCellRightText = document.createTextNode(outputTextStatus[line].lineStatuses[lineStatus].statusSeverityDescription);
                    tableCellRight.appendChild(tableCellRightText);
                    tableRow.appendChild(tableCellRight);
                }
                tableBody.appendChild(tableRow);
            }
            table.appendChild(tableBody);
            document.getElementById("statusContainer").appendChild(table);
        }
    });

    const apiURLStatus = `https://cors-anywhere.herokuapp.com/http://api.tfl.gov.uk/Line/Mode/tube/Status?app_id=${app_id}&app_key=${app_key}`;

    xhrStatus.open("GET", apiURLStatus, true);
    xhrStatus.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
    xhrStatus.send(dataStatus);

     xhrStatus.onload = () => {
         if (xhrStatus.status != 200){
             alert(`Error ${xhrStatus.status}: ${xhrStatus.statusText}`)
         }
     }
    
});

function journeyPlanner(form){
    let fromPostcode = form.fromPostcode.value.trim().toUpperCase();
    let toPostcode = form.toPostcode.value.trim().toUpperCase();
    let journeyPreference = form.journeyPreference.value;
    
    let encodedFromPostcode = encodeURI(fromPostcode);
    let encodedToPostcode = encodeURI(toPostcode);
    
    const app_id = '70020f2b';
    const app_key = '0ad0be8e2fd2ff1e875dff40d2beec28';
    
    if (document.getElementById("accessible").checked) {
        var apiURLJourney = `https://cors-anywhere.herokuapp.com/http://api.tfl.gov.uk/Journey/JourneyResults/${encodedFromPostcode}/to/${encodedToPostcode}?app_id=${app_id}&app_key=${app_key}&journeyPreference=${journeyPreference}&accessibilityPreference=stepFreeToPlatform`;
    } else {
        var apiURLJourney = `https://cors-anywhere.herokuapp.com/http://api.tfl.gov.uk/Journey/JourneyResults/${encodedFromPostcode}/to/${encodedToPostcode}?app_id=${app_id}&app_key=${app_key}&journeyPreference=${journeyPreference}`;
    };

    const regex = /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i;
    
    /*--------------------------------------------- RESET ---------------------------------------------*/
    
    resetJourneySteps();
    // resetStatusTable();
    resetPostcodeWarning();
    
    /*--------------------------------------------- END OF RESET ---------------------------------------------*/

    if (!(regex.test(fromPostcode))) {
        addPostcodeWarning("Make sure the postcodes you have entered are valid London and Greater London postcodes.");
        return;
    }

/*--------------------------------------------- JOURNEY ---------------------------------------------*/
    
    let dataJourney = null;
    let xhrJourney = new XMLHttpRequest();

    xhrJourney.addEventListener("readystatechange", () => {
        if (xhrJourney.readyState === 4) {
            let outputTextJourney = JSON.parse(xhrJourney.responseText).journeys["0"];
            console.log(outputTextJourney);
            let journeyStartTime = outputTextJourney.startDateTime;
            let journeyEndTime = outputTextJourney.arrivalDateTime;
            addJourneySteps(`Duration:  ${outputTextJourney.duration} minutes`)
            addJourneySteps(`Leave at ${(journeyStartTime.slice( (journeyStartTime.indexOf('T') + 1), (journeyStartTime.length - 3)))} to arrive at ${(journeyEndTime.slice( (journeyEndTime.indexOf('T') + 1), (journeyEndTime.length - 3)))}.`);
            
            for (let leg = 0; leg < outputTextJourney.legs.length; leg++){

                if (outputTextJourney.legs[leg].mode.id !== 'walking') {
                    if (outputTextJourney.legs[leg].instruction.detailed) {
                        let journeyStep = `Catch the ${outputTextJourney.legs[leg].instruction.detailed}, get off at ${outputTextJourney.legs[leg].arrivalPoint.commonName}.`;
                        addJourneySteps(journeyStep);
                    }
                } else {
                    let journeyStep = `${outputTextJourney.legs[leg].instruction.summary}.`;
                    addJourneySteps(journeyStep);
                }
            }
        }
    });    

    xhrJourney.open("GET", apiURLJourney, true);
    xhrJourney.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhrJourney.send(dataJourney);

    xhrJourney.onload = () => {
        if (xhrJourney.status != 200){
            alert(`Error ${xhrJourney.status}: ${xhrJourney.statusText}`)
        }
    }

/*--------------------------------------------- END OF JOURNEY ---------------------------------------------*/

};

document.addEventListener('input', function (event) {
    if (event.target.attributes["name"].value == "fromPostcode" || event.target.attributes["name"].value == "toPostcode") {
        if((/\W/).test(event.data) && event.data != ' ') {
            event.target.value = event.target.value.substring(0, event.target.value.length - 1);
        }
    }
}, false);


function validatePostcode(postcode){
    const regex = /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i;
    return regex.test(postcode) 
}


const getJourney = () => {

    let dataJourney = null;
    let xhrJourney = new XMLHttpRequest();

    xhrJourney.addEventListener("readystatechange", () => {
        if (xhrJourney.readyState === 4) {
            let outputTextJourney = JSON.parse(xhrJourney.responseText).journeys["0"];
            addJourneySteps(`Leave at ${outputTextJourney.startDateTime} to arrive at ${outputTextJourney.arrivalDateTime}. Duration = ${outputTextJourney.duration}`);
            
            for (let leg = 0; leg < outputTextJourney.legs.length; leg++){

                if (outputTextJourney.legs[leg].mode.id !== 'walking') {
                    if (outputTextJourney.legs[leg].instruction.detailed) {
                        let journeyStep = `Catch the ${outputTextJourney.legs[leg].instruction.detailed}, get off at ${outputTextJourney.legs[leg].arrivalPoint.commonName}.`;
                        addJourneySteps(journeyStep);
                    }
                } else {
                    let journeyStep = `${outputTextJourney.legs[leg].instruction.summary}.`;
                    addJourneySteps(journeyStep);
                }
            }
        }
    });

    let apiURLJourney = `https://cors-anywhere.herokuapp.com/http://api.tfl.gov.uk/Journey/JourneyResults/${encodedFromPostcode}/to/${encodedToPostcode}?app_id=${app_id}&app_key=${app_key}&journeyPreference=${journeyPreference}&accessibilityPreference=${accessibilityPreference}`;

    xhrJourney.open("GET", apiURLJourney, true);
    xhrJourney.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhrJourney.send(dataJourney);
};


const checkAllLineStatus = () => {

    let dataStatus = null;
    let xhrStatus = new XMLHttpRequest();
    
    xhrStatus.addEventListener("readystatechange", () => {
        if (xhrStatus.readyState === 4) {
            let outputTextStatus = JSON.parse(xhrStatus.responseText);
            console.log(outputTextStatus);

            const table = document.createElement("table");
            const tableBody = document.createElement("tbody");
            
            for (let line = 0; line < outputTextStatus.length; line++){
                
                const tableRow = document.createElement("tr");
                const tableCellLeft = document.createElement("td");
                const tableCellLeftText = document.createTextNode(outputTextStatus[line].name);
                tableCellLeft.appendChild(tableCellLeftText);
                tableRow.appendChild(tableCellLeft);

                for (let lineStatus = 0; lineStatus < outputTextStatus[line].lineStatuses.length; lineStatus++){
                    const tableCellRight = document.createElement("td");
                    const tableCellRightText = document.createTextNode(outputTextStatus[line].lineStatuses[lineStatus].statusSeverityDescription);
                    tableCellRight.appendChild(tableCellRightText);
                    tableRow.appendChild(tableCellRight);
                }
                tableBody.appendChild(tableRow);
            }
            table.appendChild(tableBody);
            document.getElementById("statusContainer").appendChild(table);
        }
    });
    
    const apiURLStatus = `https://cors-anywhere.herokuapp.com/http://api.tfl.gov.uk/Line/Mode/tube/Status?app_id=${app_id}&app_key=${app_key}`;

    xhrStatus.open("GET", apiURLStatus, true);
    xhrStatus.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
    xhrStatus.send(dataStatus);
};

const addPostcodeWarning = (message) => {
    const msg1 = document.createElement("p");
    msg1.style.backgroundColor = "#fdb814";
    msg1.style.color= "#000";
    const node1 = document.createTextNode(message);
    // msg1.classList.add(''); //ADD CLASS NAME TO P ELEMENT.
    msg1.appendChild(node1);
    document.getElementById('postcodeWarningContainer').appendChild(msg1);
};


const addJourneySteps = (message) => {
    const msg1 = document.createElement("p");
    const node1 = document.createTextNode(message);
    // msg1.classList.add(''); //ADD CLASS NAME TO P ELEMENT.
    msg1.appendChild(node1);
    document.getElementById('routeContainer').appendChild(msg1);
};


const resetJourneySteps = () => {
    document.getElementById('routeContainer').innerHTML = '';
};


const resetStatusTable = () => {
    document.getElementById('statusContainer').innerHTML = '';
};

const resetPostcodeWarning = () => {
    document.getElementById('postcodeWarningContainer').innerHTML = '';
};