const list = document.getElementById("contents-ul");
const displayButton = document.createElement("button");
displayButton.addEventListener("keydown", sin);
displayButton.id = "tc-expanded"
list.appendChild(displayButton);
let activated = false;
let expanded = false;        


function sin(){
    if (activated == false && expanded == true){
        var focusButton = document.createElement("a");
        focusButton.innerText="Go to expanded";
        focusButton.href = "#"+list.children[29].querySelector("a").id;
        focusButton.id = "tc-jump";
        list.appendChild(focusButton);
        activated = true;       
    } 
    
    

}
function pana(){
    var counter = 0;
    for (item of list.children){
        if (counter > 28){
            if (item.nodeName != "BUTTON")
                item.style.display="block";
            }
            if (item.nodeName == "BUTTON"){
                item.innerText = "Show less table of contents";
                item.removeEventListener("click", pana);
                item.addEventListener("click",weka);
                item.ariaExpanded = "true";
                expanded = true;
            }   
    counter++;
    }
}

function weka(){
    var counter = 0;
    for (item of list.children){
        if (counter > 28)
            if (item.nodeName != "BUTTON")
                item.style.display="none";
            if(item.nodeName =="BUTTON"){
                item.removeEventListener("click", weka);
                item.addEventListener("click", pana);
                item.innerText = "Show full table of contents";
                item.ariaExpanded = "false";
                expanded = false;
            }
    counter++;
    }
}

weka();
