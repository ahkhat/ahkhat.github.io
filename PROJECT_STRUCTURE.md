# Project Structure & Documentation

## 📂 Directory Layout

```
ahkhat.github.io/
│
├── index.html                      # Main portfolio page
│
├── docs/                           # Documentation
│   ├── README.md                   # Main documentation
│   ├── QUICK_START.md             # Quick start guide
│   ├── CURRENT_STATUS.md          # Current setup info
│   └── REFACTORING_SUMMARY.md     # What changed and why
│
├── scripts/                        # JavaScript
│   ├── background.js              # Webflow (DO NOT EDIT)
│   ├── shunk1.js                  # Webflow (DO NOT EDIT)
│   ├── shunk2.js                  # Webflow (DO NOT EDIT)
│   ├── custom.js                  # ✅ Your custom code (EDIT THIS)
│   ├── main.vanilla.js            # Alternative vanilla version
│   ├── README.md                  # Scripts documentation
│   └── _old_webflow/              # Archive
│       └── README.md
│
├── style/                          # CSS Styles
│   ├── style.css                  # Main stylesheet
│   └── lightbox.css               # Lightbox styles
│
├── sources/                        # Media & Assets
│   ├── icons/                     # Favicons & icons
│   ├── media/                     # Images & photos
│   ├── svgs/                      # SVG files
│   └── asenahazalResume.pdf
│
├── tools/                          # Utilities & Scripts
│   ├── start.bat                  # Windows launcher
│   ├── start.sh                   # Mac/Linux launcher
│   └── project_structure.txt      # File tree reference
│
├── examples/                       # Examples & Tests
│   └── test.html                  # Feature test page
│
└── Configuration Files
    ├── .git/                      # Git repository
    ├── .gitignore                 # Git ignore rules
    ├── .gitattributes            # Git attributes
    └── .github/                   # GitHub config
```

## 📚 Documentation Guide

### For First-Time Users:
1. **Start here**: `docs/QUICK_START.md`
2. **Then read**: `docs/README.md`
3. **Test features**: `examples/test.html`

### For Developers:
1. **Current setup**: `docs/CURRENT_STATUS.md`
2. **Code changes**: `docs/REFACTORING_SUMMARY.md`
3. **JavaScript info**: `scripts/README.md`

### For Running the Project:
- **Windows**: `tools/start.bat`
- **Mac/Linux**: `tools/start.sh`
- **Manual**: `python -m http.server 8000`

## 🚀 Quick Navigation

| Task | Location |
|------|----------|
| **View main site** | `index.html` |
| **Test features** | `examples/test.html` |
| **Edit custom code** | `scripts/custom.js` |
| **Edit styles** | `style/style.css` |
| **Start server** | `tools/start.bat` or `tools/start.sh` |
| **Read docs** | `docs/` folder |
| **Add media** | `sources/icons/`, `sources/media/`, `sources/svgs/` |

## 📋 File Purposes

### Documentation Files (`docs/`)
- **README.md** - Complete project documentation
- **QUICK_START.md** - How to run and test the project
- **CURRENT_STATUS.md** - Explains current setup with Webflow
- **REFACTORING_SUMMARY.md** - What was changed and why

### Code Files
- **index.html** - Main portfolio (do not move)
- **scripts/custom.js** - Your editable custom code ✅
- **style/style.css** - Main stylesheet
- **sources/** - All media files

### Utility Files (`tools/`)
- **start.bat** - Windows quick launcher
- **start.sh** - Mac/Linux quick launcher
- **project_structure.txt** - File tree reference

### Example/Test Files (`examples/`)
- **test.html** - Test page to verify all features work

## ✨ New Structure Benefits

✅ **Cleaner root directory** - Only essential files  
✅ **Organized documentation** - All docs in one place  
✅ **Easy to find things** - Clear folder purposes  
✅ **Professional layout** - Industry standard structure  
✅ **Better maintenance** - Easy to navigate  

## 🎯 What to Edit

### Safe to Edit:
- ✅ `scripts/custom.js` - Add your features here
- ✅ `style/style.css` - Customize colors/fonts
- ✅ `index.html` - Update content
- ✅ `docs/*.md` - Update documentation

### DO NOT EDIT:
- ❌ `scripts/background.js` - Webflow minified
- ❌ `scripts/shunk1.js` - Webflow minified
- ❌ `scripts/shunk2.js` - Webflow minified
- ❌ Git files (`.git`, `.gitignore`, etc)

## 📍 Important Files Locations

```
Edit your custom code:      scripts/custom.js
Edit styles:                style/style.css
Edit main page:             index.html
Read quick start:           docs/QUICK_START.md
Start development server:   tools/start.bat (Windows)
                           tools/start.sh (Mac/Linux)
```

## 🔗 Path References

When linking files in HTML:
```html
<!-- Styles -->
<link href="/style/style.css" rel="stylesheet">

<!-- Scripts -->
<script src="/scripts/custom.js"></script>

<!-- Media -->
<img src="/sources/media/image.webp" alt="Description">
<img src="/sources/icons/icon.png" alt="Icon">
<img src="/sources/svgs/icon.svg" alt="SVG">

<!-- Documents (if linking to) -->
<a href="/docs/README.md">Read Documentation</a>
```

## 🌳 Tree View

```
Project Root
├── 📄 index.html
├── 📁 docs/              ← All documentation
├── 📁 scripts/           ← JavaScript code
├── 📁 style/             ← CSS stylesheets
├── 📁 sources/           ← Media & assets
├── 📁 tools/             ← Utilities & launchers
├── 📁 examples/          ← Example files
├── 📁 .github/           ← GitHub config
└── 📄 .git configuration files
```

## ✅ Organization Benefits

1. **Root is clean** - Only main `index.html` at top level
2. **Docs are separated** - All `.md` files in `docs/`
3. **Tools are organized** - Launchers in `tools/`
4. **Examples isolated** - Test files in `examples/`
5. **Standard structure** - Follows industry best practices

---

**Total Files by Category:**
- 📁 Documentation: 4 files
- 📁 Scripts: 6 files  
- 📁 Styles: 2 files
- 📁 Media: 20+ files
- 📁 Tools: 3 files
- 📁 Examples: 1 file

**Everything organized and professional!** 🎉
