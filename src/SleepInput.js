import React, { useState } from "react";

export default function SleepInput() {
  const [time, setTime] = useState("");
  const [results, setResults] = useState([]);

  const formatTime = (date) =>
    new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date);

  const calculate = () => {
    if (!time) return;

    const [hours, minutes] = time.split(":").map(Number);
    const now = new Date();
    now.setHours(hours);
    now.setMinutes(minutes);
    now.setSeconds(0);

    const cycles = 6;
    const buffer = 15;
    const output = [];

    for (let i = 1; i <= cycles; i++) {
      const wake = new Date(now.getTime() + (i * 90 + buffer) * 60000);
      output.push(formatTime(wake));
    }

    setResults(output);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md mb-8">
      <h2 className="text-xl font-semibold text-gray-700 mb-2">Enter your bedtime:</h2>
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="border p-2 rounded mr-4"
      />
      <button
        onClick={calculate}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Calculate
      </button>

      {results.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-700">Suggested Wake-up Times:</h3>
          <ul className="list-disc list-inside mt-2 text-gray-600">
            {results.map((time, index) => (
              <li key={index}>Cycle {index + 1}: {time}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
