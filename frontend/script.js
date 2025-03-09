document.addEventListener('DOMContentLoaded', function () {
    const fileInput = document.getElementById('file-upload');
    const submitBtn = document.getElementById('submit-btn');
    const uploadedImage = document.getElementById('uploaded-image');
    const uploadedVideo = document.getElementById('uploaded-video');
    const errorMessage = document.getElementById('error-message');
    const resultsDiv = document.getElementById('results');

    // 🚨 FORCE STOP PAGE REFRESHES CAUSED BY ANY SOURCE
    window.onbeforeunload = function () {
        return "Are you sure you want to leave?";  // Blocks automatic reloads
    };

    // 🚨 BLOCK FORM SUBMISSIONS
    document.addEventListener("submit", function(event) {
        event.preventDefault();
        console.log("🚨 Form submission blocked!");
    });

    // Enable button when file is selected
    fileInput.addEventListener('change', function () {
        if (this.files.length > 0) {
            submitBtn.disabled = false;
            const file = this.files[0];
            const fileURL = URL.createObjectURL(file);

            if (file.type.startsWith('image/')) {
                uploadedImage.src = fileURL;
                uploadedImage.classList.remove('hidden');
                uploadedVideo.classList.add('hidden');
            } else if (file.type.startsWith('video/')) {
                uploadedVideo.src = fileURL;
                uploadedVideo.classList.remove('hidden');
                uploadedImage.classList.add('hidden');
            }
        } else {
            submitBtn.disabled = true;
        }
    });

    // 🚨 ENSURE "IDENTIFY" BUTTON NEVER REFRESHES THE PAGE
    window.processImage = function (event) {
        if (event) event.preventDefault(); // Prevent default action
        console.log("✅ Identify button clicked! Page should NOT refresh.");

        errorMessage.classList.add('hidden');
        const file = fileInput.files[0];

        if (!file) {
            showError('Please select a file to upload.');
            return;
        }

        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitBtn.disabled = true;

        const formData = new FormData();
        formData.append('file', file);

        fetch('http://localhost:5000/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Server responded with an error: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log("✅ Response received:", data);
            displayResults({
                name: data.presence || 'Unknown',
                count: data.count || '0',
                frequency: data.frequency || 'N/A',
                accuracy: data.accuracy ? (data.accuracy * 100).toFixed(2) + '%' : 'N/A'
            });

            // 🚨 Prevent new image from triggering a refresh
            if (uploadedImage.src !== data.annotated_image) {
                uploadedImage.src = data.annotated_image;
                uploadedImage.classList.remove('hidden');
            }
        })
        .catch(error => {
            showError('Error: ' + error.message);
        })
        .finally(() => {
            submitBtn.innerHTML = 'Identify';
            submitBtn.disabled = false;
        });

        return false; // 🚨 FINAL CONFIRMATION TO PREVENT REFRESH
    };

    function displayResults(data) {
        document.getElementById('pollinator-name').textContent = data.name;
        document.getElementById('pollinator-count').textContent = data.count;
        document.getElementById('pollinator-frequency').textContent = data.frequency;
        document.getElementById('model-accuracy').textContent = data.accuracy;
        resultsDiv.classList.remove('hidden');
    }

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.remove('hidden');
    }
});
