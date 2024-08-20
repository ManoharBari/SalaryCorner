try {
    // employee form
    // Get the modal
    let modal = document.getElementById("add-employee-modal");
  
    // Get the button that opens the modal
    let btn = document.getElementById("add-employee-btn");
  
    // Get the <span> element that closes the modal
    let span = document.getElementsByClassName("close")[0];
  
    // When the user clicks the button, open the modal
    btn.onclick = function () {
      modal.style.display = "block";
    };
  
    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
      modal.style.display = "none";
    };
  
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  
    // Handle photo upload and preview
    let profilePic = document.querySelector("#profile-pic");
    let photo = document.querySelector("#photo");
  
    photo.onchange = function () {
      profilePic.src = URL.createObjectURL(photo.files[0]);
    };
  
    // Handle form submission
    const form = document.getElementById("mark-attendance-form");
    form.addEventListener("submit", function (event) {
      event.preventDefault();
  
      // Here you would typically send the form data to a server
      // For this example, we'll just log the data to the console
      const formData = new FormjobmodalData(form);
      console.log("New employee data:");
      for (let [key, value] of formData.entries()) {
        console.log(key + ": " + value);
      }
  
      // Close the modal and reset the form
      modal.style.display = "none";
      form.reset();
      photoPreview.style.display = "none";
  
      // Show a success message (in a real application, you'd want to handle errors as well)
      alert("Employee added successfully!");
    });
  } catch (e) {
    console.log(e);
  }
  