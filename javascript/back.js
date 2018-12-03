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

  //set all the season and price values to be false this is to reset all values
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


  // format   constructor(name, info, imageLocation, webLink, linkCaption, imageCaption) {
  //// TODO:  let example = new Post("NAME", "DESCRIPTION", "../images/IMAGE_NAME.jpg", "WEB_SITE", "CLICK THIS TO GO TO WEBSITE", "IMAGE_DESCRIPTION");

  let all1 = new Post("K-Town", "Ethnic Korean enclave in Midtown Manhattan. Featrues over 150 businesses, ranging from small resturants and beauty salons to large branches of Korean banking conglomerates." , "../images/ktown.jpg", "https://www.whatshouldwedo.com/blog/koreatown-nyc/", "CLICK THIS TO GO TO WEBSITE", "Glimpse of K-town at night");
  let all2 = new Post("FAO Schwarz", "\FAO Schwarz is an American toy store. The company is known for its unique high-end toys, life-sized stuffed animals, dolls, and games.", "../images/fao.jpg", "https://faoschwarz.com/", "CLICK THIS TO GO TO WEBSITE", "One of the many toy sections in the store");

  //resturant that are all and cheap/fair
  let wRcf = new Post("Blue Smoke", "Blue Smoke is a barbecue restaurant rooted in the culinary traditions of the American South and raised in New York City.", "../images/blue.jpg", "https://www.bluesmoke.com/", "CLICK THIS TO GO TO WEBSITE", "People enjoying a multitude of southern dishes");


  // resturants that are all time fair / expensive
  let anyRfe = new Post("Il Corso", "Fresh pastas dominate a traditional Italian menu in a modern setting with a neighborhood feel.", "../images/corso.jpg", "http://www.ilcorsorestaurant.com/", "CLICK THIS TO GO TO WEBSITE", "Many people having the amazing food at the resturant");
  let anyRfe2 = new Post("Tao Restaurant", "A resturant that specializes in the fusion of asian food in lower manhattan. Very lively with amazing service and food.", "../images/tao.jpg", "https://taorestaurant.com/", "CLICK THIS TO GO TO WEBSITE", "Inside of the very decorous resturant. ");

  //all cheap
  let allc1 = new Post("Museum of Modern Art", "Come check out one of the largest and most influential museums of modern art in the world, featuring approximately 300,000 books and exhibition catalogs, over 1,000 periodical titles, and over 40,000 files of ephemera about individual artists and groups. The museum offers a free admission program UNIQLO Free Friday Nights- which provides free access to all exhibitions from 4:00 PM to 8:00 PM every Friday throughout the year. ", "../images/moma.jpg", "https://www.moma.org/", "CLICK THIS TO GO TO WEBSITE", "Exhibition in the museum featuring modern art");
  let allc2 = new Post("The Gravity Vault", "A popular rock climbing gym featuring 14,000+ square feet of climbing, 40+ foot climbing walls, 45-60 top rope stations and bouldering. ", "../images/gravityvault.jpg", "https://www.gravityvault.com/locations/hoboken-nj", "CLICK THIS TO GO TO WEBSITE", "Walls to climb");


 // all fair
  let allf1 = new Post("Nat. Geo. Encounter", "Times Square tourists will be able to take a digital dive deep into the heart of the sea without even getting damp at the National Geographic Encounter.", "../images/natneo.jpg", "https://natgeoencounter.com", "CLICK THIS TO GO TO WEBSITE", "The digital sting ray exhibit in the encounter");

 //all expenseive
   let alle1 = new Post("Gucci Brookfield", "One of the best known luxury brand known for modern, Italian-crafted leather goods, apparel & accessories for men & women.", "../images/gucci.jpg", "https://www.gucci.com/us/en/", "CLICK THIS TO GO TO WEBSITE", "Inside of the store");
   let alle2 = new Post("Saks Fifth Ave", "Saks Fifth Avenue is an American chain of luxury department stores owned by the oldest commercial corporation in North America, the Hudson's Bay Company", "../images/saks.jpg", "https://www.saksfifthavenue.com/Entry.jsp", "CLICK THIS TO GO TO WEBSITE", "Inside of Saks Fifth Ave, in the mens deparetment");

  // cheap spring posts
  let sc1 = new Post("The Met Museum", "The famous Met Museum, the largest museuem in the US.", "../images/themet.jpg", "https://www.metmuseum.org/", "CLICK THIS TO GO TO WEBSITE", "The Met Museum");
  let sc2 = new Post("The Shops at Columbus Circle", "One of the best malls in Manhattan with over three floors of shops and resturants.", "../images/shops_at_columbus.jpg", "https://www.theshopsatcolumbuscircle.com/", "CLICK THIS TO GO TO WEBSITE", "The Shops at Columbus Circle");
  let sc4 = new Post("Statue of Liberty","The Statue of Liberty is a colossal neoclassical sculpture on Liberty Island in New York Harbor in New York City, in the United States. The copper statue, a gift from the people of France to the people of the United States, was designed by French sculptor Frédéric Auguste Bartholdi and built by Gustave Eiffel.","../images/statue.jpg", "https://www.nps.gov/stli/planyourvisit/index.htm", "visit their website", "The Statue for the water that surrounds it");


  // fair spring posts
  let sf1 = new Post("Top of the Rock", "Observatory on top of Rockefeller Center, with an ocean-liner style design, offering city views.", "../images/toprock.jpg", "https://www.topoftherocknyc.com/", "CLICK THIS TO GO TO WEBSITE", "View of the NYC sky line from rockefeller center");

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
  let exwc = new Post("NAME", "DESCRIPTION", "../images/IMAGE_NAME.jpg", "WEB_SITE", "CLICK THIS TO GO TO WEBSITE", "IMAGE_DESCRIPTION");
  let wc1 = new Post("The Rockefeller Center Tree Lighting", "New York City’s favorite Christmas Tree will be lit the first week of December, and will remain lit until early January. Don’t miss this beloved holiday event!", "../images/tree.jpg", "https://www.rockefellercenter.com/whats-happening/2018/11/28/2018-rockefeller-center-christmas-tree/", "CLICK THIS TO GO TO WEBSITE", "The massive tree in front of Rockefeller center");

  // fair winter posts
  let wf1 = new Post("The Rink at Rockefeller Center", "the heart of Midtown, steps from Times Square and the Theater District, The Rink at Rockefeller Center is a New York City tradition that everyone can enjoy.", "../images/rockefeller.jpg", "https://therinkatrockcenter.com/", "CLICK THIS TO GO TO WEBSITE", "People skating at the seasonal rink");

  // expensive winter posts


  // restaurants
  let r1 = new Post("Stacks Pancake House & Smokehouse BBQ", "Serving 22 different kinds of pancakes and other breakfast and BBQ items, Stacks is a must go if you are in the mood for a sweet treat anytime of the day if you are in Hoboken.", "../images/stacks.jpg", "http://www.stackspancakehouse.net/", "CLICK THIS TO GO TO WEBSITE", "some pancakes");
  let r2 = new Post("Benny Tudino's Pizzeria", "Home of the largest slice of pizza for over 50 years.  Come in in to get a delicious New York style anytime of the year.", "../images/bennys.jpg", "http://bennytudinos.com/", "CLICK THIS TO GO TO WEBSITE", "a pizza pie and the owner");
  let r3 = new Post("Makai Poke Co.", "Simple counter serve making build-your-own, Hawaiian-style sushi bowls, salads & sushi burritos.", "../images/makai.jpg", "http://makaipokeco.com/", "CLICK THIS TO GO TO WEBSITE", "a bowl meal item");
  let r4 = new Post("NAME", "DESCRIPTION", "../images/IMAGE_NAME.jpg", "WEB_SITE", "CLICK THIS TO GO TO WEBSITE", "IMAGE_DESCRIPTION");



  // index 1 is cheap, index 2 is fair, index 3 is expensive

  var springlist = [
    [r1, r2, r3, ssc1, sc1, sc2,sc4,allc1,allc2,all1,all2],
    [sc2,allf1,sf1,all1,all2,anyRfe,anyRfe2],
    [sc2,alle2,alle1,all1,all2,anyRfe,anyRfe2]
  ];
  var summerlist = [
    [r1, r2, r3, ssc1, sc1, ssc2,sc4,allc1,allc2,all1,all2],
    [r1, r2, r3, ssc1, sc1, sc2,sf1,allf1,all1,all2,anyRfe,anyRfe2],
    [r1, r2, r3, ssc1, alle2, alle1,all1,all2,anyRfe,anyRfe2]
  ];
  var falllist = [
    [r1, r2, r3, sc1, ssc2, sc2,allc1,allc2,all1,all2],
    [ssc2, sc2,allf1,all1,all2,anyRfe,anyRfe2],
    [sc2,sc2,alle2,alle1,all1,all2,anyRfe,anyRfe2]
  ];
  var winterlist = [
    [r1, r2, r3, sc1, sc2,allc1,allc2,all1,wc1,all2,wRcf],
    [sc2,allf1,all1,wf1,all2,anyRfe,anyRfe2,wRcf],
    [sc2,alle2,alle1,all1,all2,anyRfe,anyRfe2]
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
  if (window.location.href.indexOf("results.html") != -1 ) {
    var nums = [];


    // picks events randomly to set to the site
    for (let i = 0;i<3;i++){
      let a = Math.floor(Math.random() * ((use.length-1) - 0 + 1)) + 0;
      console.log(a);
      //if the event is in the list to be used regen a new event
      while (nums.includes(a)){
        a = Math.floor(Math.random() * ((use.length-1) - 0 + 1)) + 0;
      }
      // add to the list to be used
      nums.push(a);
    }
    console.log(use.lenght);
    //build the actual site
    for(let i =0;i<nums.length;i++){
      use[nums[i]].build();
    }
  }
}


buildpage(use);


}
