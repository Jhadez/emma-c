
$(document).ready(function () {

    const myForm = document.getElementById("frm_upload");
    const fileSelected = document.getElementById("file_attached");

    myForm.addEventListener("submit", uploadData, false);

    fileSelected.addEventListener('change', handleFile, false);

    // Another alternative to make de request
    // $('form#frm_upload').submit(function(e)
    //   {
    //     // event.preventDefault();
    //     var formData = new FormData(myForm);
    //     alert(JSON.stringify(myForm));

    //     $.ajax({
    //         type: 'POST',
    //         url: '/upload',
    //         data: formData,
    //         processData: false,
    //         contentType: false,
    //         success: function(data){
    //             console.log(data);
    //         }
    //     });
    //     return false;

    // });

    function uploadData(e){
        e.preventDefault();
        const myFor = document.getElementById("frm_upload");
        const formData = new FormData(myFor);

        if (fileSelected.files.length == 0){
            swal("", "File not chosen, please select a file and click submit.", "warning");
            fileSelected.focus();
            return 0;

        }

        fetch('/upload', {
            method: 'POST',
            body: formData
            })
            .then(r => r.json())
            .then(data => {
                if(data.response){
                    swal("Great!", "The information has been submitted.", "success");
                    myFor.reset();
                }else{
                    swal("Error", "Something wrong happened. Please try it again! ", "warning");
                }
            })
            .catch(e => swal("Error", "Something wrong happened. Please try it again! " + e.toString(), "warning"));

        // $.ajax({
        //     type: 'POST',
        //     url: '/upload',
        //     data: formData,
        //     processData: false,
        //     contentType: false,
        //     success: function(data){
        //         console.log(data);
        //     }
        // });
        return false;
    }

    function handleFile(e){

        console.log(e.target.files[0]);
    
    }

}); 

function openNav() {
    document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}