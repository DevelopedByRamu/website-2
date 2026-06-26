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

document.querySelectorAll(".pharaoh-card, .poster-card").forEach((card) => {
  card.addEventListener("click", () => {
    openDetail(card.dataset.target);
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
    closeToSection(btn.dataset.backTo);
  });
});

const bookImage = document.getElementById("bookImage");
const bookImages = [
  {
    src: "img/Back cover_Book_Mockup.jpg.jpeg",
    alt: "Book front view",
  },
  {
    src: "img/Book cover_Mockup.jpg.jpeg",
    alt: "Book side view",
  },
  {
    src: "img/Book_Mockup.jpg.jpeg",
    alt: "Book back view",
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
