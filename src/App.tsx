import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SimpleMap from "./SimpleMap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <div className="container-fluid">
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
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <div>
                                    <h5>Interactive map using crop and disaster designation data from USDA at the state/county level.</h5>
                                </div>
                                <div className="text-left">
                                    <ul>
                                        <li>Use the layer option to toggle between state/county level details or change the base layer.</li>
                                        <li>Use Presidential Emergency Declarations/US Secretary of Ag buttons to toggle data in map.</li>
                                        <li>Use the year links to update the map year data set.</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="btn-group">
                                <button className="btn btn-success" onClick={() => setCount((count) => count + 1)}>
                                    US Secretary of Agriculture {count}
                                </button>
                                <button className="btn btn-success" onClick={() => setCount((countSecond) => countSecond + 1)}>
                                    Presidential Emergency Declarations
                                </button>
                            </div>
                            <div className="card-body">
                                <div>
                                    <SimpleMap />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
