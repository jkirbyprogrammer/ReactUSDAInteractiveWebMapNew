import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import USDAMap from "./USDAMap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";


function App() {
    const queryParams = new URLSearchParams(window.location.search);
    var type = queryParams.get("type");
    var year = queryParams.get("year");
    if (type == null) {
        type = "ussec";
    }
    if (year == null) {
        year = "2025"
    }

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div>
                        <a href="https://vite.dev" target="_blank">
                            <img src={viteLogo} className="logo" alt="Vite logo" />
                        </a>
                        <a href="https://react.dev" target="_blank">
                            <img src={reactLogo} className="logo react" alt="React logo" />
                        </a>
                    </div>
                </div>
                <div>
                    <h1>Vite + React</h1>
                </div>
            </div>
            <div className="row map-details">
                <div className="col-12">
                    <div className="map-heading">
                        <div>
                            <h3>Interactive map using crop and disaster designation data from USDA at the state/county level.</h3>
                        </div>
                        <div>
                            Use the layer option to toggle between state/county level details or change the base layer.
                        </div>
                        <div>
                            Use Presidential Emergency Declarations/US Secretary of Ag buttons to toggle data in map.
                        </div>
                        <div>
                            Click on the states/counties to see details. NOTE: Defaults to county as the primary layer, use layer option to toggle.
                        </div>
                        <div>
                            Use the year links to update the map year data set.
                        </div>
                    </div>
                </div>
            </div>
            <div className="row map-details">
                <div className="col-12">
                    <a className={type == "ussec" ? "btn btn-success btn-sm m-2 btn-MapSelected" : "btn btn-success btn-sm m-2"} href={ "?type=ussec&year=" + year}>
                        US Secretary of Agriculture
                    </a>
                    <a className={type == "pres" ? "btn btn-success btn-sm m-2 btn-MapSelected" : "btn btn-success btn-sm m-2"} href={"?type=pres&year=" + year}>
                        Presidential Declarations
                    </a>
                </div>
            </div>
            <div className="row map-details">
                <div className="col-12">
                    <ul className="nav justify-content-center">
                        <li className="nav-item">
                            <a className={year == "2020" ? "nav-link active" : "nav-link"} aria-current="page" href={"?type=" + type + "&year=2020"}>2020</a>
                        </li>
                        <li className="nav-item">
                            <a className={year == "2021" ? "nav-link active" : "nav-link"} href={"?type=" + type + "&year=2021"}>2021</a>
                        </li>
                        <li className="nav-item">
                            <a className={year == "2022" ? "nav-link active" : "nav-link"} href={"?type=" + type + "&year=2022"}>2022</a>
                        </li>
                        <li className="nav-item">
                            <a className={year == "2023" ? "nav-link active" : "nav-link"} href={"?type=" + type + "&year=2023"}>2023</a>
                        </li>
                        <li className="nav-item">
                            <a className={year == "2024" ? "nav-link active" : "nav-link"} href={"?type=" + type + "&year=2024"}>2024</a>
                        </li>
                        <li className="nav-item">
                            <a className={year == "2025" ? "nav-link active" : "nav-link"} href={"?type=" + type + "&year=2025"}>2025</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="row map-details">
                <div className="col-12">
                    <USDAMap />
                </div>
            </div>
        </>
    )
}

export default App
