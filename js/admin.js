window.addEventListener("DOMContentLoaded", () => {
    // UID map
    const validUIDs = ["F693361A", "761A371A"];

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
        if (statusDiv) {
            statusDiv.textContent = status;
        }
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
            if (buttonContainer) buttonContainer.style.display = "block";
            if (uidInputContainer) uidInputContainer.style.display = "none";
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

    // Event listeners (with null checks)
    if (androidButton) androidButton.addEventListener("click", startNFCScan);

    if (iosButton) iosButton.addEventListener("click", () => {
        if (uidInputContainer) uidInputContainer.style.display = "block";
        setStatus("Please enter your UID");
    });

    if (submitUID) submitUID.addEventListener("click", () => {
        if (uidInput) validateUID(uidInput.value);
    });

    if (kleeButton) kleeButton.addEventListener("click", () => window.location.href = "klee.html");
    if (zetaButton) zetaButton.addEventListener("click", () => window.location.href = "zeta.html");
    if (calendarButton) calendarButton.addEventListener("click", () => window.location.href = "calendar.html");
});
