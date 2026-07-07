const sections = document.querySelectorAll(".section");
const mainSite = document.getElementById("mainSite");
const detailViews = document.querySelectorAll(".detail-view");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible");
      }
    });
  },
  {
    threshold: 0.18,
  },
);

sections.forEach((section) => observer.observe(section));

function openDetail(id) {
  mainSite.classList.add("hidden");

  detailViews.forEach((view) => {
    view.classList.remove("active", "show");
  });

  const target = document.getElementById(id);
  target.classList.add("active");

  requestAnimationFrame(() => {
    target.classList.add("show");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function closeToSection(sectionId) {
  detailViews.forEach((view) => {
    view.classList.remove("show");
  });

  setTimeout(() => {
    detailViews.forEach((view) => {
      view.classList.remove("active");
    });

    mainSite.classList.remove("hidden");

    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, 250);
}

document.getElementById("openPharaohTriptych").addEventListener("click", () => {
  openDetail("pharaoh-triptych-view");
});

document.getElementById("openDynamicPoses").addEventListener("click", () => {
  openDetail("dynamic-poses");
});

document.getElementById("openBuyBook").addEventListener("click", () => {
  openDetail("buy-book-page");
});

document
  .querySelectorAll("#posters-section .triptych-grid img, .pharaoh-card")
  .forEach((card) => {
    card.addEventListener("click", () => {
      if (card.dataset.target) {
        openDetail(card.dataset.target);
      }
    });
  });

const pageAudio = document.getElementById("pageAudio");
const audioToggle = document.getElementById("audioToggle");

if (audioToggle && pageAudio) {
  const audioIcon = audioToggle.querySelector(".audio-icon");

  const updateAudioToggle = () => {
    if (pageAudio.paused) {
      audioIcon.textContent = "🔇";
      audioToggle.setAttribute("aria-label", "Turn audio on");
    } else {
      audioIcon.textContent = "🔊";
      audioToggle.setAttribute("aria-label", "Turn audio off");
    }
  };

  updateAudioToggle();

  audioToggle.addEventListener("click", () => {
    if (pageAudio.paused) {
      pageAudio.play();
    } else {
      pageAudio.pause();
    }
    updateAudioToggle();
  });
}

document.querySelectorAll(".back-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetId = btn.dataset.backTo;
    const target = document.getElementById(targetId);

    if (target && target.classList.contains("detail-view")) {
      openDetail(targetId);
    } else {
      closeToSection(targetId);
    }
  });
});

const unitPrice = 399.99;
let quantity = 1;
const quantityValue = document.getElementById("quantityValue");
const summaryQty = document.getElementById("summaryQty");
const summaryPrice = document.getElementById("summaryPrice");
const buyerEmail = document.getElementById("buyerEmail");
const checkoutMessage = document.getElementById("checkoutMessage");

function updatePurchaseSummary() {
  quantityValue.textContent = quantity;
  summaryQty.textContent = quantity;
  summaryPrice.textContent = `R${(unitPrice * quantity).toFixed(2)}`;
}

document.getElementById("increaseQty").addEventListener("click", () => {
  quantity += 1;
  updatePurchaseSummary();
});

document.getElementById("decreaseQty").addEventListener("click", () => {
  quantity = Math.max(1, quantity - 1);
  updatePurchaseSummary();
});

document.getElementById("checkoutBtn").addEventListener("click", () => {
  const email = buyerEmail.value.trim();

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    checkoutMessage.textContent = "Please enter a valid email address.";
    return;
  }

  checkoutMessage.textContent = `Thank you! Your order for ${quantity} copy${quantity > 1 ? "ies" : "y"} is being prepared and a receipt will be sent to ${email}.`;
});

updatePurchaseSummary();

const bookImage = document.getElementById("bookImage");
const bookImages = [
  {
    src: "img/Thick_Book_Mockup_7.png",
    alt: "Book front view",
  },
  {
    src: "img/Free_Book_Mockup_7.jpg",
    alt: "Book side view",
  },
];

let currentBookIndex = 0;

bookImage.addEventListener("click", () => {
  bookImage.style.opacity = "0";

  setTimeout(() => {
    currentBookIndex = (currentBookIndex + 1) % bookImages.length;
    bookImage.src = bookImages[currentBookIndex].src;
    bookImage.alt = bookImages[currentBookIndex].alt;
    bookImage.style.opacity = "1";
  }, 180);
});
