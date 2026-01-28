# Asena Hazal Portfolio Website

Modern and clean portfolio/resume website. Written in Vanilla JavaScript, no dependencies required, runs locally.

## 🚀 Features

- ✅ **Clean Code**: Readable, well-commented JavaScript
- ✅ **No Dependencies**: No jQuery or other frameworks required
- ✅ **Responsive**: Mobile and desktop compatible
- ✅ **Animations**: Smooth scroll and fade animations
- ✅ **Lightbox**: Modern lightbox for image gallery
- ✅ **Form Handling**: Simple and effective form validation
- ✅ **SEO Friendly**: Semantic HTML and meta tags

## 📁 Project Structure

```
ahkhat.github.io/
│
├── index.html              # Main page
│
├── scripts/
│   ├── main.js            # Main JavaScript file (NEW - Clean code!)
│   └── _old_webflow/      # Old Webflow scripts (archived)
│
├── style/
│   ├── style.css          # Main stylesheet
│   └── lightbox.css       # Lightbox styles (NEW)
│
└── sources/
    ├── icons/             # Icons and favicon
    ├── media/             # Media files
    └── svgs/              # SVG files
```

## 🛠️ Installation and Running

### Option 1: Python HTTP Server (Recommended)

```bash
# With Python 3.x
python -m http.server 8000

# With Python 2.x
python -m SimpleHTTPServer 8000
```

Open in browser: `http://localhost:8000`

### Option 2: Node.js HTTP Server

```bash
# Install http-server (first time only)
npm install -g http-server

# Start server
http-server -p 8000
```

Open in browser: `http://localhost:8000`

### Option 3: VS Code Live Server

1. Install Live Server extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Option 4: Quick Start Scripts

**Windows:**
```bash
start.bat
```

**Mac/Linux:**
```bash
chmod +x start.sh
./start.sh
```

### Option 5: Direct Browser Open

Simply double-click `index.html` to open in your browser.
**Note:** Some features (CORS) may not work with file:// protocol.

## 📝 JavaScript Modules

### 1. Navigation
Scroll-activated navigation bar
```javascript
new Navigation()
```

### 2. Lightbox
Modern lightbox for image gallery
```javascript
new Lightbox()
```

### 3. Form Handler
Form validation and submission
```javascript
new FormHandler()
```

### 4. Scroll Animations
Scroll animations with Intersection Observer
```javascript
new ScrollAnimations()
```

### 5. Page Loader
Page loading effects
```javascript
new PageLoader()
```

## 🎨 Customization

### Change Colors
Edit CSS variables in `style/style.css`:
```css
:root {
  --primary-color: #your-color;
  --secondary-color: #your-color;
}
```

### Animation Speed
Change duration parameters in `scripts/main.js`:
```javascript
fadeIn(element, duration = 300) // in milliseconds
```

### Lightbox Style
Edit `style/lightbox.css`

## 🔧 Development

### Debug Mode
Portfolio object is available in browser console:
```javascript
// Access all modules
Portfolio.Navigation
Portfolio.Lightbox
Portfolio.FormHandler

// Utility functions
Portfolio.utils.smoothScroll('#section')
Portfolio.utils.fadeIn(element)
```

### HTML Usage

**For Lightbox:**
```html
<div data-lightbox>
  <img src="image.jpg" alt="Description">
</div>
```

**For Scroll Animation:**
```html
<div data-animate>
  <!-- Content -->
</div>
```

**For Forms:**
```html
<form class="w-form">
  <input type="text" required>
  <button type="submit">Submit</button>
</form>
<div class="w-form-done">Success!</div>
<div class="w-form-fail">Error occurred</div>
```

## 📱 Browser Support

- ✅ Chrome (last 2 versions)
- ✅ Firefox (last 2 versions)
- ✅ Safari (last 2 versions)
- ✅ Edge (last 2 versions)
- ⚠️ IE11 (limited support)

## 🐛 Known Issues

- Old Webflow scripts removed, some Webflow-specific features may not work
- Form submission doesn't work locally (requires server)

## 📄 License

This project is licensed under the MIT License.

## 👤 Contact

**Asena Hazal**
- Email: asenahazal@icloud.com
- Website: [ahkhat.github.io](https://ahkhat.github.io)

---

## 🔄 Changelog

### v2.0.0 (January 2026)
- ✅ Removed jQuery dependency
- ✅ Removed Webflow bundles
- ✅ Clean, readable vanilla JavaScript
- ✅ Modern ES6+ syntax
- ✅ Added lightbox
- ✅ Added scroll animations
- ✅ Improved form handling
- ✅ Performance optimizations

### v1.0.0 (Previous)
- Original version created with Webflow

---

**Happy coding! 🎉**
