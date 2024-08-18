const email = document.querySelector("#email");
const password = document.querySelector("#password");
const mySVG = document.querySelector(".svgContainer");
const armL = document.querySelector(".armL");
const armR = document.querySelector(".armR");
const eyeL = document.querySelector(".eyeL");
const eyeR = document.querySelector(".eyeR");
const nose = document.querySelector(".nose");
const mouth = document.querySelector(".mouth");
const mouthBG = document.querySelector(".mouthBG");
const mouthSmallBG = document.querySelector(".mouthSmallBG");
const mouthMediumBG = document.querySelector(".mouthMediumBG");
const mouthLargeBG = document.querySelector(".mouthLargeBG");
const mouthMaskPath = document.querySelector("#mouthMaskPath");
const mouthOutline = document.querySelector(".mouthOutline");
const tooth = document.querySelector(".tooth");
const tongue = document.querySelector(".tongue");
const chin = document.querySelector(".chin");
const face = document.querySelector(".face");
const eyebrow = document.querySelector(".eyebrow");
const outerEarL = document.querySelector(".earL .outerEar");
const outerEarR = document.querySelector(".earR .outerEar");
const earHairL = document.querySelector(".earL .earHair");
const earHairR = document.querySelector(".earR .earHair");
const hair = document.querySelector(".hair");
let caretPos,
  curEmailIndex,
  screenCenter,
  svgCoords,
  eyeMaxHorizD = 20,
  eyeMaxVertD = 10,
  noseMaxHorizD = 23,
  noseMaxVertD = 10,
  dFromC,
  eyeDistH,
  eyeLDistV,
  eyeRDistV,
  eyeDistR,
  mouthStatus = "small";

