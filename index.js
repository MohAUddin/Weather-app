const wrapper = document.querySelector(".wrapper"),
inputPart = wrapper.querySelector(".info__part"),
infoTxt = inputPart.querySelector(".info__part--para"),
inputField = inputPart.querySelector("input");
locationBtn = inputPart.querySelector("button");
let api;

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
    api =  `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=092a1ab4dbcdeb96d6d950158c5e6524`;
    fetchData();
}

function onError(error){
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}


function requestApi(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=092a1ab4dbcdeb96d6d950158c5e6524`;
    fetchData();
} 

function fetchData(){
    infoTxt.innerText = "Getting weather details...";
    infoTxt.classList.add("pending");
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}

function weatherDetails(info){
    if (info.cod == "404"){
        infoTxt.classList.replace("pending", "error");
        infoTxt.innerText = `${inputField.value} isn't a valid city name`;
    }else{
        infoTxt.classList.remove("pending", "error");
        console.log (info);
    }
}
