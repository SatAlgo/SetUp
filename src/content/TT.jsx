
import React from "react";
import Navbar from "../components/Navbar";
import Timetable from "../components/Timetable";
import Footer from "../components/Footer";

function TT() {
    return (
        <>
            <Navbar />
            <div className="min-h-screen">
            <Timetable />
            </div>
            <Footer />
        </>
    );
}

export default TT;
