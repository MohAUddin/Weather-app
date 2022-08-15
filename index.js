const wrapper = document.querySelector(".wrapper"),
inputPart = wrapper.querySelector(".info__part"),
infoTxt = inputPart.querySelector(".info__part--para"),
inputField = inputPart.querySelector("input");
locationBtn = inputPart.querySelector("button");

inputField.addEventListener("keyup", e =>{
    // if user pressed enter btn and input value is not empty
    if(e.key == "Enter" && inputField.value != ""){
        requestApi(inputField.value);
    } 
});

locationBtn.addEventListener("click", ()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError)
    }else{
        alert("Your browser does not support geolocation API ")
    }
});

function onSuccess(postion){
    const {latitude, longitude} = postion.coords
    let api =  `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=092a1ab4dbcdeb96d6d950158c5e6524`;
}

function onError(error){
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}


function requestApi(city){
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=092a1ab4dbcdeb96d6d950158c5e6524`;
    infoTxt.innerText = "Getting weather details...";
    infoTxt.classList.add("pending");
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
} 


function weatherDetails(info){
    console.log (info);
}