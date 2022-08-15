const wrapper = document.querySelector(".wrapper"),
inputPart = wrapper.querySelector(".info__part"),
inputTxt = inputPart.querySelector(".info__part--para"),
inputField = inputPart.querySelector("input");

inputField.addEventListener("keyup", e =>{
    // if user pressed enter btn and input value is not empty
    if(e.key == "Enter" && inputField.value != ""){
        requestApi(inputField.value);
    } 
});

function requestApi(city){
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=092a1ab4dbcdeb96d6d950158c5e6524`;
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
} 


function weatherDetails(info){
    console.log (info);
}