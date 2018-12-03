//Ryan Adoni, Bhagyesh Patel, Chris Tan, Rohan Krishnakumar
// I pledge my honor that I have abided by the Stevens Honor System.

class Post {

  constructor(name, info, imageLocation, webLink, linkCaption, imageCaption) {
    this._name = name,
    this._info = info,
    this._imageLocation = imageLocation,
    this._webLink = webLink;
    this._linkCaption = linkCaption;
    this._imageCaption = imageCaption;
  }

  build() {
    var largeListItem = document.createElement("li");

    var div = document.createElement("div");
    div.className = 'activity';

    var ul = document.createElement("ul");
    var smallListItem1 = document.createElement("li");
    var h1 = document.createElement("h1");
    var a = document.createElement("a");

    a.className = 'activity-title';
    a.href = this._webLink;
    a.title = this._linkCaption;
    a.appendChild(document.createTextNode(this._name));

    var smallListItem2 = document.createElement("li");

    var h2 = document.createElement("h2");
    h2.appendChild(document.createTextNode(this._info));

    var smallListItem3 = document.createElement("li");


    var img = document.createElement("img");
    img.className = "activity-image";
    img.src = this._imageLocation;
    img.title = this._imageCaption;
    img.alt = "error";



    h1.appendChild(a);
    smallListItem1.appendChild(h1);
    smallListItem2.appendChild(h2);
    smallListItem3.appendChild(img);
    ul.appendChild(smallListItem1);
    ul.appendChild(smallListItem2);
    ul.appendChild(smallListItem3);
    div.appendChild(ul);
    largeListItem.appendChild(div);

    let resultList = parent.document.getElementById('resultList');
    resultList.insertBefore(largeListItem, resultList.childNodes[0]);


  }
}

function handleFormSubmit(event) {
  // This next line prevents the reload of the form
  event.preventDefault();

  var formName = document.getElementById("formName").value;
  var formDescription = document.getElementById("formDescription").value;
  var formImg = document.getElementById("formImg").value;
  var formWebsite = document.getElementById("formWebsite").value;
  var formImgDescription = document.getElementById("formImgDescription").value;

  var post = new Post(formName, formDescription, formImg, formWebsite, "CLICK THIS TO GO TO WEBSITE", formImgDescription);
  post.build();
}

// we need onload due to the window not having a body till later,
// which causes an issues as we want to hid the scroll background

// Have most if not allthe code within the onload, especially
//if it has to do with animtions

