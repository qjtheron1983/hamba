# Safe SVG replacement helper
def replace_svg(content, old_marker, new_svg):
    """Find SVG by unique marker text and replace it safely"""
    start = content.find(old_marker)
    if start == -1:
        return content, False
    # Find the opening <svg tag before the marker
    svg_start = content.rfind('<svg', 0, start)
    if svg_start == -1:
        return content, False
    # Find matching </svg> - count nesting
    pos = svg_start
    depth = 0
    while pos < len(content):
        if content[pos:pos+4] == '<svg':
            depth += 1
            pos += 4
        elif content[pos:pos+6] == '</svg>':
            depth -= 1
            if depth == 0:
                svg_end = pos + 6
                result = content[:svg_start] + new_svg + content[svg_end:]
                return result, True
            pos += 6
        else:
            pos += 1
    return content, False

print("Build helper loaded")
