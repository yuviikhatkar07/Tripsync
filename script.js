function generatePlan() {
  let destination = document.getElementById("destination").value;
  let start = new Date(document.getElementById("startDate").value);
  let end = new Date(document.getElementById("endDate").value);
  let output = document.getElementById("itinerary");

  if (!destination || !start || !end || start >= end) {
    output.innerHTML =
      "<div class='alert alert-danger'>Enter valid details</div>";
    return;
  }

  let days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

  let activities = {
    goa: ["Beach", "Water Sports", "Night Party"],
    manali: ["Snow", "Valley", "Cafe"],
    dubai: ["Burj Khalifa", "Safari", "Mall"],
  };

  let plan = activities[destination];
  let result = "<div class='row'>";

  for (let i = 0; i < days; i++) {
    result += `
        <div class="col-md-4 mb-3">
            <div class="card p-3 shadow-sm">
                <h5>Day ${i + 1}</h5>
                <p>${plan[i % plan.length]}</p>
            </div>
        </div>`;
  }

  result += "</div>";
  output.innerHTML = result;

  let modalEl = document.getElementById("planModal");
  let modal =
    bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
  modal.hide();
}

function selectDestination(place) {
  document.getElementById("destination").value = place;

  document.querySelector(".plan-box").scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
}

const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]',
);
tooltipTriggerList.forEach((el) => new bootstrap.Tooltip(el));

document.addEventListener("DOMContentLoaded", function () {
  const popoverTriggerList = document.querySelectorAll(
    '[data-bs-toggle="popover"]',
  );
  popoverTriggerList.forEach((el) => {
    new bootstrap.Popover(el);
  });

  // Initialize pagination
  showPage(1);
});

function showPage(page) {
  // Hide all insight cards
  const cards = document.querySelectorAll(".insight-card");
  cards.forEach((card) => {
    card.style.display = "none";
  });

  // Show cards for the selected page
  const pageCards = document.querySelectorAll(
    `.insight-card[data-page="${page}"]`,
  );
  pageCards.forEach((card) => {
    card.style.display = "block";
  });

  // Update pagination active state
  document.querySelectorAll(".page-item").forEach((item) => {
    item.classList.remove("active");
  });
  document.getElementById(`page${page}`).classList.add("active");
}
