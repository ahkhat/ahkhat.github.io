# Script Refactoring Plan

> ⚠️ **UYARI:** Bu taşlaştırma işlemi çok risklidir çünkü site tamamen Webflow'un minified kodlarına bağımlıdır.

## Neden Riskli?

1. **12,000+ satır minified kod** - şunk1.js (2,790) + şunk2.js (8,725) + background.js (1,228)
2. **HTML bağımlılık** - Her element `data-w-id` attribute'ünü hedefliyor
3. **Inline stiller** - `opacity: 0` ve `transform: translate3d()` Webflow JS ile tetikleniyor
4. **jQuery 3.5.1 kullanımı** - Tüm interaksiyonlar jQuery'ye bağlı
5. **Önceki başarısızlık** - main.vanilla.js denemesi tüm siteyi kırdı

---

## Faz 1: Analiz & Belgeleme

### 1.1 - background.js Analizi
```
Dosya: scripts/background.js
Satır: ~1,228
Hedef: Form handling, file uploads, validations
Plan: 
  ✓ Minified kodu uygun hale getir
  ✓ Fonksiyon adlarını tanımla
  ✓ Bağımlılıkları listele
  ✓ Test et (form submit, validation, file upload)
```

### 1.2 - shunk1.js Analizi
```
Dosya: scripts/shunk1.js
Satır: ~2,790
Hedef: Core animation engine, animation triggers
Plan:
  ✓ Webflow'un core animasyon sistemi
  ✓ data-w-id linklerini anla
  ✓ Animate.js class'ını tanımla
  ✓ Trigger mekanizmasını belgelendirme
```

### 1.3 - shunk2.js Analizi
```
Dosya: scripts/shunk2.js
Satır: ~8,725
Hedef: UI components (lightbox, navigation, etc)
Plan:
  ✓ Lightbox implementasyonu
  ✓ Navigation show/hide logics
  ✓ Scroll animations
  ✓ Interaction handlers
```

---

## Faz 2: Beautify (Minified → Readable)

### Adımlar:
1. Her dosya için online beautifier kullan
2. VSCode format fonksiyonunu çalıştır
3. Kod bloklarını inline comments ile işaretle
4. Fonksiyon başlarını `//= FUNCTION_NAME` ile işaretle

### Araçlar:
- Online: https://beautifier.io
- VSCode: `Shift+Alt+F` (Format Document)

---

## Faz 3: Sectioning & Modularization

### background.js Bölümleri:
```javascript
//= WEBFLOW FORM HANDLER
//= - initialize()
//= - handleSubmit()
//= - validateForm()
//= - uploadFile()

//= WEBFLOW INTERACTION BINDER
//= - bindInteractions()
//= - triggerAnimation()

//= UTILITY FUNCTIONS
//= - parseJSON()
//= - debounce()
//= - throttle()
```

### shunk1.js Bölümleri:
```javascript
//= WEBFLOW ANIMATION CORE
//= - Animate class
//= - trigger()
//= - stop()
//= - resume()

//= EVENT BINDERS
//= - bindScrollEvents()
//= - bindClickEvents()
//= - bindHoverEvents()

//= DATA PARSERS
//= - parseAnimationConfig()
//= - parseTimingConfig()
```

### shunk2.js Bölümleri:
```javascript
//= UI COMPONENT: LIGHTBOX
//= UI COMPONENT: NAVIGATION
//= UI COMPONENT: DROPDOWN
//= UI COMPONENT: SLIDER
//= INTERACTION HELPERS
//= UTILITY METHODS
```

---

## Faz 4: Documentation

Her script için ayrı dokümantasyon:
- `docs/BACKGROUND_JS_GUIDE.md` - Form handling ve upload logic'i
- `docs/SHUNK1_JS_GUIDE.md` - Animation core engine
- `docs/SHUNK2_JS_GUIDE.md` - UI components ve interactions
- `docs/WEBFLOW_DATA_WID_REFERENCE.md` - data-w-id'ler ve ne trigger ettikleri

---

## Faz 5: Testing Strategy

Her değişiklik sonrası test edilmeli:

### background.js:
- [ ] Contact form submit
- [ ] Email validation
- [ ] File upload
- [ ] Error messages

### shunk1.js:
- [ ] Hero fade-in animation
- [ ] Navbar scroll animation (100px trigger)
- [ ] Element reveal animations
- [ ] Timing ve sequencing

### shunk2.js:
- [ ] Navigation toggle
- [ ] Lightbox open/close
- [ ] Dropdown interactions
- [ ] Scroll-triggered animations

