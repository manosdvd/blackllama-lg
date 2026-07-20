import re

with open('lib/camp-map.ts', 'r') as f:
    content = f.read()

# Replace broken links
replacements = {
    r'"/map/locations/campsite-[a-z-]+\.webp"': '"/images/campsite.jpg"',
    r'"/map/locations/model-camp\.webp"': '"/images/campsite.jpg"',
    r'"/map/locations/stem\.webp"': '"/images/program.jpg"',
    r'"/map/locations/eagle-quest\.webp"': '"/images/program.jpg"',
    r'"/map/locations/handicraft\.webp"': '"/images/handicraft.jpg"',
    r'"/map/locations/archery\.webp"': '"/images/program.jpg"',
    r'"/map/locations/rifle-range\.webp"': '"/images/program.jpg"',
    r'"/map/locations/nature\.webp"': '"/images/nature-lodge.jpg"',
    r'"/map/locations/scoutcraft\.webp"': '"/images/camp-program.webp"',
}

for old, new in replacements.items():
    content = re.sub(old, new, content)

# Remove the old duplicate image lines where a new one was added earlier.
# The new ones we added are right after `title: ...`.
# The old ones were often `/images/history/...` or `/map/locations/...`.
# Let's find all objects and keep only the first `image: ` property.

objects = content.split('  {')
new_objects = [objects[0]] # header

for obj in objects[1:]:
    lines = obj.split('\n')
    image_count = 0
    new_lines = []
    for line in lines:
        if 'image:' in line:
            image_count += 1
            if image_count > 1:
                continue # skip duplicate
        new_lines.append(line)
    new_objects.append('\n'.join(new_lines))

content = '  {'.join(new_objects)

# Also remove the latrines image entirely
content = re.sub(r' *image: "/map/locations/latrines\.webp",\n', '', content)

with open('lib/camp-map.ts', 'w') as f:
    f.write(content)

print("Done")
