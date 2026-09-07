const leftPhotos = [
  "foto1.JPEG",
  "foto2.PNG",
  "foto3.JPEG",
  "foto4.JPEG",
  "foto5.JPEG"
];

const rightPhotos = [
  "foto6.JPEG",
  "foto7.PNG",
  "foto8.JPEG",
  "foto9.JPEG",
  "foto10.JPEG"
];

function createPhotoRain(containerId, photos) {
  const container = document.getElementById(containerId);
  const photoQueue = photos.concat(photos, photos);

  photoQueue.forEach(function (path, index) {
    const frame = document.createElement("div");
    frame.className = "falling-photo";

    frame.style.left = (3 + ((index * 17) % 72)) + "%";
    frame.style.setProperty("--size", (118 + (index % 3) * 18) + "px");
    frame.style.setProperty("--duration", (25 + (index % 3) * 1.5) + "s");
    frame.style.setProperty("--delay", (-index * 1.8) + "s");
    frame.style.setProperty("--tilt", (-12 + (index % 6) * 5) + "deg");

    const image = document.createElement("img");
    image.src = path;
    image.alt = "";

    frame.appendChild(image);
    container.appendChild(frame);
  });
}

createPhotoRain("left-rain", leftPhotos);
createPhotoRain("right-rain", rightPhotos);

const blowButton = document.getElementById("blow-button");
const surprise = document.getElementById("surprise");
const cardsSection = document.getElementById("memory-cards");
const hint = document.getElementById("hint");
const birthdaySong = document.getElementById("birthday-song");

blowButton.addEventListener("click", function () {
  if (document.body.classList.contains("blown")) {
    return;
  }

  document.body.classList.add("blown");

  /* Safari permite esto porque ocurrió tras el toque del botón */
  birthdaySong.volume = 0.55;

  birthdaySong.play().catch(function () {
    console.log("No se pudo iniciar la canción.");
  });

  blowButton.textContent = "¡Deseo pedido!";
  blowButton.disabled = true;

  hint.textContent = "¡Que se cumplan todos tus deseos!";

  surprise.classList.add("show");
  cardsSection.classList.add("show");

  launchConfetti();
});

const flipCards = document.querySelectorAll(".flip-card");

flipCards.forEach(function (card) {
  card.addEventListener("click", function () {
    card.classList.toggle("flipped");
  });
});

function launchConfetti() {
  const colors = ["#f05d9f", "#ffd35d", "#83b74b", "#7c66c5", "#ffffff"];
  const holder = document.getElementById("confetti");

  for (let i = 0; i < 115; i++) {
    const piece = document.createElement("i");

    piece.className = "confetti-piece";
    piece.style.left = (Math.random() * 100) + "%";
    piece.style.background = colors[i % colors.length];
    piece.style.setProperty("--drift", (-150 + Math.random() * 300) + "px");
    piece.style.setProperty("--time", (2.3 + Math.random() * 2) + "s");

    holder.appendChild(piece);

    setTimeout(function () {
      piece.remove();
    }, 4600);
  }
}