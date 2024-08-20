try {
  // Access the camera
  async function initCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const videoElement = document.getElementById("camera-feed");
      videoElement.srcObject = stream;
    } catch (error) {
      console.error("Error accessing camera:", error);
      document.getElementById("attendance-status").textContent =
        "Error: Unable to access camera";
      document
        .getElementById("attendance-status")
        .classList.add("status-error");
    }
  }

  // Capture attendance
  function captureAttendance() {
    const canvas = document.createElement("canvas");
    const video = document.getElementById("camera-feed");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);

    // Here you would typically send the image data to a server for processing
    // For this example, we'll simulate a successful attendance marking
    const success = Math.random() > 0.2; // 80% success rate

    const statusElement = document.getElementById("attendance-status");
    const timeElement = document.getElementById("attendance-time");

    if (success) {
      statusElement.textContent = "Attendance Marked Successfully!";
      statusElement.classList.add("status-success");
      statusElement.classList.remove("status-error");
      const now = new Date();
      timeElement.textContent = `Attendance Time: ${now.toLocaleTimeString()}`;
    } else {
      statusElement.textContent =
        "Error: Unable to mark attendance. Please try again.";
      statusElement.classList.add("status-error");
      statusElement.classList.remove("status-success");
      timeElement.textContent = "";
    }
  }

  // Initialize camera when page loads
  window.addEventListener("load", initCamera);

  // Add event listener to capture button
  document.getElementById("capture-btn");
  document.addEventListener("click", captureAttendance);
} catch (err) {
  console.log(err);
}
