#!/usr/bin/env python3
"""
Advanced JavaScript Beautifier
Converts minified JS to readable format with proper indentation and line breaks
"""

import re
import sys

def beautify_js(code):
    """Beautify JavaScript code"""
    
    # Step 1: Add line breaks before/after major syntax elements
    # Before opening brace
    code = re.sub(r'([^\s{])\{', r'\1 {\n', code)
    # After opening brace
    code = re.sub(r'\{\s*', r'{\n', code)
    # Before closing brace
    code = re.sub(r'([^\s}])\}', r'\1\n}', code)
    # After closing brace (but not before ;)
    code = re.sub(r'\}\s*([^;])', r'}\n\1', code)
    
    # Step 2: Add line breaks after semicolons (unless in strings)
    lines = code.split('\n')
    processed = []
    
    for line in lines:
        # Skip strings
        in_string = False
        string_char = None
        output = []
        i = 0
        
        while i < len(line):
            char = line[i]
            
            if char in ['"', "'", '`'] and (i == 0 or line[i-1] != '\\'):
                if not in_string:
                    in_string = True
                    string_char = char
                elif char == string_char:
                    in_string = False
            
            output.append(char)
            
            # Add line break after semicolon (if not in string)
            if char == ';' and not in_string and i < len(line) - 1:
                next_char = line[i+1] if i+1 < len(line) else ''
                if next_char and next_char not in [' ', '\n', '}']:
                    output.append('\n')
            
            i += 1
        
        processed.append(''.join(output))
    
    code = '\n'.join(processed)
    
    # Step 3: Proper indentation
    lines = code.split('\n')
    indent_level = 0
    result = []
    indent_str = '  '  # 2 spaces
    
    for line in lines:
        stripped = line.strip()
        
        if not stripped:
            continue
        
        # Decrease indent for closing braces
        if stripped.startswith('}'):
            indent_level = max(0, indent_level - 1)
        
        # Add indented line
        if stripped:
            result.append(indent_str * indent_level + stripped)
        
        # Increase indent for opening braces
        if stripped.endswith('{'):
            indent_level += 1
    
    return '\n'.join(result)

def main():
    if len(sys.argv) < 2:
        print("Usage: python3 beautify.py <input.js> [output.js]")
        sys.exit(1)
    
    input_file = sys.argv[1]
    output_file = sys.argv[2] if len(sys.argv) > 2 else input_file.replace('.js', '.beautified.js')
    
    try:
        print(f"📖 Reading: {input_file}")
        with open(input_file, 'r', encoding='utf-8') as f:
            original_code = f.read()
        
        original_size = len(original_code)
        print(f"   Size: {original_size:,} bytes")
        
        print(f"🎨 Beautifying...")
        beautified_code = beautify_js(original_code)
        
        beautified_size = len(beautified_code)
        print(f"   New size: {beautified_size:,} bytes")
        print(f"   Lines: {len(beautified_code.split(chr(10)))} lines")
        
        print(f"💾 Saving to: {output_file}")
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(beautified_code)
        
        print(f"✅ Success!")
        print(f"\n📊 Summary:")
        print(f"   Input:  {original_size:,} bytes")
        print(f"   Output: {beautified_size:,} bytes")
        print(f"   Ratio:  {beautified_size/original_size:.1f}x")
        
    except Exception as e:
        print(f"❌ Error: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()
