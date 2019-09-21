hideOrShow = () =>{
    var formSelect = document.getElementById("instSelect");
    var hiddenForm = document.getElementById("hiddenForm");
    var formItems = document.getElementById("hidElement");
    if(formSelect.value=="Guest")
    {   
        console.log("it is actually working");
        hiddenForm.style.display="block";
        formItems.style.display="none";
    }
    else
    {
        hiddenForm.style.display="none";
        formItems.style.display="block";
    }
}