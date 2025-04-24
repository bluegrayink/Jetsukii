// UID map
const validUIDs = ["44E1FE92","74A80793","JET00ACC"];

// Elements
const androidButton = document.getElementById("androidButton");
const iosButton = document.getElementById("iosButton");
const uidInputContainer = document.getElementById("uidInputContainer");
const uidInput = document.getElementById("uidInput");
const submitUID = document.getElementById("submitUID");
const buttonContainer = document.getElementById("buttonContainer");
const kleeButton = document.getElementById("kleeButton");
const zetaButton = document.getElementById("zetaButton");
const calendarButton = document.getElementById("calendarButton");
const statusDiv = document.getElementById("status");

// Helper function to set status
const setStatus = (status) => {
    statusDiv.textContent = status;
};

// Function to sanitize UID
const sanitizeUID = (uid) => {
    return uid.replace(/:/g, "").toUpperCase();
};

// Function to validate UID
const validateUID = (rawUid) => {
    const uid = sanitizeUID(rawUid);
    if (validUIDs.includes(uid)) {
        setStatus("Access granted. You can now navigate.");
        buttonContainer.style.display = "block";
        uidInputContainer.style.display = "none";
    } else {
        setStatus("Access denied: Invalid UID.");
    }
};

// Function to start NFC scan for Android
const startNFCScan = async () => {
    if (!("NDEFReader" in window)) {
        setStatus("Your device or browser does not support NFC scanning.");
        return;
    }

    setStatus("Please scan your NFC card...");

    try {
        const ndef = new NDEFReader();
        await ndef.scan();

        ndef.addEventListener("readingerror", () => {
            setStatus("Cannot read data from the NFC tag. Try holding your card closer.");
        });

        ndef.addEventListener("reading", ({ serialNumber }) => {
            validateUID(serialNumber);
        });
    } catch (error) {
        setStatus("Error: " + error.message);
    }
};

// Event listeners
androidButton.addEventListener("click", startNFCScan);
iosButton.addEventListener("click", () => {
    uidInputContainer.style.display = "block";
    setStatus("Please enter your UID");
});
submitUID.addEventListener("click", () => validateUID(uidInput.value));

// Event listeners for direct page navigation
kleeButton.addEventListener("click", () => window.location.href = "klee.html");
zetaButton.addEventListener("click", () => window.location.href = "zeta.html");
calendarButton.addEventListener("click", () => window.location.href = "calendarevent.html");
