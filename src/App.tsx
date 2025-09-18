import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import USDAMap from "./USDAMap";
import './App.css'
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
            </div>
            <div className="row map-details">
                <div className="col-12">
                    <div className="map-heading">
                        <div>
                            <h4>Interactive map using crop, disaster designation, and USFS fire occurance data from USDA at the state/county level.</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row map-details">
                <div className="col-12">
                    <a className={type == "ussec" ? "btn btn-success btn-sm m-2 btn-MapSelected"
                        : "btn btn-success btn-sm m-2"} href={"?type=ussec&year=" + year}>
                        US Secretary of Agriculture
                    </a>
                    <a className={type == "pres" ? "btn btn-success btn-sm m-2 btn-MapSelected"
                        : "btn btn-success btn-sm m-2"} href={"?type=pres&year=" + year}>
                        Presidential Declarations
                    </a>
                </div>
            </div>
            <div className="row map-details">
                <div className="col-12">
                    <ul className="nav justify-content-center">
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
                    <USDAMap year={year} type={type} />
                </div>
            </div>

            <div className="row map-detail-list">
                <div className="col-12">
                    <div>
                        <ul>
                            <li>Use the layer option to toggle between state/county level details or change the base layer.</li>
                            <li>Use Presidential Emergency Declarations/US Secretary of Ag buttons to toggle data in map.</li>
                            <li>Click on the states/counties to see details. <b>Note:</b> Defaults to county as the primary layer, use layer option to toggle.</li>
                            <li>Use the year links to update the map year data set.</li>
                            <li>Points represent ignition or origin from which the individual USFS wildland fires started by year. <b>Note:</b> Until full dataset is out for year 2025, the 2024 data will show when 2025 year is selected. </li>
                            <li>
                                Data sources used to create GeoJson for map:
                                <ul>
                                    <li>
                                        <a target="_blank" href="https://www.fsa.usda.gov/resources/disaster-assistance-program/disaster-designation-information">
                                            USDA Disaster Designation Information
                                        </a>
                                    </li>
                                    <li>
                                        <a target="_blank" href="https://quickstats.nass.usda.gov/">
                                            USDA Quick Stats Census
                                        </a>
                                    </li>
                                    <li>
                                        <a target="_blank" href="https://catalog.data.gov/dataset/national-usfs-fire-occurrence-point-feature-layer-d3233">
                                            National USFS Fire Occurrence Point
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
