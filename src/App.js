import React, { useState } from "react";

function formatTime(date) {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  const paddedMinutes = minutes.toString().padStart(2, "0");
  return `${hours}:${paddedMinutes} ${ampm}`;
}

function SleepCycleCalculator() {
  const [bedtime, setBedtime] = useState("23:15");
  const [wakeUpTime, setWakeUpTime] = useState("07:30");
  const [wakeUpTimes, setWakeUpTimes] = useState([]);
  const [sleepTimes, setSleepTimes] = useState([]);

  const calculateWakeUpTimes = () => {
    const [hours, minutes] = bedtime.split(":").map(Number);
    const sleepStart = new Date();
    sleepStart.setHours(hours);
    sleepStart.setMinutes(minutes + 15); // 15-min buffer
    sleepStart.setSeconds(0);

    const cycles = [];
    for (let i = 1; i <= 6; i++) {
      const cycleTime = new Date(sleepStart.getTime() + i * 90 * 60 * 1000);
      cycles.push({
        time: formatTime(cycleTime),
        cycle: i,
        isBest: i === 5 || i === 6,
      });
    }
    setWakeUpTimes(cycles);
    setSleepTimes([]);
  };

  const calculateSleepTimes = () => {
    const [hours, minutes] = wakeUpTime.split(":").map(Number);
    const wakeTime = new Date();
    wakeTime.setHours(hours);
    wakeTime.setMinutes(minutes);
    wakeTime.setSeconds(0);

    const cycles = [];
    for (let i = 1; i <= 6; i++) {
      const totalMinutes = i * 90 + 15; // 90 mins per cycle + 15 min buffer
      const cycleTime = new Date(wakeTime.getTime() - totalMinutes * 60 * 1000);
      cycles.push({
        time: formatTime(cycleTime),
        cycle: i,
        isBest: i === 5 || i === 6,
      });
    }

    setSleepTimes(cycles);
    setWakeUpTimes([]);
  };

  return (
    <div className="min-h-screen p-6 bg-blue-100 text-center">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">🛏 Sleep Cycle Calculator</h1>

      {/* Bedtime Input */}
      <div className="mb-6">
        <label className="text-lg font-medium">Enter your bedtime:</label>
        <br />
        <input
          type="time"
          value={bedtime}
          onChange={(e) => setBedtime(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && calculateWakeUpTimes()}
          className="mt-2 px-3 py-1 border rounded text-lg"
        />
        <button
          onClick={calculateWakeUpTimes}
          className="ml-3 mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Calculate Wake Up Times
        </button>
        <p className="mt-2 text-sm text-gray-700 italic">
          * 15-minute buffer is added to fall asleep.
        </p>
      </div>

      {/* Wake-up Time Input */}
      <div className="mb-6">
        <label className="text-lg font-medium">Enter your wake-up time:</label>
        <br />
        <input
          type="time"
          value={wakeUpTime}
          onChange={(e) => setWakeUpTime(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && calculateSleepTimes()}
          className="mt-2 px-3 py-1 border rounded text-lg"
        />
        <button
          onClick={calculateSleepTimes}
          className="ml-3 mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Calculate Sleep Times
        </button>
        <p className="mt-2 text-sm text-gray-700 italic">
          * 15-minute buffer is subtracted to fall asleep.
        </p>
      </div>

      {/* Wake-up Time Results */}
      {wakeUpTimes.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">You should wake up at:</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {wakeUpTimes.map((item, index) => (
              <div
                key={index}
                className={`px-4 py-2 rounded shadow-md ${
                  item.isBest ? "bg-green-400 text-white font-bold" : "bg-white text-gray-800"
                }`}
              >
                <div>{item.time}</div>
                <div className="text-sm">
                  Sleep Cycle {item.cycle}
                  {item.isBest && " - Best Sleep Cycle"}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sleep Time Results */}
      {sleepTimes.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-green-900 mb-2">You should fall asleep at:</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {sleepTimes.map((item, index) => (
              <div
                key={index}
                className={`px-4 py-2 rounded shadow-md ${
                  item.isBest ? "bg-green-400 text-white font-bold" : "bg-white text-gray-800"
                }`}
              >
                <div>{item.time}</div>
                <div className="text-sm">
                  Sleep Cycle {item.cycle}
                  {item.isBest && " - Best Sleep Cycle"}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info Section */}
      <div className="mt-10 grid md:grid-cols-2 gap-4 text-left">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold text-blue-800">📘 What is a Sleep Cycle?</h3>
          <p>
            One cycle lasts ~90 minutes and includes deep, light, and REM sleep.
            Waking at the end of a cycle helps you feel refreshed.
          </p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold text-pink-600">⏰ Why 90 Minutes?</h3>
          <p>
            The brain goes through predictable patterns during sleep.
            Completing full cycles avoids grogginess (sleep inertia).
          </p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold text-purple-700">🕒 Ideal Sleep Length?</h3>
          <p>
            5–6 cycles (7.5–9 hours) is ideal. Aim for a consistent bedtime for
            better sleep quality.
          </p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold text-red-600">📌 Sleep Tips</h3>
          <p>
            Avoid screens & caffeine 1 hour before bed. Use dim lights, cool
            temperature, and maintain consistent sleep timing.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SleepCycleCalculator;
