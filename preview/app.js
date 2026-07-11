const guideSections = [
  {id:"arrival",title:"Arrival & check-in",summary:"Arrival windows, parking, forms, medication handoff, and the required safety briefing.",tags:"arrival paperwork vehicles medication",body:["Week 1 arrives Tuesday; Weeks 2 and 3 arrive Sunday. Check-in is 1:00–3:00 PM.","Back vehicles into marked spaces. Vehicles are not permitted beyond the designated parking area.","Bring a signed unit roster, current health forms, accommodation information, and medications in original labeled containers.","All Scouts and leaders attend the 3:00 PM safety briefing."]},
  {id:"policies",title:"Camp policies",summary:"National Forest requirements, Leave No Trace, vehicles, wildlife, and prohibited items.",tags:"policies usfs leave no trace fire wildlife",body:["Camp Lawton operates on National Forest land under a USFS Special Use Permit; permit conditions prevail.","Stay on established trails, pack out waste, never feed wildlife, and store food and scented items as directed.","No digging, trenching, or staking without Camp Ranger approval.","Personal firearms, fireworks, bows, arrows, and range equipment are prohibited unless written approval is provided."]},
  {id:"health",title:"Health, safety & youth protection",summary:"Medical forms, buddy system, two-deep leadership, emergency procedures, and reporting.",tags:"health safety youth protection buddy medical emergency",body:["All adults must be registered Scouting America members with current Youth Protection Training.","Two-deep leadership and the buddy system are required. One-on-one adult/youth contact is prohibited.","The Camp Health Officer is on duty throughout each session; first aid kits are available at program areas.","Report serious incidents immediately to the Camp Director."]},
  {id:"packing",title:"Packing & paperwork",summary:"The high-priority documents and practical items leaders should verify before departure.",tags:"packing paperwork forms roster checklist",body:["Bring BSA Annual Health & Medical Record Parts A, B, and C completed within 12 months.","Bring a signed roster with emergency contacts and proof of current adult leader training.","Plan to carry all gear from the parking area to the assigned campsite.","A sleeping pad and sleeping bag are recommended for the wooden sleeping platforms."]},
  {id:"leaders",title:"Leader logistics",summary:"Daily meetings, camp communications, equipment returns, and departure clearance.",tags:"leader spl meeting communication departure radio",body:["SPL and leader meetings are held daily at 12:55 PM for 30 minutes.","Cell service may be limited. Camp communications are the primary channel while on site.","Return issued radios, first aid kits, and site keys before departure.","Complete campsite inspection, retrieve medications, and receive departure clearance before leaving."]},
  {id:"program",title:"Program overview",summary:"Six daily merit badge blocks, campwide activities, evening programs, and transitions.",tags:"program merit badges schedule activities",body:["Monday through Thursday includes six 50-minute merit badge blocks.","Ten-minute transitions occur between activities; 30-minute cleanup buffers follow meals.","Campwide competitions begin at 4:35 PM and evening programs begin at 7:25 PM.","All campfire content must be reviewed and approved by staff before presentation."]}
];

