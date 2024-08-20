try {
  // selfi model
  // Get the modal
  let modal = document.getElementById("attendance-box");

  // Get the button that opens the modal
  let btn = document.getElementById("check-in-btn");

  let selfi = document.querySelector("#in-selfi");

  // Get the <span> element that closes the modal
  let span = document.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  };

  // When the user clicks the button, open the modal
  btn.onclick = function () {
    modal.style.display = "block";
    // camera model
    const cameraFeed = document.getElementById("camera-feed");
    const canvas = document.getElementById("canvas");
    const captureBtn = document.getElementById("capture-btn");
    const statusMessage = document.getElementById("status-message");
    const attendanceLog = document.getElementById("attendance-log");

    let stream;
    let lastPunchType = "out"; // Start with 'out' so first punch is 'in'

    async function setupCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        cameraFeed.srcObject = stream;
      } catch (err) {
        console.error("Error accessing camera:", err);
        statusMessage.textContent =
          "Error accessing camera. Please check permissions.";
        statusMessage.className = "error";
      }
    }

    function captureImage() {
      canvas.width = cameraFeed.videoWidth;
      canvas.height = cameraFeed.videoHeight;
      canvas.getContext("2d").drawImage(cameraFeed, 0, 0);
      return canvas.toDataURL("image/jpeg");
    }

    function addAttendanceEntry(imageData, time, type) {
      const entry = document.createElement("div");
      entry.className = "log-entry";
      entry.innerHTML = `
        <img src="${imageData}" alt="Attendance Selfie" class="log-selfie">
        <div class="log-details">
          <div class="log-time">${time}</div>
          <div class="log-type">Punch ${type}</div>
        </div>`;
      attendanceLog.insertBefore(entry, attendanceLog.firstChild);
    }

    captureBtn.addEventListener("click", () => {
      const imageData = captureImage();
      btn.style.display = "none";
      selfi.style.display = "block";
      const now = new Date();
      const time = now.toLocaleTimeString();
      lastPunchType = lastPunchType === "in" ? "out" : "in";
      addAttendanceEntry(imageData, time, lastPunchType);

      statusMessage.textContent = `Successfully punched ${lastPunchType} at ${time}`;
      statusMessage.className = "success";

      // Here you would typically send this data to a server
      console.log(`Punch ${lastPunchType} at ${time}`);
    });

    setupCamera();
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  // Handle form submission
  const form = document.getElementById("attendance-box");
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Close the modal and reset the form
    modal.style.display = "none";
  });
} catch (e) {
  console.log(e);
}

// attendance model
// try {
//   const itemsPerPage = 10;
//   let currentPage = 1;
//   let filteredData = [...attendanceData];

//   function renderAttendanceData(page) {
//     const startIndex = (page - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     const tableBody = document.getElementById("attendance-data");
//     tableBody.innerHTML = "";
//     updatePaginationButtons();
//   }

//   function updatePaginationButtons() {
//     const prevButton = document.getElementById("prev-page");
//     const nextButton = document.getElementById("next-page");
//     prevButton.disabled = currentPage === 1;
//     nextButton.disabled =
//       currentPage === Math.ceil(filteredData.length / itemsPerPage);
//   }

//   function filterAttendanceData() {
//     const departmentFilter = document
//       .getElementById("department")
//       .value.toLowerCase();
//     const statusFilter = document
//       .getElementById("status")
//       .value.toLowerCase();
//     const startDateFilter = document.getElementById("start-date").value;
//     const endDateFilter = document.getElementById("end-date").value;
//     const searchFilter = document
//       .getElementById("search")
//       .value.toLowerCase();

//     filteredData = attendanceData.filter((entry) => {
//       const matchesDepartment =
//         departmentFilter === "" ||
//         entry.department.toLowerCase() === departmentFilter;
//       const matchesStatus =
//         statusFilter === "" ||
//         entry.status.toLowerCase() === statusFilter;
//       const matchesDateRange =
//         (!startDateFilter ||
//           new Date(entry.date) >= new Date(startDateFilter)) &&
//         (!endDateFilter ||
//           new Date(entry.date) <= new Date(endDateFilter));
//       const matchesSearch = entry.name
//         .toLowerCase()
//         .includes(searchFilter);
//       return (
//         matchesDepartment &&
//         matchesStatus &&
//         matchesDateRange &&
//         matchesSearch
//       );
//     });

//     currentPage = 1;
//     renderAttendanceData(currentPage);
//   }

//   document
//     .getElementById("department")
//     .addEventListener("change", filterAttendanceData);
//   document
//     .getElementById("status")
//     .addEventListener("change", filterAttendanceData);
//   document
//     .getElementById("start-date")
//     .addEventListener("change", filterAttendanceData);
//   document
//     .getElementById("end-date")
//     .addEventListener("change", filterAttendanceData);
//   document
//     .getElementById("search")
//     .addEventListener("input", filterAttendanceData);

//   document.getElementById("prev-page").addEventListener("click", () => {
//     if (currentPage > 1) {
//       currentPage--;
//       renderAttendanceData(currentPage);
//     }
//   });

//   document.getElementById("next-page").addEventListener("click", () => {
//     if (currentPage < Math.ceil(filteredData.length / itemsPerPage)) {
//       currentPage++;
//       renderAttendanceData(currentPage);
//     }
//   });

//   // Initial render
//   renderAttendanceData(currentPage);
// } catch (e) {
//   console.log(e);
// }
