let subtitles = [];
let settings = { posV: 10, fontSize: 24, delay: 0, enabled: true };
const overlay = document.createElement('div');

// 1. Setup the Overlay UI
overlay.id = 'universal-sub-overlay';
overlay.style.cssText = `
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2147483647;
    background-color: rgba(0, 0, 0, 0.75);
    color: white;
    padding: 10px 20px;
    border-radius: 8px;
    text-align: center;
    font-family: Arial, sans-serif;
    pointer-events: none;
    display: none;
    line-height: 1.4;
    transition: bottom 0.2s, font-size 0.2s;
`;
document.body.appendChild(overlay);

// 2. Load settings and subtitles from storage
function loadSettings() {
    chrome.storage.local.get(['srtContent', 'posV', 'fontSize', 'delay', 'enabled'], (res) => {
        if (res.srtContent) subtitles = parseSRT(res.srtContent);
        settings.posV = res.posV ?? 10;
        settings.fontSize = res.fontSize ?? 24;
        settings.delay = parseFloat(res.delay) || 0;
        settings.enabled = res.enabled ?? true;
        applyVisuals();
    });
}

// 3. Apply CSS settings to the overlay
function applyVisuals() {
    overlay.style.bottom = `${settings.posV}%`;
    overlay.style.fontSize = `${settings.fontSize}px`;
    if (!settings.enabled) overlay.style.display = 'none';
}

// 4. Watch for setting changes in real-time
chrome.storage.onChanged.addListener((changes) => {
    if (changes.srtContent) subtitles = parseSRT(changes.srtContent.newValue);
    if (changes.posV) settings.posV = changes.posV.newValue;
    if (changes.fontSize) settings.fontSize = changes.fontSize.newValue;
    if (changes.delay) settings.delay = parseFloat(changes.delay.newValue);
    if (changes.enabled) settings.enabled = changes.enabled.newValue;
    applyVisuals();
});

// 5. The core synchronization engine
function startSync() {
    const video = document.querySelector('video');
    if (!video || !settings.enabled || subtitles.length === 0) {
        overlay.style.display = 'none';
        return;
    }

    video.ontimeupdate = () => {
        if (!settings.enabled) {
            overlay.style.display = 'none';
            return;
        }

        const adjustedTime = video.currentTime + settings.delay;
        const current = subtitles.find(s => adjustedTime >= s.start && adjustedTime <= s.end);

        if (current) {
            overlay.innerHTML = current.text;
            overlay.style.display = 'block';
        } else {
            overlay.style.display = 'none';
        }
    };
}

// 6. Robust SRT Parser
function parseSRT(data) {
    if (!data) return [];
    return data.split(/\r?\n\s*\r?\n/).map(block => {
        const lines = block.trim().split(/\r?\n/);
        if (lines.length < 3) return null;
        
        const timeMatch = lines[1].match(/(\d+:\d+:\d+,\d+) --> (\d+:\d+:\d+,\d+)/);
        if (!timeMatch) return null;

        return {
            start: timeToSeconds(timeMatch[1]),
            end: timeToSeconds(timeMatch[2]),
            text: lines.slice(2).join('<br>')
        };
    }).filter(Boolean);
}

function timeToSeconds(t) {
    const a = t.replace(',', '.').split(':');
    return (+a[0]) * 3600 + (+a[1]) * 60 + (+a[2]);
}

// 7. Auto-detect videos (even on single-page apps like YouTube)
const observer = new MutationObserver(() => {
    if (document.querySelector('video')) startSync();
});
observer.observe(document.body, { childList: true, subtree: true });

// Initial run
loadSettings();
startSync();