function getCoord(e) {
  let carPos = email.selectionEnd;
  let div = document.createElement("div");
  let span = document.createElement("span");
  let copyStyle = getComputedStyle(email);
  (emailCoords = {}), (caretCoords = {}), (centerCoords = {});
  [].forEach.call(copyStyle, function (prop) {
    div.style[prop] = copyStyle[prop];
  });
  div.style.position = "absolute";
  document.body.appendChild(div);
  div.textContent = email.value.substr(0, carPos);
  span.textContent = email.value.substr(carPos) || ".";
  div.appendChild(span);

  emailCoords = getPosition(email);
  caretCoords = getPosition(span);
  console.log(
    "caretCoords.x " + caretCoords.x + ", caretCoords.y: " + caretCoords.y
  );
  centerCoords = getPosition(mySVG);
  svgCoords = getPosition(mySVG);
  screenCenter = centerCoords.x + mySVG.offsetWidth / 2;
  caretPos = caretCoords.x + emailCoords.x;

  dFromC = screenCenter - caretPos;
  let pFromC = Math.round((caretPos / screenCenter) * 100) / 100;
  if (pFromC < 1) {
  } else if (pFromC > 1) {
    pFromC -= 2;
    pFromC = Math.abs(pFromC);
  }

  eyeDistH = -dFromC * 0.05;
  if (eyeDistH > eyeMaxHorizD) {
    eyeDistH = eyeMaxHorizD;
  } else if (eyeDistH < -eyeMaxHorizD) {
    eyeDistH = -eyeMaxHorizD;
  }

  let eyeLCoords = { x: svgCoords.x + 84, y: svgCoords.y + 76 };
  let eyeRCoords = { x: svgCoords.x + 113, y: svgCoords.y + 76 };
  let noseCoords = { x: svgCoords.x + 97, y: svgCoords.y + 81 };
  let mouthCoords = { x: svgCoords.x + 100, y: svgCoords.y + 100 };
  let eyeLAngle = getAngle(
    eyeLCoords.x,
    eyeLCoords.y,
    emailCoords.x + caretCoords.x,
    emailCoords.y + 25
  );
  let eyeLX = Math.cos(eyeLAngle) * eyeMaxHorizD;
  let eyeLY = Math.sin(eyeLAngle) * eyeMaxVertD;
  let eyeRAngle = getAngle(
    eyeRCoords.x,
    eyeRCoords.y,
    emailCoords.x + caretCoords.x,
    emailCoords.y + 25
  );
  let eyeRX = Math.cos(eyeRAngle) * eyeMaxHorizD;
  let eyeRY = Math.sin(eyeRAngle) * eyeMaxVertD;
  let noseAngle = getAngle(
    noseCoords.x,
    noseCoords.y,
    emailCoords.x + caretCoords.x,
    emailCoords.y + 25
  );
  let noseX = Math.cos(noseAngle) * noseMaxHorizD;
  let noseY = Math.sin(noseAngle) * noseMaxVertD;
  let mouthAngle = getAngle(
    mouthCoords.x,
    mouthCoords.y,
    emailCoords.x + caretCoords.x,
    emailCoords.y + 25
  );
  let mouthX = Math.cos(mouthAngle) * noseMaxHorizD;
  let mouthY = Math.sin(mouthAngle) * noseMaxVertD;
  let mouthR = Math.cos(mouthAngle) * 6;
  let chinX = mouthX * 0.8;
  let chinY = mouthY * 0.5;
  let chinS = 1 - (dFromC * 0.15) / 100;
  if (chinS > 1) {
    chinS = 1 - (chinS - 1);
  }
  let faceX = mouthX * 0.3;
  let faceY = mouthY * 0.4;
  let faceSkew = Math.cos(mouthAngle) * 5;
  let eyebrowSkew = Math.cos(mouthAngle) * 25;
  let outerEarX = Math.cos(mouthAngle) * 4;
  let outerEarY = Math.cos(mouthAngle) * 5;
  let hairX = Math.cos(mouthAngle) * 6;
  let hairS = 1.2;
  //   tweenMax.to(the ele to apply animation, animation duration, {based css animation parameters})
  TweenMax.to(eyeL, 1, { x: -eyeLX, y: -eyeLY, ease: Expo.easeOut });
  TweenMax.to(eyeR, 1, { x: -eyeRX, y: -eyeRY, ease: Expo.easeOut });
  TweenMax.to(nose, 1, {
    x: -noseX,
    y: -noseY,
    rotation: mouthR,
    transformOrigin: "center center",
    ease: Expo.easeOut,
  });
  TweenMax.to(mouth, 1, {
    x: -mouthX,
    y: -mouthY,
    rotation: mouthR,
    transformOrigin: "center center",
    ease: Expo.easeOut,
  });
  TweenMax.to(chin, 1, {
    x: -chinX,
    y: -chinY,
    scaleY: chinS,
    ease: Expo.easeOut,
  });
  TweenMax.to(face, 1, {
    x: -faceX,
    y: -faceY,
    skewX: -faceSkew,
    transformOrigin: "center top",
    ease: Expo.easeOut,
  });
  TweenMax.to(eyebrow, 1, {
    x: -faceX,
    y: -faceY,
    skewX: -eyebrowSkew,
    transformOrigin: "center top",
    ease: Expo.easeOut,
  });
  TweenMax.to(outerEarL, 1, {
    x: outerEarX,
    y: -outerEarY,
    ease: Expo.easeOut,
  });
  TweenMax.to(outerEarR, 1, { x: outerEarX, y: outerEarY, ease: Expo.easeOut });
  TweenMax.to(earHairL, 1, {
    x: -outerEarX,
    y: -outerEarY,
    ease: Expo.easeOut,
  });
  TweenMax.to(earHairR, 1, { x: -outerEarX, y: outerEarY, ease: Expo.easeOut });
  TweenMax.to(hair, 1, {
    x: hairX,
    scaleY: hairS,
    transformOrigin: "center bottom",
    ease: Expo.easeOut,
  });

  document.body.removeChild(div);
}

function onEmailInput(e) {
  getCoord(e);
  const value = e.target.value;
  curEmailIndex = value.length;

  // very crude email validation for now to trigger effects
  if (curEmailIndex > 0) {
    if (mouthStatus == "small") {
      mouthStatus = "medium";
      TweenMax.to([mouthBG, mouthOutline, mouthMaskPath], 1, {
        morphSVG: mouthMediumBG,
        shapeIndex: 8,
        ease: Expo.easeOut,
      });
      TweenMax.to(tooth, 1, { x: 0, y: 0, ease: Expo.easeOut });
      TweenMax.to(tongue, 1, { x: 0, y: 1, ease: Expo.easeOut });
      TweenMax.to([eyeL, eyeR], 1, {
        scaleX: 0.85,
        scaleY: 0.85,
        ease: Expo.easeOut,
      });
    }
    if (value.includes("@")) {
      mouthStatus = "large";
      TweenMax.to([mouthBG, mouthOutline, mouthMaskPath], 1, {
        morphSVG: mouthLargeBG,
        ease: Expo.easeOut,
      });
      TweenMax.to(tooth, 1, { x: 3, y: -2, ease: Expo.easeOut });
      TweenMax.to(tongue, 1, { y: 2, ease: Expo.easeOut });
      TweenMax.to([eyeL, eyeR], 1, {
        scaleX: 0.65,
        scaleY: 0.65,
        ease: Expo.easeOut,
        transformOrigin: "center center",
      });
    } else {
      mouthStatus = "medium";
      TweenMax.to([mouthBG, mouthOutline, mouthMaskPath], 1, {
        morphSVG: mouthMediumBG,
        ease: Expo.easeOut,
      });
      TweenMax.to(tooth, 1, { x: 0, y: 0, ease: Expo.easeOut });
      TweenMax.to(tongue, 1, { x: 0, y: 1, ease: Expo.easeOut });
      TweenMax.to([eyeL, eyeR], 1, {
        scaleX: 0.85,
        scaleY: 0.85,
        ease: Expo.easeOut,
      });
    }
  } else {
    mouthStatus = "small";
    TweenMax.to([mouthBG, mouthOutline, mouthMaskPath], 1, {
      morphSVG: mouthSmallBG,
      shapeIndex: 9,
      ease: Expo.easeOut,
    });
    TweenMax.to(tooth, 1, { x: 0, y: 0, ease: Expo.easeOut });
    TweenMax.to(tongue, 1, { y: 0, ease: Expo.easeOut });
    TweenMax.to([eyeL, eyeR], 1, { scaleX: 1, scaleY: 1, ease: Expo.easeOut });
  }
}

