

let activateDetailsOnly = document.getElementById("onlyDetails");
activateDetailsOnly.addEventListener("click", toDisclosureOnlyDetails);


let activateNamesOnly = document.getElementById("onlyNames");
activateNamesOnly.addEventListener("click", toDisclosureOnlyNames);

let open = document.getElementsByClassName('note');

function toDisclosureOnlyNames(){
    console.log("Hello World");
    for (let poki of [...document.getElementsByClassName('note')]) {
        let nimilawa = poki.getElementsByTagName('h3')[0].innerText;
        let pokisin = document.createElement('details');
        let lawapoki = document.createElement('summary');
        pokisin.append(lawapoki);
          lawapoki.append(nimilawa);
        let ijoinsa = poki.getElementsByTagName('p')[0]; 
        ijoinsa.append(poki.getElementsByTagName('p')[1]);
        ijoinsa.append(poki.getElementsByTagName('p')[2]);
        pokisin.append(ijoinsa);
        pokisin.classList = poki.classList;
        poki.replaceWith(pokisin);
      }
}

function toDisclosureOnlyDetails(){
    for (let poki of [...document.getElementsByClassName('note')]) {
        let pokisin = document.createElement('details');
        let lawapoki = document.createElement('summary');
        lawapoki.append(poki.getElementsByTagName('p')[1].innerText+", ");
        lawapoki.append(poki.getElementsByTagName('p')[0].innerText);
        pokisin.append(lawapoki);
        let nimilawa = document.createElement('p');
        nimilawa.innerText = poki.getElementsByTagName('h3')[0].innerText;
        let ijoinsa = poki.getElementsByTagName('p')[2];
        ijoinsa.prepend(nimilawa);
        pokisin.append(ijoinsa);
        /*let nimilawa

        /*let nimilawa = document.createElement('p');
        nimilawa.innerText = poki.getElementsByTagName('h3')[0].innerText;
        /*let ijoinsa = poki.getElementsByTagName('p')[2];
        pokisin.append(ijoinsa);

      */
        pokisin.classList = poki.classList;

        
        pokisin.append(lawapoki);
        poki.replaceWith(pokisin);
    
    }
    

}
