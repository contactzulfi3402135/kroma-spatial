from pathlib import Path
import textwrap

PAGE_W, PAGE_H = 595, 842
BG = (0.043, 0.043, 0.051)
CHALK = (0.961, 0.961, 0.941)
GREY = (0.541, 0.541, 0.576)
BRONZE = (0.772, 0.659, 0.502)
ORANGE = (0.886, 0.345, 0.133)
RULE = (0.16, 0.16, 0.18)


def color(c, stroke=False):
    op = 'RG' if stroke else 'rg'
    return f'{c[0]:.3f} {c[1]:.3f} {c[2]:.3f} {op}'


def safe(s):
    replacements = {
        '\u2014': '-', '\u2013': '-', '\u2019': "'", '\u2018': "'",
        '\u201c': '"', '\u201d': '"', '\u00b2': '2', '\u00b0': ' deg',
        '\u00b7': '/', '\u00e9': 'e', '\u00fc': 'u', '\u00e4': 'a',
        '\u00f6': 'o', '\u00df': 'ss', '\u0153': 'oe', '\u00e8': 'e',
    }
    for old, new in replacements.items():
        s = s.replace(old, new)
    return s.encode('ascii', 'ignore').decode('ascii')


def text(x, y, size, value, font='F1', tint=CHALK, spacing=None):
    value = safe(value).replace('\\', '\\\\').replace('(', '\\(').replace(')', '\\)')
    pieces = [color(tint), 'BT', f'/{font} {size} Tf']
    if spacing is not None:
        pieces.append(f'{spacing} Tc')
    pieces.extend([f'1 0 0 1 {x} {y} Tm', f'({value}) Tj', 'ET'])
    return ' '.join(pieces)


def line(x1, y1, x2, y2, tint=RULE, width=0.7):
    return f'{color(tint, True)} {width} w {x1} {y1} m {x2} {y2} l S'


def rect(x, y, w, h, tint, stroke=False, width=0.7):
    if stroke:
        return f'{color(tint, True)} {width} w {x} {y} {w} {h} re S'
    return f'{color(tint)} {x} {y} {w} {h} re f'


def circle(x, y, r, tint):
    k = 0.55228475 * r
    return f'{color(tint)} {x+r} {y} m {x+r} {y+k} {x+k} {y+r} {x} {y+r} c {x-k} {y+r} {x-r} {y+k} {x-r} {y} c {x-r} {y-k} {x-k} {y-r} {x} {y-r} c {x+k} {y-r} {x+r} {y-k} {x+r} {y} c f'


def paragraph(x, y, value, width=68, size=11, leading=18, tint=GREY, font='F1'):
    rows = textwrap.wrap(safe(value), width=width, break_long_words=False)
    ops = []
    for row in rows:
        ops.append(text(x, y, size, row, font, tint))
        y -= leading
    return '\n'.join(ops), y


def page_base(page_no, section):
    ops = [rect(0, 0, PAGE_W, PAGE_H, BG)]
    ops.extend([
        text(42, 800, 8, 'KROMA SPATIAL  /  ARCHITECTURE AG', 'F3', CHALK, 0.7),
        text(436, 800, 7, f'VOL. IV  /  {page_no:02d}', 'F3', GREY, 0.4),
        line(42, 783, 553, 783),
        line(42, 50, 553, 50),
        text(42, 31, 7, 'ARCHITECTURAL TECTONICS & COMPUTATIONAL MASS', 'F3', GREY, 0.35),
        text(523, 31, 7, f'{page_no:02d}', 'F3', BRONZE),
    ])
    if section:
        ops.append(text(42, 758, 7, section.upper(), 'F3', ORANGE, 0.6))
    return ops


pages = []

