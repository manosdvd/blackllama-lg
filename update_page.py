import re

with open("app/page.tsx", "r") as f:
    content = f.read()

# 1. Update nav links
content = content.replace(
'''        <nav aria-label="Main navigation">
          <a href="#guide">Guide</a>
          <a href="#schedule">Schedule</a>
          <a href="#badges">Programs</a>
          <a href="#alerts">Alerts</a>
        </nav>''',
'''        <nav aria-label="Main navigation">
          <a href="#guide">Guide</a>
          <a href="/schedule">Schedule</a>
          <a href="/merit-badges">Programs</a>
          <a href="#alerts">Alerts</a>
        </nav>'''
)

# 2. Update hero actions
content = content.replace(
'''          <div className="hero-actions">
            <a className="button" href="#guide">Open the leader’s guide</a>
            <a className="text-link" href="#schedule">Explore the week <span aria-hidden="true">→</span></a>
          </div>''',
'''          <div className="hero-actions">
            <a className="button" href="#guide">Open the leader’s guide</a>
            <a className="text-link" href="/schedule">Explore the week <span aria-hidden="true">→</span></a>
          </div>'''
)

# 3. Update quick links
content = content.replace(
'''      <section className="quick-links" aria-label="Leader shortcuts">
        <a href="#guide"><span>01</span><strong>Before you leave</strong><small>Packing, forms & policies</small></a>
        <a href="#schedule"><span>02</span><strong>Plan the week</strong><small>Schedules & transitions</small></a>
        <a href="#badges"><span>03</span><strong>Build a Scout plan</strong><small>Programs & conflicts</small></a>
        <a href="#preregister"><span>04</span><strong>Tell us you’re interested</strong><small>Non-binding pre-registration</small></a>
      </section>''',
'''      <section className="quick-links" aria-label="Leader shortcuts">
        <a href="#guide"><span>01</span><strong>Before you leave</strong><small>Packing, forms & policies</small></a>
        <a href="/schedule"><span>02</span><strong>Plan the week</strong><small>Schedules & transitions</small></a>
        <a href="/merit-badges"><span>03</span><strong>Build a Scout plan</strong><small>Programs & conflicts</small></a>
        <a href="#preregister"><span>04</span><strong>Tell us you’re interested</strong><small>Non-binding pre-registration</small></a>
      </section>'''
)

# 4. Update footer links
content = content.replace(
'''        <div><strong>Leader resources</strong><a href="#guide">Leader’s guide</a><a href="#schedule">Schedule</a><a href="#badges">Program planner</a></div>''',
'''        <div><strong>Leader resources</strong><a href="#guide">Leader’s guide</a><a href="/schedule">Schedule</a><a href="/merit-badges">Program planner</a></div>'''
)

# 5. Remove states
content = content.replace(
'''  const [selectedDay, setSelectedDay] = useState<DayKey>("Monday");
  const [guideQuery, setGuideQuery] = useState("");
  const [area, setArea] = useState("All areas");
  const [plan, setPlan] = useState<string[]>(["first-aid", "astronomy"]);
  const [formSubmitted, setFormSubmitted] = useState(false);''',
'''  const [guideQuery, setGuideQuery] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);'''
)

# 6. Remove offering logic
content = content.replace(
'''  const filteredOfferings = area === "All areas" ? offerings : offerings.filter((item) => item.area === area);
  const selectedOfferings = offerings.filter((item) => plan.includes(item.id)).sort((a, b) => a.start - b.start);
  const conflicts = selectedOfferings.filter((item, index) => {
    const next = selectedOfferings[index + 1];
    return next && item.end > next.start;
  });

  function togglePlan(id: string) {
    setPlan((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }''',
''
)

# 7. Remove sections using regex
content = re.sub(r'<section className="schedule-section" id="schedule">.*?</section>\s*<section className="section program-section" id="badges">.*?</section>', '', content, flags=re.DOTALL)

with open("app/page.tsx", "w") as f:
    f.write(content)

print("Updated app/page.tsx")
