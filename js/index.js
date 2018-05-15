$(document).ready(function() {
  const allLevels = 20;
  let currentLevel = 0;
  let currentMoves = [];
  let playerMoves = [];
  const sounds = [
    "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
    "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
    "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
    "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
  ];
  let error = false;
  let strictMode = false;
  let win = false;

  // INIT GAME
  function initGame() {
    currentLevel++;
    $(".circle").addClass("active");
    $("#lvl").text(currentLevel);
    checkStrictMode();
    setNewGameStep();
  }

  //RESET GAME
  function resetGame() {
    error = false;
    currentLevel = 0;
    currentMoves = [];
    playerMoves = [];
    win = false;
    $("#lvl").text(currentLevel);
    checkStrictMode();
    $("#err").text("");
  }
  
  //STRICT MODE
  function checkStrictMode() {
    if ($("#strict").prop("checked")) {
      strictMode = true;
    } else {
      strictMode = false;
    }
  }
  
  //ERROR
  function showError() {
    $("#err").text("error :( start again!");
    setTimeout(function() {
      $("#err").text("");
    }, 1000);
  }

  //VICTORY
  function checkVictory() {
    if (currentLevel == allLevels) {
      $("#err").text("Victory!");
      win = true;
      return;
    }
  }

  //PLAYER PRESSING BUTTONS
  $(".pad").click(function() {
    let btnId = Number($(this).attr("id"));
    $(this).addClass("highlight");
    playSound(btnId);
    setTimeout(() => {
      $(this).removeClass("highlight");
    }, 100);
    playerMoves.push(btnId);
    checkPlayerMove(btnId);
  });

  //CHECK EACH STEPS
  function checkSteps() {
    for (let i = 0; i < playerMoves.length; i++) {
      if (playerMoves[i] != currentMoves[i]) {
        return false;
      }
    }
    return true;
  }

  //SET PLAYER STEPS
  function checkPlayerMove(id) {
    if (!checkSteps()) {
      //checksteps return false on error
      showError();
      playerMoves = [];
      if (!strictMode) {
        setTimeout(() => {
          showSteps();
        }, 1000);
      } else {
        resetGame();
      }
      return;
    }
    if (playerMoves.length == currentMoves.length && !error) {
      checkVictory();
      if (!win) {
        currentLevel++;
        $("#lvl").text(currentLevel);
        playerMoves = [];
        setTimeout(() => {
          setNewGameStep();
        }, 1000);
      }
    }
  }

  function setNewGameStep() {
    getRandomNumber();
  }

  // GENERATING RANDOM NUMBER AS NEXT STEP
  function getRandomNumber() {
    let randomNumber = Math.round(Math.random() * 3);
    currentMoves.push(randomNumber);
    showSteps();
  }

  //SHOWING SIMON'S STEPS
  function showSteps() {
    let i = 0;
    let step = "";
    let inter = setInterval(function() {
      step = $("#" + currentMoves[i]);
      playSound(currentMoves[i]);
      step.addClass("highlight");
      setTimeout(() => {
        step.removeClass("highlight");
      }, 100);
      i++;

      if (i >= currentMoves.length) {
        clearInterval(inter);
      }
    }, 500);
  }

  // PLAYING SOUND
  function playSound(id) {
    let audio = new Audio(sounds[id]);
    audio.play();
  }

  // STARTING A NEW GAME
  $("#start").click(function() {
    initGame();
  });

  // RESTART GAME
  $("#reset").click(function() {
    resetGame();
  });
});