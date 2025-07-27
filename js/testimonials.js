// fetch testimonials data
const testimonials = [];

const getTestimonials = async () => {
  try {
    const res = await fetch("data/testimonials.json");
    
    if (!res.ok) {
      throw new Error("Cannot fetch JSON file");
    }
  
    const json = await res.json();

    testimonials.push(...json.testimonials);

    renderSlides(testimonials, "testimonials-wrapper");
  } catch (err) {
    console.error(err.message);
  }
}

getTestimonials();

// create swipper slides
const renderSlides = (testimonials, wrapperId) => {
  const wrapper = document.getElementById(wrapperId);
  wrapper.innerHTML = "";

  testimonials.forEach(testimonial => {
    const slide = document.createElement("div");
    slide.className = "swiper-slide";

    slide.innerHTML = `
      <div class="testimonial-card">
        <div class="member-info">
          <div class="avatar">
            <img src=${"./assets/imgs/people/" + testimonial.id + "-min.jpg" || ""} alt="${testimonial.name || 'Member'}" loading="lazy" />
            <div class="swiper-lazy-preloader"></div>
          </div>
          <span class="member-name">${testimonial.name || "Anonymous"}</span>
          <span class="member-role">${testimonial.role || "Student"}</span>
        </div>
        <p class="member-feedback" lang="${testimonial.feedback.lang || 'en'}">${testimonial.feedback.quote}</p>
      </div>
    `;

    wrapper.appendChild(slide);
  });
}

// testimonials swiper
const testimonialsSwiper = new Swiper('.testimonials-slider .swiper', {
  direction: 'horizontal',
  loop: true,
  speed: 10000,
  spaceBetween: 30,
  slidesPerView: 1,
  createElements: true,
  autoplay: true,

  breakpoints: {
    768: {
      slidesPerView: 2,
    }
  }
});
