# Quick Start Guide

## 🚀 Run the Project (Choose One Method)

### Method 1: Double-click Start Script
**Windows:**
- Double-click `start.bat`

**Mac/Linux:**
```bash
chmod +x start.sh
./start.sh
```

### Method 2: Python Command
```bash
python -m http.server 8000
```

### Method 3: Node.js
```bash
npx http-server -p 8000
```

### Method 4: VS Code
1. Install "Live Server" extension
2. Right-click `index.html`
3. Select "Open with Live Server"

## 🌐 Open in Browser

After starting the server, open:
- Main site: `http://localhost:8000`
- Test page: `http://localhost:8000/test.html`

## ✅ Verify Everything Works

### 1. Check Console
Open browser DevTools (F12) and look for:
```
🚀 Asena Hazal Portfolio - Initializing...
✅ Portfolio ready!
```

### 2. Test Navigation
- Scroll down 100px
- Navigation bar should appear from top
- Click nav links to smooth scroll

### 3. Test Lightbox
- Go to test page: `http://localhost:8000/test.html`
- Click any image
- Use arrow keys (←/→) to navigate
- Press Esc to close

### 4. Test Forms
- On test page, fill out the form
- Try submitting without required fields (should show error)
- Fill all fields and submit (should show success)

### 5. Test Scroll Animations
- Scroll down the test page
- Sections should fade in as you scroll

### 6. Test Debug Console
Open browser console and try:
```javascript
// Check Portfolio object
console.log(Portfolio)

// Test smooth scroll
Portfolio.utils.smoothScroll('#section1')

// Test fade effects
Portfolio.utils.fadeIn(document.querySelector('.test-section'))
```

## 🎨 Customize

### Change Colors
Edit `style/style.css` - look for color values

### Change Animations
Edit `scripts/main.js` - look for `duration` parameters

### Add Images to Lightbox
In HTML, add:
```html
<div data-lightbox>
  <img src="your-image.jpg" alt="Description">
</div>
```

### Add Scroll Animations
In HTML, add:
```html
<div data-animate>
  Your content here
</div>
```

## 🐛 Troubleshooting

### Port 8000 already in use?
Change port number:
```bash
python -m http.server 8001
```

### Navigation not appearing?
- Make sure you scrolled down more than 100px
- Check browser console for errors

### Lightbox not working?
- Check if `data-lightbox` attribute is present
- Verify `lightbox.css` is loaded
- Check console for errors

### Forms not submitting?
- This is normal - forms need a backend server
- For now, they only validate client-side

## 📂 Project Structure

```
ahkhat.github.io/
├── index.html          # Your main portfolio page
├── test.html           # Feature testing page
├── start.bat           # Windows launcher
├── start.sh            # Mac/Linux launcher
│
├── scripts/
│   └── main.js         # All JavaScript (clean & readable)
│
└── style/
    ├── style.css       # Main styles
    └── lightbox.css    # Lightbox styles
```

## 📚 Documentation

- **README.md** - Full documentation
- **REFACTORING_SUMMARY.md** - What changed and why
- **QUICK_START.md** - This file

## 💡 Tips

1. **Always use a local server** - Don't just open `index.html` directly
2. **Check browser console** - Errors will show there
3. **Use test.html first** - Verify all features work
4. **Mobile testing** - Resize browser window to test responsive design

## 🎯 Next Steps

1. ✅ Start local server
2. ✅ Open main site
3. ✅ Open test page
4. ✅ Verify all features work
5. ✅ Customize as needed
6. ✅ Deploy to GitHub Pages

## 🆘 Need Help?

If something doesn't work:
1. Check browser console (F12)
2. Verify server is running
3. Try `test.html` to isolate the issue
4. Check that all files are in correct locations

---

**You're all set! 🎉**
