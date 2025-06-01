import React from "react";

const cards = [
  {
    title: "🧠 What is a Sleep Cycle?",
    content: "Each sleep cycle lasts ~90 minutes and includes deep, light, and REM sleep. Waking at the end of a cycle helps you feel refreshed.",
  },
  {
    title: "⏰ Why 90 Minutes?",
    content: "The brain goes through predictable patterns during sleep. Completing full cycles avoids grogginess (sleep inertia).",
  },
  {
    title: "💤 Ideal Sleep Length?",
    content: "4-6 full sleep cycles (6-9 hours) is ideal. Aim for a consistent bedtime for better sleep quality.",
  },
  {
    title: "🛑 Sleep Tips",
    content: "Avoid screens & caffeine 1 hour before bed. Use dim lights, cool temperature, and consistent sleep timing.",
  },
];

export default function SleepInfo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {cards.map((card, i) => (
        <div key={i} className="bg-white p-4 rounded-xl shadow-md">
          <h4 className="text-lg font-semibold text-blue-700 mb-2">{card.title}</h4>
          <p className="text-gray-600">{card.content}</p>
        </div>
      ))}
    </div>
  );
}
