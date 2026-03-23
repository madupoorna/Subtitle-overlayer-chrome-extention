const fields = ['posV', 'fontSize', 'delay', 'enabled'];

// Function to update labels
function updateLabel(id, value) {
    const label = document.getElementById(id + 'Val');
    if (label) {
        if (id === 'posV') label.innerText = value + '%';
        if (id === 'fontSize') label.innerText = value + 'px';
    }
}

// Main logic
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Fully Loaded");

    const fields = ['posV', 'fontSize', 'delay'];

    // Load saved data
    chrome.storage.local.get(['srtFileName', ...fields], (data) => {
        if (data.srtFileName) {
            document.getElementById('status').innerText = "Active: " + data.srtFileName;
        }

        fields.forEach(f => {
        const el = document.getElementById(f);
        if (el) {
            if (f === 'enabled') {
                el.checked = data[f] !== undefined ? data[f] : true; // Default to true
            } else if (data[f] !== undefined) {
                el.value = data[f];
                updateLabel(f, data[f]);
            }
        }
    });
    });

    // Handle Sliders
document.addEventListener('input', (e) => {
    if (fields.includes(e.target.id)) {
        const val = e.target.type === 'checkbox' ? e.target.checked : parseFloat(e.target.value);
        chrome.storage.local.set({ [e.target.id]: val });
        if (e.target.type !== 'checkbox') updateLabel(e.target.id, val);
    }
});

    // Handle File Upload
    document.getElementById('srtFile').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            chrome.storage.local.set({ 
                srtContent: event.target.result, 
                srtFileName: file.name 
            }, () => {
                document.getElementById('status').innerText = "Loaded: " + file.name;
            });
        };
        reader.readAsText(file);
    });
});