
const weatherform = document.querySelector(".weatherform");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apikey = "8546c09d771cea00279d63a9c4402fdf";

weatherform.addEventListener("submit", async event => {
    event.preventDefault();
    const city = cityInput.value;
    if (city) {
        try {
            const weatherData = await getWeatherData(city)
            displayWeatherinfo(weatherData)
        }
        catch (error) {
            console.error(error);
            displayError(error)
        }
    }
    else {
        displayError("Please enter a city")
    }

});

async function getWeatherData(city) {

    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    const response = await fetch(apiurl);
    console.log(response);
    if (!response.ok) {
        throw new Error("could not fetch weather data")
    }
    return await response.json();
};

function displayWeatherinfo(data) {
    console.log(data);

    const { name: city,
        main: { temp, humidity },
        weather: [{ description, id }] } = data;

    card.innerHTML = "";
    card.style.display = "flex";


    const cityDisplay = document.createElement("h1")
    const tempdisplay = document.createElement("p")
    const humiditydisplay = document.createElement("p")
    const desDisplay = document.createElement("p")
    const weatherEmoji = document.createElement("p")


    cityDisplay.innerHTML = city;
    cityDisplay.classList.add("citydisplay");
    card.appendChild(cityDisplay);

    tempdisplay.innerHTML = `${(temp - 273.15).toFixed(1)}°C`
    tempdisplay.classList.add("tempdisplay");
    card.appendChild(tempdisplay);


    humiditydisplay.innerHTML = `Humidity: ${humidity}%`
    humiditydisplay.classList.add("humiditydisplay");
    card.appendChild(humiditydisplay);

    desDisplay.innerHTML = description
    desDisplay.classList.add("descdiplay");
    card.appendChild(desDisplay);

    weatherEmoji.innerHTML = getweatheremoji(id);
    weatherEmoji.classList.add("weatheremoji")
    card.appendChild(weatherEmoji);
};
function getweatheremoji(weatherid) {
   switch (true) {
    case (weatherid >= 200 && weatherid < 300):
            return "☁️";
        break;
    case (weatherid >= 300 && weatherid < 400):
            return "🌦️";
        break;
    case (weatherid >= 500 && weatherid < 600):
            return "🌨️";
        break;
    case (weatherid >= 600 && weatherid < 700):
            return "❄️";
        break;
    case (weatherid >= 700 && weatherid < 800):
            return "🌫️";
        break;
    case (weatherid === 800):
            return "🌤️";
        break;
        case (weatherid >= 801 && weatherid < 810):
            return "☁️";
        break;
   
    default:
        return "❓"
        break;
   }
}

function displayError(message) {
    const erroedisplay = document.createElement("p");
    erroedisplay.innerHTML = message
    erroedisplay.classList.add("errordisplay")

    card.innerHTML = "";
    card.style.display = "flex";
    card.appendChild(erroedisplay)
}