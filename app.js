/**
 * 🌊 REEFBOX — JAVASCRIPT MOTORU (app.js)
 * 
 * - Sekmeli (Tabs) Sayfa Mimarisi
 * - itch.io Gömülü Oyun Modalı (Tiyatro Modu)
 * - YouTube Sinema Modu Oynatıcısı & Kategori Filtreleme
 * - Sabit Alt Bar YouTube Ses Çaları (Audio-Only Engine)
 * - Sosyal Medya Önizleme Render Motoru
 */

// =========================================================
// 1. GLOBAL DEĞİŞKENLER & DURUM (STATE)
// =========================================================
let currentTab = 'home';
let currentCategoryFilter = 'all';
let currentGameFilter = 'all';

// Müzik Çalar Durumu
let ytAudioPlayer = null;
let isAudioPlayerReady = false;
let currentTrackIndex = 0;
let isPlaying = false;
let progressUpdateTimer = null;

// =========================================================
// 2. SAYFA YÜKLENME VE BAŞLATMA
// =========================================================
document.addEventListener('DOMContentLoaded', () => {
    initNavigationTabs();
    renderHomeShowcase();
    renderGamesGrid('all');
    renderVideosGrid('all');
    renderMusicTab('all');
    initMusicTabEvents();
    renderSocials();
    initGameModalEvents();
    initMusicControls();
    populatePlaylistDrawer();
});

// =========================================================
// 3. SEKME (TAB) YÖNETİMİ (SPA MİMARİSİ)
// =========================================================
function initNavigationTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            switchTab(targetTab);
        });
    });

    // Logo tıklandığında ana sayfaya dön
    const brandLink = document.getElementById('brand-link');
    if (brandLink) {
        brandLink.addEventListener('click', (e) => {
            e.preventDefault();
            switchTab('home');
        });
    }
}

