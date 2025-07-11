// fetch members data
const heads = [];
const instructors = [];
const mentors = [];

const getMembers = async () => {
  try {
    const res = await fetch("db.json");
    
    if (!res.ok) {
      throw new Error("Cannot fetch JSON file");
    }
  
    const json = await res.json();

    heads.push(...json.members.heads);
    instructors.push(...json.members.instructors);
    mentors.push(...json.members.mentors);

    renderSlides(heads, "heads-wrapper");
    renderSlides(instructors, "instructors-wrapper");
    renderSlides(mentors, "mentors-wrapper");
  } catch (err) {
    console.error(err.message);
  }
}

getMembers();

// create swipper slides
const renderSlides = (members, wrapperId) => {
  const wrapper = document.getElementById(wrapperId);
  wrapper.innerHTML = "";

  members.forEach(member => {
    const slide = document.createElement("div");
    slide.className = "swiper-slide";

    slide.innerHTML = `
      <div class="member-card">
        <div class="member-img swiper-zoom-container">
          <img src="./assets/imgs/members/${member.img || ''}" alt="${member.name || 'Member'}" loading="lazy" />
          <div class="swiper-lazy-preloader"></div>
        </div>
        <div class="member-info">
          <span class="member-name">${member.name || "Unnamed"}</span>
          <span class="member-role">${member.role || "Unknown Role"}</span>
          <ul class="member-social-accounts">
            ${member.social?.facebook ? `<li><a href="${member.social.facebook}" target="_blank" rel="noopener" title="Facebook Profile"><i class="fa-brands fa-square-facebook fa-2x"></i></a></li>` : ""}
            ${member.social?.linkedin ? `<li><a href="${member.social.linkedin}" target="_blank" rel="noopener" title="LinkedIn Profile"><i class="fa-brands fa-linkedin fa-2x"></i></a></li>` : ""}
            ${member.social?.youtube ? `<li><a href="${member.social.youtube}" target="_blank" rel="noopener" title="YouTube Channel"><i class="fa-brands fa-square-youtube fa-2x"></i></a></li>` : ""}
            ${member.social?.github ? `<li><a href="${member.social.github}" target="_blank" rel="noopener" title="GitHub Profile"><i class="fa-brands fa-square-github fa-2x"></i></a></li>` : ""}
            ${member.social?.behance ? `<li><a href="${member.social.behance}" target="_blank" rel="noopener" title="Behance Profile"><i class="fa-brands fa-square-behance fa-2x"></i></a></li>` : ""}
          </ul>
        </div>
      </div>
    `;

    wrapper.appendChild(slide);
  });
}

// heads swiper
const headsSwiper = new Swiper('.heads .swiper', {
  direction: 'horizontal',
  loop: true,
  slidesPerView: 1,
  createElements: true,

  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    1200: {
      slidesPerView: 3,
    },
  },

  autoplay: {
    delay: 5000,
  },

  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

// instructors swipper
const instructorsSwiper = new Swiper('.instructors .swiper', {
  direction: 'horizontal',
  loop: true,
  slidesPerView: 1,
  createElements: true,

  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    1200: {
      slidesPerView: 3,
    },
  },

  autoplay: {
    delay: 5000,
  },

  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

// mentors swiper
const mentorsSwiper = new Swiper('.mentors .swiper', {
  direction: 'horizontal',
  loop: true,
  slidesPerView: 1,
  createElements: true,

  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    1200: {
      slidesPerView: 3,
    },
  },

  autoplay: {
    delay: 5000,
  },

  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
