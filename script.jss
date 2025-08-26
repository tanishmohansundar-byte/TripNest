document.addEventListener("DOMContentLoaded", () => {
  const step1 = document.getElementById("step1");
  const step2 = document.getElementById("step2");
  const step3 = document.getElementById("step3");
  const step4 = document.getElementById("step4");
  const formTitle = document.getElementById("formTitle");
  const destinationSelect = document.getElementById("destinationSelect");
  const bookingForm = document.getElementById("bookingForm");
  const confirmationDetails = document.getElementById("confirmationDetails");
  const finalDetails = document.getElementById("finalDetails");

  let tripType = "";
  let bookingData = {};

  const internationalDest = ["London", "Paris", "Switzerland", "New York", "Sydney", "Egypt", "Kenya", "Singapore", "Dubai", "Maldives", "Japan"];
  const domesticDest = ["Bangalore", "Mumbai", "Delhi", "Chennai", "Hyderabad", "Thiruvananthapuram", "Kolkata", "Srinagar"];

  // Step 1 buttons
  document.getElementById("btnInternational").addEventListener("click", () => {
    tripType = "international";
    step1.classList.remove("active");
    step2.classList.add("active");
    formTitle.textContent = "Beyond Borders, Beyond Ordinaries";
    populateDestinations(internationalDest);
  });

  document.getElementById("btnDomestic").addEventListener("click", () => {
    tripType = "domestic";
    step1.classList.remove("active");
    step2.classList.add("active");
    formTitle.textContent = "Your Next Adventure Starts Here";
    populateDestinations(domesticDest);
  });

  function populateDestinations(list) {
    destinationSelect.innerHTML = "";
    list.forEach(dest => {
      let opt = document.createElement("option");
      opt.value = dest;
      opt.textContent = dest;
      destinationSelect.appendChild(opt);
    });
  }

  // Step 2 → Step 3
  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    bookingData = {
      name: document.getElementById("name").value,
      age: document.getElementById("age").value,
      passengers: parseInt(document.getElementById("passengers").value),
      contact: document.getElementById("contact").value,
      email: document.getElementById("email").value,
      destination: destinationSelect.value,
      airline: document.getElementById("airline").value,
      days: parseInt(document.getElementById("days").value),
      departure: document.getElementById("departure").value,
      arrival: document.getElementById("arrival").value
    };

    let basePrice = tripType === "international" ? 60000 : 30000;
    let discountRate = tripType === "international" ? 0.30 : 0.25;

    bookingData.totalPrice = bookingData.passengers * bookingData.days * basePrice;
    bookingData.discount = bookingData.totalPrice * discountRate;
    bookingData.finalAmount = bookingData.totalPrice - bookingData.discount;

    confirmationDetails.innerHTML = `
      <p><b>Name:</b> ${bookingData.name}</p>
      <p><b>Age:</b> ${bookingData.age}</p>
      <p><b>Passengers:</b> ${bookingData.passengers}</p>
      <p><b>Contact:</b> ${bookingData.contact}</p>
      <p><b>Email:</b> ${bookingData.email}</p>
      <p><b>Destination:</b> ${bookingData.destination}</p>
      <p><b>Airline:</b> ${bookingData.airline}</p>
      <p><b>Days:</b> ${bookingData.days}</p>
      <p><b>Departure:</b> ${bookingData.departure}</p>
      <p><b>Arrival:</b> ${bookingData.arrival}</p>
      <p><b>Total Price:</b> ₹${bookingData.totalPrice}</p>
      <p><b>Discount:</b> ₹${bookingData.discount}</p>
      <p><b>Final Amount:</b> ₹${bookingData.finalAmount}</p>
    `;

    step2.classList.remove("active");
    step3.classList.add("active");
  });

  // Step
