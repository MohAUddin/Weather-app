const wrapper = document.querySelector(".wrapper"),
inputPart = wrapper.querySelector(".info__part"),
infoTxt = inputPart.querySelector(".info__part--para"),
inputField = inputPart.querySelector("input"),
locationBtn = inputPart.querySelector("button"),
wIcon = wrapper.querySelector(".weather__part img"),
arrowBack = wrapper.querySelector("header i")

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
    api =  `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=092a1ab4dbcdeb96d6d950158c5e6524`;
    fetchData();
}

function onError(error){
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}


function requestApi(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=092a1ab4dbcdeb96d6d950158c5e6524`;
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
        const city = info.name;
        const country = info.sys.country;
        const {description, id } = info.weather[0];
        const {feels_like, humidity, temp} = info.main;

        if(id == 800){
            wIcon.src = "/assets/clear.svg";
        }else if(id >= 200 && id <=232){
            wIcon.src = "/assets/storm.svg";
        }else if(id >= 600 && id <=622){
            wIcon.src = "/assets/snow.svg";
        }else if(id >= 701 && id <=781){
            wIcon.src = "/assets/haze.svg";
        }else if(id >= 801 && id <=804){
            wIcon.src = "/assets/cloud.svg";
        }else if((id >= 300 && id <=321) || (id >= 500 && id <=531)){
            wIcon.src = "/assets/rain.svg";
        }

        wrapper.querySelector(".temp .numb").innerText = Math.floor(temp);
        wrapper.querySelector(".weather").innerText = description;
        wrapper.querySelector(".location span").innerText = `${city}, ${country}`;
        wrapper.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
        wrapper.querySelector(".humidity span").innerText = `${humidity}%`;

        infoTxt.classList.remove("pending", "error");
        wrapper.classList.add("active");
        
    }
}

arrowBack.addEventListener("click", () => {
    wrapper.classList.remove("active");
});
