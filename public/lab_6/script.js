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

    //clear previous Selection
    const exist = document.querySelector("ol");
    if (exist != null) {
      exist.parentElement.removeChild(exist);
      console.log("-----------------------------------------remove children");
    }

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

    //Tag Creation
    $("form").prepend(document.createElement("ol"));
    console.log("create OL");
    document.querySelector("ol").className = "flex-inner";
    console.log("check class");

    for (k of revListCountry) {
      const attribute_type = document.createAttribute("type");
      attribute_type.value = "checkbox";
      $("ol").append(document.createElement("li"));
      $("li").append(document.createElement("input")).
      append(document.createElement("label").innerHTML = k);
      console.log("li " + k);
      $("input").attr("type", "checkbox");
      $("input").attr("id", k);
      $("input").attr("name", k);
      $("label").attr("for", k);
    }

    // console.log('fromServer', fromServer);
  })
  .catch((err) => console.log(err));
});
