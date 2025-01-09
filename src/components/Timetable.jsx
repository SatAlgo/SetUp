import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function Timetable() {
  const [division, setDivision] = useState('');
  const [batch, setBatch] = useState('');
  const [currentLecture, setCurrentLecture] = useState(null);
  const [nextLecture, setNextLecture] = useState(null);

  // Sample timetable data
  const timetableData = {
    A: {
      4: {
        Monday: [
          { time: '8:30 AM - 10:20 AM', subject: 'EAD(Adv JAVA) Lab', teacher: 'Vinodini Gupta', location: 'H207B' },
          { time: '10:30 AM - 12:20 PM', subject: 'EVS Theory', teacher: 'NVB', location: 'H202' },
          { time: '01:15 PM - 03:05 PM', subject: 'DBMS Lab', teacher: 'MNV', location: 'H306C' },

        ],
        Tuesday: [
          { time: '8:30 AM - 10:20 AM', subject: 'EAD(Adv JAVA) Lab', teacher: 'Vinodini Gupta', location: 'H207B' },
          { time: '10:30 AM - 12:20 PM', subject: 'EI Lab', teacher: 'PDG', location: 'H204B' },
          { time: '01:15 PM - 02:10 PM', subject: 'DBMS Theory', teacher: 'MNV', location: 'H309' },
          { time: '02:10 PM - 03:05 PM', subject: 'TOC', teacher: 'SBK', location: 'H309' },
        ],
        Wednesday: [
          { time: '8:30 AM - 10:20 AM', subject: 'Proto(Mech) Lab', teacher: 'ORP', location: 'H002' },
          { time: '10:30 AM - 12:20 PM', subject: 'Proto(Civil) Lab', teacher: 'SGS', location: 'H001' },
          { time: '01:15 PM - 02:10 PM', subject: 'TOC', teacher: 'SBK', location: 'H309' },
          { time: '02:10 PM - 03:05 PM', subject: 'ADS', teacher: 'BA', location: 'H309' },
        ],
        Thursday: [
          { time: '8:30 AM - 9:24 AM', subject: 'EI Theory', teacher: 'PDG', location: 'H309' },
          { time: '09:24 AM - 10:20 AM', subject: 'DBMS Theory', teacher: 'MNV', location: 'H309' },
          { time: '10:30 AM - 12:20 PM', subject: 'ADS Lab', teacher: 'BA', location: 'H207B' },
        ],
        Friday: [
          { time: '8:30 AM - 9:24 AM', subject: 'TOC Theory', teacher: 'SBK', location: 'H309' },
          { time: '09:24 AM - 10:20 PM', subject: 'DBMS Theory', teacher: 'MNV', location: 'H309' },
          { time: '10:30 AM - 11:24 AM', subject: 'EI Theory', teacher: 'PDG', location: 'H309' },
          { time: '11:24 AM - 12:20 PM', subject: 'ADS Theory', teacher: 'BA', location: 'H309' },
        ],
        // Add other days (Wednesday, Thursday, Friday) here...
      },
      2: {
        Monday: [
          { time: '11:00 AM - 12:00 PM', subject: 'Math', teacher: 'Dr. Smith', location: 'Room 101' },
          { time: '02:00 PM - 03:00 PM', subject: 'Physics', teacher: 'Prof. Johnson', location: 'Room 102' },
        ],
        Tuesday: [
          { time: '11:00 AM - 12:00 PM', subject: 'Chemistry', teacher: 'Dr. White', location: 'Room 103' },
          { time: '02:00 PM - 03:00 PM', subject: 'Biology', teacher: 'Prof. Green', location: 'Room 104' },
          { time: '04:00 PM - 08:00 PM', subject: 'Physics', teacher: 'Prof. Johnson', location: 'Room 102' },
        ],
        // Add other days (Wednesday, Thursday, Friday) here...
      },
    },
  };

  const handleDivisionChange = (e) => {
    setDivision(e.target.value);
    setBatch('');
    setCurrentLecture(null);
    setNextLecture(null);
  };

  const handleBatchChange = (e) => {
    setBatch(e.target.value);
    updateLectures(e.target.value);
  };

  const updateLectures = (batch) => {
    if (division && batch) {
      const timetable = timetableData[division][batch];
      const currentTime = new Date();
      const currentDay = currentTime.toLocaleString('en-US', { weekday: 'long' });
      const currentTimeInMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

      // Find the current and next lecture based on time
      const [current, next] = getCurrentAndNextLectures(timetable[currentDay], currentTimeInMinutes);
      setCurrentLecture(current);
      setNextLecture(next);
    }
  };

  const getCurrentAndNextLectures = (dayTimetable, currentTimeInMinutes) => {
    let current = null;
    let next = null;
    let foundNextLecture = false;

    dayTimetable.forEach((lecture, index) => {
      const [startTime, endTime] = lecture.time.split(' - ');
      const start = convertToMinutes(startTime);
      const end = convertToMinutes(endTime);

      // Check if current time is within the lecture's time range
      if (currentTimeInMinutes >= start && currentTimeInMinutes < end) {
        current = lecture;
      } else if (currentTimeInMinutes < start && !foundNextLecture) {
        next = lecture;
        foundNextLecture = true;
      }
    });

    if (!current && next) {
      // If no current lecture, set the next lecture as current
      current = next;
      next = getNextLectureForNextDay();
    }

    return [current, next];
  };

  const convertToMinutes = (time) => {
    const [hour, minute] = time.split(':');
    const amPm = time.split(' ')[1];
    let hourIn24 = parseInt(hour);

    if (amPm === 'PM' && hourIn24 !== 12) {
      hourIn24 += 12; // Convert PM to 24-hour format
    } else if (amPm === 'AM' && hourIn24 === 12) {
      hourIn24 = 0; // Convert 12 AM to 00:00
    }

    return hourIn24 * 60 + parseInt(minute); // Convert time to minutes
  };

  const getNextLectureForNextDay = () => {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const nextDayIndex = (daysOfWeek.indexOf(new Date().toLocaleString('en-US', { weekday: 'long' })) + 1) % daysOfWeek.length;
    const nextDay = daysOfWeek[nextDayIndex];

    return timetableData[division][batch][nextDay][0]; // Return the first lecture for the next day
  };

  return (
    <div className="mb-0 mt-[64px] md:mt-6 flex flex-col items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-900 dark:text-white px-4">
      <h1 className="text-3xl font-bold mb-4 text-teal-400">Class Timetable</h1>

      <div className="mb-5">
        <label htmlFor="division" className="mr-3">Select Division:</label>
        <select
          id="division"
          value={division}
          onChange={handleDivisionChange}
          className="px-4 py-2 rounded-md dark:text-black"
        >
          <option value="">Select Division</option>
          <option value="A">A</option>
          {/* <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option> */}
          {/* Add other divisions here */}
        </select>
      </div>

      <div className="mb-5">
        <label htmlFor="batch" className="mr-3">Select Batch:</label>
        <select
          id="batch"
          value={batch}
          onChange={handleBatchChange}
          className="px-4 py-2 rounded-md dark:text-black"
        >
          <option value="">Select Batch</option>
          {/* <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option> */}
          <option value="4">4</option>
          {/* Add other batches here */}
        </select>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Timetable for <span className="text-blue-500">{division}</span> - <span className="text-blue-500">{batch}</span> Batch</h2>

        <div className="mb-5">
          <p className="font-semibold text-red-500">Current Lecture:</p>
          {currentLecture ? (
            <div className=''>
              <p>Time: <span className='font-semibold text-black dark:bg-slate-900 dark:text-yellow-300 '>{currentLecture.time}</span> <br />
                <span className='font-semibold text-black dark:bg-slate-900 dark:text-purple-400 '>{currentLecture.subject}</span>
              </p>
              <p>Teacher: <span className='font-semibold text-black dark:bg-slate-900 dark:text-yellow-300 '>{currentLecture.teacher}</span></p>
              <p>Location: <span className='font-semibold text-black dark:bg-slate-900 dark:text-yellow-300 '>{currentLecture.location}</span></p>
            </div>
          ) : (
            <p>No current lecture available.</p>
          )}

          <p className="font-semibold mt-2 text-green-500">Next Lecture:</p>
          {nextLecture ? (
            <div>
              <p>The next lecture will be on <span className='font-semibold text-black dark:bg-slate-900 dark:text-yellow-300 '>{new Date().toLocaleDateString('en-GB')}</span> <br />
                Time: <span className='font-semibold text-black dark:bg-slate-900 dark:text-yellow-300 '> {nextLecture.time}</span></p>
              <p><span className='font-semibold text-black dark:bg-slate-900 dark:text-purple-400 '>{currentLecture.subject}</span><br />
                Teacher: <span className='font-semibold text-black dark:bg-slate-900 dark:text-yellow-300 '>{currentLecture.teacher}</span><br />
                Location: <span className='font-semibold text-black dark:bg-slate-900 dark:text-yellow-300 '>{currentLecture.location}</span></p>
            </div>
          ) : (
            <p>No more lectures for today.</p>
          )}
        </div>

        <div className="mt-5">
          {/* <p className="text-sm text-gray-500">{new Date().toLocaleString()} <br />MM/DD/YYYY</p> */}
          {/* <p className="text-sm text-gray-500">{new Date().toLocaleString('en-GB')}</p> */}
          <p className="text-sm text-gray-500">
            {new Date().toLocaleString('en-GB', {
              month: 'numeric',
              day: 'numeric',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',

              hour12: true
            })}
          </p>


        </div>
      </div>

      <Link to="/" className="mt-5 text-blue-500 hover:text-blue-700">Go Back</Link>
    </div>
  );
}

export default Timetable;
