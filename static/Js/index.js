let index = 0;
let attempts = 0;

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "Game Over";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:45vw; ";

    document.body.appendChild(div);
  };
  const gameover = () => {
    //게임오버 함수
    console.log("Game over function called");
    window.removeEventListener("keydown", handleKeydown);
    displayGameover();
    clearInterval(timer);
  };
  const nextLine = () => {
    index = 0;
    attempts += 1;
    if (attempts === 6) {
      alert("실패하셨습니다. 다시 도전해주세요!");
      gameover();
      return;
    }
  };

  const HandleEnterKey = async (event) => {
    let 맞은_갯수 = 0;
    const respond = await fetch("/answer");
    const answer_class = await respond.json();
    const answer = answer_class;
    console.log(answer_class);
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-bloack[data-index='${attempts}${i}']`
      );
      const 입력한_글자 = block.innerText;
      const 정답_글자 = answer[i];
      if (입력한_글자 === 정답_글자) {
        맞은_갯수 += 1;
        block.style.background = "#6AAA64";
      } else if (answer.includes(입력한_글자)) {
        block.style.background = "#C9B458";
      } else {
        block.style.background = "#787c7e";
        block.style.color = "white";
      }
    }

    if (맞은_갯수 === 5) {
      alert("정답을 맞추셨습니다! 꺄악너무좋아.");
      gameover();
    } else {
      nextLine();
    }
  };
  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-bloack[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };
  //bloack 위에 게임 시간을 표시하는 스탑워치 함수
  const displayTime = () => {
    const div = document.createElement("div");
    div.innerText = "00:00";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:relative; font-size: 20px; font-family: 'Noto Sans KR', sans-serif; top: 10px; left: 10px;";
    document.body.appendChild(div);

    let startTime = new Date().getTime();

    timer = setInterval(() => {
      let currentTime = new Date().getTime();
      let elapsedTime = currentTime - startTime;

      let minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

      div.innerText = `${minutes < 10 ? "0" + minutes : minutes}:${
        seconds < 10 ? "0" + seconds : seconds
      }`;
    }, 1000);
    //game over시 스탑워치 멈추는 기능
    setTimeout(() => {
      clearInterval();
    }, 1000);
  };
  //로직들
  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;

    const thisBlock = document.querySelector(
      `.board-bloack[data-index='${attempts}${index}']`
    );
    if (event.key === "Backspace") {
      handleBackspace();
      event.preventDefault();
    } else if (index === 5) {
      if (event.key === "Enter") HandleEnterKey();
      return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1;
    }
  };

  window.addEventListener("keydown", handleKeydown);
  displayTime();
}

appStart(); //실행
