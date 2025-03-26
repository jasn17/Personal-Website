// Function to fetch data from get_data.php and populate the form fields.
function getData() {
    $.ajax({
        url: 'get_data.php',
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            $('#full_name').val(response.full_name);
            $('#age').val(response.age);
            $('#gender').val(response.gender);
            $('#email').val(response.email);
            $('#phone').val(response.phone);
            $('#address').val(response.address);
            $('#hobby').val(response.hobby);
            $('#food').val(response.food);
            $('#dream_job').val(response.dream_job);
            $('#fun_fact').val(response.fun_fact);
        },
        error: function(xhr, status, error) {
            console.error("Error fetching data: " + error);
        }
    });
}
  
// Function to clear the form fields.
function clearForm() {
    $('#dataForm')[0].reset();
}
