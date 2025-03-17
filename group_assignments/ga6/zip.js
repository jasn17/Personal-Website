document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('zipForm').addEventListener('submit', function (e) {
      e.preventDefault();
  
      const zip1 = document.getElementById('zip1').value.trim();
      const zip2 = document.getElementById('zip2').value.trim();
      const debug = document.getElementById('debug').checked ? 1 : 0;
  
      // Prepare form data to send to PHP
      const formData = new FormData();
      formData.append('zip1', zip1);
      formData.append('zip2', zip2);
      formData.append('debug', debug);
  
      fetch('../../api/zip/zip.php', {
        method: 'POST',
        body: formData
      })
        .then(response => response.text())
        .then(data => {
          document.getElementById('result').innerHTML = data;
        })
        .catch(error => {
          document.getElementById('result').innerHTML = 'Error: ' + error;
        });
    });
});  