const scheduleByDay = {
  Monday:[
    ["6:40 AM","Morning flags","20 minutes · all camp","routine"],["7:10 AM","Breakfast","35 minutes · cleanup follows","meal"],["8:15 AM","Merit badge sessions 1–3","Three 50-minute blocks with 10-minute transitions","program"],["11:40 AM","Lunch","45 minutes · cleanup follows","meal"],["12:55 PM","SPL & leaders meeting","30 minutes · location posted at check-in","leader"],["1:35 PM","Merit badge sessions 4–6","Three 50-minute blocks with 10-minute transitions","program"],["4:35 PM","Campsite competition","Orienteering and scavenger challenge","program"],["6:05 PM","Dinner","50 minutes · cleanup follows","meal"],["7:25 PM","Evening program","All-camp program; details announced with the final schedule","program"]
  ],
  Tuesday:[
    ["6:40 AM","Morning flags","20 minutes · all camp","routine"],["7:10 AM","Breakfast","35 minutes · cleanup follows","meal"],["8:15 AM","Merit badge sessions 1–3","Three 50-minute blocks with 10-minute transitions","program"],["11:40 AM","Lunch","45 minutes · cleanup follows","meal"],["12:55 PM","SPL & leaders meeting","30 minutes · leaders and SPLs expected","leader"],["1:35 PM","Merit badge sessions 4–6","Three 50-minute blocks with 10-minute transitions","program"],["4:35 PM","Campsite competition","Knot-tying challenge","program"],["6:05 PM","Dinner","50 minutes · cleanup follows","meal"],["7:25 PM","Karaoke night","Optional all-camp evening program","program"]
  ],
  Wednesday:[
    ["6:40 AM","Morning flags","20 minutes · all camp","routine"],["7:10 AM","Breakfast","35 minutes · cleanup follows","meal"],["8:15 AM","Merit badge sessions 1–3","Three 50-minute blocks with 10-minute transitions","program"],["11:40 AM","Lunch","45 minutes · cleanup follows","meal"],["12:55 PM","SPL & leaders meeting","30 minutes · leaders and SPLs expected","leader"],["1:35 PM","Merit badge sessions 4–6","Three 50-minute blocks with 10-minute transitions","program"],["4:35 PM","Campfire preparation","Campsite creative time for Friday campfire","program"],["6:05 PM","Dinner","50 minutes · cleanup follows","meal"],["7:25 PM","Stargazing program","Astronomy and celestial navigation","program"]
  ],
  Thursday:[
    ["6:40 AM","Morning flags","20 minutes · all camp","routine"],["7:10 AM","Breakfast","35 minutes · cleanup follows","meal"],["8:15 AM","Merit badge sessions 1–3","Three 50-minute blocks with 10-minute transitions","program"],["11:40 AM","Lunch","45 minutes · cleanup follows","meal"],["12:55 PM","SPL & leaders meeting","30 minutes · leaders and SPLs expected","leader"],["1:35 PM","Merit badge sessions 4–6","Final regular afternoon blocks","program"],["4:35 PM","Gaga ball tournament","Campsite competition","program"],["6:05 PM","Dinner","50 minutes · cleanup follows","meal"],["7:25 PM","Campfire kit approval","All Friday skits, songs, and stories require staff review","leader"]
  ]
};

const offerings = [
  {id:"archery",title:"Archery",area:"Range",time:"8:15–9:05 AM",start:495,end:545,note:"Certified range supervision"},
  {id:"basketry",title:"Basketry",area:"Handicraft",time:"8:15–9:05 AM",start:495,end:545,note:"Material fee may apply"},
  {id:"first-aid",title:"First Aid",area:"Scoutcraft",time:"9:15–10:05 AM",start:555,end:605,note:"Bring current handbook"},
  {id:"nature",title:"Nature",area:"Nature Lodge",time:"10:15–11:05 AM",start:615,end:665,note:"Outdoor fieldwork"},
  {id:"astronomy",title:"Astronomy",area:"Nature Lodge",time:"1:35–2:25 PM",start:815,end:865,note:"Evening observation component"},
  {id:"navigation",title:"Navigation Skills",area:"Scoutcraft",time:"2:35–3:25 PM",start:875,end:925,note:"Compass recommended"}
];

let selectedDay = "Monday";
let selectedArea = "All areas";
let plan = new Set(["first-aid","astronomy"]);

const $ = (selector) => document.querySelector(selector);
const escapeHtml = (value) => value.replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));

function renderGuide(query="") {
  const normalized = query.trim().toLowerCase();
  const matches = guideSections.filter(item => `${item.title} ${item.summary} ${item.tags} ${item.body.join(" ")}`.toLowerCase().includes(normalized));
  $("#guide-list").innerHTML = matches.length ? matches.map(item => `
    <details class="guide-card">
      <summary><span><strong>${item.title}</strong><small>${item.summary}</small></span><span class="round-arrow" aria-hidden="true">+</span></summary>
      <ul>${item.body.map(line => `<li>${line}</li>`).join("")}</ul>
    </details>`).join("") : `<p class="empty-state">No guide sections match “${escapeHtml(query)}”. Try a broader term.</p>`;
}

function renderTabs() {
  $("#day-tabs").innerHTML = Object.keys(scheduleByDay).map(day => `<button type="button" role="tab" aria-selected="${day===selectedDay}" data-day="${day}">${day}</button>`).join("");
  $("#day-tabs").querySelectorAll("button").forEach(button => button.addEventListener("click", () => { selectedDay = button.dataset.day; renderTabs(); renderSchedule(); }));
}

