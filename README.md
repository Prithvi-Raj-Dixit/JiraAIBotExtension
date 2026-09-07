# Jira Bug Analyzer 🤖

An enterprise-grade, privacy-first Google Chrome Extension designed for QA and Firmware Engineers. This tool leverages **Gemini Nano**—Google’s built-in, local Large Language Model—to analyze complex hardware/software Jira tickets directly inside your browser. 

Instead of copy-pasting sensitive internal bugs into cloud-based public AI tools, this extension fetches raw ticket data from the background Jira REST API and calculates a tactical, forward-looking QA testing roadmap entirely on your physical machine.

---

## 🚀 Key Features

* **Direct Database Fetch:** Bypasses Jira's lazy-loading UI to scrape 100% of the raw, unedited comment history.
* **Token Window Defense:** Automatically clips data streams to the latest 15 interactions, preventing local context memory overruns.
* **Tactical Roadmap Generator:** Acts as a virtual QA Director, mapping out step-by-step physical bench testing, firmware verification parameters, and replication strategies.
* **100% Local & Secure:** Data never leaves your machine. Perfect for proprietary source code, firmware version numbers, and restricted hardware shelf logs.

---

## 🛠️ Machine & Browser Configuration Guide

Because this extension hooks into Chrome's experimental native on-device AI system, every user must configure their local environment and download the language model weights before launching the extension.

### Step 1: Enable Experimental Browser Flags
1. Open a new tab in Google Chrome and navigate to: `chrome://flags`
<img width="1910" height="1072" alt="image" src="https://github.com/user-attachments/assets/eaac429e-3d19-4ee2-90c3-9fe8dedf0b0a" />

2. Search for **"Prompt API for Gemini Nano"** and switch the setting to **Enabled**.
<img width="1899" height="802" alt="image" src="https://github.com/user-attachments/assets/68d86d2a-cdf0-4375-990a-881cfd9f68d8" />

3. Switch the **On-device AI** toggle to **ON**.
<img width="3771" height="1487" alt="image" src="https://github.com/user-attachments/assets/ca9adef0-6343-4738-a775-391a3a24460f" />

4. Restart Google Chrome.

### Step 2: Trigger the Gemini Nano Download
1. After the restart, open a new tab and navigate to: `chrome://components`
<img width="1913" height="1070" alt="image" src="https://github.com/user-attachments/assets/b60e9ead-e25f-4fc0-a735-6cad5a1c6e11" />

2. Scroll down until you find the item labeled: **Optimization Guide On Device Model**.
<img width="1188" height="578" alt="image" src="https://github.com/user-attachments/assets/b60d7798-7c13-4aa4-9c3d-0008aa0bce4b" />

3. Click the **Check for update** button. 

4. Chrome will begin downloading the model weights. The status will transition to *Downloading*. 

> ⚠️ **Important Note:** The Gemini Nano model is roughly **4 GB**. Ensure you remain connected to a stable network until the component status changes cleanly to **Up-to-date**.

### Step 3: Hard-Drive Verification (Optional)
If your browser tools indicate an error state, you can physically verify the download progress on your local storage array. Press `Win + R`, paste the path structure below, and press Enter, check weights.bin size should be ~4GB 
```text
%LOCALAPPDATA%\Google\Chrome\User Data\OptGuideOnDeviceModel
