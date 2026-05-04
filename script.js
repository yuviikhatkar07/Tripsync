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

  let modalEl = document.getElementById("planModal");
  let modal =
    bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
  modal.hide();

  output.innerHTML =
    '<div class="text-center"><div class="spinner-border text-warning" role="status"><span class="visually-hidden">Loading...</span></div></div>';

  setTimeout(() => {
    let days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    let activities = {
      goa: ["Beach", "Water Sports", "Night Party"],
      manali: ["Snow", "Valley", "Cafe"],
      dubai: ["Burj Khalifa", "Safari", "Mall"],
      paris: ["Eiffel Tower", "Louvre Museum", "Seine River"],
      tokyo: ["Shibuya Crossing", "Temples", "Sushi"],
      bali: ["Beach Resort", "Rice Terraces", "Temples"],
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
  }, 1000);
}

function selectDestination(place) {
  document.getElementById("destination").value = place;

  document.getElementById("plan").scrollIntoView({
    behavior: "smooth",
    block: "start",
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

  // Handle typeahead search input
  const searchInput = document.getElementById("search");
  const destinationMap = {
    Goa: "goa",
    Manali: "manali",
    Dubai: "dubai",
    Paris: "paris",
    Tokyo: "tokyo",
  };

  searchInput.addEventListener("change", function () {
    const selectedValue = this.value.trim();
    const destinationCode = destinationMap[selectedValue];

    if (destinationCode) {
      // Set the destination in the dropdown
      document.getElementById("destination").value = destinationCode;

      // Scroll to the plan section
      document
        .getElementById("plan")
        .scrollIntoView({ behavior: "smooth", block: "start" });

      // Clear the search input
      this.value = "";
    }
  });
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