window.onload = () => {
  // if its the clicking option pages disable the scrolling
  if (window.location.href.indexOf("index.html") != -1 || window.location.href.indexOf("money.html") != -1) {
    document.body.style.overflow = "hidden";
  }

  if(window.location.href.indexOf("results.html") != -1)
  {
    document.getElementById('addForm').addEventListener('submit', handleFormSubmit);
  }

  // fade in and out the messages at the beginning
  // only occurs if we have the specific items on the page
  try {
    setTimeout(function() {
      fadeItem('#messageFront1', "in");
    }, 1000);
    setTimeout(function() {
      fadeItem('#messageFront1', "out");
    }, 2000);
    setTimeout(function() {
      fadeItem('#messageFront2', "in");
    }, 3500);
    setTimeout(function() {
      fadeItem('#messageFront2', "out");
    }, 7000);
    setTimeout(function() {
      fadeItem('#messageFront3', "in");
    }, 8000);
    setTimeout(function() {
      fadeItem('#messageFront3', "out");
    }, 11000);
    setTimeout(function() {
      fadeItem('#frontPage', "out");
    }, 12000);
  } catch (e) {

  } finally {

  }



  function fadeItem(s, action) {
    if (action === "in") {
      $(s).fadeIn("slow", function() {});
    } else if (action === "out") {
      $(s).fadeOut("slow", function() {});
    } else {
      alert("error with fadeing of item: " + s)
    }
  }

  // if the season divs are on the page then use this code, else ignore it
  try {
    document.getElementById("springDiv").addEventListener('click', function() {
      localStorage.setItem("spring", "true");
    });
    document.getElementById("summerDiv").addEventListener('click', function() {
      localStorage.setItem("summer", "true");
    });
    document.getElementById("fallDiv").addEventListener('click', function() {
      localStorage.setItem("fall", "true");
    });
    document.getElementById("winterDiv").addEventListener('click', function() {
      localStorage.setItem("winter", "true");
    });
  } catch (e) {} finally {}

  // if the price divs are on the page then use this code, else ignore it
  try {
    document.getElementById("cheapDiv").addEventListener('click', function() {
      localStorage.setItem("cheap", "true");
    });
    document.getElementById("fairDiv").addEventListener('click', function() {
      localStorage.setItem("fair", "true");
    });
    document.getElementById("expensiveDiv").addEventListener('click', function() {
      localStorage.setItem("expensive", "true");
    });
  } catch (e) {} finally {}

  //set all the season and price values to be false
  try {
    document.getElementById("back").addEventListener('click', function() {
      localStorage.setItem("spring", "false");
      localStorage.setItem("summer", "false");
      localStorage.setItem("fall", "false");
      localStorage.setItem("winter", "false");

      localStorage.setItem("cheap", "false");
      localStorage.setItem("fair", "false");
      localStorage.setItem("expensive", "false");
    });
  } catch (e) {} finally {}

  // cheap spring posts
  let sc1 = new Post("The Met Museum", "The famous Met Museum, the largest museuem in the US.", "../images/themet.jpg", "https://www.metmuseum.org/", "CLICK THIS TO GO TO WEBSITE", "The Met Museum");
  let sc2 = new Post("The Shops at Columbus Circle", "One of the best malls in Manhattan with over three floors of shops and resturants.", "../images/shops_at_columbus.jpg", "https://www.theshopsatcolumbuscircle.com/", "http://www.theshopsatcolumbuscircle.com/", "The Shops at Columbus Circle");
  let sc3 = new Post("NAME", "DESCRIPTION", "../images/IMAGE_NAME.jpg", "WEB_SITE", "CLICK THIS TO GO TO WEBSITE", "IMAGE_DESCRIPTION");

  // fair spring posts

  // expensive spring posts


  // cheap summer posts
  let ssc1 = new Post("Pier A Park", "A great park on Pier with a gazebo, a great lawn, and a place to fish.", "../images/pier-A-park.jpg", "https://www.hobokennj.gov/location/pier-a-park", "CLICK THIS TO GO TO WEBSITE", "Picture of Pier A Park");
  let ssc2 = new Post("Hoboken Farmers' Market", "Farmers from all over the Garden State come to the corner of 13th Street & Hudson in Hoboken to offer their freshest and the most delicious products.  Open July to November", "../images/Farmers'_Market.jpg", "http://hobokenfarmersmarket.com/", "CLICK THIS TO GO TO WEBSITE", "Picture of fruits at farmers' market");
  let ssc3 = new Post("NAME", "DESCRIPTION", "../images/IMAGE_NAME.jpg", "WEB_SITE", "CLICK THIS TO GO TO WEBSITE", "IMAGE_DESCRIPTION");

  // fair summer posts

  // expensive summer posts


  // cheap fall posts
  let fc1 = new Post("NAME", "DESCRIPTION", "../images/IMAGE_NAME.jpg", "WEB_SITE", "CLICK THIS TO GO TO WEBSITE", "IMAGE_DESCRIPTION");
  
  // fair fall posts

  // expensive fall posts


  // cheap winter posts
  let wc1 = new Post("NAME", "DESCRIPTION", "../images/IMAGE_NAME.jpg", "WEB_SITE", "CLICK THIS TO GO TO WEBSITE", "IMAGE_DESCRIPTION");
  
  // fair winter posts

  // expensive winter posts


  // restaurants
  let r1 = new Post("Stacks Pancake House & Smokehouse BBQ", "Serving 22 different kinds of pancakes and other breakfast and BBQ items, Stacks is a must go if you are in the mood for a sweet treat anytime of the day if you are in Hoboken.", "../images/stacks.jpg", "http://www.stackspancakehouse.net/", "CLICK THIS TO GO TO WEBSITE", "some pancakes");
  let r2 = new Post("Benny Tudino's Pizzeria", "Home of the largest slice of pizza for over 50 years.  Come in in to get a delicious New York style anytime of the year.", "../images/bennys.jpg", "http://bennytudinos.com/", "CLICK THIS TO GO TO WEBSITE", "a pizza pie and the owner");
  let r3 = new Post("Makai Poke Co.", "Simple counter serve making build-your-own, Hawaiian-style sushi bowls, salads & sushi burritos.", "../images/makai.jpg", "http://makaipokeco.com/", "CLICK THIS TO GO TO WEBSITE", "a bowl meal item");
  let r4 = new Post("NAME", "DESCRIPTION", "../images/IMAGE_NAME.jpg", "WEB_SITE", "CLICK THIS TO GO TO WEBSITE", "IMAGE_DESCRIPTION");
 


  // index 1 is cheap, index 2 is fair, index 3 is expensive

  var springlist = [
    [r1, r2, r3, ssc1, sc1, sc2],
    [sc2],
    [sc2]
  ];
  var summerlist = [
    [r1, r2, r3, ssc1, sc1, ssc2],
    [ssc2, sc2],
    [sc2]
  ];
  var falllist = [
    [r1, r2, r3, sc1, ssc2, sc2],
    [ssc2, sc2],
    [sc2]
  ];
  var winterlist = [
    [r1, r2, r3, sc1, sc2],
    [sc2],
    [sc2]
  ];

// to be used to see what list we want to use
  let use = [];
  if (localStorage.getItem("spring") == "true" ){
    console.log("spring");
  if (localStorage.getItem("cheap") == "true" ) {
    use = springlist[0];
  } else if (localStorage.getItem("fair") == "true" ) {
    use = springlist[1];
  } else if (localStorage.getItem("expensive") == "true" ) {
    use = springlist[2];
  }
} else if (localStorage.getItem("summer") == "true" ) {
  console.log("summer");
  if (localStorage.getItem("cheap") == "true" ) {
    use = summerlist[0];
  } else if (localStorage.getItem("fair") == "true" ) {
    use = summerlist[1];
  } else if (localStorage.getItem("expensive") == "true" ) {
    use = summerlist[2];
  }
} else if (localStorage.getItem("fall") == "true" ) {
  if (localStorage.getItem("cheap") == "true" ) {
    use = falllist[0];
  } else if (localStorage.getItem("fair") == "true" ) {
    use = falllist[1];
  } else if (localStorage.getItem("expensive") == "true" ) {
    use = falllist[2];
  }
} else if (localStorage.getItem("winter") == "true" ) {
  if (localStorage.getItem("cheap") == "true" ) {
    use = winterlist[0];
  } else if (localStorage.getItem("fair") == "true" ) {
    use = winterlist[1];
  } else if (localStorage.getItem("expensive") == "true" ) {
    use = winterlist[2];
  }
}



function buildpage(use){
  for(i =0;i<use.length;i++){
    use[i].build();
  }
}


buildpage(use);


}
