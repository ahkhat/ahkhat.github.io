# 📜 Scripts

## Active Files

### `animations.js` (403 lines)
**The only JavaScript file needed for the entire site.**

Vanilla JavaScript implementation of all site animations:
- ✅ 6 Page load animations
- ✅ 2 Interactive animations (hover, click)
- ✅ Zero dependencies
- ✅ 97% smaller than original Webflow code

**Replaces:**
- ❌ shunk1.js (2,856 lines)
- ❌ shunk2.js (9,908 lines)
- ❌ background.js (1,301 lines)
- ❌ jQuery (88 KB)

---

## What Happened to Webflow Files?

All Webflow-generated files were analyzed, reimplemented in vanilla JS, and archived.

**Backup location:** `/_backup/2026-01-28-webflow-migration/`

**Migration details:** See `/MIGRATION_ANALYSIS.md`

---

## Usage

The script auto-initializes on page load:

```html
<script src="/scripts/animations.js"></script>
```

No configuration needed. Just works. ✨
