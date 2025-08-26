let currentType = "";

const internationalDestinations = [
  "London", "Paris", "Switzerland", "New York",
  "Sydney", "Egypt", "Kenya", "Singapore", "Dubai", "Maldives", "Japan"
];

const domesticDestinations = [
  "Bangalore", "Mumbai", "Delhi", "Chennai",
  "Hyderabad", "Thiruvananthapuram", "Kolkata", "Srinagar"
];

function showStep(step) {
  document.querySelectorAll(".step").forEach(s => s.classList.remove("active"));
  document.getElementById(step).classList.add("active");
}

// Step 1 → Step 2
document.getElementById("btnInternational").addEventListener("click", () => {
  currentType = "international";
  setupForm();
  showStep("step2");
});

document.getElementById("btnDomestic").addEventListener("click", () => {
  currentType = "domestic";
  setupForm();
  showStep("step2");
});

function setupForm() {
  const formTitle = document.getElementById("formTitle");
  const destinationSelect = document.getElementById("destinationSelect");
  destinationSelect.innerHTML = "";

  if (currentType === "international") {
    formTitle.textContent = "Beyond Borders, Beyond Ordinaries";
    internationalDestinations.forEach(d => {
      let opt = document.createElement("option");
      opt.textContent = d;
      destinationSelect.appendChild(opt);
    });
  } else {
    formTitle.textContent = "Your Next Adventure Starts Here";
    domesticDestinations.forEach(d => {
      let opt = document.createElement("option");
      opt.textContent = d;
      destinationSelect.appendChild(opt);
    });
  }
}

// Step 2 → Step 3
document.getElementById("bookingForm").addEventListener("submit", (e) => {
  e.preventDefault();
  let name = document.getElementById("name").value;
  let age = document.getElementById("age").value;
  let passengers = parseInt(document.getElementById("passengers").value);
  let contact = document.getElementById("contact").value;
  let email = document.getElementById("email").value;
  let destination = document.getElementById("destinationSelect").value;
  let airline = document.getElementById("airline").value;
  let days = parseInt(document.getElementById("days").value);
  let departure = document.getElementById("departure").value;
  let arrival = document.getElementById("arrival").value;

  let pricePerDay = currentType === "international" ? 60000 : 30000;
  let discountRate = currentType === "international" ? 0.3 : 0.25;

  let totalPrice = passengers * days * pricePerDay;
  let discount = totalPrice * discountRate;
  let finalAmount = totalPrice - discount;

  document.getElementById("confirmationDetails").innerHTML = `
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Age:</strong> ${age}</p>
    <p><strong>Passengers:</strong> ${passengers}</p>
    <p><strong>Contact:</strong> ${contact}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Destination:</strong> ${destination}</p>
    <p><strong>Airline:</strong> ${airline}</p>
    <p><strong>Days:</strong> ${days}</p>
    <p><strong>Departure:</strong> ${departure}</p>
    <p><strong>Arrival:</strong> ${arrival}</p>
    <p><strong>Total Price:</strong> ₹${totalPrice}</p>
    <p><strong>Discount:</strong> ₹${discount}</p>
    <p><strong>Final Amount:</strong> ₹${finalAmount}</p>
  `;

  showStep("step3");

  // Store for final ticket
  sessionStorage.setItem("bookingData", JSON.stringify({
    name, age, passengers, contact, email, destination,
    airline, days, departure, arrival, totalPrice, discount, finalAmount
  }));
});

// Step 3 → Step 4
document.getElementById("btnConfirm").addEventListener("click", () => {
  let data = JSON.parse(sessionStorage.getItem("bookingData"));

  document.getElementById("outName").textContent = data.name;
  document.getElementById("outAge").textContent = data.age;
  document.getElementById("outPassengers").textContent = data.passengers;
  document.getElementById("outContact").textContent = data.contact;
  document.getElementById("outEmail").textContent = data.email;
  document.getElementById("outDestination").textContent = data.destination;
  document.getElementById("outAirline").textContent = data.airline;
  document.getElementById("outDays").textContent = data.days;
  document.getElementById("outDeparture").textContent = data.departure;
  document.getElementById("outArrival").textContent = data.arrival;
  document.getElementById("outPrice").textContent = "₹" + data.totalPrice;
  document.getElementById("outDiscount").textContent = "₹" + data.discount;
  document.getElementById("outFinal").textContent = "₹" + data.finalAmount;

  // Generate QR Code (using Google API)
  const qrText = `TripNest Booking: ${data.name}, ${data.destination}, Final: ₹${data.finalAmount}`;
  document.getElementById("qrCode").src =
    `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrText)}&size=150x150`;

  document.getElementById("confirmationLink").href = "#";
  document.getElementById("confirmationLink").textContent = "TripNest Order Confirmation";

  showStep("step4");
});
