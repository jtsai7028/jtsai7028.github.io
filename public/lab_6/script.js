// You may wish to find an effective randomizer function on MDN.
function range(int) {
  const arr = [];
  for (let i = 0; i < int; i += 1) {
    arr.push(i);
  }
  return arr;
}

function sortFunction(a, b, key) {
  if (a[key] < b[key]) {
    return -1;
  } if (a[key] > b[key]) {
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

    //Random Country Selection
    let listCountry = [];
    for (i of range(10)) {//
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

    //Tag creation
    // const tag_ol = document.createElement("ol");
    // console.log("create OL");
    // tag_ol.setAttribute("class", "flex-inner");
    // console.log("create Ol attributes");


    // for (x of range(10)) {
    //   let tag_li = document.createElement("li");
    //   console.log("li" + x);
    //   let tag_input = tag_li.appendChild(document.createElement("input"));
    //   console.log("input" + x);
    //   tag_input.setAttribute("type", "checkbox");
    //   tag_input.setAttribute("id", "country" + x);
    //   tag_input.setAttribute("name", "country" + x);
    //   let tag_label = tag_li.appendChild(document.createElement("label"));
    //   console.log("label" + x);
    //   tag_label.setAttribute("for", "country" + x);
    //   tag_label.textContent = fromServer[Math.random() * 10]["name"];//fix this to grab from json
    //   console.log(tag_label.content + " = " + "${fromServer[Math.random()].name}");
    //   console.log(tag_label.content);
    // }


    // const size = range(10).map(x => Math.random() * 10);//remove decimal by *10

    // console.log('list', list);
    // console.log('fromServer', fromServer);
  })
  .catch((err) => console.log(err));
});
