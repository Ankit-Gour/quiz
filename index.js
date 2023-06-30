var l;
var count = 0;
var answer;
function options(level) {
  document.getElementById("options").remove();
  l = level;
  add_category();
}












































// var right_a="hello";
var o_c,
  o_word,
  number_Of_Questions = 5,
  number_Of_Correct_Questions = 0;
var question;

let category = (c, word) => {
  count++;

  if (count < number_Of_Questions + 1) {
    o_c = c;
    o_word = word;

    document.getElementById("cat").innerText = ``;

    fetch(`https://opentdb.com/api.php?amount=1&category=${c}&difficulty=${l}`)
      .then((data) => {
        // console.log(`status code:${data.status}`);

        return data.json();
      })
      .then((old_data) => {
        // console.log(old_data);

        // let data = Array.from(old_data.results);
        // data.forEach((e) => {
        // console.log(e);
        if(old_data.results[0].question!=question){
        var ra = old_data.results[0].correct_answer;

        question=old_data.results[0].question;
        
        let q = document.getElementById("qa");
        q.innerHTML = `
            
            <p id="q">${l.toUpperCase()} LEVEL ${word.toUpperCase()}</p>   
            
            <p>${count}. ${old_data.results[0].question}</p>   
          `;
        let incorrect_answers = Array.from(
          old_data.results[0].incorrect_answers
        );

        if (incorrect_answers.length === 3) {
          q.innerHTML += ` <div class="container">
            <div class="form-check">  
            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" onclick="check('exampleRadios1')">
            <label class="form-check-label" for="exampleRadios1" id="label1">
            ${old_data.results[0].incorrect_answers[0]}
            </label>
            </div>
            <div class="form-check">
            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2"  onclick="check('exampleRadios2')">
            <label class="form-check-label" for="exampleRadios2"   id="label2">
            ${old_data.results[0].incorrect_answers[2]}
            </label>
            </div>
            <div class="form-check">
            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="option2" onclick="check('exampleRadios3')">
            <label class="form-check-label" for="exampleRadios3" id="label3">
            ${old_data.results[0].incorrect_answers[1]}
            </label>
            </div>
            <div class="form-check">
            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios4" value="option2" onclick="check('exampleRadios4')" >
            <label class="form-check-label" for="exampleRadios4" id="label4">
            ${old_data.results[0].correct_answer}
            </label>
            </div>
            
            </div>`;
        } else {
          q.innerHTML += ` <div class="container">
            <div class="form-check">  
            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios5" value="option1" onclick="check('exampleRadios5')" >
            <label class="form-check-label" for="exampleRadios5" id="label5">
            ${old_data.results[0].incorrect_answers[0]}
            </label>
            </div>
            <div class="form-check">
            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios6" value="option2" onclick="check('exampleRadios6')">
            <label class="form-check-label" for="exampleRadios6" id="label6">
            ${old_data.results[0].correct_answer}
            </label>
            </div>`;
        }
        document.body.append(q);

        return ra;}
      })
      .then((ra) => {
        let next = document.createElement("div");
        next.innerHTML = `<div>
          <button class="next" onclick="category(${o_c},'${o_word}')" id="next-btn">Next</button>  
          </div>`;
        document.getElementById("qa").append(next);

        document.getElementById("next-btn").addEventListener("click",()=>{

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
        })
        return ra;
      }).then((data)=>{
        console.log(question);
        
      })
  }

    
if(count==number_Of_Questions+1){
  document.getElementById("next-btn").innerText=` Submit`
 console.log( document.getElementById("next-btn"));
 
}

  if (count == number_Of_Questions + 2) {
console.log(`count inside the if condition ${count}`);

  document.body.innerHTML = ``;
  let result = document.createElement("div");
  result.innerHTML = `<div id="result"><p>You Won The Challenge  \n ${number_Of_Correct_Questions}/${number_Of_Questions}</p>
  </div>
  `;
  document.body.append(result);
}
  }
  
  





function check(id){
  if(document.getElementById(id).hasAttribute("checked")){

  }else{
    console.log( document.getElementById(id).outerHTML);
    // console.log( document.getElementById(id).outerHTML);
    document.getElementById(id).outerHTML=`<input class="form-check-input" type="radio" name="exampleRadios" id="${id}" value="option2" checked onclick="check('${id}')">`
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