# Plate 01: cover and thesis
ops = page_base(1, 'Monograph 2026  /  Studio position')
ops.extend([
    text(42, 674, 48, 'We sculpt', 'F2', CHALK),
    text(42, 619, 48, 'monolithic space', 'F2', CHALK),
    text(42, 564, 48, 'through precision.', 'F2', CHALK),
    text(44, 516, 11, 'A working manifesto on matter, climate, and time.', 'F4', BRONZE),
    line(42, 485, 345, 485, RULE, 0.8),
])
copy = 'Operating between Zurich and Kyoto, KROMA engineers public institutions, cultural pavilions, and private residences that honor geographical terroir and stand for generations.'
p, _ = paragraph(44, 454, copy, width=63, size=11, leading=18, tint=GREY)
ops.append(p)
# Architectural datum drawing on the right: a measured, abstract massing study.
ops.extend([
    line(380, 206, 544, 206, BRONZE, 0.6),
    line(394, 206, 394, 427, CHALK, 0.65),
    line(394, 427, 474, 388, CHALK, 0.65),
    line(474, 388, 544, 407, CHALK, 0.65),
    line(544, 407, 544, 206, CHALK, 0.65),
    line(394, 350, 473, 329, RULE, 0.65),
    line(473, 329, 544, 344, RULE, 0.65),
    line(394, 281, 473, 267, RULE, 0.65),
    line(473, 267, 544, 278, RULE, 0.65),
    line(474, 388, 474, 206, BRONZE, 0.45),
    line(422, 413, 422, 343, RULE, 0.55),
    line(502, 381, 502, 332, RULE, 0.55),
    line(378, 206, 378, 427, RULE, 0.45),
    line(373, 206, 383, 206, RULE, 0.45),
    line(373, 427, 383, 427, RULE, 0.45),
    text(365, 443, 6, '408 M / DATUM', 'F3', GREY, 0.25),
    text(386, 184, 6, 'MASS STUDY  /  01', 'F3', GREY, 0.25),
    circle(474, 388, 2.4, ORANGE),
    text(42, 204, 8, 'FORM FOLLOWS FIELD CONDITIONS.', 'F3', CHALK, 0.35),
    text(42, 187, 8, 'Structure is not applied to place; it is read from it.', 'F1', GREY),
    text(42, 105, 7, 'ZURICH 47.3769 N / 8.5417 E', 'F3', GREY, 0.3),
    text(42, 87, 7, 'KYOTO 35.0116 N / 135.7681 E', 'F3', GREY, 0.3),
])
pages.append('\n'.join(ops))

# Plate 02: three working propositions
ops = page_base(2, 'Practice  /  Three propositions')
ops.extend([
    text(42, 700, 36, 'The discipline of', 'F2', CHALK),
    text(42, 658, 36, 'building less, precisely.', 'F2', CHALK),
    text(42, 610, 10, 'Three commitments govern each commission from first survey to final joint.', 'F1', GREY),
])
propositions = [
    ('01', 'TECTONIC PURITY', 'We eliminate decorative veneer. The structure itself - the load-bearing column, the tension cable, the mass of poured concrete - must serve as the final spatial ornament.'),
    ('02', 'COMPUTATIONAL DAYLIGHT', 'Every fenestration is calculated using bespoke solar simulation algorithms. We shape openings so that living spaces register the changing path of equinox light.'),
    ('03', 'GEOGRAPHIC INTEGRATION', 'A building must belong irrevocably to its coordinates. We source stone within fifty kilometres of the site and adapt roof pitches to historical snowfall metrics.'),
]
y = 526
for number, heading, body in propositions:
    ops.extend([
        text(42, y, 9, number, 'F3', BRONZE, 0.4),
        line(77, y + 4, 108, y + 4, BRONZE, 0.65),
        text(124, y, 11, heading, 'F2', CHALK, 0.25),
    ])
    p, y2 = paragraph(124, y - 25, body, width=67, size=10, leading=16, tint=GREY)
    ops.append(p)
    y = y2 - 37
ops.extend([
    line(42, 112, 553, 112, RULE, 0.7),
    text(42, 91, 7, 'DESIGN POSITION / 2026', 'F3', GREY, 0.35),
    text(353, 91, 7, 'STRUCTURE / LIGHT / SITE', 'F3', BRONZE, 0.35),
])
pages.append('\n'.join(ops))

