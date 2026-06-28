// ===============================
// Developer Toolbox - Script
// ===============================

const input = document.getElementById("input");
const output = document.getElementById("output");

const encodeBtn = document.getElementById("encodeBtn");
const decodeBtn = document.getElementById("decodeBtn");
const copyBtn = document.getElementById("copyBtn");
const clearBtn = document.getElementById("clearBtn");

const characters = document.getElementById("characters");
const words = document.getElementById("words");
const lines = document.getElementById("lines");

const toolButtons = document.querySelectorAll(".tool");

let currentTool = "json";

// ===============================
// Tool Selection
// ===============================

toolButtons.forEach(button => {

    button.addEventListener("click", () => {

        toolButtons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        currentTool = button.dataset.tool;

        output.value = "";

    });

});

// ===============================
// Encode
// ===============================

encodeBtn.addEventListener("click", () => {

    const text = input.value;

    if (!text.trim()) {
        alert("Please enter some text.");
        return;
    }

    try {

        switch (currentTool) {

            case "json":
                output.value = JSON.stringify(
                    JSON.parse(text),
                    null,
                    4
                );
                break;

            case "base64":
                output.value = btoa(text);
                break;

            case "url":
                output.value = encodeURIComponent(text);
                break;

            case "text":
                output.value = text.toUpperCase();
                break;

        }

    } catch (error) {

        output.value = "Error : " + error.message;

    }

});

// ===============================
// Decode
// ===============================

decodeBtn.addEventListener("click", () => {

    const text = input.value;

    if (!text.trim()) {
        alert("Please enter some text.");
        return;
    }

    try {

        switch (currentTool) {

            case "json":

                output.value = JSON.stringify(
                    JSON.parse(text)
                );

                break;

            case "base64":

                output.value = atob(text);

                break;

            case "url":

                output.value = decodeURIComponent(text);

                break;

            case "text":

                output.value = text.toLowerCase();

                break;

        }

    } catch (error) {

        output.value = "Error : " + error.message;

    }

});

// ===============================
// Copy
// ===============================

copyBtn.addEventListener("click", async () => {

    if (!output.value) return;

    try {

        await navigator.clipboard.writeText(output.value);

        copyBtn.innerHTML =
            '<i class="fa-solid fa-check"></i> Copied';

        setTimeout(() => {

            copyBtn.innerHTML =
                '<i class="fa-solid fa-copy"></i> Copy';

        }, 1500);

    } catch {

        alert("Unable to copy.");

    }

});

// ===============================
// Clear
// ===============================

clearBtn.addEventListener("click", () => {

    input.value = "";
    output.value = "";

    updateStats();

});

// ===============================
// Statistics
// ===============================

function updateStats() {

    const text = input.value;

    characters.textContent = text.length;

    const wordCount = text.trim()
        ? text.trim().split(/\s+/).length
        : 0;

    words.textContent = wordCount;

    const lineCount = text
        ? text.split("\n").length
        : 0;

    lines.textContent = lineCount;

}

input.addEventListener("input", updateStats);

updateStats();