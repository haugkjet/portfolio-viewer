import * as THREE from "three";

function initgui2d() {
  let index = 0;
  const btns = document.getElementById("btns") as HTMLButtonElement | null;
  if (btns)
    btns.childNodes.forEach((btn) => {
      btn.addEventListener("click", function handleClick(event) {
        console.log("button clicked");
      });
      index++;
    });
}

export { initgui2d };
