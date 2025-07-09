const products = [
  {
    images: ["PH1.jpg"],
    name: "White Office Chair",
    price: "N$850",
    condition: "Excellent Condition"
  },
  {
    images: ["PH2.jpg"],
    name: "32L Samsung Microwave",
    price: "N$950",
    condition: "Pre-Loved"
  },
  {
    images: ["PH3a.jpg", "PH3b.jpg", "PH3c.jpg"],
    name: "Electrical Frying Pan",
    price: "N$450",
    condition: "Pre-Loved"
  },
  {
    images: ["PH4.jpg"],
    name: "Traditional Pot #3",
    price: "N$350",
    condition: "Showroom Quality"
  },
  {
    images: ["PH5.jpg"],
    name: "Traditional Pot #2",
    price: "N$250",
    condition: "Showroom Quality"
  },
  {
    images: ["PH6a.jpg", "PH6b.jpg", "PH6c.jpg"],
    name: "32L Samsung Microwave",
    price: "N$1,250",
    condition: "Trendsetter"
  },
  {
    images: ["PH7.jpg"],
    name: "Office Chair #3",
    price: "N$750",
    condition: "Well-Maintained"
  },
  {
    images: ["PH8.jpg"],
    name: "Office Chair #1",
    price: "N$650",
    condition: "Well-Maintained"
  },
  {
    images: ["PH9.jpg"],
    name: "Kitchen Sink",
    price: "N$1,250",
    condition: "Well-Maintained"
  },
  {
    images: ["PH10a.jpg", "PH10b.jpg"],
    name: "Event Tables",
    price: "N$2,700",
    condition: "Excellent Condition"
  },
  {
    images: ["PH11a.jpg", "PH11b.jpg", "PH11c.jpg", "PH11d.jpg", "PH11e.jpg"],
    name: "Assorted Fabric",
    price: "N$20 per meter",
    condition: "Excellent Condition"
  },
  {
    images: ["PH12.jpg"],
    name: "Mirror #1",
    price: "N$1,250",
    condition: "Excellent Condition"
  },
  {
    images: ["PH14.jpg"],
    name: "Electrical Cable",
    price: "N$50",
    condition: "New"
  }
];

// Render products with banners after 4th and 9th product
const productContainer = document.getElementById("product-container");

productContainer.innerHTML = products.map((product, i) => {
  let bannerHTML = "";

  // Insert banner after product #4 (index 3)
  if (i === 4) {
    bannerHTML = `
      <div class="banner-slider" id="banner1">
        <div class="slides">
          <img src="B1.jpg" alt="Banner 1" />
          <img src="B2.jpg" alt="Banner 2" />
        </div>
        <div class="banner-dots"></div>
      </div>
    `;
  }
  // Insert banner after product #9 (index 8)
  else if (i === 9) {
    bannerHTML = `
      <div class="banner-slider" id="banner2">
        <div class="slides">
          <img src="B3.jpg" alt="Banner 3" />
          <img src="B4.jpg" alt="Banner 4" />
        </div>
        <div class="banner-dots"></div>
      </div>
    `;
  }

  return `
    ${bannerHTML}
    <div class="product-card" id="item${i + 1}">
      <div class="image-wrapper" style="position: relative;">
        <img src="${product.images[0]}" alt="${product.name}" onclick="openLightbox(${i}, 0)" />
        ${
          product.images.length > 1
            ? `<div class="image-dots" style="position: absolute; bottom: 8px; left: 50%; transform: translateX(-50%); display: flex; gap: 5px;">
                ${product.images
                  .map(
                    (_, dotIndex) =>
                      `<div style="width: 8px; height: 8px; background: #999; border-radius: 50%; opacity: 0.7;"></div>`
                  )
                  .join("")}
              </div>`
            : ""
        }
      </div>
      <h4>${product.name}</h4>
      <p class="price">${product.price}</p>
      <span class="condition faded-badge">${product.condition}</span>
      <p class="status">In Stock</p>
      <div class="like-section">
        <i class="fas fa-heart" onclick="toggleLike(this)"></i> <span class="like-count">0</span>
      </div>
      <a href="https://wa.me/264817859603" target="_blank" class="whatsapp-button">
        <i class="fab fa-whatsapp"></i> WhatsApp Seller
      </a>
    </div>
  `;
}).join("");

// Lightbox for product images
let currentProductIndex = 0;
let currentImageIndex = 0;

function openLightbox(productIndex, imageIndex) {
  currentProductIndex = productIndex;
  currentImageIndex = imageIndex;
  updateLightbox();
  document.getElementById("lightbox").style.display = "flex";
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}

function updateLightbox() {
  const img = document.getElementById("lightboxImage");
  const images = products[currentProductIndex].images;
  img.src = images[currentImageIndex];
}

// Like button toggle
function toggleLike(icon) {
  const count = icon.nextElementSibling;
  let number = parseInt(count.textContent);
  icon.classList.toggle("liked");
  count.textContent = icon.classList.contains("liked") ? number + 1 : number - 1;
}

// Banner slider logic for dynamic banners
function initBannerSlider(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const slides = container.querySelector(".slides");
  const images = slides.querySelectorAll("img");
  const dotsContainer = container.querySelector(".banner-dots");

  let index = 0;
  const total = images.length;

  // Create dots
  for (let i = 0; i < total; i++) {
    const dot = document.createElement("div");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      index = i;
      update();
    });
    dotsContainer.appendChild(dot);
  }

  function update() {
    slides.style.transform = `translateX(-${index * 100}%)`;
    dotsContainer.querySelectorAll("div").forEach((d, i) =>
      d.classList.toggle("active", i === index)
    );
  }

  // Auto-slide every 4 seconds
  setInterval(() => {
    index = (index + 1) % total;
    update();
  }, 4000);
}

// Initialize banner sliders after DOM is ready
window.addEventListener("load", () => {
  initBannerSlider("banner1");
  initBannerSlider("banner2");
});

// Donation section lightbox
function enlargeImage(imgElement) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImage");
  lightboxImg.src = imgElement.src;
  lightbox.style.display = "flex";
}

function handleSearch() {
  const value = document.getElementById("searchInput").value;
  if (value.trim()) {
    alert(`You searched for: "${value}"`);
  }
}
