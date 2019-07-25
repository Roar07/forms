var newQ=document.querySelector("#newreq");
var finalForm=document.querySelector("#final");
var queries=document.querySelector("#queries");
var removeQ=document.getElementsByName("brq")

newQ.addEventListener("click",(e)=>{
    e.preventDefault();
    newquestion();
})


newquestion=function(){

    var li=document.createElement("li");
    var input=document.createElement('input');
    input.type="text";
    input.name="query";
    input.classList.add("activef");
    input.placeholder="Query:";
    li.append(input);

    var select=document.createElement("select");
    select.classList.add("activef");
    select.name="type";
    select.addEventListener("change",()=>{
        var prop=select.parentElement.querySelector("#prop");
        prop.innerHTML="";

        if(select.value=="number"){
            let min=document.createElement("input");
            min.type="number";
            min.name="min";
            min.classList.add("activef")
            min.placeholder="min:";
            console.log(input);
            prop.insertBefore(min,select.lastSibling);
            let max=document.createElement("input");
            max.name="max";
            max.placeholder="max:";
            max.classList.add("activef");
            max.type="number";
            prop.insertBefore(max,select.lastSibling);

        }
    })
    
    var option=document.createElement("option");
    option.value="text";
    option.innerHTML="text";
    select.appendChild(option);
    option=document.createElement("option");
    option.value="number";
    option.innerHTML="number";
    select.appendChild(option);
    option=document.createElement("option");
    option.value="true/false";
    option.innerHTML="true/false";
    select.appendChild(option);
    option=document.createElement("option");
    option.value="image";
    option.innerHTML="image";
    select.appendChild(option);
    option=document.createElement("option");
    option.value="file";
    option.innerHTML="file";
    select.appendChild(option);

    li.append(select); 
    
    let prop=document.createElement("div");
    prop.id="prop";
    li.append(prop);

   input=document.createElement("input");
   input.type="button";
   input.name="brq"
   input.value="remove";
   input.addEventListener("click",()=>{
        var ele=input.parentElement;
        var gdf=ele.parentElement;
        gdf.removeChild(ele);
   })
   li.append(input); 
 //  console.log(removeQ);

    
    queries.appendChild(li);
}



window.onload=()=>{
    newquestion();
    console.log(location.pathname);

}



document.querySelector("#save").addEventListener("click",()=>{
   finalForm.submit();
});


/*preDetails=()=>{
    let xhr=new XMLHttpRequest();
    xhr.onreadystatechange=()=>{
        if(xhr.readyState==4 && xhr.status==200) {
        console.log("hai")
        console.log(JSON.parse(xhr.responseText));
        }
    }
    xhr.open("get","/getform",true);
    xhr.send();
}
*/