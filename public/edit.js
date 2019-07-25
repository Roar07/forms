var newQ=document.querySelector("#newreq");
var finalForm=document.querySelector("#final");
var queries=document.querySelector("#queries");
var removeQ=document.getElementsByName("brq")

newQ.addEventListener("click",(e)=>{
    e.preventDefault();
   let lcl=newquestion("new");
   queries.appendChild(lcl);
})


newquestion=function(msg){

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
    if(msg=="number"){
        let min=document.createElement("input");
        min.type="number";
        min.name="min";
        min.classList.add("activef")
        min.placeholder="min:";
        prop.insertBefore(min,select.lastSibling);
        let max=document.createElement("input");
        max.name="max";
        max.placeholder="max:";
        max.classList.add("activef");
        max.type="number";
        prop.insertBefore(max,select.lastSibling);  
    }

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
   return li;
    queries.appendChild(li);
}



window.onload=()=>{
    console.log(location.hostname);
    preDetails();
    

}


preDetails=()=>{
    let xhr=new XMLHttpRequest();
    xhr.onreadystatechange=()=>{
        if(xhr.readyState==4 && xhr.status==200) {
     //   console.log(JSON.parse(xhr.responseText));
        let details=JSON.parse(xhr.responseText);
        oldQuestions(details);
    }
    }
    xhr.open("get","/getform",true);
    xhr.send();
}

oldQuestions=(details)=>{
    let noTypeCount=0;
    if(Array.isArray(details.query)){
    for(i=0;i<details.query.length;++i){
        if(details.type[i]=="text"){
        
            let field=newquestion(details.type[i]);
            field.querySelector('input[name="query"]').value=details.query[i];
            field.querySelector('select[name="type"]').value=details.type[i];
            queries.appendChild(field);
        }
        if(details.type[i]=="number"){
            let field=newquestion(details.type[i]);
            field.querySelector('input[name="query"]').value=details.query[i];
            field.querySelector('select[name="type"]').value=details.type[i];
            field.querySelector('input[name="min"]').value=details.min[noTypeCount];
            field.querySelector('input[name="max"]').value=details.max[noTypeCount++];
            queries.appendChild(field);
        }
    }

}else{
    if(details.type=="text"){
        
        let field=newquestion(details.type);
        field.querySelector('input[name="query"]').value=details.query;
        field.querySelector('select[name="type"]').value=details.type;
        queries.appendChild(field);

    }
    if(details.type=="number"){
        let field=newquestion(details.type);
        field.querySelector('input[name="query"]').value=details.query;
        field.querySelector('select[name="type"]').value=details.type;
        field.querySelector('input[name="min"]').value=details.min;
        field.querySelector('input[name="max"]').value=details.max;
        queries.appendChild(field);
    }
}

}

document.querySelector("#save").addEventListener("click",()=>{
    finalForm.submit();
   
})


document.querySelector("#prebutton").addEventListener("click",()=>{

    let details;
    let xhr=new XMLHttpRequest();
    xhr.onreadystatechange=()=>{
        if(xhr.readyState==4 && xhr.status==200) {      
        details=JSON.parse(xhr.responseText);
        getpreview(details);
        }
    }
        xhr.open("get","/getform",true);
        xhr.send();

 });
 

var preview=document.querySelector("#preview");
let numberTypeCount;



getpreview=(details)=>{

    preview.innerHTML="";
    numberTypeCount=0;
    let title=document.createElement("output");
    title.value=details.formTitle;
    preview.appendChild(title);
    
    preview.append(document.createElement("br"));
    let descrip=document.createElement("output");
    descrip.value=details.descrip;
    preview.appendChild(descrip);
    preview.append(document.createElement("br"));


    if(Array.isArray(details.query)){
        for(i=0;i<details.query.length;++i){
           

                let label=document.createElement("label");
                label.for="response";
                label.innerHTML=details.query[i];
                preview.appendChild(label);
                preview.append(document.createElement("br"));

            
               if(details.type[i]=="text"){
                let input=document.createElement("input");
                input.name="response";
                input.type="text";
                //class yet to given for style===
                preview.appendChild(input);
               }

               if(details.type[i]=="number"){
                let input=document.createElement("input");
                input.name="response";
                input.type="number";
                //class yet to given for style===
                input.min=details.min[numberTypeCount];
                input.max=details.max[numberTypeCount++];
                preview.appendChild(input);
               }
               preview.append(document.createElement("br"));

            }
        }else{
            let label=document.createElement("label");
            label.for="response";
            label.innerHTML=details.query;
            preview.appendChild(label);
            preview.append(document.createElement("br"));

        
           if(details.type=="text"){
            let input=document.createElement("input");
            input.name="response";
            input.type="text";
            //class yet to given for style===
            preview.appendChild(input);
           }

           if(details.type=="number"){
            let input=document.createElement("input");
            input.name="response";
            input.type="number";
            //class yet to given for style===
            input.min=details.min[numberTypeCount];
            input.max=details.max[numberTypeCount++];
            preview.appendChild(input);
           }
           preview.append(document.createElement("br"));
    }

 }


document.querySelector("#url").addEventListener("click",()=>{
    let xhr=new XMLHttpRequest();
    xhr.onreadystatechange=()=>{
        if(xhr.readyState==4 && xhr.status==200) {      
        let details=JSON.parse(xhr.responseText);
         url=location.hostname+":"+location.port+"/response/"+details.user+"/"+details.form;   
         document.querySelector("#outurl").value=url;
         document.querySelector("#urlzone").style.display="";
        }
    }

    xhr.open("get","/url",true);
    xhr.send();
})

document.querySelector("#copyurl").addEventListener("click",()=>{
    var url=document.getElementById("outurl");
    console.log(url)
    url.select();
    document.execCommand("copy")
})