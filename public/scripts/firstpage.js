// hideOrShow = () =>{
//     var formSelect = document.getElementById("instSelect");
//     var hiddenForm = document.getElementById("hiddenForm");
//     var formItems = document.getElementById("hidElement");
//     if(formSelect.value=="Guest")
//     {   
//         console.log("it is actually working");
//         hiddenForm.style.display="block";
//         formItems.style.display="none";
//     }
//     else
//     {
//         hiddenForm.style.display="none";
//         formItems.style.display="block";
//     }
    
// }

hideOrShow = () => {
    var eleSelect = document.getElementById("instSelect");
    var hiddenForm = document.getElementById("hidElement");
    var hiddenGuestForm = document.getElementById("hiddenFullForm");
    if(eleSelect.value=="JMIT")
    {
        hiddenForm.style.display="block";
        hiddenGuestForm.style.display="none";
    }
    else
    {
        hiddenForm.style.display="none";
        hiddenGuestForm.style.display="block";
    }
}

showingGuest = () => {
    var instSelect = document.getElementById("institutions");
    var guestSelection = document.getElementById("hidingGuest");
    console.log(instSelect.value);
    if(instSelect.value == "Others")
    {
        guestSelection.style.display="none";
    }
    else{
        guestSelection.style.display="block";
    }
}