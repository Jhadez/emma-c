
$(document).ready(function () {

    // $('.validate-form').on('submit',function(){
    //     console.log("great");
    //     var check = true;
    //     var today = new Date();
    //     var dd = today.getDate();
    //     var mm = today.getMonth()+1; 
    //     var yyyy = today.getFullYear();
    //     today = mm+'/'+dd+'/'+yyyy;

    //     fetch('/emma', {
    //         method: 'POST',
    //         headers: {'Content-Type':'application/json'},
    //         body: JSON.stringify({
    //             Name:""+$("#inputName").val(),
    //             Email:""+$("#inputEmail").val(),
    //             Account_Name:""+$("#acctName").val(),
    //             Account_ID:""+$("#acctID").val(),
    //             comment: $('#Comment').val(),
    //             Attachment: $('#attachment').val(),
    //             timestamp: today
    //         })
    //        })
    //        .then(r => r.json())
    //        .then(data => {
    //             if(data.message){
    //                 swal("The information has been submitted", "", "success");
    //                 document.getElementById('frm_Emma').reset();
    //             }else{
    //                 swal("Something wrong happened. Try it again! ", "", "warning");
    //             }
    //        })
    //        .catch(e => swal("Something wrong happened. Try it again" + e.toString(), "", "warning"));
            
    //     return false;
    // }); 


    const myForm = document.getElementById("frm_upload");
    const fileSelected = document.getElementById("file_attached");

    myForm.addEventListener("submit", uploadData);

    fileSelected.addEventListener('change', handleFile, false);


    function uploadData(e){
        e.preventDefault();
        const file_attached = document.getElementById("file_attached");
        const formData = new FormData(e.target);
        // formData.append("file_attached", file_attached.files[0]);
        console.log(formData);

        fetch('/upload', {
            method: 'POST',
            // headers: {'Content-Type':'application/json'},
            body: formData
           })
           .then(r => r.json())
           .then(data => {
                if(data.response){
                    swal("The information has been submitted", "", "success");
                }else{
                    swal("Something wrong happened. Try it again! ", "", "warning");
                }
           })
           .catch(e => swal("Something wrong happened. Try it again" + e.toString(), "", "warning"));

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