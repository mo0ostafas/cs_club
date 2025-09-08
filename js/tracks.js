// fetch tracks data
const tracks = [];

const getTracks = async () => {
  try {
    const res = await fetch("data/tracks.json");
    
    if (!res.ok) {
      throw new Error("Cannot fetch JSON file");
    }
  
    const json = await res.json();

    tracks.push(...json.tracks);

    renderTracks(tracks, "tracks-wrapper");
  } catch (err) {
    console.error(err.message);
  }
}

getTracks();


// open overlay with details
const openOverlay = (track) => {
  const overlay = document.getElementById("track-overlay");
  const details = document.getElementById("overlay-details");

  details.innerHTML = `
    <h3>${track.name}</h3>
    <p><strong>Speciality:</strong> ${track.speciality}</p>
    <p>${track.more.details}</p>
    
    <h4>Skills You'll Learn:</h4>
    <ul>${track.more.skills.map(s => `<li>${s}</li>`).join("")}</ul>

    <h4>Tools:</h4>
    <ul>${track.more.tools.map(t => `<li>${t}</li>`).join("")}</ul>

    <h4>Career Paths:</h4>
    <ul>${track.more.careers.map(c => `<li>${c}</li>`).join("")}</ul>

    <a href="${track.status === "open" ? track.application : "#"}" class="btn apply-btn" ${track.status === "open" ? "" : "disabled"} target="_blank">Apply Now</a>
  `;

  overlay.style.display = "flex";
};

// close overlay
const closeOverlay = () => {
  document.getElementById("track-overlay").style.display = "none";
};

// attach close event
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("close-btn") || e.target.id === "track-overlay") {
    closeOverlay();
  }
});


// create tracks cards
const renderTracks = (tracks, wrapperId) => {
  const wrapper = document.getElementById(wrapperId);
  wrapper.innerHTML = "";

  tracks.forEach((track, index) => {
    const card = document.createElement("div");
    card.className = "track-card";
    card.style.zIndex = index + 2;

    card.innerHTML = `
      <div class="track-info">
        <span class="speciality">${track.speciality || 'Undetermined Speciality'}</span>
        <h4 class="track-title">${track.name || 'Unknown Course'}</h4>
        <p class="track-desc">${track.desc}</p>
      </div>
      <div class="btn-gp">
        <button class="btn more-btn">More</button>
        <a href="${track.status === "open" ? track.application : "#"}" class="btn apply-btn" ${track.status === "open" ? "" : "disabled"} target="_blank">Join</a>
      </div>
    `;

    // bind "More" button
    card.querySelector(".more-btn").addEventListener("click", () => openOverlay(track));

    wrapper.appendChild(card);
  });
};

