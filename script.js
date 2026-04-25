const form = document.querySelector("form");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const prepMinutes = Number(document.getElementById("user-prep").value);
  const commuteHours = Number(document.getElementById("user-commute").value);
  const arrivalTimeStr = document.getElementById("user-arrive").value;
  const results = calculate(prepMinutes, commuteHours, arrivalTimeStr);

  document.getElementById("result-prep").textContent = results.startPrep;
  document.getElementById("result-leave").textContent = results.leaveBy;
  document.getElementById("result-arrive").textContent = results.arriveBy;

  document.getElementById("results").removeAttribute("hidden");
});

function parseTime(timeStr) {
  // timeStr is "HH:MM" from the time input
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + minutes; // convert everything to total minutes
}

function formatTime(totalMinutes) {
  // Convert total minutes back to a readable HH:MM AM/PM string
  let hours = Math.floor(totalMinutes / 60) % 24;
  const minutes = totalMinutes % 60;
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // convert 0 to 12 for 12 AM
  return `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
}

function calculate(prepMinutes, commuteHours, arrivalTimeStr) {
  const commuteMinutes = commuteHours * 60; // your commute input is in hours
  const arrivalInMinutes = parseTime(arrivalTimeStr);

  const leaveTime = arrivalInMinutes - commuteMinutes;
  const startPrepTime = leaveTime - prepMinutes;

  return {
    startPrep: formatTime(startPrepTime),
    leaveBy: formatTime(leaveTime),
    arriveBy: formatTime(arrivalInMinutes),
  };
}
