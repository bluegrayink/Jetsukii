// --- Popup Slideshow ---
const popup = document.createElement("div");
popup.classList.add("slideshow-popup");
popup.innerHTML = `
    <span class="close-btn">&times;</span>
    <button class="nav-btn prev-btn">&#10094;</button>
    <img src="" alt="popup-img">
    <button class="nav-btn next-btn">&#10095;</button>
`;
document.body.appendChild(popup);

const popupImg = popup.querySelector("img");
const closeBtn = popup.querySelector(".close-btn");
const nextBtn = popup.querySelector(".next-btn");
const prevBtn = popup.querySelector(".prev-btn");

let currentIndex = 0;
let allImages = [];

document.querySelectorAll('.photo-gallery img').forEach((img, index) => {
    allImages.push(img);
    img.addEventListener('click', () => {
        currentIndex = index;
        showImage();
    });
});

function showImage() {
    popupImg.src = allImages[currentIndex].src;
    popup.style.display = "flex";
}

closeBtn.addEventListener('click', () => {
    popup.style.display = "none";
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % allImages.length;
    showImage();
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + allImages.length) % allImages.length;
    showImage();
});
