document.addEventListener('DOMContentLoaded', function () {
    const fileInput = document.getElementById('file_input');
    const selectedFilesContainer = document.getElementById('selectedFiles');
    let selectedFiles = [];
  
    fileInput.addEventListener('change', handleFileSelect);
  
    function handleFileSelect() {
      const files = fileInput.files;
      selectedFiles.push(...files); // Add new files to the array
      selectedFilesContainer.innerHTML = ''; // Clear existing file displays
  
      selectedFiles.forEach(file => {
        const fileDiv = createFileDisplay(file);
        selectedFilesContainer.appendChild(fileDiv);
      });
    }
  
    function createFileDisplay(file) {
      const fileDiv = document.createElement('div');
      fileDiv.classList.add('selected_file');
  
      const fileName = document.createElement('span');
      fileName.classList.add('file_name');
      fileName.textContent = file.name;
      fileName.ariaLabel = 'Selected file: ' + file.name; // Accessibility
  
      const removeButton = document.createElement('button'); // Use a button for accessibility
      removeButton.classList.add('remove_file');
      removeButton.textContent = 'Remove';
  
      removeButton.addEventListener('click', () => {
        removeFile(file);
      });
  
      fileDiv.appendChild(fileName);
      fileDiv.appendChild(removeButton);
      return fileDiv;
    }
  
    function removeFile(file) {
        selectedFiles = selectedFiles.filter(f => f !== file);
      updateFileDisplay();
    }
  
    function updateFileDisplay() {
      selectedFilesContainer.innerHTML = '';
      selectedFiles.forEach(file => {
        selectedFilesContainer.appendChild(createFileDisplay(file));
      });
    }
  
    selectedFilesContainer.addEventListener('click', (event) => {
      const target = event.target;
      if (target.classList.contains('remove_file')) {
        const fileDiv = target.closest('.selected_file');
        const file = selectedFiles.find(f => createFileDisplay(f) === fileDiv);
        if (file) {
          removeFile(file);
        }
      }
    });
  });
  
  function goBack() {
    window.history.back();
}