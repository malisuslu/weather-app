import React from "react";
// import Input from "./Input";
import axios from "axios";


function Content({city}) {
    const [weather, setWeather] = React.useState();


    city === "" && (city = "ankara");

    React.useEffect(() => {
        axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=tr&appid=9579b5976292e51b2440d0c463b45dd0`)
        .then(res => {
            setWeather(res.data);
        }).catch(err => {
            console.log(err);
            // print error message to the page if the city is not found
            setWeather({
                main: { temp: "Bilgi mevcut değil.", feels_like: "Not available" },
                weather: [{ main: "Unavailable",}]
            });
        })
    }, [city]);


    function getImage(state) {
        let src = "";
        switch (state) {
            case "Clear":
                src = "https://www.langleyadvancetimes.com/wp-content/uploads/2020/03/20890720_web1_Langley-Weather-Sun-Clear-Sky-Skies.jpg";
                break;
            case "Clouds":
                src = "https://www.farmersalmanac.com/wp-content/uploads/2020/11/Clouds-Predict-Local-Weather-i861387936.jpg";
                break;
            case "Rain": case "Drizzle":
                src = "https://www.azernews.az/media/2016/09/09/rain_.jpg";
                break;
            case "Snow":
                src = "https://thumbs.dreamstime.com/b/snowfall-street-tree-branches-benches-alley-snow-covers-air-lot-snowflakes-flying-headlights-cars-winter-133698774.jpg";
                break;
            case "Storm":
                src = "https://s7d2.scene7.com/is/image/TWCNews/lightning_jpg-8";
                break;
            case "Wind":
                src = "https://media.istockphoto.com/photos/fighting-against-the-wind-picture-id155482741?k=20&m=155482741&s=612x612&w=0&h=LdOyAZ6rrgb6hVxSSC953ZOjfbyOF-jkw2mIyW0dIp8=";
                break;
            case "Foggy":
                src = "https://www.langleyadvancetimes.com/wp-content/uploads/2020/03/20890720_web1_Langley-Weather-Sun-Clear-Sky-Skies.jpg";
                break;
            case "Unavailable":
                src = "https://us.123rf.com/450wm/aquir/aquir2010/aquir201008221/157385052-unavailable-stamp-square-grunge-sign-isolated-on-white-background.jpg?ver=6";
                break;
            default:
                src = "https://i3.posta.com.tr/i/posta/75//0x410/62072b7f45d2a0c0140c639e.jpg";
                break;
        }
        return src;
    }


    if (!weather || weather === undefined) {

        return (
            <div className="d-flex justify-content-center align-items-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    } 


    return (
    <div className="card text-white" style={{borderBottomLeftRadius: 40, borderBottomRightRadius: 40}}>
        <div className="bg-image" >
            <img
                loading="lazy"
                // onLoad={() => setLoading(false)}
                src={getImage(weather.weather[0].main)}
                className="card-img"
                alt="weather"
                style={{borderBottomLeftRadius: 40, borderBottomRightRadius: 40, opacity: 0.6}}
            />
        </div>
        <div className="card-img-overlay text-dark p-5">
            <h4 className="mb-0">{city.toUpperCase()}</h4>
            <p className="display-2 my-3">{weather.main.temp}°C</p>
            <p className="mb-2">Feels Like: <strong>{weather.main.feels_like} °C</strong></p>
            <h5>{weather.weather[0].main}</h5>
        </div>
    </div>
)
}

export default Content;
