let box = document.querySelector(".container");
let more = document.querySelector(".desc");
let card = document.querySelector(".card");
let uzbekText = [];
let arabText = [];
let oqilishi = [];
let audio = [];
let heading = document.querySelector(".heading");
let cont = document.querySelector(".cont");
fetch("https://api.quran.sutanlab.id/surah")
  .then((res) => res.json())
  .then((res) => {
    let data = res.data;
    let item;
    data.forEach((element) => {
      item = `<div class="card" id ="${element.number}">
      <div class="item">
        <div class="num"><p class="number">${element.number}</p></div>
        <p class="name">${element.name.transliteration.id}</p>
      </div>
      <div class="arabic">
        <p class="arabic__name">${element.name.short}</p>
        <p class="ayahs">${element.numberOfVerses} Ayahs</p>
      </div>
    </div>`;
      box.insertAdjacentHTML("beforeend", item);
    });
  });
let getText = async function (id) {
  await fetch(`https://api.quran.sutanlab.id/surah/${id}`)
    .then((res) => res.json())
    .then((res) => {
      res.data.verses.forEach((el) => {
        arabText.push(el.text.arab);
        oqilishi.push(el.text.transliteration.en);
        audio.push(el.audio.primary);
      });
    });
};
box.addEventListener("click", async function (e) {
  uzbekText = [];
  arabText = [];
  oqilishi = [];
  audio = [];
  let parent = e.target.closest(".card");
  if (!parent) return;
  let text = parent.querySelector(".name").textContent;

  document.querySelector(".heading").textContent = text;

  id = e.target.closest(".card").id;
  box.classList.add("click");
  more.classList.remove("hidden");
  document.body.style.paddingLeft = "2rem";

  // console.log(e.target.textContent);
  await getUzText(id);
  await getText(id);
  console.log(audio);
  cont.innerHTML = "";
  for (let i = 0; i < uzbekText.length; i++) {
    render(arabText[i], uzbekText[i], oqilishi[i], audio[i]);
  }
});

let getUzText = async function (id) {
  await fetch(
    "https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/uzb-alaaudeenmansou.json"
  )
    .then((res) => res.json())
    .then((res) => {
      res.quran.forEach((element) => {
        if (element.chapter == id) {
          uzbekText.push(element.text);
        }
      });
    });
};

let render = function (arab, uzbek, oqilishi, audio) {
  let item = `
  <div class="desc-item">
  <div class="control"></div>
  <div class="arabic-text">
  ${arab}
  </div>
  <div class="oqilishi-text">
 ${oqilishi}
</div>
  <div class="uzbek-text">
   ${uzbek}
  </div>
  <audio
  class="audio-player"
  controls
  src="${audio}"
></audio>
</div>`;
  cont.insertAdjacentHTML("beforeend", item);
};
