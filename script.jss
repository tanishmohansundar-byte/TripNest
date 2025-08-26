document.addEventListener("DOMContentLoaded", () => {
  const step1 = document.getElementById("step1");
  const step2 = document.getElementById("step2");
  const formTitle = document.getElementById("formTitle");

  document.getElementById("btnInternational").addEventListener("click", () => {
    step1.classList.remove("active");
    step2.classList.add("active");
    formTitle.textContent = "Beyond Borders, Beyond Ordinaries";
  });

  document.getElementById("btnDomestic").addEventListener("click", () => {
    step1.classList.remove("active");
    step2.classList.add("active");
    formTitle.textContent = "Your Next Adventure Starts Here";
  });
});
