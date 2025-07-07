const poemLines = [
  "嘿，小泷女~",
  "我偷偷给你准备了一个小惊喜",
  "它可能很简单，也可能很幼稚",
  "也许只是些文字和一段熟悉的旋律",
  "但它藏着我写下这些字的每一刻心动",
  "",
  "我们认识已经有一段时间了",
  "但每次聊天，我还是会紧张地不知所措",
  "也许是你太特别了",
  "特别到我总觉得自己不够好、不够优秀",
  "",
  "你知道吗？",
  "在无数个平凡的夜里",
  "你的一句话就能点亮我整天的好心情",
  "你像光一样照进我的世界",
  "",
  "风从自习室窗边穿过，",
  "你低头的模样，就藏在书页之间，",
  "像某句歌词，一不小心读懂了，",
  "眼眶就会微微发热。",
  "",
  "你说那首《想到我们》总让你想哭，",
  "我没敢多问，只轻轻记下，",
  "像记下一句不该翻阅的心事，",
  "却在每个无声夜里，轻轻回味。",
  "",
  "你可能不知道，",
  "我第一次看见你，就觉得你有光，",
  "那种温柔、努力、不声不响却闪闪发亮的光。",
  "我就这样，在光的边缘，悄悄喜欢了很久。",
  "",
  "我们都说，要是以后有时间，",
  "一起学钢琴吧——",
  "黑白键之间，藏不住的默契和小秘密，",
  "像现在这样，什么都没说清楚，",
  "却总好像，早就知道彼此在想什么。",
  "",
  "有时候，明明只是并肩走了几步，",
  "我就会在脑海里把这段路，走过好几遍，",
  "想象你也会偷偷看我，",
  "然后也为这段路，笑了一下。",
  "",
  "我不是那种很特别的人，",
  "但每次看你努力的样子，",
  "都会让我觉得，",
  "有些人出现，就是一种提醒——",
  "提醒我也要咬牙坚持，",
  "提醒我别忘了，最初的热爱和心愿。",
  "",
  "你应该没注意到，",
  "每次你擦肩走过，我都沉默，",
  "不是没有话说，",
  "而是太多话，不知该从哪一句开始。",
  "",
  "我记得你喜欢粉色，也喜欢温柔的歌。",
  "我就像在拼图一样，",
  "悄悄把这些碎片都收好，藏在心里最柔软的地方。",
  "",
  "如果可以，我想说一句：",
  "不是非要回应，",
  "只是这份喜欢，",
  "藏了很久，很久，",
  "不说出口，它就要长出翅膀了。",
  "",
  "或许不能靠近，那也没关系，",
  "我会继续在你看不到的地方，",
  "追着那道光，走上去，",
  "直到我们都站在梦想的顶端，",
  "可以笑着说一句：",
  "",
  "“你看，我们都没辜负自己。”",
  "",
  "但如果你愿意，",
  "我更想——",
  "我们一起，走完那条追光的路。",
  "一起看春天第一朵樱花盛开，",
  "夏天傍晚吹风时的云卷云舒，",
  "秋天的第一杯热奶茶，",
  "冬天手心的温度。",
  "",
  "所以——",
  "你愿意，走进我的小宇宙吗？",
  "做我最特别的那颗星星？✨",
  "成为我所有故事里的主角，",
  "成为我偷偷练琴的动力，",
  "成为我每一次坚持的理由？",
  "",
  "我已经准备好，",
  "把这个秘密，",
  "温柔地告诉你了。🌸"
];

const container = document.getElementById('line-container');
const audio = document.getElementById("bgm");
const startScreen = document.getElementById("start-screen");
const startBtn = document.getElementById("start-btn");
const overlay = document.getElementById("overlay");
const restartBtn = document.getElementById("restart-btn");
const restartContainer = document.getElementById("restart-container");

let currentLine = 0;
const maxVisible = 7;

startBtn.addEventListener("click", () => {
  startScreen.style.display = "none";
  overlay.style.display = "block";

  audio.muted = false;
  audio.play().catch(() => {
    document.body.addEventListener("click", () => {
      audio.play();
    }, { once: true });
  });

  currentLine = 0;
  showLine(currentLine);
});

restartBtn.addEventListener("click", () => {
  document.body.style.overflow = "hidden";
  container.style.height = "100vh";
  container.style.position = "relative";
  restartContainer.style.display = "none";
  currentLine = 0;
  showLine(currentLine);
});

function showLine(index) {
  container.innerHTML = "";

  const centerY = window.innerHeight / 2;

  for (let i = -Math.floor(maxVisible / 2); i <= Math.floor(maxVisible / 2); i++) {
    const lineIndex = index + i;
    if (lineIndex >= 0 && lineIndex < poemLines.length) {
      const div = document.createElement("div");
      div.className = "line";
      if (i === 0) div.classList.add("active");

      div.textContent = poemLines[lineIndex];
      div.style.top = `${centerY + i * 40}px`;
      container.appendChild(div);
    }
  }

  if (index < poemLines.length - 1) {
    setTimeout(() => showLine(index + 1), 3000);
  } else {
    setTimeout(() => {
      document.body.style.overflow = "auto";
      container.style.height = "auto";
      container.style.position = "static";
      container.innerHTML = poemLines.map((text, idx) => {
        return `<div class="line${idx === index ? ' active' : ''}" style="position:static;margin:10px auto;">${text}</div>`;
      }).join('');
      restartContainer.style.display = "flex";
    }, 3000);
  }
}

// ❤️ 粒子爱心动画
const canvas = document.getElementById("heart-canvas");
const ctx = canvas.getContext("2d");
let hearts = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

function createHeart() {
  return {
    x: Math.random() * canvas.width,
    y: canvas.height + Math.random() * 100,
    size: 10 + Math.random() * 10,
    speed: 1 + Math.random() * 2,
    alpha: 1,
    dx: (Math.random() - 0.5) * 2,
  };
}

function drawHeart(h) {
  ctx.save();
  ctx.globalAlpha = h.alpha;
  ctx.translate(h.x, h.y);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(0, -h.size / 2, -h.size, -h.size / 2, -h.size, 0);
  ctx.bezierCurveTo(-h.size, h.size / 1.5, 0, h.size, 0, h.size * 1.4);
  ctx.bezierCurveTo(0, h.size, h.size, h.size / 1.5, h.size, 0);
  ctx.bezierCurveTo(h.size, -h.size / 2, 0, -h.size / 2, 0, 0);
  ctx.fillStyle = "#ff99cc";
  ctx.fill();
  ctx.restore();
}

function updateHearts() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (hearts.length < 100) {
    hearts.push(createHeart());
  }

  for (let i = 0; i < hearts.length; i++) {
    const h = hearts[i];
    h.y -= h.speed;
    h.x += h.dx;
    h.alpha -= 0.005;

    if (h.alpha <= 0 || h.y < -50) {
      hearts.splice(i, 1);
      i--;
    } else {
      drawHeart(h);
    }
  }

  requestAnimationFrame(updateHearts);
}

updateHearts();
