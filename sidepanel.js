document.addEventListener('DOMContentLoaded', () => {
    let currentPageText = "";
    
    // UI Elements
    const chatBox = document.getElementById('chat-box');
    const syncBtn = document.getElementById('sync-btn');
    const sendBtn = document.getElementById('send-btn');
    const userInput = document.getElementById('user-input');
    const nextStepBtn = document.getElementById('next-step-btn');

    // Content Script Core Injector
    async function executeContextAcquisition() {
        try {
            chatBox.innerHTML = "<em>Analyzing Jira database records... Please hold...</em>";
            const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
            if (activeTab) {
                if (activeTab.url.startsWith("chrome://") || activeTab.url.startsWith("edge://")) {
                    chatBox.innerHTML = "<strong style='color:red;'>System Block: Navigate to a valid Jira tab first!</strong>";
                    return;
                }
                await chrome.scripting.executeScript({ target: { tabId: activeTab.id }, files: ['content.js'] });
            }
        } catch (err) {
            chatBox.innerHTML = `<strong style="color:red;">Scraper Error:</strong> ${err.message}`;
        }
    }

    // Initialize scraper on boot and tie to manual sync button
    executeContextAcquisition();
    syncBtn.addEventListener('click', executeContextAcquisition);

    // Accept pure JSON data payloads back from content.js
    chrome.runtime.onMessage.addListener((message) => {
        if (message.action === "pageContextGrabbed") {
            currentPageText = message.text || "";
            chatBox.innerHTML = "<em>Connected to Jira API! Strategy engine ready.</em>";
        }
    });

    // Handle normal chat queries
    sendBtn.addEventListener('click', () => {
        const query = userInput.value;
        if (!query.trim()) return;
        executeInference(query, "Processing query...");
    });

    // ========================================================
    // STRATEGIC ADVISORY COGNITION CALL
    // ========================================================
    nextStepBtn.addEventListener('click', () => {
        const strategyPrompt = `Analyze the entire Jira ticket status, metadata, and comments history. 
        Act as an expert Senior QA Director. Determine the absolute next logical action item for the QA engineer right now. 
        Provide a highly professional analysis containing:
        1. A brief strategic overview of where the bottleneck currently sits.
        2. A clear, bulleted checklist of what the QA engineer should physically verify next on the hardware or firmware setup.
        Be highly technical and forward-looking. Do not draft a comment template; instead, provide direct operational guidance for the engineer.`;
        
        executeInference(strategyPrompt, "Calculating immediate next step roadmap...");
    });

    // MASTER ENGINE RUNNER (LOCAL NANO INTERFACE)
    async function executeInference(promptInput, visualStatusText) {
        userInput.value = "";
        const msgId = "ai-" + Date.now();
        chatBox.innerHTML += `<br><br><strong>Action:</strong> ${visualStatusText}`;
        chatBox.innerHTML += `<br><strong>AI Guidance:</strong> <span id="${msgId}"><em>Computing local models...</em></span>`;
        const displaySpan = document.getElementById(msgId);
        chatBox.scrollTop = chatBox.scrollHeight;

        try {
            if (!window.LanguageModel) throw new Error("Chrome AI interface architecture disabled.");

            const session = await LanguageModel.create({ expectedOutputs: [{ type: "text", languages: ["en"] }] });
            const truncatedChunk = currentPageText.substring(0, 18000);

            const instructionPrompt = `You are a strict QA automation director analyzing this dataset:
            --- DATA ---
            ${truncatedChunk}
            --- END ---
            Task: ${promptInput}
            Answer:`;

            const result = await session.prompt(instructionPrompt);
            displaySpan.innerHTML = result ? result.trim().replace(/\n/g, "<br>") : "Blank return matrix.";
            session.destroy();

        } catch (err) {
            displaySpan.innerHTML = `<span style="color:red;">Error: ${err.message}</span>`;
        }
        chatBox.scrollTop = chatBox.scrollHeight;
    }
});