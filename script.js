document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('file-upload');
    const submitBtn = document.getElementById('submit-btn');
    const resultsDiv = document.getElementById('results');
    const errorMessage = document.getElementById('error-message');
    const pollinatorName = document.getElementById('pollinator-name');
    const pollinatorCount = document.getElementById('pollinator-count');
    const pollinatorFrequency = document.getElementById('pollinator-frequency');
    const modelAccuracy = document.getElementById('model-accuracy');
    const uploadedImage = document.getElementById('uploaded-image');
    const uploadedVideo = document.getElementById('uploaded-video');

    // Enable/Disable the submit button based on file input
    fileInput.addEventListener('change', () => {
        submitBtn.disabled = !fileInput.files.length;
    });

    document.getElementById('upload-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const file = fileInput.files[0];

        if (!file) {
            errorMessage.textContent = "Please select a file.";
            errorMessage.classList.remove('hidden');
            return;
        }

        errorMessage.classList.add('hidden');
        resultsDiv.classList.add('hidden'); // Hide results initially
        uploadedImage.classList.add('hidden'); // Hide the image initially
        uploadedVideo.classList.add('hidden'); // Hide the video initially
        submitBtn.disabled = true; // Disable the submit button
        const loadingText = document.createElement('p');
        loadingText.textContent = 'Processing... Please wait.';
        document.body.appendChild(loadingText);

        const formData = new FormData();
        formData.append('file', file);

        // Display image or video based on file type
        const reader = new FileReader();
        reader.onload = function(e) {
            const fileType = file.type.split('/')[0]; // image or video
            if (fileType === 'video') {
                uploadedVideo.src = e.target.result;
                uploadedVideo.classList.remove('hidden');
                uploadedImage.classList.add('hidden');
            } else {
                uploadedImage.src = e.target.result;
                uploadedImage.classList.remove('hidden');
                uploadedVideo.classList.add('hidden');
            }
        };
        reader.readAsDataURL(file);

        fetch('http://127.0.0.1:5000/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Display results if data is returned
            pollinatorName.textContent = data.presence || 'N/A';
            pollinatorCount.textContent = data.count || 'N/A';
            pollinatorFrequency.textContent = data.frequency || 'N/A';
            modelAccuracy.textContent = data.accuracy ? `${(data.accuracy * 100).toFixed(2)}%` : 'N/A';

            resultsDiv.classList.remove('hidden'); // Show results div
        })
        .catch(error => {
            console.error('Error:', error);
            errorMessage.textContent = "Error processing file. Please try again.";
            errorMessage.classList.remove('hidden');
        })
        .finally(() => {
            loadingText.remove(); // Remove loading text
            submitBtn.disabled = false; // Enable submit button again
        });
    });
});