function switchTab(tabId) {
    currentTab = tabId;

    // Sekme butonlarını güncelle
    document.querySelectorAll('.tab-btn').forEach(btn => {
        const isActive = btn.getAttribute('data-tab') === tabId;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    // Sekme panellerini güncelle (Yumuşak geçiş)
    document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.remove('active');
    });

    const targetPanel = document.getElementById(`tab-${tabId}`);
    if (targetPanel) {
        targetPanel.classList.add('active');
        // Sayfayı üste yumuşakça kaydır
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// =========================================================
// 4. ANA SAYFA VİTRİN RENDERİ (HOME SHOWCASE)
// =========================================================
function renderHomeShowcase() {
    const data = REEFBOX_DATA;

    // Biyografi ve İstatistikler
    if (data.brand && data.brand.bio) {
        const bioEl = document.getElementById('hero-bio');
        if (bioEl) bioEl.textContent = data.brand.bio;
    }

    const statProj = document.getElementById('stat-projects-count');
    if (statProj) statProj.textContent = `${data.projects.length}+`;

    const statVid = document.getElementById('stat-videos-count');
    if (statVid) statVid.textContent = `${data.videos.length}+`;

    const statTrack = document.getElementById('stat-tracks-count');
    if (statTrack) statTrack.textContent = `${data.musicTracks.length}`;

    // 1. Öne Çıkan Oyun
    const featuredGame = data.projects.find(p => p.isFeatured) || data.projects[0];
    if (featuredGame) {
        document.getElementById('home-game-cover').src = featuredGame.cover;
        document.getElementById('home-game-title').textContent = featuredGame.title;
        document.getElementById('home-game-desc').textContent = featuredGame.description;

        const tagsContainer = document.getElementById('home-game-tags');
        tagsContainer.innerHTML = featuredGame.tags.map(t => `<span class="tag">${t}</span>`).join('');

        const playAction = () => openGameModal(featuredGame);
        document.getElementById('home-play-game-btn').onclick = playAction;
        document.getElementById('home-game-play-action').onclick = playAction;
    }

    // 2. Öne Çıkan Video
    const featuredVideo = data.videos.find(v => v.isFeatured) || data.videos[0];
    if (featuredVideo) {
        document.getElementById('home-video-cover').src = `https://img.youtube.com/vi/${featuredVideo.youtubeId}/hqdefault.jpg`;
        document.getElementById('home-video-title').textContent = featuredVideo.title;
        document.getElementById('home-video-desc').textContent = featuredVideo.description;
        document.getElementById('home-video-duration').textContent = featuredVideo.duration;

        const tagsContainer = document.getElementById('home-video-tags');
        tagsContainer.innerHTML = featuredVideo.tags.map(t => `<span class="tag">${t}</span>`).join('');

        const watchAction = () => {
            switchTab('videos');
            loadCinemaVideo(featuredVideo);
        };
        document.getElementById('home-watch-video-btn').onclick = watchAction;
    }

    // 3. Öne Çıkan Müzik
    const featuredMusic = data.musicTracks[0];
    if (featuredMusic) {
        document.getElementById('home-music-cover').src = featuredMusic.cover;
        document.getElementById('home-music-title').textContent = featuredMusic.title;
        document.getElementById('home-music-desc').textContent = featuredMusic.description;
        document.getElementById('home-music-genre').textContent = featuredMusic.genre;

        const musicAction = () => {
            switchTab('music');
            playTrackByIndex(0);
        };
        document.getElementById('home-play-music-btn').onclick = musicAction;
        document.getElementById('home-music-play-action').onclick = musicAction;
    }
}

function playFeaturedMusic() {
    switchTab('music');
    playTrackByIndex(0);
}

// =========================================================
// 5. OYUNLAR & UYGULAMALAR (itch.io GÖMÜLÜ)
// =========================================================
function renderGamesGrid(filter = 'all') {
    currentGameFilter = filter;
    const container = document.getElementById('projects-grid-container');
    if (!container) return;

    let items = REEFBOX_DATA.projects;
    if (filter !== 'all') {
        items = items.filter(p => p.type === filter);
    }

    container.innerHTML = items.map(proj => `
        <div class="project-card glass-panel" data-id="${proj.id}">
            <div class="project-header-meta">
                <span class="badge badge-cyan"><i class="fa-brands fa-itch-io"></i> ${proj.type === 'game' ? 'Oyun' : 'Uygulama'}</span>
                <span class="badge badge-dark">${proj.version || 'v1.0'}</span>
            </div>
            <div class="project-cover-wrap">
                <img src="${proj.cover}" alt="${proj.title}" class="project-cover" loading="lazy">
                <div class="cover-overlay">
                    <button class="play-overlay-btn" onclick="openGameModalById('${proj.id}')">
                        <i class="fa-solid fa-play"></i> Hemen Oyna (Gömülü)
                    </button>
                </div>
            </div>
            <div class="tags-row">
                ${proj.tags.map(t => `<span class="tag">${t}</span>`).join('')}
            </div>
            <h3 class="featured-title">${proj.title}</h3>
            <p class="featured-desc">${proj.description}</p>
            <div class="project-actions">
                <button class="btn btn-sm btn-primary" onclick="openGameModalById('${proj.id}')" style="flex: 1;">
                    <i class="fa-solid fa-gamepad"></i> Sitede Oyna
                </button>
                <button class="btn btn-sm btn-glass" onclick="openItchDirect('${proj.id}')" title="itch.io Sayfası">
                    <i class="fa-brands fa-itch-io"></i>
                </button>
            </div>
        </div>
    `).join('');

    // Filtre butonlarının aktifliğini güncelle
    const filterButtons = document.querySelectorAll('#games-filter-pills .filter-btn');
    filterButtons.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-filter') === filter);
        btn.onclick = () => renderGamesGrid(btn.getAttribute('data-filter'));
    });
}

function openGameModalById(id) {
    const project = REEFBOX_DATA.projects.find(p => p.id === id);
    if (project) openGameModal(project);
}

function openItchDirect(id) {
    const project = REEFBOX_DATA.projects.find(p => p.id === id);
    if (project) openGameModal(project); // Dışarı yönlendirme yok, modal içinde açar!
}

// ITCH.IO SİNEMATİK MODAL
function initGameModalEvents() {
    const modal = document.getElementById('game-modal');
    const closeBtn = document.getElementById('modal-close-btn');
    const fsBtn = document.getElementById('modal-fullscreen-btn');

    if (closeBtn) closeBtn.onclick = closeGameModal;

    if (fsBtn) {
        fsBtn.onclick = () => {
            const iframe = document.getElementById('game-modal-iframe');
            if (iframe.requestFullscreen) {
                iframe.requestFullscreen();
            } else if (iframe.webkitRequestFullscreen) {
                iframe.webkitRequestFullscreen();
            }
        };
    }

    // Arka plana tıklandığında kapat
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeGameModal();
        });
    }

    // ESC tuşuna basıldığında kapat
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeGameModal();
    });
}

