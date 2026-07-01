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
2. Search for **"Prompt API for Gemini Nano"** and switch the setting to **Enabled**.
3. Search for **"Optimization Guide On Device Model"** and change its dropdown to **Enabled BypassPerfRequirement** *(This forces Chrome to run the model even if your machine hits temporary performance fluctuations)*.
4. Click the blue **Relaunch** button at the bottom right to restart Chrome completely.

### Step 2: Trigger the Gemini Nano Download
1. After the restart, open a new tab and navigate to: `chrome://components`
2. Scroll down until you find the item labeled: **Optimization Guide On Device Model**.
3. Click the **Check for update** button. 
4. Chrome will begin downloading the model weights. The status will transition to *Downloading*. 

> ⚠️ **Important Note:** The Gemini Nano model is roughly **4 GB**. Ensure you remain connected to a stable network until the component status changes cleanly to **Up-to-date**.

### Step 3: Hard-Drive Verification (Optional)
If your browser tools indicate an error state, you can physically verify the download progress on your local storage array. Press `Win + R`, paste the path structure below, and press Enter:
```text
%LOCALAPPDATA%\Google\Chrome\User Data\OptGuideOnDeviceModel
