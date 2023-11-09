import React, { useState } from 'react'
import Navbar from './Components/Navbar'
import News from './Components/News'
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'


export default function App() {

    // Initializing progress state
    const [progress, setProgress] = useState(0);

    // Page size and api key variable 
    const pageSize = 10;
    const apikey = process.env.REACT_APP_NEWS_API;

    return (

        // Router initialization
        <Router>

            <div>

                {/* Navbar component */}
                <Navbar />

                {/* Loading bar component (Important using npm) */}
                <LoadingBar color='#f11946' height={3} progress={progress} />

                {/* Routes space */}
                <Routes>

                    {/* Route with different categories */}
                    <Route exact path="/business" element={<News apikey={apikey} setProgress={setProgress} key={"business"} pageSize={pageSize} country={"in"} category={"business"} />} />
                    <Route exact path="/entertainment" element={<News apikey={apikey} setProgress={setProgress} key={"entertainment"} pageSize={pageSize} country={"in"} category={"entertainment"} />} />
                    <Route exact path="/general" element={<News apikey={apikey} setProgress={setProgress} key={"general"} pageSize={pageSize} country={"in"} category={"general"} />} />
                    <Route exact path="/health" element={<News apikey={apikey} setProgress={setProgress} key={"health"} pageSize={pageSize} country={"in"} category={"health"} />} />
                    <Route exact path="/science" element={<News apikey={apikey} setProgress={setProgress} key={"science"} pageSize={pageSize} country={"in"} category={"science"} />} />
                    <Route exact path="/sports" element={<News apikey={apikey} setProgress={setProgress} key={"sports"} pageSize={pageSize} country={"in"} category={"sports"} />} />
                    <Route exact path="/technology" element={<News apikey={apikey} setProgress={setProgress} key={"technology"} pageSize={pageSize} country={"in"} category={"technology"} />} />

                </Routes>
            </div>
        </Router>
    )
}