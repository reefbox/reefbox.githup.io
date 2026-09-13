# 🌊 reefbox — Creator & Developer Hub

**reefbox**, YouTube oyun ve eğitim videolarınızı, bestelediğiniz müzikleri, geliştirdiğiniz oyun ve uygulamaları ile sosyal medya akışlarınızı tek bir çatı altında toplayan modern, lüks cam efektli (**Glassmorphism**) ve statik bir web sitesidir.

> **Önemli İlke:** Ziyaretçiyi site dışına kaçıran hiçbir yönlendirme yoktur! Oyunlar, videolar, müzikler ve sosyal medya paylaşımları doğrudan site içine gömülü (embed) olarak çalışır.

---

## 🚀 GitHub Pages'te Yayınlama (3 Basit Adım)

Bu site tamamen statik (`HTML`, `CSS`, `JavaScript`) olduğu için sunucu veya veritabanı gerektirmez, GitHub üzerinde **tamamen ücretsiz ve sınırsız** barındırılabilir.

1. **GitHub Deposu (Repository) Oluşturun:**
   - [GitHub.com](https://github.com)'a girip `reefbox` (veya `kullaniciadiniz.github.io`) adında yeni bir genel (public) depo açın.
2. **Dosyaları Yükleyin:**
   - `index.html`, `style.css`, `app.js` ve `data.js` dosyalarını bu depoya yükleyin.
3. **GitHub Pages'i Açın:**
   - Deponuzun **Settings -> Pages** sekmesine gidin.
   - **Branch** kısmını `main` (veya `master`) ve klasörü `/ (root)` seçip **Save** butonuna tıklayın.
   - Birkaç saniye içinde siteniz `https://kullaniciadiniz.github.io/reefbox` adresinde canlıya geçecektir!

---

## 📁 Dosya Yapısı

* `index.html` — Sitenin ana iskeleti, reefbox vektörel SVG logosu, 4 sekmeli dashboard arayüzü, itch.io tiyatro modalı ve sabit alt müzik çalar.
* `style.css` — Modern cam efekti (Glassmorphism), derin deniz renk paleti, neon camgöbeği ışıltılar ve mobil uyumlu stiller.
* `app.js` — Sekme geçiş motoru, itch.io modal kontrolcüsü, YouTube Sinema Modu ve YouTube Audio-Only gizli ses akış motoru.
* `data.js` — **Tüm sitenin yönetim merkezi.** Yeni içerik eklemek için HTML'e dokunmanıza gerek yoktur, sadece bu dosyayı düzenlemeniz yeterlidir.

---

## ✏️ Yeni İçerik Nasıl Eklenir? (`data.js`)

### 1. Yeni Oyun veya Uygulama Ekleme (itch.io)
`data.js` içindeki `projects` dizisine yeni bir obje ekleyin:
```javascript
{
    id: "game-3",
    title: "Yeni Oyunum",
    type: "game", // veya 'app'
    description: "Oyunun kısa ve etkileyici açıklaması.",
    tags: ["Godot", "Action", "Cyberpunk"],
    cover: "https://images.unsplash.com/...", // veya yerel resim
    // itch.io WebGL doğrudan oynanabilir linki veya embed iframe linki:
    embedUrl: "https://itch.io/embed/XXXXX?dark=true",
    directPlayUrl: "https://v6p9d9t4.ssl.hwcdn.net/html/XXXXX/index.html",
    isFeatured: false,
    version: "v1.0"
}
```

### 2. Yeni Video veya Eğitim Ekleme (YouTube)
YouTube video linkindeki `v=` kodunu (örneğin `youtube.com/watch?v=ABC123XYZ` ise `ABC123XYZ`) yazmanız yeterlidir:
```javascript
{
    id: "vid-6",
    title: "Shader Kodlama Eğitimi Bölüm 2",
    category: "education", // 'gaming' veya 'education'
    categoryName: "Eğitimler",
    description: "GLSL ile su altı ışık efektleri.",
    youtubeId: "ABC123XYZ",
    duration: "19:45",
    views: "8.2K",
    date: "Ekim 2026",
    tags: ["Shader", "GLSL"]
}
```

### 3. Yeni Müzik Parçası Ekleme (YouTube Ses Akışı)
Müziğiniz sunucuda yer kaplamaz, YouTube videosunun sesini doğrudan çalar:
```javascript
{
    id: "track-5",
    title: "Ocean Circuit",
    artist: "reefbox",
    genre: "Synthwave",
    youtubeId: "YOUTUBE_VIDEO_ID",
    duration: "3:30",
    cover: "https://images.unsplash.com/...",
    description: "Parça hakkında kısa bilgi."
}
```

---

## 💎 Tasarım ve Deneyim Özellikleri

- **Sekmeli SPA Mimarisi:** Sekmeler arasında gezinirken sayfa yeniden yüklenmez, müzik asla kesilmez.
- **Sinematik itch.io Modalı:** Oyunlar site içindeki tiyatro ekranında tam ekran desteğiyle oynanır.
- **YouTube Sinema Modu:** Tek tıkla üstteki dev 16:9 ekrana video yüklenir.
- **Sabit Müzik Çalar:** Alt barda gerçek zamanlı süre sarma (scrubber), ses düzeyi ayarı ve açılır çalma listesi çekmecesi.
