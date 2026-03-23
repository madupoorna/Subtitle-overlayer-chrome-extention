Universal Subtitle Overlayer

A lightweight, privacy-first Chrome Extension that injects a customizable subtitle overlay on top of any online video player. Perfect for platforms that lack native CC support or for users who prefer their own .srt files.

🚀 Features
Universal Compatibility: Works on YouTube, Vimeo, Netflix, and most web-based HTML5 video players.

Offline-First: Subtitles are processed locally in your browser. No data is sent to external servers.

Live Adjustments: Change font size, vertical position, and sync timing in real-time without refreshing the page.

Persistent Settings: Your subtitle file and preferences stay saved even after restarting the browser.

Clean UI: Subtitles only appear when a video is playing and the extension is enabled.

🛠️ Tech Stack
JavaScript (ES6+): Core logic and SRT parsing.

Chrome Extension API (Manifest V3): Using storage for persistence and content_scripts for video injection.

HTML5/CSS3: Modern, responsive settings page and high-z-index overlay.

📥 Installation (Manual Load)
Since this is currently a developer build, follow these steps to install:

Download/Clone this repository to your local machine.

Open Google Chrome and navigate to chrome://extensions/.

Enable Developer mode using the toggle in the top right corner.

Click the Load unpacked button.

Select the folder containing the extension files (manifest.json, content.js, etc.).

The extension icon should now appear in your toolbar!

📖 How to Use
Right-click the extension icon and select Options.

Upload your .srt file using the file picker.

Adjust the Vertical Position, Font Size, and Sync Delay as needed.

Ensure the Enable Subtitles toggle is switched ON.

Navigate to any video site and start playing a video. The subtitles will appear automatically!

📂 Project Structure
Plaintext
├── manifest.json    # Extension configuration & permissions
├── content.js       # The "brain" that syncs subs with the <video> tag
├── options.html     # The settings UI
├── options.js       # Logic to save/load settings to chrome.storage
└── style.css        # Visual styling for the subtitle overlay
🛠️ Development & Contributions
If you want to contribute:

Fork the Project.

Create your Feature Branch (git checkout -b feature/AmazingFeature).

Commit your Changes (git commit -m 'Add some AmazingFeature').

Push to the Branch (git push origin feature/AmazingFeature).

Open a Pull Request.

Note: This project is intended for educational and personal use.

📄 License
Distributed under the MIT License. See LICENSE for more information.
