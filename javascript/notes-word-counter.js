console.log("heeelo world");
let fulltext = document.body.innerText.split(" ");
let wordAmount = 0;
console.log(fulltext);
let start = false;

for (word of fulltext){
    if (word === "Win"){
        start = true;
        console.log("boop!");
    }
    if (start == true){
        wordAmount = wordAmount + 1;
    }
}
console.log(wordAmount);
