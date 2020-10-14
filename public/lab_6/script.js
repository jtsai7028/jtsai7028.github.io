// You may wish to find an effective randomizer function on MDN.
function getRndInteger(min, max) {//returns a random number between min and max (both included)
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}


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
      const tag_ul = document.createElement("ol");
      console.log("create OL");
      tag_ul.setAttribute("class", "flex-inner");
      console.log("create Ol attributes");
      for (x of range(10)) {//where does Map function apply?
        let tag_li = document.createElement("li");
        console.log("li" + x);
        let tag_input = tag_li.appendChild(document.createElement("input"));
        console.log("input" + x);
        tag_input.setAttribute("type", "checkbox");
        tag_input.setAttribute("id", "country" + x);
        tag_input.setAttribute("name", "country" + x);
        let tag_label = tag_li.appendChild(document.createElement("label"));
        console.log("label" + x);
        tag_label.setAttribute("for", "country" + x);
        tag_label.textContent = "${fromServer[Math.random()].name}";//fix this to grab from json
        console.log("${fromServer[Math.random()].name}");
      }


      // const size = range(10).map(x => Math.random() * 10);//remove decimal by *10

      // console.log('list', list);
      // console.log('fromServer', fromServer);
    })
    .catch((err) => console.log(err));
});
