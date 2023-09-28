let index = 0;
let attempts = 0;
const answer = "APPLE";

function appStart() {
  const HandleEnterKey = (event) => {
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-bloack[data-index='${attempts}${i}']`
      );
      const 입력한_글자 = block.innerText;
      const 정답_글자 = answer[i];
      if (입력한_글자 === 정답_글자) {
        block.style.background = "#6AAA64";
      } else if (answer.includes(입력한_글자)) {
        block.style.background = "#C9B458";
      }
    }
  };

  //로직들
  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;

    const thisBlock = document.querySelector(
      `.board-bloack[data-index='${attempts}${index}']`
    );

    if (index === 5) {
      if (event.key === "Enter") HandleEnterKey();
      return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1;
    } else {
      console.log("event.key is undefined or null");
    }
  };

  window.addEventListener("keydown", handleKeydown);
}

appStart(); //실행
