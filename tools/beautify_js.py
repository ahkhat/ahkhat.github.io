#!/usr/bin/env python3
"""
JavaScript Beautifier - Formats minified JS with proper indentation
Usage: python beautify_js.py input.js output.js
"""

import re
import sys

def beautify_javascript(code, indent_size=2):
    """Beautify minified JavaScript code"""
    indent = " " * indent_size
    result = []
    indent_level = 0
    i = 0
    in_string = False
    string_char = None
    
    while i < len(code):
        char = code[i]
        
        # Handle strings
        if char in ['"', "'", "`"] and (i == 0 or code[i-1] != "\\"):
            if not in_string:
                in_string = True
                string_char = char
            elif char == string_char:
                in_string = False
        
        if in_string:
            result.append(char)
            i += 1
            continue
        
        # Skip whitespace outside strings
        if char in [' ', '\n', '\t', '\r']:
            i += 1
            continue
        
        # Handle opening braces
        if char == '{':
            result.append(char)
            indent_level += 1
            result.append('\n')
            result.append(indent * indent_level)
            i += 1
            # Skip next whitespace
            while i < len(code) and code[i] in [' ', '\n', '\t', '\r']:
                i += 1
            continue
        
        # Handle closing braces
        if char == '}':
            if result and result[-1] == ' ':
                result.pop()
            if result and not result[-1].endswith('\n'):
                result.append('\n')
            indent_level = max(0, indent_level - 1)
            result.append(indent * indent_level)
            result.append(char)
            i += 1
            # Check for semicolon after brace
            if i < len(code) and code[i] == ';':
                result.append(';')
                i += 1
            result.append('\n')
            result.append(indent * indent_level)
            continue
        
        # Handle semicolons
        if char == ';':
            result.append(char)
            result.append('\n')
            result.append(indent * indent_level)
            i += 1
            while i < len(code) and code[i] in [' ', '\n', '\t', '\r']:
                i += 1
            continue
        
        # Handle commas
        if char == ',':
            result.append(char)
            result.append(' ')
            i += 1
            while i < len(code) and code[i] in [' ', '\n', '\t', '\r']:
                i += 1
            continue
        
        # Regular character
        result.append(char)
        i += 1
    
    return ''.join(result)

def main():
    if len(sys.argv) < 3:
        print("Usage: python beautify_js.py input.js output.js")
        sys.exit(1)
    
    input_file = sys.argv[1]
    output_file = sys.argv[2]
    
    try:
        with open(input_file, 'r', encoding='utf-8') as f:
            code = f.read()
        
        beautified = beautify_javascript(code)
        
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(beautified)
        
        print(f"✓ Beautified: {input_file} → {output_file}")
        print(f"✓ Original size: {len(code)} bytes")
        print(f"✓ Beautified size: {len(beautified)} bytes")
    
    except Exception as e:
        print(f"✗ Error: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()
