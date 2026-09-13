/**
 * 🌊 REEFBOX — MERKEZİ VERİ DOSYASI (data.js)
 * 
 * Bu dosya sitenizin tüm içeriklerinin yönetildiği yerdir.
 * Yeni bir oyun, video, müzik veya sosyal hesap eklemek için 
 * sadece aşağıdaki ilgili bölüme yeni bir kayıt eklemeniz yeterlidir.
 * Hiçbir HTML kodunu değiştirmeye gerek yoktur!
 */

const REEFBOX_DATA = {
    // 🏷️ MARKA & PROFİL BİLGİLERİ
    brand: {
        name: "reefbox",
        title: "Creator • Game Developer • Music Producer",
        bio: "Dijital dünyada oyunlar geliştiriyor, yazılım ve tasarım eğitimleri veriyor ve elektronik müzikler üretiyorum. Tüm projelerimi ve içeriklerimi buradan keşfedebilirsiniz.",
        avatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80",
        location: "İstanbul / Dijital Evren",
        status: "🚀 Yeni oyun projesi üzerinde çalışıyor..."
    },

    // 🎮 OYUNLAR VE UYGULAMALAR (itch.io Gömülü / Embed)
    projects: [
        {
            id: "game-1",
            title: "Cyber Reef: Echoes",
            type: "game",
            category: "Oyunlar",
            description: "Derin okyanus temalı, retro-fütüristik neon piksel sanatına sahip atmosferik bir aksiyon-macera oyunu.",
            tags: ["Godot", "Pixel Art", "Action", "Cyberpunk"],
            cover: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80",
            embedUrl: "https://itch.io/embed/834863?dark=true",
            directPlayUrl: "https://play2048.co/",
            itchUrl: "https://itch.io",
            isFeatured: true,
            version: "v1.2.0",
            releaseYear: "2026"
        },
        {
            id: "game-2",
            title: "Abyss Protocol",
            type: "game",
            category: "Oyunlar",
            description: "Terk edilmiş bir su altı araştırma üssünde geçen, bulmaca ve gerilim odaklı birinci şahıs hayatta kalma deneyimi.",
            tags: ["Unity", "3D", "Horror", "Sci-Fi"],
            cover: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80",
            embedUrl: "https://itch.io/embed/28412?dark=true",
            directPlayUrl: "https://hextris.io/",
            itchUrl: "https://itch.io",
            isFeatured: true,
            version: "v0.9.4 Beta",
            releaseYear: "2026"
        },
        {
            id: "app-1",
            title: "SynthBox Audio Lab",
            type: "app",
            category: "Uygulamalar",
            description: "Web tabanlı, tarayıcıda çalışan gerçek zamanlı mikro synth ve ritim oluşturucu web uygulaması.",
            tags: ["Web Audio API", "JavaScript", "Synthesizer"],
            cover: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop&q=80",
            embedUrl: "https://itch.io/embed/834863?dark=true",
            directPlayUrl: "https://musiclab.chromeexperiments.com/Song-Maker/",
            itchUrl: "https://itch.io",
            isFeatured: false,
            version: "v2.0",
            releaseYear: "2025"
        },
        {
            id: "app-2",
            title: "Pixel Palette Studio",
            type: "app",
            category: "Uygulamalar",
            description: "Oyun geliştiricileri için otomatik palet oluşturan ve kontrast analizleri sunan hafif yardımcı araç.",
            tags: ["Tool", "Color Theory", "GameDev"],
            cover: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80",
            embedUrl: "https://itch.io/embed/28412?dark=true",
            directPlayUrl: "https://hextris.io/",
            itchUrl: "https://itch.io",
            isFeatured: false,
            version: "v1.1",
            releaseYear: "2025"
        }
    ],

    // 🎬 VİDEOLAR VE EĞİTİMLER (YouTube Gömülü)
    videos: [
        {
            id: "vid-mc",
            title: "MİNECRAFT YARI OTOMATİK KIRIK TAŞ FARMI (KÜÇÜK)",
            category: "gaming",
            categoryName: "Oyun Videoları",
            description: "Minecraft'ta kolay, kompakt ve pratik yarı otomatik kırık taş farmı yapımı rehberi ve oynanış videosu.",
            youtubeId: "7jvi2GSvoUA",
            duration: "04:12",
            views: "Yeni",
            date: "Güncel",
            tags: ["Minecraft", "Oyun", "Farm", "Gameplay"],
            isFeatured: true
        },
        {
            id: "vid-1",
            title: "minecraft",
            category: "education",
            categoryName: "Eğitimler",
            description: "Karakter hareket fiziği, animasyon state machine ve dinamik ışıklandırma sistemlerini baştan sona kodluyoruz.",
            youtubeId: "=7jvi2GSvoUA",
            duration: "24:18",
            views: "18.4K",
            date: "Eylül 2026",
            tags: ["Godot", "Game Dev", "C# / GDScript"],
            isFeatured: false
        },
        {
            id: "vid-2",
            title: "Minecraft ile Hayatta Kalma ve Otomatik Çiftlikler",
            category: "gaming",
            categoryName: "Oyun Videoları",
            description: "Kaynak toplama ve hayatta kalma için en verimli otomatik sistemleri kuruyoruz.",
            youtubeId: "7jvi2GSvoUA",
            duration: "14:20",
            views: "28.5K",
            date: "Ağustos 2026",
            tags: ["Minecraft", "Farm", "Survival"],
            isFeatured: false
        },
        {
            id: "vid-3",
            title: "Web Audio API ile Tarayıcıda Müzik Motoru Yazmak",
            category: "education",
            categoryName: "Eğitimler",
            description: "Oscillator, GainNode ve AudioContext kullanarak saf JavaScript ile sentetik sesler ve melodiler nasıl üretilir?",
            youtubeId: "7jvi2GSvoUA",
            duration: "31:05",
            views: "12.8K",
            date: "Temmuz 2026",
            tags: ["JavaScript", "Web Audio", "Synthesizer"],
            isFeatured: false
        },
        {
            id: "vid-4",
            title: "En Zor Roguelike Oyunları No-Hit Bitirmeye Çalıştım",
            category: "gaming",
            categoryName: "Oyun Videoları",
            description: "Refleksleri sonuna kadar zorlayan roguelike maratonu: Can kaybetmeden son bölüme kadar ulaşabilecek miyiz?",
            youtubeId: "7jvi2GSvoUA",
            duration: "42:15",
            views: "45.0K",
            date: "Haziran 2026",
            tags: ["Challenge", "Roguelike", "Full Run"],
            isFeatured: false
        },
        {
            id: "vid-5",
            title: "Shader Sanatı: Su Altı Kırılma ve Kostik Efektleri",
            category: "education",
            categoryName: "Eğitimler",
            description: "Gerçekçi su dalgalanmaları, ışık kırılmaları ve derinlik hissi veren GLSL shader kodlama eğitimi.",
            youtubeId: "7jvi2GSvoUA",
            duration: "27:50",
            views: "15.3K",
            date: "Mayıs 2026",
            tags: ["Shaders", "GLSL", "VFX"],
            isFeatured: false
        }
    ],

    // 🎵 MÜZİKLER (YouTube Ses Akışı - Audio Only)
    musicTracks: [
        {
            id: "track-1",
            title: "Neon Bioluminescence",
            artist: "reefbox",
            genre: "Synthwave / Cyber Ambient",
            youtubeId: "DWcJFNfaw9c",
            duration: "3:42",
            cover: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&auto=format&fit=crop&q=80",
            description: "Derin denizlerin gizemli parıltısından ilham alan analog synthesizer kompozisyonu."
        },
        {
            id: "track-2",
            title: "Submerged Odyssey",
            artist: "reefbox",
            genre: "Downtempo Electronic",
            youtubeId: "5qap5aO4i9A",
            duration: "4:15",
            cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&auto=format&fit=crop&q=80",
            description: "Sakinleştirici bas hatları ve atmosferik okyanus ses manzaraları."
        },
        {
            id: "track-3",
            title: "Abyss Run (Boss Theme)",
            artist: "reefbox",
            genre: "Dark Synth / Darksynth",
            youtubeId: "MCkTebktHVc",
            duration: "3:18",
            cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&auto=format&fit=crop&q=80",
            description: "Hızlı tempolu, yüksek enerjili ve distortion dolu aksiyon müziği."
        },
        {
            id: "track-4",
            title: "Midnight Glitch Horizon",
            artist: "reefbox",
            genre: "Glitch Hop / Ambient",
            youtubeId: "36YnV9STBqc",
            duration: "3:55",
            cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&auto=format&fit=crop&q=80",
            description: "Gece kodlaması ve odaklanma için tasarlanmış ritmik synthesizer melodileri."
        }
    ],

    // 🌐 SOSYAL MEDYA HESAPLARI & GÖMÜLÜ İÇERİKLER
    socials: {
        twitter: {
            username: "reefbox",
            url: "https://twitter.com/reefbox",
            handle: "@reefbox",
            timelineUrl: "https://twitter.com/reefbox"
        },
        instagram: {
            username: "reefbox.dev",
            url: "https://instagram.com/reefbox.dev",
            handle: "@reefbox.dev",
            posts: [
                {
                    caption: "Oyun motorunda yeni su altı shader testleri! 🌊 Renk kırılmaları nasıl olmuş?",
                    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80",
                    likes: "342",
                    comments: "48",
                    date: "3 gün önce"
                },
                {
                    caption: "Yeni parça 'Neon Bioluminescence' mastering aşamasında 🎚️ Kulaklıkları takın!",
                    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&auto=format&fit=crop&q=80",
                    likes: "518",
                    comments: "62",
                    date: "1 hafta önce"
                },
                {
                    caption: "Godot 4.3 eğitim serisi yayında. Kodlamaya başlamak için profil linkine bakın 🚀",
                    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80",
                    likes: "789",
                    comments: "93",
                    date: "2 hafta önce"
                }
            ]
        },
        youtube: {
            channelName: "YUSUFKAYAA",
            channelUrl: "https://www.youtube.com/@yusufkayaa4687",
            subscribers: "Kanalıma Abone Olun",
            videoCount: "Oyun & Rehber Videoları",
            featuredVideoId: "7jvi2GSvoUA"
        },
        itch: {
            username: "reefbox",
            url: "https://itch.io"
        },
        discord: {
            serverName: "reefbox Topluluğu",
            inviteUrl: "https://discord.gg",
            memberCount: "850+ Üye Aktif"
        }
    }
};