function openGameModal(project) {
    const modal = document.getElementById('game-modal');
    const iframe = document.getElementById('game-modal-iframe');
    const title = document.getElementById('modal-game-title');
    const directLink = document.getElementById('modal-itch-direct-link');

    if (!modal || !iframe) return;

    title.textContent = project.title;
    // Öncelik doğrudan WebGL / HTML5 linkindedir, yoksa embed URL yüklenir
    iframe.src = project.directPlayUrl || project.embedUrl;
    directLink.href = project.itchUrl || "#";

    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Sayfa kaydırmasını kilitle
}

function closeGameModal() {
    const modal = document.getElementById('game-modal');
    const iframe = document.getElementById('game-modal-iframe');

    if (!modal) return;

    modal.classList.remove('active');
    document.body.style.overflow = '';

    // Oyun sesini ve WebGL işlemini kesmek için iframe src sıfırlanır
    if (iframe) iframe.src = "";
}

// =========================================================
// 6. VİDEOLAR & EĞİTİMLER (SİNEMA MODU)
// =========================================================
function renderVideosGrid(category = 'all') {
    currentCategoryFilter = category;
    const container = document.getElementById('videos-grid-container');
    const countBadge = document.getElementById('videos-count-badge');
    if (!container) return;

    let items = REEFBOX_DATA.videos;
    if (category !== 'all') {
        items = items.filter(v => v.category === category);
    }

    if (countBadge) countBadge.textContent = `${items.length} Video`;

    container.innerHTML = items.map(video => `
        <div class="video-card glass-panel" onclick="loadCinemaVideoById('${video.id}')" data-vid-id="${video.id}">
            <div class="video-card-thumb-wrap">
                <img src="https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg" alt="${video.title}" class="video-card-thumb" loading="lazy">
                <span class="duration-tag"><i class="fa-solid fa-play"></i> ${video.duration}</span>
            </div>
            <h4 class="video-card-title">${video.title}</h4>
            <div class="video-card-meta">
                <span><i class="fa-solid fa-tag"></i> ${video.categoryName}</span>
                <span><i class="fa-regular fa-eye"></i> ${video.views}</span>
            </div>
        </div>
    `).join('');

    // Kategori butonlarını güncelle
    const filterButtons = document.querySelectorAll('#videos-filter-pills .filter-btn');
    filterButtons.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-category') === category);
        btn.onclick = () => renderVideosGrid(btn.getAttribute('data-category'));
    });
}

function loadCinemaVideoById(id) {
    const video = REEFBOX_DATA.videos.find(v => v.id === id);
    if (video) loadCinemaVideo(video);
}