# Plate 03: material ethos and invitation
ops = page_base(3, 'Matter  /  Commissioning')
ops.extend([
    text(42, 701, 36, 'Matter carries', 'F2', CHALK),
    text(42, 659, 36, 'the memory of place.', 'F2', CHALK),
    text(42, 609, 10, 'We begin with what the ground, forest, or foundry can offer.', 'F1', GREY),
])
materials_copy = [
    ('VALSER QUARTZITE', 'Honed stone, hand-split at its point of extraction. Its crystalline density gives a wall the calm thermal inertia of the Alpine ground.'),
    ('YAKISUGI CYPRESS', 'Charred Japanese cypress, finished by fire and allowed to weather. Grain, shadow, and protection are one continuous surface.'),
    ('CAST BRONZE', 'Wax-patinated cupro-alloy, sand-cast in small foundry runs. Its oxidation is not a defect to correct but a record of contact and air.'),
]
y = 539
for idx, (name, body) in enumerate(materials_copy, start=1):
    ops.extend([
        rect(42, y - 3, 21, 21, RULE),
        text(48, y + 4, 7, f'{idx:02d}', 'F3', BRONZE),
        text(80, y + 5, 10, name, 'F2', CHALK, 0.2),
    ])
    p, y2 = paragraph(80, y - 20, body, width=72, size=9, leading=14, tint=GREY)
    ops.append(p)
    y = y2 - 31
ops.extend([
    line(42, 201, 553, 201, RULE, 0.7),
    text(42, 177, 7, 'A COMMISSION BEGINS WITH A CONVERSATION.', 'F3', ORANGE, 0.35),
])
p, _ = paragraph(42, 151, 'Share the location, intended use, and long view for your project. Our partners review every dossier within 48 hours and return with a considered next step.', width=74, size=10, leading=16, tint=GREY)
ops.extend([p, text(42, 86, 8, 'COMMISSIONS@KROMA-SPATIAL.CH', 'F3', CHALK, 0.2)])
pages.append('\n'.join(ops))

# Minimal, standards-compliant PDF 1.4 using built-in Type 1 fonts.
objects = [None] * 13
objects[1] = b'<< /Type /Catalog /Pages 2 0 R >>'
objects[2] = b'<< /Type /Pages /Kids [7 0 R 9 0 R 11 0 R] /Count 3 >>'
objects[3] = b'<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>'
objects[4] = b'<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>'
objects[5] = b'<< /Type /Font /Subtype /Type1 /BaseFont /Courier >>'
objects[6] = b'<< /Type /Font /Subtype /Type1 /BaseFont /Times-Italic >>'
for page_index, (page_id, content_id) in enumerate([(7, 8), (9, 10), (11, 12)]):
    stream = pages[page_index].encode('ascii')
    objects[content_id] = b'<< /Length ' + str(len(stream)).encode() + b' >>\nstream\n' + stream + b'\nendstream'
    objects[page_id] = (
        f'<< /Type /Page /Parent 2 0 R /MediaBox [0 0 {PAGE_W} {PAGE_H}] '
        '/Resources << /Font << /F1 3 0 R /F2 4 0 R /F3 5 0 R /F4 6 0 R >> >> '
        f'/Contents {content_id} 0 R >>'
    ).encode()

pdf = bytearray(b'%PDF-1.4\n%\xe2\xe3\xcf\xd3\n')
offsets = [0] * len(objects)
for object_id in range(1, len(objects)):
    offsets[object_id] = len(pdf)
    pdf.extend(f'{object_id} 0 obj\n'.encode())
    pdf.extend(objects[object_id])
    pdf.extend(b'\nendobj\n')
xref_offset = len(pdf)
pdf.extend(f'xref\n0 {len(objects)}\n'.encode())
pdf.extend(b'0000000000 65535 f \n')
for object_id in range(1, len(objects)):
    pdf.extend(f'{offsets[object_id]:010d} 00000 n \n'.encode())
pdf.extend(f'trailer\n<< /Size {len(objects)} /Root 1 0 R >>\nstartxref\n{xref_offset}\n%%EOF\n'.encode())

out = Path(__file__).resolve().parents[1] / 'public' / 'kroma-manifesto.pdf'
out.parent.mkdir(parents=True, exist_ok=True)
out.write_bytes(pdf)
print(f'Created {out} ({len(pdf):,} bytes)')
