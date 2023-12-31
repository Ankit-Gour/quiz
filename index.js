window.onload = document.getElementById("howmany").value = "";
var number_Of_Questions = 5;

document.getElementById("sl").addEventListener("click", () => {
  number_Of_Questions = document.getElementById("howmany").value;
  if (number_Of_Questions > 0) {
    document.getElementById("howmanyq").remove();
    add_options();
  } else {
  
    let message = document.createElement("div");
    message.innerHTML = `<div id="image"><p>Please Attempt At Least One Question</p></div>`;

    document.body.append(message);
    setTimeout(() => {
      image.remove();
   
    }, 3000);
  }
});

function add_options() {
  let options = document.createElement("div");
  options.innerHTML = ` <div class="my-3" id="options">
  <button
    class="mx-5 my-3 level"
    onclick="options('easy')"
    type="button"
    id="option1"
  >
    Easy
  </button>
  <button
    class="mx-5 my-3 level"
    onclick="options('medium')"
    type="button"
    id="option2"
  >
    Medium
  </button>
  <button
    class="mx-5 my-3 level"
    onclick="options('hard')"
    type="button"
    id="option3"
  >
    Hard
  </button>
</div> `;
  document.body.append(options);
}

var l,
  count = 0,
  answer;
function options(level) {
  document.getElementById("options").remove();
  l = level;
  add_category();
}

var o_c,
  o_word,
  number_Of_Correct_Questions = 0,
  question;

let category = (c, word) => {
  count++;

  if (count <= number_Of_Questions) {
    o_c = c;
    o_word = word;

    document.getElementById("cat").innerText = ``;

    fetch(
      `https://opentdb.com/api.php?amount=1&category=${c}&difficulty=${l}&type=multiple`
    )
      .then((data) => {
        // console.log(`status code:${data.status}`);

        return data.json();
      })
      .then((old_data) => {
        // console.log(old_data);

        // let data = Array.from(old_data.results);
        // data.forEach((e) => {
        // console.log(e);
        if (old_data.results[0].question != question) {
          var ra = old_data.results[0].correct_answer;

          let incorrect_answers = Array.from(
            old_data.results[0].incorrect_answers
          );

          let correct_answer = [
            old_data.results[0].incorrect_answers[0],
            old_data.results[0].incorrect_answers[2],
            old_data.results[0].incorrect_answers[1],
            old_data.results[0].correct_answer,
          ];
          console.log(correct_answer[3]);
          question = old_data.results[0].question;

          let q = document.getElementById("qa");
          q.innerHTML = `
          
          <p id="q">${l.toUpperCase()} LEVEL ${word.toUpperCase()}</p>   
            <div id="to-center">
            <p>${count}. ${old_data.results[0].question}</p>   
         <div class="container" id="ans">
              <div class="form-check">  
              <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" onclick="check('exampleRadios1')">
              <label class="form-check-label " for="exampleRadios1" id="label1">
              ${correct_answer[(count + 1) % 4]}
              </label>
              </div>
              <div class="form-check">
              <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2"  onclick="check('exampleRadios2')">
              <label class="form-check-label  " for="exampleRadios2"   id="label2">
              ${correct_answer[(count + 2) % 4]}
              </label>
              </div>
              <div class="form-check">
              <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="option2" onclick="check('exampleRadios3')">
              <label class="form-check-label " for="exampleRadios3" id="label3">
              ${correct_answer[(count + 3) % 4]}
              </label>
              </div>
              <div class="form-check">
              <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios4" value="option2" onclick="check('exampleRadios4')" >
              <label class="form-check-label " for="exampleRadios4" id="label4">
              ${correct_answer[count % 4]}
              </label>
            </div>
            </div>
            </div>`;

          document.body.append(q);

          return ra;
        }
      })
      .then((ra) => {
        let next = document.createElement("div");
        next.innerHTML = `<div id="next-button-div">
        <button class="next" onclick="category(${o_c},'${o_word}'),spinner()" id="next-btn">Next</button>  
        </div>`;
        document.getElementById("qa").append(next);

        document.getElementById("next-btn").addEventListener("click", () => {
          let b = document.getElementsByClassName("form-check-input");
          let a = Array.from(b);
          a.forEach((a) => {
            if (a.hasAttribute("checked") === true) {
              let b = a.id.replace("exampleRadios", "label");
              if (document.getElementById(b).innerText === ra) {
                console.log("your answer is correct");
                number_Of_Correct_Questions++;
              }
            }
          });
        });

        return ra;
      })
      .then((data) => {
        // console.log(question);
      });
  }

  // console.log(`count:${count} number of questions:${number_Of_Questions}`);

  // console.log(count > number_Of_Questions);

  if (count > number_Of_Questions) {
    document.getElementById("next-btn").innerText = ` Submit`;
    document.getElementById("next-btn").classList.add("submit");
    document.getElementById("next-btn").onclick = result;
  }

  // if (count == number_Of_Questions+2)
  function result() {
    // console.log(`count inside the if condition ${count}`);

    document.body.innerHTML = ``;
    let result = document.createElement("div");
    if (number_Of_Correct_Questions >= 0.4 * number_Of_Questions) {
      result.innerHTML = `<div id="result" class="bg-pass">
      <img src="https://is.gd/AruEOF" id="success" >
      <p>You Won The Challenge </p>
      <p>Correct Answers ${number_Of_Correct_Questions}</p>
      <p>Incorrect Answers ${
        number_Of_Questions - number_Of_Correct_Questions
      }</p>
      <p>Your Strike Rate Was ${(
        (number_Of_Correct_Questions / number_Of_Questions) *
        100
      ).toFixed(0)}%</p>
     
  </div>
  `;
    } else {
      result.innerHTML = `<div id="result" class="bg-fail">
      <img src="https://is.gd/a93QY5" id="fail" >
      <p>You Lose The Challenge</p>
      <p>Correct Answers ${number_Of_Correct_Questions}</p>
      <p>Incorrect Answers ${
        number_Of_Questions - number_Of_Correct_Questions
      }</p>
      <p>Your Strike Rate Was ${(
        (number_Of_Correct_Questions / number_Of_Questions) *
        100
      ).toFixed(0)}%</p>
  </div>
  `;
    }
    document.body.append(result);
  }
};

