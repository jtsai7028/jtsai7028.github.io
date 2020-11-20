// You may wish to find an effective randomizer function on MDN.
function range(int) {
  const arr = [];
  for (let i = 0; i < int; i += 1) {
    arr.push(i);
  }
  return arr;
}

function sortFunction(org, comparison, key) {
  if (org[key] < comparison[key]) {
    return -1;
  } if (org[key] > comparison[key]) {
    return 1;
  }
  return 0;
}
//my functions
function randomInt() {
  return Math.trunc(Math.random() * 100);
}

document.body.addEventListener('submit', async (e) => {
  e.preventDefault(); // this stops whatever the browser wanted to do itself.
  const form = $(e.target).serializeArray(); // here we're using jQuery to serialize the form
  // set fave to yes
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
  .then((fromServer) => fromServer.json())
  .then((fromServer) => {
    // You're going to do your lab work in here. Replace this comment.

    //clear previous Selection
    const exist = document.querySelector("ol");
    if (exist != null) {
      exist.parentElement.removeChild(exist);
      console.log("-----------------------------------------remove previous");
    }

    //Random Country Selection
    let listCountry = [];
    for (i of range(10)) {
      let randInd1 = randomInt();
      console.log(randInd1 + " = " + fromServer[randInd1].name);
      listCountry.push(fromServer[randInd1].name);
    }
    listCountry.sort();
    console.log("-------check sort--------\n" + listCountry);

    console.log("-------unique--------");
    let no_change = true;//create boolean
    while (no_change) {
      console.log("start loop");
      no_change = false;//switch is turned off
      for (let j = 0; j < listCountry.length; j++) {
        if (listCountry[j] == listCountry[j + 1]) {
          console.log("***CHANGE*** " + listCountry[j]);
          let randInd2 = randomInt();
          listCountry[j] = fromServer[randInd2].name;
          console.log("new country: " + listCountry[j]);
          console.log("current state:\n" + listCountry);
          no_change = true;//switch is turned on, loop should break
          listCountry.sort();
          console.log("another sort:\n" + listCountry);
        }
      }
    }

    revListCountry = listCountry.reverse();
    console.log(revListCountry);

    //Tag Creation
    $("form").prepend(document.createElement("ol"));
    document.querySelector("ol").className = "flex-inner";
    const input_type = document.createAttribute("type");
    input_type.value = "checkbox";

    for (k of revListCountry) {
      //create the components
      let li_tag = document.createElement("li");
      let input_tag = document.createElement("input");
      input_tag.setAttribute("type", "checkbox");
      let label_tag = document.createElement("label");

      $("ol").append(li_tag);
      //refer to the newly created tag rather than all of them (which would be indicated by general "" usage)
      $(li_tag).append(input_tag);
      $(li_tag).append(label_tag);
      //add attributes
      $(input_tag).attr("id", k);
      $(input_tag).attr("name", k);
      $(label_tag).attr("for", k);
      $(label_tag).text(k);

      console.log("li " + k);

      //get the country code
      let code = fromServer.map(c => {
        if (c.name == k) {
          return c.code;
        }
      });
      let code_toString = code.toString();//make sure it's a string
      let count = 0;
      while (count < code_toString.length) {//clean the ,,,,
        code_toString = code_toString.replace(/[,]/, " ");
        count++
      }
      let clean = code_toString.trim();

      console.log(k + " is " + clean);
      $(input_tag).attr("value", clean);
    }

  })
  .catch((err) => console.log(err));
});

/*Prof's code:
if (document.querySelector('.flex-inner')) {
document.querySelector('.flex-inner').remove();
}
const newArr = range(10);
const newArr2 = newArr.map(() => {
  const number = getRandomIntInclusive(0, 243);
  return fromServer[number];
});

const reverseList = newArr2.sort((a,b) => sortByKey(org, compare, 'name'));
const ul = document.createElement('ol');
ol.className = 'flex-inner';
$('form').prepend(ol);

reverseList.forEach(el, i) => {
  const li = document.createElement('li');
  $(li).append('<input type="checkbox" value=$(el.code) id=$(el.code) />');
  $(li).append('<label for=$(el.code)>$(el.name)</label>');
  $(ol).append(li);
}
*/

/* Extra Prof
.then((fromServer) => fromServer.json())
.then((jsonFromServer) => {
  // You're going to do your lab work in here. Replace this comment.

  console.log('jsonFromServer', jsonFromServer);
  const reverseList = newArr2.sort((a, b) => sortFunction(b, a, 'name'));
})
.catch((err) => {
  console.log(err)
  // set fave to no
});
});
*/
