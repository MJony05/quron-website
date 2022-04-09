let box = document.querySelector(".container");
let more = document.querySelector(".desc");
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
box.addEventListener("click", function (e) {
  if (!e.target.classList.contains("container")) {
    console.log(e.target.closest(".card").id);
    box.classList.add("click");
    more.classList.remove("hidden");
    document.body.style.padding = "0 2rem";
  }
});
