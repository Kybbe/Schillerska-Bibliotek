const vw = document.documentElement.clientWidth;
console.log("Hej! 👋" + "\n" + "Jag ser att du försöker se hur sidan fungerar.😎" + "\n" + "Skrolla längst ner och klicka på Github knappen," + "\n" + "så får du se mitt repo med live updates!✨" + "\n" + "Lämna gärna ett issue ifall du vill att jag ska uppdatera något!")
function myCopyFunction(name) {

    if(name == "Rocio") {
        var str = "@educ.goteborg.se";
    } else if(name == "Pontus") {
        var str = "@educ.goteborg.se";
    } else if(name == "Johan") {
        var str = "@educ.goteborg.se";
    } else {
        var str = "ERROR";
    }

        const el = document.createElement('textarea');
        el.value = str;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        alert("Kopierade: " + str);
}

document.getElementById("searchBar").autocomplete = "off";

function search() {
    const search = document.getElementById('searchBar');
    const SV = search.value; // value of searchfield
    var SC = ""; // Search Converted to url based version
    var i = 0;
    if(SV != "") { /*Har sökt efter något*/
        for(i = 0; i < (SV.length); i++){
            if(document.getElementById("GotLib").checked) {
                if(SV[i] == " ") {
                    SC += "%20";
                }  else { 
                    SC += SV[i];
                }
            } else if(document.getElementById("Biblioteket").checked) {
                if(SV[i] == " ") {
                    SC += "%25+";
                }  else { 
                    SC += SV[i];
                }
            }
        }
        
        var gotLibUrl ="https://encore.gotlib.goteborg.se/iii/encore/search/C__S" + SC + "__Orightresult__U?lang=swe&suite=pearl"
        var mmUrl = "https://schillerska-gy.mikromarc.se/mikromarc3/search.aspx?Unit=6465&db=schillerska-gy&SC=FT&SW=" + SC + "%25&LB=FT&IN=&SU=0&DG=0"
        if(document.getElementById("GotLib").checked) {
            window.open( gotLibUrl, '_blank' );
        }
        if(document.getElementById("Biblioteket").checked) {
            window.open( mmUrl, '_blank' );
        }
    } else {
        alert("Tomt sökfält. Försök att skriva en boktitel först!")
    }
}

function checkOpeningTimes() {
    let date = new Date(); // Tiden just nu
    let hours = date.getHours(); // Timmar
    let day = date.getDay(); // Dagar
    let openingDays = [ 1, 2, 3, 4, 5 ]; // Vilka dagar vi har öppet, måndag == 1, tisdag == 2 osv...
    return openingDays.includes( day ) && hours >= 9 && hours < 16; // returnera true om idag == openingdays, & tiden är mellan 9:00 - 16:00
}

if(checkOpeningTimes() == false) {
    $('h4#openOrNot').text('Stängt');
    $('h4#openOrNot').css("color", "red");
} else {
    $('h4#openOrNot').text('Öppet');
    $('h4#openOrNot').css("color", "green");
}

lastSelectedShelf = "";

function showShelfInfo(shelfId) {
if(lastSelectedShelf != "") {
    document.getElementById(lastSelectedShelf).style.fill = "#4f4f4f";
    document.getElementById('shelf' + lastSelectedShelf).style.display = "none";
} 
document.getElementById(shelfId).style.fill = "#007bff";
lastSelectedShelf = shelfId;

    if(shelfId != "") {
        document.getElementById('shelf' + shelfId).style.display = "block";
        shelf = " ";
    } else {

    }
    
    if(shelf == "") {
        shelf = "Klicka på en hylla eller sök efter genre"
    }

    $('#shelfH4').text(shelf)
    $("#mapPopup").css("padding", "4px");
    document.getElementById("shelfH4").style.padding = 0;

    shelf = "";
}

$('input[type=radio]').change(function() {
    if (this.value == 'Biblioteket') {
        $('#label').text('Sök efter en bok i biblioteket:')
    }
    else if (this.value == 'GotLib') {
        $('#label').text('Sök efter en bok hos GotLib:')
    }
});

$(".form-inline").submit(function(e){
    e.preventDefault();
    search();
});

$(document).ready(function(){
    if(vw <= 10) {

    }
    else if(vw <= 280) {
        Notif = document.getElementById("MobileNotif")
        Notif.innerHTML = ("Gå in på hemsidan på en dator istället, för att se hela sidan bättre.")
    }
});

document.getElementById('instaPic').onmouseover = function(){
    if(vw >= 450) {
        document.getElementById('instaTxt').style.display = 'block';
    }
}
document.getElementById('instaPic').onmouseleave = function(){
    document.getElementById('instaTxt').style.display = 'none';
}

$(function(){
    $("#usefulLinksImport").load("../usefulLinks.html"); 
    $("#mapImport").load("../map.html");
    $("#searchResultsImport").load("../mapSearchResults.html");
});

$('.navbar-nav>a').on('click', function(){
    $('.navbar-collapse').collapse('hide');
});



function searchMap() { 
    // Declare variables
    var input, filter, ul, li, a, i, txtValue, searchbar, searchAnswers;
    searchbar = document.getElementById("searchMap")
    input = document.getElementById('searchMap');
    filter = input.value.toUpperCase();
    ul = document.getElementById("searchResultsImport");
    li = ul.getElementsByTagName('li');
    searchAnswers = 0;
    
    // Loop through all list items, and hide those who don't match the search query
    if(input.value != "") {
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("a")[0];
            txtValue = a.textContent || a.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                if(searchAnswers <= 5){
                    li[i].style.display = "block";
                    searchAnswers++;
                }
            } else {
            li[i].style.display = "none";
            }
        }
    } else {
        for (i = 0; i < li.length; i++) {
            li[i].style.display = "none";
        }
    }
}

function highlightShelf(resultShelf) {
    if(resultShelf.id == "Skönlitterära"){
        document.getElementById("searchMap").value = "";
        searchMap();
        showShelfInfo("5");
    } else {
        var id = resultShelf.parentElement.parentElement.parentElement.id;
        id = id.replace('searchShelf','');
        document.getElementById("searchMap").value = "";
        searchMap();
        showShelfInfo(id);
    }
}



function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomLetter() {
 var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
 return alphabet[rand(0,alphabet.length - 1)]
}
function getRandomWord(word) {
  var text = word.innerHTML
  
  var finalWord = ''
  for(var i=0;i<text.length;i++) {
    finalWord += text[i] == ' ' ? ' ' : getRandomLetter()
  }
 
  return finalWord
}

var row = document.getElementById("Footer")
var word = document.getElementById("hackSpan")
var interv = 'undefined'
var canChange = false
var globalCount = 0
var count = 0
var INITIAL_WORD = word.innerHTML;
var isGoing = false

function init() {
 if(isGoing) return;
 
 isGoing = true
 var randomWord = getRandomWord(word)
 word.innerHTML = randomWord

 interv = setInterval(function() {
  var finalWord = ''
  for(var x=0;x<INITIAL_WORD.length;x++) {
   if(x <= count && canChange) {
    finalWord += INITIAL_WORD[x]
   } else {
    finalWord += getRandomLetter()
   }
  }
  word.innerHTML = finalWord
  if(canChange) {
    count++
  }
  if(globalCount >= 20) {
   canChange = true
  }
  if(count>=INITIAL_WORD.length) {
   clearInterval(interv)
   count = 0
   canChange = false
   globalCount = 0
   isGoing = false
  }
  globalCount++
 },65)
 
}

row.addEventListener('mouseenter', init)