function check(id) {
  if (document.getElementById(id).hasAttribute("checked")) {
  } else {
    console.log(document.getElementById(id).outerHTML);
    // console.log( document.getElementById(id).outerHTML);
    document.getElementById(
      id
    ).outerHTML = `<input class="form-check-input" type="radio" name="exampleRadios" id="${id}" value="option2" checked onclick="check('${id}')">`;
  }
}

function add_category() {
  let cat = document.createElement("div");
  cat.innerHTML = `<div class=" flex-column d-flex align-items-center" id="cat">
    <button class="button" type="button" onclick="category(9,'General Knowledge')">General Knowledge</button>
    <button class="button" type="button" onclick="category(18,'Science: Computers')">Science: Computers</button>
    <button class="button" type="button" onclick="category(19,'Science: Mathematics')">Science: Mathematics</button>
    <button class="button" type="button" onclick="category(24,'Politics')">Politics</button>
    <button class="button" type="button" onclick="category(30,'Science: Gadgets')">Science: Gadgets</button>
    <button class="button" type="button" onclick="category(20,'Mythology')">Mythology</button>
    <button class="button" type="button" onclick="category(21,'Sports')">Sports</button>
    <button class="button" type="button" onclick="category(22,'Geography')">Geography</button>
    <button class="button" type="button" onclick="category(23,'History')">History</button>
    <button class="button" type="button" onclick="category(27,'Animals')">Animals</button>
    <button class="button" type="button" onclick="category(10,'Entertainment: Books')">Entertainment: Books</button>
    <button class="button" type="button" onclick="category(11,'Entertainment: Film')">Entertainment: Film</button>
  </div>`;

  document.body.append(cat);
}

function spinner() {
  let spin = document.createElement("div");
  spin.innerHTML = `<div id="spinner"><div   class="spinner-border text-danger" role="status" id="spin">
<span class="visually-hidden"   >Loading...</span>
</div></div>
`;
  document.getElementById("qa").append(spin);
}




// changing the text on the select level button on hoever

let a=document.getElementById("sl");
a.addEventListener("mouseenter",()=>{
  setTimeout(() => {
    
    a.innerHTML=`Go Ahead`
  },50);
})
a.addEventListener("mouseleave",()=>{
  setTimeout(() => {
    
    a.innerHTML=`Select Level`
  }, 50);
})
console.log(a);