function onEmailFocus(e) {
  e.target.parentElement.classList.add("focusWithText");
  getCoord();
}

function onEmailBlur(e) {
  if (e.target.value == "") {
    e.target.parentElement.classList.remove("focusWithText");
  }
  resetFace();
}

function onPasswordFocus(e) {
  coverEyes();
}

function onPasswordBlur(e) {
  uncoverEyes();
}

function coverEyes() {
  TweenMax.to(armL, 0.45, { x: -93, y: 2, rotation: 0, ease: Quad.easeOut });
  TweenMax.to(armR, 0.45, {
    x: -93,
    y: 2,
    rotation: 0,
    ease: Quad.easeOut,
    delay: 0.1,
  });
}

function uncoverEyes() {
  TweenMax.to(armL, 1.35, { y: 220, ease: Quad.easeOut });
  TweenMax.to(armL, 1.35, { rotation: 105, ease: Quad.easeOut, delay: 0.1 });
  TweenMax.to(armR, 1.35, { y: 220, ease: Quad.easeOut });
  TweenMax.to(armR, 1.35, { rotation: -105, ease: Quad.easeOut, delay: 0.1 });
}

function resetFace() {
  TweenMax.to([eyeL, eyeR], 1, { x: 0, y: 0, ease: Expo.easeOut });
  TweenMax.to(nose, 1, {
    x: 0,
    y: 0,
    scaleX: 1,
    scaleY: 1,
    ease: Expo.easeOut,
  });
  TweenMax.to(mouth, 1, { x: 0, y: 0, rotation: 0, ease: Expo.easeOut });
  TweenMax.to(chin, 1, { x: 0, y: 0, scaleY: 1, ease: Expo.easeOut });
  TweenMax.to([face, eyebrow], 1, { x: 0, y: 0, skewX: 0, ease: Expo.easeOut });
  TweenMax.to([outerEarL, outerEarR, earHairL, earHairR, hair], 1, {
    x: 0,
    y: 0,
    scaleY: 1,
    ease: Expo.easeOut,
  });
}

function getAngle(x1, y1, x2, y2) {
  const angle = Math.atan2(y1 - y2, x1 - x2);
  return angle;
}

function getPosition(el) {
  let xPos = 0;
  let yPos = 0;

  while (el) {
    if (el.tagName == "BODY") {
      // deal with browser quirks with body/window/document and page scroll
      const xScroll = el.scrollLeft || document.documentElement.scrollLeft;
      const yScroll = el.scrollTop || document.documentElement.scrollTop;

      xPos += el.offsetLeft - xScroll + el.clientLeft;
      yPos += el.offsetTop - yScroll + el.clientTop;
    } else {
      // for all other non-BODY elements
      xPos += el.offsetLeft - el.scrollLeft + el.clientLeft;
      yPos += el.offsetTop - el.scrollTop + el.clientTop;
    }

    el = el.offsetParent;
  }
  return {
    x: xPos,
    y: yPos,
  };
}

email.addEventListener("focus", onEmailFocus);
email.addEventListener("blur", onEmailBlur);
email.addEventListener("input", onEmailInput);
password.addEventListener("focus", onPasswordFocus);
password.addEventListener("blur", onPasswordBlur);
TweenMax.set(armL, {
  x: -93,
  y: 220,
  rotation: 105,
  transformOrigin: "top left",
});
TweenMax.set(armR, {
  x: -93,
  y: 220,
  rotation: -105,
  transformOrigin: "top right",
});

//gsap cnd
