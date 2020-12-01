import dBound from "./utill.js";
//selecting the elements
const input1 = document.querySelector("input");
const input2 = document.querySelector(".two");
const reDivOne = document.querySelector("#res");
const reDivTwo = document.querySelector('#resTwo');
const firstCol = document.querySelector("#firstCol");
const secendCol = document.querySelector('#secondCol');
let show;
let showTwo;
let empty;
let resultBox;
//fething dataID
const findD = async (movieName) => {
    const response = await axios.get(`http://www.omdbapi.com/`, {
        params: {
            apikey: "d0643695",
            s: movieName,
        },
    });
    if (response.data.Error) {
        reDivOne.classList.remove("result");
        reDivOne.innerHTML = "there wasn resoult!";
        console.log(response.data.Error);
        empty = true;
        return [];
    }
    return response.data.Search;
};

//fetching movie info
const findM = async (movieName) => {
    const responseId = await findD(movieName);
    let mainId = responseId[0].imdbID;
    const response = await axios.get(`http://www.omdbapi.com/`, {
        params: {
            apikey: "d0643695",
            i: mainId,
        },
    });
    return response.data;
};
//making html details
const htmlBox = async (value, col) => {
    let obj = await findM(value);
    console.log(obj);
    resultBox = true;
    const div = document.createElement("div");
    let html = `
  <div id="picture" class="row justify-content-center mt-3">
  <div class="col-md-12">
  <img class="result-img" src="${obj.Poster}" alt="" />
  </div>
  <div id="nameMovie" class="row">
  <div class="col-md-12"><h2>${obj.Title}</h2></div>
  </div>
  <div id="directorMovie" class="row">
  <div class="col-md-12"><h4>${obj.Director}</h4></div>
  </div>
  <div id="descMovie" class="row">
  <div class="col-md-12"><p>${obj.Plot}</p></div>
  </div>
  <div class="row" id="reteMovie">
  <div class="col-md-4 vertical"><span class="yell">Year</span><span>${obj.Year}</span></div>
  <div class="col-md-4 vertical"><span class="yell">IMDB</span><span>${obj.imdbRating}</span></div>
  <div class="col-md-4 vertical"><span class="yell">Time</span><span>${obj.Runtime}</span></div>
</div>
  </div>`;
    div.classList.add("media-content");
    div.innerHTML = html;
    setTimeout(() => {
        col.appendChild(div);
    }, 1000);
};

//dropdown menu
const onInput = (reDiv, input, column) => {
    return dBound(async (e) => {
        const arrayS = await findD(e.target.value.trim());
        if (arrayS.length === 0) {
            empty = true;
            reDiv.innerHTML = "";
            return;
        }
        reDiv.classList.add("result");
        show = true;
        if (reDiv === reDivTwo) {
            showTwo = true;
        }
        empty = false;
        reDiv.innerHTML = "";
        for (let key of arrayS) {
            reDiv.innerHTML += `
            <a href="">
            <div class="box">
            <div class="poster">
            <img src="${
              key.Poster === "N/A"
                ? "https://safetyaustraliagroup.com.au/wp-content/uploads/2019/05/image-not-found.png"
                : key.Poster
            }" alt="">
            </div>
            <div class="title">
            <h2>${key.Title}</h2>
            </div>
            </div></a>`;
        }
        for (let key of reDiv.children) {
            key.addEventListener("click", () => {
                input.value = key.textContent.trim();
                htmlBox(input.value, column);
            });
        }
    }, 2500);
}
//closing the dropshow with mouse
document.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.id !== "res" && e.target.id !== 'resTwo' && !e.target.classList.contains("one") && !empty) {
        if (show) {
            reDivOne.classList.add("close");
            show = false;
        }
        if (showTwo) {
            reDivTwo.classList.add("close");
            showTwo = false;
        } else if (e.target.classList.contains('two') && showTwo === false) {
            reDivTwo.classList.remove('close');
            showTwo = true;
        }
    } else if (e.target.classList.contains("one") && show === false) {
        reDivOne.classList.remove("close");
        show = true;
    }

});

input1.addEventListener("input", onInput(reDivOne, input1, firstCol));
input2.addEventListener('input', onInput(reDivTwo, input2, secendCol));