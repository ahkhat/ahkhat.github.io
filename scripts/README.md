# JavaScript Architecture

## 📂 File Structure

```
scripts/
├── background.js       # Webflow (Minified - DON'T EDIT)
├── shunk1.js          # Webflow (Minified - DON'T EDIT)
├── shunk2.js          # Webflow (Minified - DON'T EDIT)
├── custom.js          # YOUR CODE (Clean & Readable) ✅
└── main.vanilla.js    # Alternative version (not active)
```

## ✅ Best Practice Approach

### What NOT to Edit:
- ❌ `background.js` - Webflow form handling (1,228 lines minified)
- ❌ `shunk1.js` - Webflow core (2,790 lines minified)
- ❌ `shunk2.js` - Webflow animations (8,725 lines minified)

**Why?** These are production-minified bundles. Editing them will break the site.

### What TO Edit:
- ✅ `custom.js` - Your own clean, readable code
- ✅ Add new features here
- ✅ Track analytics
- ✅ Add custom interactions

## 🎯 How It Works

1. **Webflow scripts load first** - Handle all animations, navigation, forms
2. **Your custom.js loads last** - Adds your features on top

This way:
- ✅ Site works perfectly with Webflow
- ✅ You have clean, readable code for your customizations
- ✅ Best of both worlds!

## 📝 Adding Custom Features

### Example 1: Track Button Clicks
```javascript
// In custom.js
const downloadButton = document.querySelector('a[href*="Resume.pdf"]');
downloadButton.addEventListener('click', () => {
  console.log('CV downloaded!');
  // Send to Google Analytics, etc.
});
```

### Example 2: Add Custom Animations
```javascript
// In custom.js
window.addEventListener('scroll', () => {
  const scrollPercent = (window.scrollY / document.body.scrollHeight) * 100;
  console.log('Scroll progress:', scrollPercent + '%');
});
```

### Example 3: Custom Form Validation
```javascript
// In custom.js
const forms = document.querySelectorAll('form');
forms.forEach(form => {
  form.addEventListener('submit', (e) => {
    // Your custom validation
    console.log('Form submitted with custom validation');
  });
});
```

## 🔧 Load Order

```html
<!-- 1. jQuery (Required by Webflow) -->
<script src="jquery-3.5.1.min.js"></script>

<!-- 2. Webflow Core -->
<script src="/scripts/shunk1.js"></script>

<!-- 3. Webflow UI Components -->
<script src="/scripts/shunk2.js"></script>

<!-- 4. Webflow Forms & Interactions -->
<script src="/scripts/background.js"></script>

<!-- 5. YOUR CUSTOM CODE (runs after Webflow) -->
<script src="/scripts/custom.js"></script>
```

## 💡 Why This Approach?

### Traditional Approach (What we tried):
```
❌ Replace all Webflow code with custom code
❌ Result: Site broke (navigation hidden, content invisible)
❌ Would need 20-30 hours to rebuild everything
```

### Hybrid Approach (Current - Recommended):
```
✅ Keep Webflow for what it does best (animations, interactions)
✅ Add custom.js for your own features
✅ Result: Site works + You have clean code to edit
✅ Takes 0 hours - working now!
```

## 📊 Code Comparison

| File | Lines | Type | Editable? |
|------|-------|------|-----------|
| background.js | 1,228 | Minified | ❌ No |
| shunk1.js | 2,790 | Minified | ❌ No |
| shunk2.js | 8,725 | Minified | ❌ No |
| **custom.js** | ~100 | **Clean** | **✅ YES!** |

## 🎨 What You Can Do in custom.js

1. **Analytics Tracking**
   - Google Analytics
   - Custom event tracking
   - User behavior monitoring

2. **Custom Interactions**
   - Add tooltips
   - Custom hover effects
   - Easter eggs

3. **Form Enhancements**
   - Additional validation
   - Auto-fill features
   - Custom success messages

4. **Performance Monitoring**
   - Track load times
   - Monitor scroll depth
   - A/B testing

5. **SEO & Accessibility**
   - Dynamic meta tags
   - ARIA labels
   - Keyboard shortcuts

## 🚀 Quick Start

1. Open `scripts/custom.js`
2. Add your custom features
3. Refresh browser to test
4. Webflow functionality remains intact

## 🐛 Debugging

```javascript
// In browser console:

// Check if custom code loaded
console.log(CustomPortfolio);

// Test custom scroll
CustomPortfolio.smoothScrollTo('#Profile');

// Check Webflow is working
console.log(window.Webflow);
```

## ✨ Best Practices

1. **Keep custom.js clean and commented**
2. **Don't modify Webflow files**
3. **Test after each change**
4. **Use console.log for debugging**
5. **Keep functions small and focused**

---

**Summary:** 
- Webflow = The engine (minified, don't touch)
- custom.js = Your customizations (clean, edit freely)
- Together = Perfect working site with readable code! 🎉