function renderSchedule() {
  $("#selected-day").textContent = selectedDay;
  $("#timeline").innerHTML = scheduleByDay[selectedDay].map(([time,title,detail,kind], index) => `
    <button class="timeline-item ${kind}" type="button" data-index="${index}">
      <time>${time}</time><span><strong>${title}</strong><small>${detail}</small></span><i aria-hidden="true">→</i>
    </button>`).join("");
  $("#timeline").querySelectorAll("button").forEach(button => button.addEventListener("click", () => {
    const [time,title,detail] = scheduleByDay[selectedDay][Number(button.dataset.index)];
    $("#dialog-time").textContent = `${selectedDay} · ${time}`;
    $("#dialog-title").textContent = title;
    $("#dialog-detail").textContent = detail;
    $("#event-dialog").showModal();
  }));
}

function renderAreaFilter() {
  const areas = ["All areas", ...new Set(offerings.map(item => item.area))];
  $("#area-filter").innerHTML = areas.map(area => `<option${area===selectedArea?' selected':''}>${area}</option>`).join("");
}

function renderOfferings() {
  const visible = selectedArea === "All areas" ? offerings : offerings.filter(item => item.area === selectedArea);
  $("#offering-list").innerHTML = visible.map(item => {
    const selected = plan.has(item.id);
    return `<article class="offering${selected?' selected':''}"><div><span>${item.area}</span><h3>${item.title}</h3><p>${item.time} · ${item.note}</p></div><button type="button" data-id="${item.id}" aria-pressed="${selected}">${selected?'Added':'Add'}</button></article>`;
  }).join("");
  $("#offering-list").querySelectorAll("button").forEach(button => button.addEventListener("click", () => { const id = button.dataset.id; plan.has(id) ? plan.delete(id) : plan.add(id); renderOfferings(); renderPlan(); }));
}

function getPlanState() {
  const selected = offerings.filter(item => plan.has(item.id)).sort((a,b)=>a.start-b.start);
  const conflicts = [];
  for (let i=0;i<selected.length-1;i++) if (selected[i].end > selected[i+1].start) conflicts.push([selected[i],selected[i+1]]);
  return {selected,conflicts};
}

function renderPlan() {
  const {selected,conflicts} = getPlanState();
  $("#selection-count").textContent = `${selected.length} selection${selected.length===1?'':'s'}`;
  $("#conflict-message").innerHTML = conflicts.length ? `<div class="conflict" role="alert"><strong>Schedule conflict</strong><span>${conflicts[0][0].title} overlaps ${conflicts[0][1].title}. Remove one or choose another session.</span></div>` : "";
  $("#plan-list").innerHTML = selected.length ? selected.map(item => `<div><time>${item.time}</time><span><strong>${item.title}</strong><small>${item.area}</small></span><button type="button" aria-label="Remove ${item.title}" data-id="${item.id}">×</button></div>`).join("") : `<p class="empty-state">Add programs to begin a sample plan.</p>`;
  $("#plan-list").querySelectorAll("button").forEach(button => button.addEventListener("click", () => { plan.delete(button.dataset.id); renderOfferings(); renderPlan(); }));
  $("#review-plan").disabled = selected.length === 0 || conflicts.length > 0;
}

function showToast(message) {
  const toast = $("#toast"); toast.textContent = message; toast.classList.add("show"); clearTimeout(showToast.timer); showToast.timer = setTimeout(()=>toast.classList.remove("show"),2600);
}

$("#guide-search").addEventListener("input", event => renderGuide(event.target.value));
$("#area-filter").addEventListener("change", event => { selectedArea = event.target.value; renderOfferings(); });
$("#review-plan").addEventListener("click", () => showToast("The sample plan has no exact overlaps. Saving and exports are not connected yet."));
$("#interest-form").addEventListener("submit", event => { event.preventDefault(); event.currentTarget.hidden = true; $("#form-success").hidden = false; });
$("#start-over").addEventListener("click", () => { $("#interest-form").reset(); $("#interest-form").hidden = false; $("#form-success").hidden = true; });
$(".dialog-close").addEventListener("click", () => $("#event-dialog").close());
$("#event-dialog").addEventListener("click", event => { if (event.target === event.currentTarget) event.currentTarget.close(); });
$(".menu-button").addEventListener("click", event => { const nav=$("#main-nav"); const open=nav.classList.toggle("open"); event.currentTarget.setAttribute("aria-expanded",String(open)); });
$("#main-nav").addEventListener("click", event => { if (event.target.matches("a")) { $("#main-nav").classList.remove("open"); $(".menu-button").setAttribute("aria-expanded","false"); } });

renderGuide(); renderTabs(); renderSchedule(); renderAreaFilter(); renderOfferings(); renderPlan();
