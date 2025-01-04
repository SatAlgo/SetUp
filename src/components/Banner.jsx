// import React from 'react'

// function Banner() {
//     return (
//         <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-5">
//             <div className="w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-24">
//                 <div className="space-y-12">
//                     <h1 className="text-4xl font-bold">
//                         Welcome to <span className="text-green-500">freelancers's hub..</span>
//                     </h1>
//                     <p className="text-xl">
//                         We are delighted to have you here! This platform is designed to make
//                         your college life easier by providing quick and easy access to
//                         essential resources. Whether you're looking for assignments,
//                         projects, notes, residence help or gadgets, we've got you covered.
//                     </p>

//                     <label className="input input-bordered flex items-center gap-2">
//                         <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             viewBox="0 0 16 16"
//                             fill="currentColor"
//                             className="h-4 w-4 opacity-70">
//                             <path
//                                 d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
//                             <path
//                                 d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
//                         </svg>
//                         <input type="text" className="grow" placeholder="Email" />
//                     </label>
//                     <p className="text-xl">
//                         <span className="text-red-600 text-2xl font-semibold">
//                             Notice:{" "}
//                         </span>
//                         <br />
//                         Do your Summer Internship.
//                     </p>
//                 </div>
//                 <button className="mt-6 btn btn-secondary">Get Started</button>
//             </div>
//             <div className=" order-1 w-full md:w-1/2">
//                 {/* You can add content here if needed */}
//                 <img src='/banner.png' className="w-92 h-92 mt-16 ml-4" alt="" />
//             </div>

//             <div className=" order-1 w-full md:w-1/2r">
//                 {/* You can add content here if needed */}
//                 <img src='/free.jpg' className="w92 h-92 mt-16 rounded-md" alt="logo" />
//             </div>
//         </div>
//     )
// }

// export default Banner


import React from "react";
import { ReactTyped } from "react-typed";
import { Link } from "react-router-dom";

function Banner() {
  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-5">
      <div className="w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-24">
        <div className="space-y-8">
          <h1 className="text-4xl font-bold">
            Welcome to <span className="text-green-500">SetUp</span>
          </h1>
          <p className="text-xl">
            This platform is designed to connect you 
            with exciting internships and opportunities. Whether you're searching for 
            part-time roles, projects, or training, we have it all here for you.
          </p>
          <div className="mt-6 flex flex-col  space-x text-2xl md:text-4xl">
            <h2>Here, you can get</h2>
            <ReactTyped
              className="text-orange-500 font-bold"
              strings={[
                "Freelance Projects",
                "Internship Opportunities",
                "Client Managemen",
                "Remote Work",
                "Portfolio Building",
                "Skill Development",
              ]}
              typeSpeed={30}
              backSpeed={50}
              loop={true}
            />
          </div>
          <Link to="/signup">
            <button className="mt-12 btn btn-secondary">Get Started</button>
          </Link>
          <p className="text-xl">
            <span className="text-red-600 text-2xl font-semibold">
              Notice:{" "}
            </span>
            <br />
            Do your Summer Internship.
          </p>
        </div>
      </div>
      <div className=" order-1 w-full md:w-1/2">
        {/* You can add content here if needed */}
        <img src='/free.jpg' className="w-92 h-92 mt-16 " alt="" />
      </div>
    </div>
  );
}

export default Banner;