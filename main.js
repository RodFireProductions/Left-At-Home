/*~~ Set up game logic ~~*/
const LOADING = 0;
const TITLE = 1;
const DIALOGUE = 2;
const BITSY = 3;
const ZINE = 4;
const EPILOGUE = 5;
const ABOUT = 6;

state = {
  gameStage: LOADING,
  isLoading: true,
  epilogue: null,
  talkingAudio: new Audio(),
};

function donePreloading() {
  if (state.isLoading) {
    state.isLoading = false;
    //state.talkingAudio.loop = true;
    //state.talkingAudio.src = "sounds/typing.mp3";
    $(".loading-dots").addClass("hidden");
    state.gameStage = TITLE;
    showGameStage();
  }
}

function startGame() {
  state.gameStage = DIALOGUE;
  showGameStage();
  showDialogue(1);
}

function showDialogue(textNodeIndex) {
  let dialogue = DIALOGUE_CONTENT;
  const textNode = dialogue.find((textNode) => textNode.id === textNodeIndex);

  if (textNode.speakerName === BEADS) {
      $("#character-portrait").css(
        "background-image",
        `url("./images/bead_${textNode.characterImg}.png")`
      );

  } else if (textNode.speakerName === FRECKLES) {
      $("#character-portrait").css(
        "background-image",
        `url("./images/freckles_${textNode.characterImg}.png")`
      );
  } else {
      $("#character-portrait").css(
        "background-image",
        "url(" + textNode.characterImg + ")"
      );
  }
  /*
  $("#character-portrait").css(
    "background-position-x",
    textNode.characterImg[1] + "px"
  );
  $("#character-portrait").css(
    "background-position-y",
    textNode.characterImg[2] + "px"
  );
  */

  $("#responses").empty(); // reset
  $("#progress-dialogue").addClass("hidden");

  // If displaying a dialogue object with options to show on the screen
  if (textNode.options) {
    textNode.options.forEach((option) => {
      const button = document.createElement("button");
      button.innerText = option.text;
      button.classList.add("buttons");
      button.addEventListener("click", () => selectOption(option));
      $("#responses").append(button);
    });
  }

  // If displaying a dialogue object with text and speaker content
  if (textNode.speakerName && textNode.text) {
    $("#speaker-name").html(textNode.speakerName);
    $("#character-dialogue").empty();

    loadingText = true;
    timeouts = [];


    $("#character-dialogue").append(textNode.text);
    finishLoadingDialogue(textNode)

    /*
    state.talkingAudio.play();
    textArray = textNode.text.split("");


    textArray.forEach((letter, index) => {
      timeouts.push(
        setTimeout(() => {
          $("#character-dialogue").append(letter);
        }, 20 * index)
      );
    });

    timeouts.push(
      setTimeout(
        () => finishLoadingDialogue(textNode),
        20 * (textArray.length - 1)
      )
    );

    */




    document.body.onkeyup = function (e) {
      if (e.code == "Space" || e.code == "Enter") {
        clearTimeouts(timeouts, textNode);
      }
    };

    $(".dialogue-wrapper").click(function () {
      clearTimeouts(timeouts, textNode);
    });
  }
}

function clearTimeouts(timeouts, textNode) {
  if (loadingText) {
    timeouts.forEach((timeout) => {
      clearTimeout(timeout);
    });
    $("#character-dialogue").html(textNode.text);
    finishLoadingDialogue(textNode);
  }
}

function finishLoadingDialogue(textNode) {
  loadingText = false;
  state.talkingAudio.pause();
  $("#progress-dialogue").removeClass("hidden");

  if (textNode.speakerName === BEADS || textNode.speakerName === FRECKLES) {
      $("#character-dialogue").addClass("quotes");
  } else {
      $("#character-dialogue").removeClass("quotes");
  }



  $("#progress-dialogue").click(function (event) {
    event.stopPropagation();
    advance(textNode);
  });
  $(".dialogue-wrapper").click(function () {
    advance(textNode);
  });

  // I don't know why both of these have to be here, but it doesn't work if I removed either????

  document.body.onkeyup = function (e) {
    if (e.code == "Space" || e.code == "Enter") {
      advance(textNode);
    }
  };

  document.body.addEventListener( keyup, function(e) {
      if (e.code == "Space" || e.code == "Enter") {
        advance(textNode);
      }
  });
}

function clearListeners() {
  document.body.onkeyup = {};
  $("#progress-dialogue").off("click");
  $(".dialogue-wrapper").off("click");
}

function advance(textNode) {
    clearListeners();
    if (textNode.next == FINISH) {
        showEpilogue();
    } else if (textNode.next == BITSYSCREEN) {
        showBitsy()
    } else if (textNode.next == ZINESCREEN) {
        showZine()
    } else {
        showDialogue(textNode.next);
    }
}

function selectOption(option) {
  if (option.setState) {
    state = Object.assign(state, option.setState);
  }
  option.chatMoods?.forEach((chatMood) => {
    showChat(chatMood);
  });
  showDialogue(option.nextText);
}

function showGameStage() {
  $("#loading").addClass("hidden");
  $("#titlescreen").addClass("hidden");
  $("#dialogue-container").addClass("hidden");
  $("#epilogue").addClass("hidden");
  $("#zinewrapper").addClass("hidden");
  $("#bitsygame").addClass("hidden");
  $("#about").addClass("hidden");
  switch (state.gameStage) {
    case LOADING:
      $("#loading").removeClass("hidden");
      break;
    case TITLE:
      $("#titlescreen").removeClass("hidden");
      break;
    case DIALOGUE:
      $("#dialogue-container").removeClass("hidden");
      break;
    case BITSY:
      $("#bitsygame").removeClass("hidden");
      break;
   case ZINE:
      $("#zinewrapper").removeClass("hidden");
      break;
    case EPILOGUE:
      $("#epilogue").removeClass("hidden");
      break;
    case ABOUT:
      $("#about").removeClass("hidden");
      break;
  }
}

function showEpilogue() {
  state.gameStage = EPILOGUE;
  showGameStage();
  const epilogueObject = EPILOGUES.find(
    (epilogue) => epilogue.id === state.epilogue
  );
  $("#epilogue-result").text(epilogueObject.text);
}

function restart() {
  location.reload();
  //state.gameStage = TITLE;
  //showGameStage();
  //showDialogue(1);
}
