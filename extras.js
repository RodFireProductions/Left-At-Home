
// Zine
function showZine() {
    state.gameStage = ZINE;
    showGameStage();
    startZine();
}
function leaveZine(){
    state.gameStage = DIALOGUE;
    showGameStage();
    showDialogue(52);
    $("#zine").html('')
    //$("#zine").removeAttr("style");
}

// Bitsy
function showBitsy() {
    state.gameStage = BITSY;
    showGameStage();

    $("#bitsygame").html('<iframe id="bitsy" src="bitsy/cat cafe.html"></iframe>') // <button onclick="leaveBitsy()">continue?</button>
    $("#bitsy").focus()
}
function leaveBitsy() {
    state.gameStage = DIALOGUE;
    showGameStage();
    $("#bitsygame").innerHTML = ""
    showDialogue(60);
}
window.onmessage = function(e) {
    if (e.data === 'bitsyend') {
        leaveBitsy()
    }
    if (e.data == 'french vanilla') {
        FLAVOR = "french vanilla";
        DIALOGUE_CONTENT[87].text = `I got you your favorites: an iced ${FLAVOR} latte and-`;
    }
    if (e.data == 'mocha') {
        FLAVOR = "mocha";
        DIALOGUE_CONTENT[87].text = `I got you your favorites: an iced ${FLAVOR} latte and-`;
    }
    if (e.data == 'caramel') {
        FLAVOR = "caramel";
        DIALOGUE_CONTENT[87].text = `I got you your favorites: an iced ${FLAVOR} latte and-`;
    }
}

// About screen

function showAbout() {
    state.gameStage = ABOUT;
    showGameStage();
}

// Main Menu

function showMenu() {
    state.gameStage = TITLE;
    showGameStage();
}


// Console
let credit = {
	description: [
		`"Left At Home" is a game made by RodFireProductions.`,
        "--------------------------------",
        "✨Trans Rights are human rights!✨",
        "♡ POC lives will always matter! ♡",
		"--------------------------------",
		"Have a lovely day."
    ]
}
if (credit != null){
	console.group("Lookin' under the hood?")
    for (let z = 0; z < credit.description.length; z++) {
		console.log(credit.description[z])
    }
	console.groupEnd()
}
