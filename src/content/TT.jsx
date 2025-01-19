
import React from "react";
import Navbar from "../components/Navbar";
import Timetable from "../components/Timetable";
import TableTT from "../components/TableTT";
import Footer from "../components/Footer";

function TT() {
    return (
        <>
            <Navbar />
            <div className="min-h-screen">
            <Timetable />
            </div>
            <TableTT/>
            <Footer />
        </>
    );
}

export default TT;
