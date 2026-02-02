const API = "/api";

/* =========================
   SYSTEM STATUS
========================= */
async function loadSystemStatus() {
  const el = document.getElementById("system");

  try {
    const res = await fetch("/api/system/health");
    const data = await res.json();

    el.innerHTML = `
      <span class="status-dot online"></span>
      <span>System Online</span>
    `;
  } catch {
    el.innerHTML = `
      <span class="status-dot offline"></span>
      <span>System Offline</span>
    `;
  }
}



/* =========================
   GITHUB SYNC STATS
========================= */

async function loadStats() {
  try {
    const res = await fetch(`${API}/system/stats`);
    const data = await res.json();

    const m = data.metrics;
    document.getElementById("system").innerHTML += `
      <hr/>
      <strong>Requests:</strong> ${m.requests}<br/>
      <strong>Cache:</strong> ${m.cache.hits} hits / ${m.cache.misses} misses<br/>
      <strong>Last GitHub Sync:</strong> ${
        m.lastGithubSync
          ? new Date(m.lastGithubSync).toLocaleTimeString()
          : "Never"
      }
    `;
  } catch {}
}



/* =========================
   PROJECTS
========================= */
async function loadProjects() {
  const grid = document.getElementById("projects");

  try {
    const res = await fetch(`${API}/portfolio`);
    const data = await res.json();

    grid.innerHTML = "";

    data.projects.forEach(p => {
      const card = document.createElement("div");
      card.className = "project";

      card.innerHTML = `
        <h3>${p.name}</h3>
        <p>${p.description || ""}</p>
        <div class="badges">
          <span class="badge ${p.status}">${p.status}</span>
          <span class="badge">${p.health}</span>
        </div>
      `;

      card.onclick = () => {
        // Intent tracking (fire-and-forget)
        fetch(`${API}/intent`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event: "OPEN_PROJECT",
            project: p.name
          })
        });

        window.open(p.url, "_blank");
      };

      grid.appendChild(card);
    });
  } catch {
    grid.textContent = "Unable to load projects";
  }
}


/* =========================
   CONTACT FORM
========================= */
document.getElementById("contact").addEventListener("submit", async e => {
  e.preventDefault();

  const form = e.target;
  const result = document.getElementById("contact-result");

  try {
    await fetch(`${API}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.querySelector("input[type=email]").value,
        message: form.querySelector("textarea").value
      })
    });

    result.textContent = "Message sent successfully.";
    form.reset();
  } catch {
    result.textContent = "Failed to send message.";
  }
});

/* =========================
   INIT
========================= */
loadSystemStatus();
loadStats();
loadProjects();

