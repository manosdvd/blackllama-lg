import re

with open('lib/camp-map.ts', 'r') as f:
    content = f.read()

# Update titles
title_replacements = {
    r'title: "Navajo campsite"': 'title: "Navajo Campsite"',
    r'title: "Santa Cruz campsite"': 'title: "Santa Cruz Campsite"',
    r'title: "Latrines"': 'title: "Latrines/KYBOs"',
    r'title: "Al’s Well"': 'title: "Al\'s Well"',
    r'title: "Oglala campsite"': 'title: "Oglala Campsite"',
    r'title: "Pima campsite"': 'title: "Pima Campsite"',
    r'title: "Campfire areas"': 'title: "Campfire Bowl"',
    r'title: "Gila campsite"': 'title: "Gila Campsite"',
    r'title: "Zuni campsite"': 'title: "Zuni Campsite"',
    r'title: "First Aid"': 'title: "Health Lodge"',
    r'title: "Apache campsite"': 'title: "Apache Campsite"',
    r'title: "Yuma campsite"': 'title: "Yuma Campsite"',
    r'title: "Cochise campsite"': 'title: "Cochise Campsite"',
    r'title: "Hopi campsite"': 'title: "Hopi Campsite"',
    r'title: "Hohokam campsite"': 'title: "Hohokam Campsite"',
}

for old, new in title_replacements.items():
    content = re.sub(old, new, content)

# Add images
image_additions = {
    r'(title: "Al\'s Well",)': r'\1\n    image: "/images/alsWellart.png",',
    r'(title: "Chapel",)': r'\1\n    image: "/images/chapel.jpeg",',
    r'(title: "Dining Hall",)': r'\1\n    image: "/images/diningHallSketch.png",',
    r'(title: "Front Gate",)': r'\1\n    image: "/images/oldgates.jpeg",',
    r'(title: "Drinking Fountain \(Peek Memorial\)",)': r'\1\n    image: "/images/2013PeekDrink1946.jpg",',
    r'(title: "Ranger\'s Cabin",)': r'\1\n    image: "/images/vintageBryceLimingLyleBull1957.jpg",',
    r'(title: "Staff Hill",)': r'\1\n    image: "/images/staff1960.jpg",',
    r'(title: "Campfire Bowl",)': r'\1\n    image: "/images/logsCrowd2026.jpg",',
    r'(title: "Rendezvous Area",)': r'\1\n    image: "/images/vintageFundayTomahawk.jpg",',
    r'(title: "Nature",)': r'\1\n    image: "/images/LAwtonstars.jpg",',
    r'(title: "Scoutcraft",)': r'\1\n    image: "/images/backgroundlessNavigationSign.png",',
}

for pattern, repl in image_additions.items():
    content = re.sub(pattern, repl, content)

with open('lib/camp-map.ts', 'w') as f:
    f.write(content)

print("Done")
