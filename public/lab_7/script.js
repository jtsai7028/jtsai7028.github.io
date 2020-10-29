//My Section
function range(int) {
  const arr = [];
  for (let i = 0; i < int; i += 1) {
    arr.push(i);
  }
  return arr;
}

function randomIntInc(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//End My Section

function convertRestaurantsToCategories(restaurantList) {
  // process your restaurants here!
  //probably reduce function, convert restaurants to categories
  console.log("convertRestaurantsToCategories");
  const reshape = restaurantList.reduce((collection, item, i) => {
    const category = collection.find((f) => f.label === item.category);
    if (!category) {
      collection.push({
        label: item.category,
        y: 1
      });
    } else {
      category.y += 1;
    }
    return collection;
  }, []);

  console.table(reshape);

  return reshape;
}

function makeYourOptionsObject(datapointsFromRestaurantsList) {
  // set your chart configuration here!
  console.log("makeYourOptionsObject");
  CanvasJS.addColorSet('customColorSet1', [
    // add an array of colors here https://canvasjs.com/docs/charts/chart-options/colorset/
    "#2F4F4F",
    "#008080",
    "#2E8B57",
    "#3CB371",
    "#90EE90"
  ]);

  return {
    animationEnabled: true,
    colorSet: 'customColorSet1',
    title: {
      text: 'Places To Eat Out In Future'
    },
    axisX: {
      interval: 1,
      labelFontSize: 12
    },
    axisY2: {
      interlacedColor: 'rgba(1,77,101,.2)',
      gridColor: 'rgba(1,77,101,.1)',
      title: 'Restaurants by Category',
      labelFontSize: 12,
      scaleBreaks: {customBreaks: [
        {
          type: "zigzag",
          startValue: 40,
          endValue: 50,
          color: "blue"
        },
        {
          type: "zigzag",
          startValue: 85,
          endValue: 100,
          color: "blue"
        },
        {
          type: "zigzag",
          startValue: 140,
          endValue: 175,
          color: "blue"
        }

      ]} // Add your scale breaks here https://canvasjs.com/docs/charts/chart-options/axisy/scale-breaks/custom-breaks/
    },
    data: [{
      type: 'bar',
      name: 'restaurants',
      axisYType: 'secondary',
      dataPoints: datapointsFromRestaurantsList
    }]
  };
}

function runThisWithResultsFromServer(jsonFromServer) {
  console.log('jsonFromServer', jsonFromServer);
  sessionStorage.setItem('restaurantList', JSON.stringify(jsonFromServer)); // don't mess with this, we need it to provide unit testing support
  // Process your restaurants list
  // Make a configuration object for your chart
  // Instantiate your chart
  if (document.querySelector(".created-element")) {//remove prev
    document.querySelector(".created-element").remove();
  }

  const newArr = range(10);
  const objList = newArr.map((i) => {
    const number = randomIntInc(0, jsonFromServer.length);
    return jsonFromServer[number];
  });
  console.table(objList);
  const reorganizedData = convertRestaurantsToCategories(jsonFromServer);
  const options = makeYourOptionsObject(reorganizedData);
  const chart = new CanvasJS.Chart('chartContainer', options);
  chart.render();

  const newH = document.createElement("h1");
  $("form").append(newH);
  newH.className = "created-element";
  $(newH).append("Restaurant Categories: " + reorganizedData.length);
}

// Leave lines 52-67 alone; do your work in the functions above
document.body.addEventListener('submit', async (e) => {
  e.preventDefault(); // this stops whatever the browser wanted to do itself.
  const form = $(e.target).serializeArray();
  console.log("eventListener");
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then((fromServer) => fromServer.json())
    .then((jsonFromServer) => runThisWithResultsFromServer(jsonFromServer))

    .catch((err) => {
      console.log(err);
    });
});
