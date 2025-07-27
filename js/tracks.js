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

// create tracks cards
const renderTracks = (tracks, wrapperId) => {
  const wrapper = document.getElementById(wrapperId);
  wrapper.innerHTML = "";

  tracks.forEach((track, index) => {
    const card = document.createElement("div");
    card.className = "track-card";
    card.style.zIndex = index + 2;

    card.innerHTML = `
      <div class="img-holder">
        <img src="${track.id + '-min.jpg'}" alt="${track.name}">
      </div>
      <div class="track-info">
        <span class="speciality">${track.speciality}</span>
        <h4 class="track-title">${track.name}</h4>
      </div>
      <div class="btn-gp">
        <a href="${track.more}" class="btn" target="_blank" rel="noopener">More</a>
        <a href="${track.application}" class="btn" target="_blank" rel="noopener">Join</a>
      </div>
    `;

    wrapper.appendChild(card);
  });
}
