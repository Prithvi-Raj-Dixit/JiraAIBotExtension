(async function() {
    try {
        let commentsPayload = "";

        // MULTI-ANGLE KEY RADAR: Finds Jira key anywhere on screen or in URL parameter matrices
        function findJiraKey() {
            let pathMatch = window.location.pathname.match(/browse\/([A-Z0-9\-]+)/i);
            if (pathMatch) return pathMatch[1];

            let urlParams = new URLSearchParams(window.location.search);
            let selectedIssue = urlParams.get('selectedIssue');
            if (selectedIssue) return selectedIssue;

            let elementWithKey = document.querySelector('[data-issue-key], [data-testid="issue.views.issue-base.foundation.breadcrumbs.current-issue.item"]');
            if (elementWithKey) {
                let key = elementWithKey.getAttribute('data-issue-key') || elementWithKey.innerText;
                if (key && key.includes('-')) return key.trim();
            }

            return null;
        }

        const issueKey = findJiraKey();

        // RECONNAISSANCE: Query internal REST API to pull unhidden discussion histories
        if (issueKey) {
            commentsPayload = `--- EXACT JIRA COMMENTS FOR TICKET ${issueKey} ---\n`;
            try {
                let response = await fetch(`/rest/api/3/issue/${issueKey}/comment`);
                if (!response.ok) response = await fetch(`/rest/api/2/issue/${issueKey}/comment`);
                
                if (response.status === 401 || response.status === 403) {
                    commentsPayload += `[SYSTEM ERROR]: Session expired. Reload Jira tab.\n\n`;
                } else if (response.ok) {
                    const data = await response.json();
                    if (data.comments && data.comments.length > 0) {
                        // Protect context windows by clipping payload to the latest 15 interactions
                        data.comments.slice(-15).forEach((comment, index) => {
                            const author = comment.author ? comment.author.displayName : "User Account";
                            const date = comment.created ? new Date(comment.created).toLocaleString() : "Unknown Date";
                            
                            let bodyText = "";
                            if (typeof comment.body === 'string') {
                                bodyText = comment.body;
                            } else if (comment.body && typeof comment.body === 'object') {
                                let segments = [];
                                const extract = (node) => {
                                    if (!node) return;
                                    if (node.type === 'text' && node.text) segments.push(node.text);
                                    if (node.content) node.content.forEach(extract);
                                };
                                extract(comment.body);
                                bodyText = segments.join(" ");
                            }
                            commentsPayload += `[Comment Box ${index + 1}]\nUser: ${author}\nTimestamp: ${date}\nTextBody: "${bodyText.trim()}"\n\n`;
                        });
                    } else {
                        commentsPayload += "No comments present on database log profiles.\n";
                    }
                }
            } catch (netErr) {
                commentsPayload += `[NETWORK FAILURE]: Unable to reach database endpoint.\n\n`;
            }
        }

        let rawPageText = document.body.innerText || "";
        const finalPayload = `${commentsPayload}\n\n--- COMPLEMENTARY METADATA ---\n${rawPageText.substring(0, 5000)}`;

        // Stream data packet back to the interface layer
        chrome.runtime.sendMessage({ action: "pageContextGrabbed", text: finalPayload });

    } catch (error) {
        chrome.runtime.sendMessage({ action: "pageContextGrabbed", text: "Exception: " + error.message });
    }
})();