---

## Faz 6: Gradual Replacement

> **KRİTİK:** Asla tüm dosyaları birden değiştirme!

### Strateji:
1. **background.js** ile başla (en küçük, en güvenli)
2. Beautify et → section ekle → test et
3. Tam çalışıyorsa, **shunk1.js**'e geç
4. Beautify et → section ekle → test et
5. Son olarak **shunk2.js** (en risklisi)

### Her dosya için:
```
1. scripts/{file}.original.js → orijinal backup yap
2. scripts/{file}.js → beautified versiyon yap
3. Test et → her şey çalışıyor mu?
4. Git commit et → geri dönebilmek için
5. Sonraki dosyaya geç
```

---

## Timeline Tahmini

| Faz | Dosya | Saat | Riski |
|-----|-------|------|------|
| 1 | background.js analizi | 1-2 | DÜŞÜK |
| 2 | background.js beautify | 0.5 | DÜŞÜK |
| 3 | background.js sectioning | 1 | DÜŞÜK |
| 4 | background.js belgelendirme | 1 | DÜŞÜK |
| 5 | background.js testing | 1-2 | DÜŞÜK |
| **Ara toplam** | | **5-6** | **DÜŞÜK** |
| 1 | shunk1.js analizi | 2-3 | ORTA |
| 2 | shunk1.js beautify | 1 | ORTA |
| 3 | shunk1.js sectioning | 2 | ORTA |
| 4 | shunk1.js belgelendirme | 2 | ORTA |
| 5 | shunk1.js testing | 2-3 | **YÜKSEK** |
| **Ara toplam** | | **9-11** | **ORTA** |
| 1 | shunk2.js analizi | 4-5 | YÜKSEK |
| 2 | shunk2.js beautify | 2 | YÜKSEK |
| 3 | shunk2.js sectioning | 3 | **ÇOKYÜKSEK** |
| 4 | shunk2.js belgelendirme | 3 | YÜKSEK |
| 5 | shunk2.js testing | 3-4 | **ÇOKYÜKSEK** |
| **Ara toplam** | | **15-17** | **ÇOKYÜKSEK** |
| **TOPLAM** | | **~30 saat** | **RISKLI** |

---

## Hızlandırma Seçenekleri

Eğer "30 saat çok fazla" diyorsanız:

### A. Sadece background.js (1-2 saat)
- Sadece form handling kodu
- Minimal risk
- İyi pratiğin başlangıcı

### B. Online Tool Kullan
- https://beautifier.io → kod yapıştır → beautify et → kopyala
- Manual editing olmadan
- 5-10 dakika

### C. Partial Beautify
- Sadece function'ları ayrıştır
- Section comments ekle
- Tüm code'u rewrite etme

---

## Başarı Kriterleri

### Minimum (Başlamalı)
- [ ] Beautified kod VSCode'da okunabilir
- [ ] Tüm fonksiyonlar tanımlanmış ve işaretlenmiş
- [ ] Test sonrası **tüm site % 100 çalışıyor**
- [ ] Git history'de geri dönebiliyor

### İdeal
- [ ] Tüm 3 script'te tamamlandı
- [ ] Kapsamlı inline documentation
- [ ] Ayrı `.original.js` backup'ları
- [ ] docs/ klasöründe detaylı rehberler

---

## Git Strategy

```bash
# Her faz için separate commit:
git commit -m "refactor: beautify background.js"
git commit -m "refactor: add sections to background.js"
git commit -m "refactor: document background.js functions"
git commit -m "refactor: beautify shunk1.js"
# ... vs vs

# Eğer her şey kırılırsa:
git revert <commit-hash>
# veya
git checkout scripts/background.js.original.js → scripts/background.js
```

---

## Başlama Kararı

**Şu anda Karar Ver:**

- [ ] **BAŞLA**: background.js ile başlayalım (en güvenli)
- [ ] **HEP BİR SEFER**: Beautify tool kullan, tüm 3 script'i rapidement yap
- [ ] **İPTAL**: custom.js + Webflow'u bu şekilde tutalım (güvenli)

---

## Notlar

> Eğer herhangi bir aşamada "site kırıldı" hatası çıkarsa:
> 1. Hemen `git revert` yap
> 2. Önceki working version'a dön
> 3. Custom.js ile devam et
> 4. Bu sadece educatıon amaçlı - production'da risk alıyor

**Son Tavsiye:** background.js'den başla. Başarılı olursa shunk1'e geç. Ama shunk2'de işler ciddi şekilde zorlaşabilir.

Hazır mısın? 🚀