function loadCinemaVideo(video) {
    const iframe = document.getElementById('main-cinema-iframe');
    const title = document.getElementById('cinema-video-title');
    const desc = document.getElementById('cinema-video-desc');
    const catBadge = document.getElementById('cinema-category-badge');
    const dateBadge = document.getElementById('cinema-date-badge');
    const viewsBadge = document.getElementById('cinema-views-badge');

    if (iframe) {
        // YouTube NoCookie altyapısıyla güvenli ve hızlı embed
        iframe.src = `https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&enablejsapi=1&rel=0`;
    }

    if (title) title.textContent = video.title;
    if (desc) desc.textContent = video.description;
    if (catBadge) catBadge.textContent = video.categoryName;
    if (dateBadge) dateBadge.innerHTML = `<i class="fa-regular fa-calendar"></i> ${video.date}`;
    if (viewsBadge) viewsBadge.innerHTML = `<i class="fa-regular fa-eye"></i> ${video.views} Görüntülenme`;

    // Aktif kartı işaretle
    document.querySelectorAll('.video-card').forEach(card => {
        card.classList.toggle('active-cinema', card.getAttribute('data-vid-id') === video.id);
    });

    // Sinema alanına yumuşakça odaklan
    const cinemaArea = document.querySelector('.cinema-player-container');
    if (cinemaArea) {
        cinemaArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// =========================================================
// 7. SOSYAL MEDYA ÖNİZLEMELERİ
// =========================================================
function renderSocials() {
    const data = REEFBOX_DATA.socials;

    // Instagram Önizleme Gönderileri
    const igContainer = document.getElementById('instagram-posts-container');
    if (igContainer && data.instagram && data.instagram.posts) {
        igContainer.innerHTML = data.instagram.posts.map(post => `
            <div class="ig-post-card glass-subpanel">
                <img src="${post.image}" alt="Instagram Post" loading="lazy">
                <div class="ig-post-overlay">
                    <p class="ig-caption">${post.caption}</p>
                    <span class="ig-likes"><i class="fa-solid fa-heart"></i> ${post.likes} Beğeni • ${post.date}</span>
                </div>
            </div>
        `).join('');
    }

    // YouTube Abone Bilgisi
    const ytSubs = document.getElementById('social-yt-subscribers');
    if (ytSubs && data.youtube) {
        ytSubs.textContent = `${data.youtube.subscribers} • ${data.youtube.videoCount}`;
    }
}

// =========================================================
// 7.5. MÜZİKLER & DİSKOGRAFİ SEKMESİ MANTIĞI
// =========================================================
let currentMusicGenre = 'all';

function renderMusicTab(genreFilter = 'all') {
    currentMusicGenre = genreFilter;
    const container = document.getElementById('music-tracks-grid-container');
    const countBadge = document.getElementById('music-tracks-count-badge');
    if (!container) return;

    const allTracks = REEFBOX_DATA.musicTracks;
    let filtered = allTracks;

    if (genreFilter !== 'all') {
        filtered = allTracks.filter(t => t.genre.toLowerCase().includes(genreFilter.toLowerCase()));
    }

    if (countBadge) countBadge.textContent = `${filtered.length} Parça`;

    container.innerHTML = filtered.map(track => {
        const originalIndex = allTracks.findIndex(t => t.id === track.id);
        const isCurrent = originalIndex === currentTrackIndex;
        const isCurrentPlaying = isCurrent && isPlaying;

        return `
            <div class="music-card glass-panel ${isCurrentPlaying ? 'playing' : ''}" 
                 onclick="playTrackByIndex(${originalIndex})" 
                 data-track-idx="${originalIndex}">
                <div class="music-card-cover-wrap">
                    <img src="${track.cover}" alt="${track.title}" class="music-card-cover" loading="lazy">
                    <div class="music-card-play-btn">
                        <i class="fa-solid ${isCurrentPlaying ? 'fa-pause' : 'fa-play'}"></i>
                    </div>
                </div>
                <div class="music-card-info">
                    <h4 class="music-card-title">${track.title}</h4>
                    <div class="music-card-meta">
                        <span class="badge badge-dark" style="font-size: 0.7rem; padding: 0.15rem 0.5rem;">${track.genre}</span>
                        <span class="music-card-dur">${track.duration}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // Spotlight kartını güncelle
    updateMusicSpotlight(allTracks[currentTrackIndex] || allTracks[0]);

    // Filtre butonlarını güncelle
    document.querySelectorAll('#music-filter-pills .filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-genre') === genreFilter);
    });
}

function initMusicTabEvents() {
    // Filtre butonları dinleyicisi
    document.querySelectorAll('#music-filter-pills .filter-btn').forEach(btn => {
        btn.onclick = () => {
            const genre = btn.getAttribute('data-genre');
            renderMusicTab(genre);
        };
    });

    // Spotlight Oynat butonları
    const mainPlayBtn = document.getElementById('spotlight-main-play-btn');
    const playTrigger = document.getElementById('spotlight-play-trigger');

    const handleSpotlightPlay = () => {
        if (isPlaying) {
            togglePlayPause();
        } else {
            playTrackByIndex(currentTrackIndex);
        }
    };

    if (mainPlayBtn) mainPlayBtn.onclick = handleSpotlightPlay;
    if (playTrigger) playTrigger.onclick = handleSpotlightPlay;
}

function updateMusicSpotlight(track) {
    if (!track) return;
    const cover = document.getElementById('spotlight-cover');
    const title = document.getElementById('spotlight-title');
    const artist = document.getElementById('spotlight-artist');
    const desc = document.getElementById('spotlight-desc');
    const genre = document.getElementById('spotlight-genre-badge');
    const dur = document.getElementById('spotlight-duration-badge');
    const status = document.getElementById('spotlight-status-text');

    if (cover) cover.src = track.cover;
    if (title) title.textContent = track.title;
    if (artist) artist.textContent = `${track.artist} (reefbox Orijinal)`;
    if (desc) desc.textContent = track.description;
    if (genre) genre.textContent = track.genre;
    if (dur) dur.textContent = track.duration;
    if (status) status.textContent = isPlaying ? 'ŞU AN ÇALIYOR' : 'SEÇİLİ PARÇA';
}

// =========================================================
// 8. SABİT ALT BAR MÜZİK ÇALAR (YOUTUBE AUDIO ENGINE)
// =========================================================
// YouTube IFrame API hazır olduğunda tetiklenir
let pendingPlay = false;

window.onYouTubeIframeAPIReady = function() {
    const firstTrack = REEFBOX_DATA.musicTracks[0];
    ytAudioPlayer = new YT.Player('hidden-youtube-player', {
        height: '1',
        width: '1',
        videoId: firstTrack ? firstTrack.youtubeId : '',
        playerVars: {
            playsinline: 1,
            controls: 0,
            disablekb: 1,
            fs: 0,
            rel: 0,
            modestbranding: 1
        },
        events: {
            'onReady': onAudioPlayerReady,
            'onStateChange': onAudioPlayerStateChange,
            'onError': onAudioPlayerError
        }
    });
};

function onAudioPlayerReady(event) {
    isAudioPlayerReady = true;
    updatePlayerUI(currentTrackIndex);
    // Varsayılan ses seviyesi
    ytAudioPlayer.setVolume(80);

    if (pendingPlay) {
        pendingPlay = false;
        playTrackByIndex(currentTrackIndex);
    }
}

function onAudioPlayerError(event) {
    console.warn("YouTube Audio oynatılamadı (hata kodu: " + event.data + ")");
    // Sonsuz atlama döngüsüne girmemesi için otomatik geçişi tamamen durduruyoruz
    isPlaying = false;
    pendingPlay = false;
    setPlayingVisuals(false);
    stopProgressTimer();
}

function onAudioPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING) {
        isPlaying = true;
        setPlayingVisuals(true);
        startProgressTimer();
    } else if (event.data === YT.PlayerState.PAUSED) {
        isPlaying = false;
        setPlayingVisuals(false);
        stopProgressTimer();
    } else if (event.data === YT.PlayerState.ENDED) {
        // Sadece parça gerçekten çaldıysa (en az 5 sn) sonraki parçaya geç
        if (isPlaying && ytAudioPlayer && typeof ytAudioPlayer.getCurrentTime === 'function' && ytAudioPlayer.getCurrentTime() > 5) {
            playNextTrack();
        } else {
            isPlaying = false;
            setPlayingVisuals(false);
            stopProgressTimer();
        }
    }
}

function initMusicControls() {
    const btnPlayPause = document.getElementById('btn-play-pause');
    const btnNext = document.getElementById('btn-next');
    const btnPrev = document.getElementById('btn-prev');
    const progressContainer = document.getElementById('progress-container');
    const volumeSlider = document.getElementById('volume-slider');
    const btnMute = document.getElementById('btn-mute-toggle');
    const btnPlaylist = document.getElementById('btn-playlist-toggle');
    const btnClosePlaylist = document.getElementById('btn-close-playlist');
    const headerMusicBtn = document.getElementById('header-music-btn');

    if (btnPlayPause) btnPlayPause.onclick = togglePlayPause;
    if (btnNext) btnNext.onclick = playNextTrack;
    if (btnPrev) btnPrev.onclick = playPrevTrack;

    if (headerMusicBtn) {
        headerMusicBtn.onclick = () => {
            togglePlayPause();
        };
    }

    // İlerleme Çubuğuna Tıklayarak Sarma (Scrubbing)
    if (progressContainer) {
        progressContainer.addEventListener('click', (e) => {
            if (!ytAudioPlayer || !isAudioPlayerReady) return;
            const rect = progressContainer.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const width = rect.width;
            const percentage = Math.max(0, Math.min(1, clickX / width));
            const duration = ytAudioPlayer.getDuration();
            if (duration > 0) {
                const targetTime = duration * percentage;
                ytAudioPlayer.seekTo(targetTime, true);
                updateProgressUI(targetTime, duration);
            }
        });
    }

    // Ses Seviyesi Ayarı
    if (volumeSlider) {
        volumeSlider.addEventListener('input', (e) => {
            const vol = parseInt(e.target.value);
            if (ytAudioPlayer && isAudioPlayerReady) {
                ytAudioPlayer.setVolume(vol);
                if (vol === 0) ytAudioPlayer.mute();
                else ytAudioPlayer.unMute();
            }
            updateVolumeIcon(vol);
        });
    }

    // Ses Aç/Kapat (Mute)
    if (btnMute) {
        btnMute.onclick = () => {
            if (!ytAudioPlayer || !isAudioPlayerReady) return;
            if (ytAudioPlayer.isMuted()) {
                ytAudioPlayer.unMute();
                const savedVol = volumeSlider ? parseInt(volumeSlider.value) || 80 : 80;
                ytAudioPlayer.setVolume(savedVol);
                updateVolumeIcon(savedVol);
            } else {
                ytAudioPlayer.mute();
                updateVolumeIcon(0);
            }
        };
    }

    // Çalma Listesi Çekmecesi Aç/Kapat
    if (btnPlaylist) {
        btnPlaylist.onclick = (e) => {
            e.stopPropagation();
            document.getElementById('playlist-drawer').classList.toggle('active');
        };
    }

    if (btnClosePlaylist) {
        btnClosePlaylist.onclick = () => {
            document.getElementById('playlist-drawer').classList.remove('active');
        };
    }

    // Dışarı tıklandığında çekmeceyi kapat
    document.addEventListener('click', (e) => {
        const drawer = document.getElementById('playlist-drawer');
        if (drawer && !drawer.contains(e.target) && e.target !== btnPlaylist) {
            drawer.classList.remove('active');
        }
    });
}

function togglePlayPause() {
    if (!ytAudioPlayer || !isAudioPlayerReady) {
        pendingPlay = true;
        setPlayingVisuals(true);
        return;
    }

    if (isPlaying) {
        ytAudioPlayer.pauseVideo();
    } else {
        ytAudioPlayer.playVideo();
    }
}

function playTrackByIndex(index) {
    const tracks = REEFBOX_DATA.musicTracks;
    if (index < 0 || index >= tracks.length) return;

    currentTrackIndex = index;
    const track = tracks[index];

    updatePlayerUI(index);

    if (ytAudioPlayer && isAudioPlayerReady) {
        ytAudioPlayer.loadVideoById(track.youtubeId);
        ytAudioPlayer.playVideo();
    } else {
        pendingPlay = true;
        setPlayingVisuals(true);
    }
}

function playNextTrack() {
    const tracks = REEFBOX_DATA.musicTracks;
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    playTrackByIndex(currentTrackIndex);
}

function playPrevTrack() {
    const tracks = REEFBOX_DATA.musicTracks;
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    playTrackByIndex(currentTrackIndex);
}

function updatePlayerUI(index) {
    const track = REEFBOX_DATA.musicTracks[index];
    if (!track) return;

    const cover = document.getElementById('player-cover-img');
    const title = document.getElementById('player-title');
    const artist = document.getElementById('player-artist');
    const headerTitle = document.getElementById('header-music-title');

    if (cover) cover.src = track.cover;
    if (title) title.textContent = track.title;
    if (artist) artist.textContent = `${track.artist} • ${track.genre}`;
    if (headerTitle) headerTitle.textContent = track.title;

    // Çalma listesi çekmecesindeki aktif parçayı güncelle
    document.querySelectorAll('.playlist-item').forEach((el, i) => {
        el.classList.toggle('active', i === index);
    });

    // Müzik Sekmesi Spotlight kartını ve kartları güncelle
    updateMusicSpotlight(track);
    document.querySelectorAll('.music-card').forEach(card => {
        const cardIdx = parseInt(card.getAttribute('data-track-idx'));
        const isActive = cardIdx === index;
        card.classList.toggle('playing', isActive && isPlaying);
        const icon = card.querySelector('.music-card-play-btn i');
        if (icon) {
            icon.className = (isActive && isPlaying) ? 'fa-solid fa-pause' : 'fa-solid fa-play';
        }
    });
}

function setPlayingVisuals(playing) {
    const playIcon = document.getElementById('play-icon');
    const headerBadge = document.getElementById('header-music-btn');
    const spotlightPlayIcon = document.getElementById('spotlight-play-icon');
    const spotlightMainBtn = document.getElementById('spotlight-main-play-btn');
    const spotlightStatus = document.getElementById('spotlight-status-text');

    if (playIcon) {
        playIcon.className = playing ? 'fa-solid fa-pause' : 'fa-solid fa-play';
    }

    if (headerBadge) {
        headerBadge.classList.toggle('playing', playing);
    }

    if (spotlightPlayIcon) {
        spotlightPlayIcon.className = playing ? 'fa-solid fa-pause' : 'fa-solid fa-play';
    }

    if (spotlightMainBtn) {
        spotlightMainBtn.innerHTML = playing ? '<i class="fa-solid fa-pause"></i> Duraklat' : '<i class="fa-solid fa-play"></i> Hemen Dinle';
    }

    if (spotlightStatus) {
        spotlightStatus.textContent = playing ? 'ŞU AN ÇALIYOR' : 'SEÇİLİ PARÇA';
    }

    // Müzik kartlarındaki ikonları senkronize et
    document.querySelectorAll('.music-card').forEach(card => {
        const cardIdx = parseInt(card.getAttribute('data-track-idx'));
        const isCurrent = cardIdx === currentTrackIndex;
        card.classList.toggle('playing', isCurrent && playing);
        const icon = card.querySelector('.music-card-play-btn i');
        if (icon) {
            icon.className = (isCurrent && playing) ? 'fa-solid fa-pause' : 'fa-solid fa-play';
        }
    });
}

// İlerleme Takip Zamanlayıcısı
function startProgressTimer() {
    stopProgressTimer();
    progressUpdateTimer = setInterval(() => {
        if (!ytAudioPlayer || !isAudioPlayerReady || !isPlaying) return;
        const current = ytAudioPlayer.getCurrentTime() || 0;
        const total = ytAudioPlayer.getDuration() || 0;
        updateProgressUI(current, total);
    }, 500);
}

function stopProgressTimer() {
    if (progressUpdateTimer) {
        clearInterval(progressUpdateTimer);
        progressUpdateTimer = null;
    }
}

function updateProgressUI(current, total) {
    const curTimeEl = document.getElementById('current-time');
    const totTimeEl = document.getElementById('total-duration');
    const fillEl = document.getElementById('progress-fill');
    const thumbEl = document.getElementById('progress-thumb');

    if (curTimeEl) curTimeEl.textContent = formatTime(current);
    if (totTimeEl && total > 0) totTimeEl.textContent = formatTime(total);

    if (total > 0 && fillEl) {
        const pct = (current / total) * 100;
        fillEl.style.width = `${pct}%`;
        if (thumbEl) thumbEl.style.left = `${pct}%`;
    }
}

function updateVolumeIcon(vol) {
    const icon = document.getElementById('volume-icon');
    if (!icon) return;

    if (vol <= 0) {
        icon.className = 'fa-solid fa-volume-xmark';
    } else if (vol < 50) {
        icon.className = 'fa-solid fa-volume-low';
    } else {
        icon.className = 'fa-solid fa-volume-high';
    }
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Çalma Listesi Çekmecesini Doldur
function populatePlaylistDrawer() {
    const container = document.getElementById('playlist-items-container');
    if (!container) return;

    container.innerHTML = REEFBOX_DATA.musicTracks.map((t, idx) => `
        <div class="playlist-item ${idx === 0 ? 'active' : ''}" onclick="playTrackByIndex(${idx})">
            <img src="${t.cover}" alt="${t.title}" class="playlist-item-img">
            <div class="playlist-item-info">
                <div class="playlist-item-title">${t.title}</div>
                <div class="playlist-item-genre">${t.genre}</div>
            </div>
            <div class="playlist-item-dur">${t.duration}</div>
        </div>
    `).join('');
}
