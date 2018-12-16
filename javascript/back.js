//Ryan Adoni, Bhagyesh Patel, Chris Tan, Rohan Krishnakumar
// I pledge my honor that I have abided by the Stevens Honor System.
var count = 0;


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
    if (this._webLink.substring(0, 8) === 'https://' || this._webLink.substring(0, 7) === 'http://') {
      a.href = this._webLink;
    } else {
      a.href = 'https://' + this._webLink;
    }
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
    resultList.insertBefore(largeListItem, resultList.childNodes[resultList.childNodes.length - 3]);


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

  var season = document.getElementById("seasonSelector").value;
  var price = document.getElementById("priceSelector").value;

  var post = new Post(formName, formDescription, formImg, formWebsite, "CLICK THIS TO GO TO WEBSITE", formImgDescription);
  let seas = document.getElementById("resultsTitle").innerHTML;

    if (seas.includes(season) && checkIfIn(formName)) {
      if (seas.includes("low") && price.includes("cheap")) {
        post.build();
      } else if (seas.includes("fair") && price.includes("fair")) {
        post.build();
      } else if (seas.includes("shiny") && price.includes("expensive")) {
        post.build();
      }
    }else{
      alert("Sorry Event is already there");
    }
  loadPage(post, season, price);
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

  //if (window.location.href.indexOf("index.html") != -1) {
  //    localStorage.clear();
  //}

  if (window.location.href.indexOf("results.html") != -1) {
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

  loadPage(null, null, null);

}

////////////////////////////////////////////////////////////
// For Season and Price Selector Above
//
// For Result Page Below
//////////////////////////////////////////////////////////

function loadPage(newPost, season, price) {
  console.log("load");
  console.log("post: " + newPost);
  if (window.location.href.indexOf("results.html") == -1) {
    console.log("load");

    return;
  }
  document.cookie = "c=0";
  // if there is no data, 1st load then have  this default data loaded up
  if (newPost == null) {

    var all1 = new Post("K-Town", "Ethnic Korean enclave in Midtown Manhattan. Featrues over 150 businesses, ranging from small resturants and beauty salons to large branches of Korean banking conglomerates.", "../images/ktown.jpg", "https://www.whatshouldwedo.com/blog/koreatown-nyc/", "CLICK THIS TO GO TO WEBSITE", "Glimpse of K-town at night");
    var all2 = new Post("FAO Schwarz", "\FAO Schwarz is an American toy store. The company is known for its unique high-end toys, life-sized stuffed animals, dolls, and games.", "../images/fao.jpg", "https://faoschwarz.com/", "CLICK THIS TO GO TO WEBSITE", "One of the many toy sections in the store");


    //resturant that are all and cheap/fair
    var wRcf = new Post("Blue Smoke", "Blue Smoke is a barbecue restaurant rooted in the culinary traditions of the American South and raised in New York City.", "../images/blue.jpg", "https://www.bluesmoke.com/", "CLICK THIS TO GO TO WEBSITE", "People enjoying a multitude of southern dishes");

    var wsc = new Post("Central Park", "Come check out one of the most famous parks in the world! Set in the middle of bustling Manhattan, its grounds serve as a safe haven, not only for athvares, daydreamers, musicians, and strollers, but also for teems of migratory birds each year.  One can spend an entire peaceful day roaming its grounds, gazing upon nearly 50 fountains, monuments, and sculptures or admiring its 36 bridges and arches.", "../images/centralpark.jpg", "http://www.centralparknyc.org/", "CLICK THIS TO GO TO WEBSITE", "Central park fountain");

    // resturants that are all time fair / expensive
    var anyRfe = new Post("Il Corso", "Fresh pastas dominate a traditional Italian menu in a modern setting with a neighborhood feel.", "../images/corso.jpg", "http://www.ilcorsorestaurant.com/", "CLICK THIS TO GO TO WEBSITE", "Many people having the amazing food at the resturant");
    var anyRfe2 = new Post("Tao Restaurant", "A resturant that specializes in the fusion of asian food in lower manhattan. Very lively with amazing service and food.", "../images/tao.jpg", "https://taorestaurant.com/", "CLICK THIS TO GO TO WEBSITE", "Inside of the very decorous resturant. ");

    //all cheap
    var allc1 = new Post("Museum of Modern Art", "Come check out one of the largest and most influential museums of modern art in the world, featuring approximately 300,000 books and exhibition catalogs, over 1,000 periodical titles, and over 40,000 files of ephemera about individual artists and groups. The museum offers a free admission program UNIQLO Free Friday Nights- which provides free access to all exhibitions from 4:00 PM to 8:00 PM every Friday throughout the year. ", "../images/moma.jpg", "https://www.moma.org/", "CLICK THIS TO GO TO WEBSITE", "Exhibition in the museum featuring modern art");
    var allc2 = new Post("The Gravity Vault", "A popular rock climbing gym featuring 14,000+ square feet of climbing, 40+ foot climbing walls, 45-60 top rope stations and bouldering. ", "../images/gravityvault.jpg", "https://www.gravityvault.com/locations/hoboken-nj", "CLICK THIS TO GO TO WEBSITE", "Walls to climb");
    var allc3 = new Post("Instagrammable Spots in NYC", "New York City is the world’s most photogenic metropolis, and we’ve got the lowdown on how to capture the perfect shots of the City—though we think it looks good from any angle.", "../images/insta.jpg", "https://www.nycgo.com/photo-galleries/instagrammable-nyc", "CLICK THIS TO GO TO WEBSITE", "One of the many pictures you can take");
    var allc4 = new Post("9/11 Memorial & Museum", "The National September 11 Memorial & Museum is a memorial and museum in New York City commemorating the September 11, 2001 attacks and the 1993 World Trade Center bombing.", "../images/memorial.jpg", "https://www.911memorial.org/museum", "CLICK THIS TO GO TO WEBSITE", "9/11 Memorial");

    // all fair
    var allf1 = new Post("Nat. Geo. Encounter", "Times Square tourists will be able to take a digital dive deep into the heart of the sea without even getting damp at the National Geographic Encounter.", "../images/natneo.jpg", "https://natgeoencounter.com", "CLICK THIS TO GO TO WEBSITE", "The digital sting ray exhibit in the encounter");
    var allf2 = new Post("Color Factory", "The interactive exhibition, which is located in Soho, was designed and launched by event planner Jordan Ferney of Oh Happy Day (a crafts and celebrations blog) to help visitors explore the fun and importance of color.", "../images/color.jpg", "https://www.colorfactory.co/", "CLICK THIS TO GO TO WEBSITE", "People at one of the many exibates at the Factrory");
    var allf3 = new Post("Empire State Building Observatory", "The Empire State Building is a 102-story Art Deco skyscraper in Midtown Manhattan, New York City. Get an amazing 360° views of New York City and beyond from the 86th and 102nd floors.", "../images/empire.jpg", "http://www.esbnyc.com/", "CLICK THIS TO GO TO WEBSITE", "One of the many angles from the skyscraper");
    var allf4 = new Post("One World Observatory", "Observatory located on floors 100-102 of One World Trade Center, with exhibits & restaurants. Get an amazing 360° views of New York City.", "../images/world.jpg", "https://oneworldobservatory.com/en-US", "CLICK THIS TO GO TO WEBSITE", "One of the many angles from the skyscraper");

    //all expenseive
    var alle1 = new Post("Gucci Brookfield", "One of the best known luxury brand known for modern, Italian-crafted leather goods, apparel & accessories for men & women.", "../images/gucci.jpg", "https://www.gucci.com/us/en/", "CLICK THIS TO GO TO WEBSITE", "Inside of the store");
    var alle2 = new Post("Saks Fifth Ave", "Saks Fifth Avenue is an American chain of luxury department stores owned by the oldest commercial corporation in North America, the Hudson's Bay Company", "../images/saks.jpg", "https://www.saksfifthavenue.com/Entry.jsp", "CLICK THIS TO GO TO WEBSITE", "Inside of Saks Fifth Ave, in the mens deparetment");

    // cheap spring posts
    var sc1 = new Post("The Met Museum", "The famous Met Museum, the largest museuem in the US.", "../images/themet.jpg", "https://www.metmuseum.org/", "CLICK THIS TO GO TO WEBSITE", "The Met Museum");
    var sc2 = new Post("The Shops at Columbus Circle", "One of the best malls in Manhattan with over three floors of shops and resturants.", "../images/shops_at_columbus.jpg", "https://www.theshopsatcolumbuscircle.com/", "CLICK THIS TO GO TO WEBSITE", "The Shops at Columbus Circle");
    var sc4 = new Post("Statue of Liberty", "The Statue of Liberty is a colossal neoclassical sculpture on Liberty Island in New York Harbor in New York City, in the United States. The copper statue, a gift from the people of France to the people of the United States, was designed by French sculptor Frédéric Auguste Bartholdi and built by Gustave Eiffel.", "../images/statue.jpg", "https://www.nps.gov/stli/planyourvisit/index.htm", "visit their website", "The Statue for the water that surrounds it");
    var sc5 = new Post("Movies in New York City parks", "More than 150 free film screenings are planned for city parks this summer. Grab a chair and head to the nearest park to take in a movie on your picnic blanket around 8 p.m.", "../images/movie.jpg", "https://www.nycgovparks.org/events/free_summer_movies", "CLICK THIS TO GO TO WEBSITE", "People enjoying old cartoons and movies");

    // fair spring posts
    var sf1 = new Post("Top of the Rock", "Observatory on top of Rockefeller Center, with an ocean-liner style design, offering city views.", "../images/toprock.jpg", "https://www.topoftherocknyc.com/", "CLICK THIS TO GO TO WEBSITE", "View of the NYC sky line from rockefeller center");
    var sf2 = new Post("The Orchid Show", "The Orchid Show is a display of floral arrangements and artistic installations at Enid A. Haupt Conservatory plus evening entertainment.", "../images/orchid.jpg", "https://www.nybg.org/event/the-orchid-show/", "CLICK THIS TO GO TO WEBSITE", "One of the beautiful art works at the event");
    var sf3 = new Post("Sakura Matsuri Cherry Blossom Festival", "Sakura Matsuri offers over 60 events and performances that celebrate traditional and contemporary Japanese culture. The festival celebrates the Japanese cultural tradition of enjoying each moment of the cherry blossom season.", "../images/Blossom.jpg", "https://www.showclix.com/event/sakura-matsuri-20181324746", "CLICK THIS TO GO TO WEBSITE", "The many trees that have blossomed in the festival");

    //spring / fall expensive
    var sfe1 = new Post("New York Fashion", "New York Fashion Week, is a semi-annual series of events when international fashion collections are shown to buyers, the press, and the general public.", "../images/fashion.jpg", "http://nyfw.com/", "CLICK THIS TO GO TO WEBSITE", "The Givenchy fashion show");

    // cheap summer posts
    var ssc1 = new Post("Pier A Park", "A great park on Pier with a gazebo, a great lawn, and a place to fish.", "../images/pier-A-park.jpg", "https://www.hobokennj.gov/location/pier-a-park", "CLICK THIS TO GO TO WEBSITE", "Picture of Pier A Park");
    var ssc2 = new Post("Hoboken Farmers' Market", "Farmers from all over the Garden State come to the corner of 13th Street & Hudson in Hoboken to offer their freshest and the most delicious products.  Open July to November", "../images/Farmers'_Market.jpg", "http://hobokenfarmersmarket.com/", "CLICK THIS TO GO TO WEBSITE", "Picture of fruits at farmers' market");
    var ssc3 = new Post("Manhattanhenge", "Manhattanhenge, also called the Manhattan Solstice, is an event during which the setting sun or the rising sun is aligned with the east–west streets of the main street grid of Manhattan, New York City.", "../images/manhattan.jpg", "https://www.amnh.org/our-research/hayden-planetarium/resources/manhattanhenge", "CLICK THIS TO GO TO WEBSITE", "The manhattan henge photo taken by Neil deGrasse Tyson");
    var ssc = new Post("NAME", "DESCRIPTION", "../images/IMAGE_NAME.jpg", "WEB_SITE", "CLICK THIS TO GO TO WEBSITE", "IMAGE_DESCRIPTION");

    // cheap fall posts
    var fc1 = new Post("NAME", "DESCRIPTION", "../images/IMAGE_NAME.jpg", "WEB_SITE", "CLICK THIS TO GO TO WEBSITE", "IMAGE_DESCRIPTION");
    var fc2 = new Post("American Museum of Natural History", "The museum complex comprises 28 interconnected buildings housing 45 permanent exhibition halls, in addition to a planetarium and a library. The museum collections contain over 33 million specimens of plants, animals, fossils, minerals, rocks, meteorites, human remains, and human cultural artifacts.", "../images/museum.jpg", "https://www.amnh.org/", "CLICK THIS TO GO TO WEBSITE", "The front of the museum from across the street");

    // fall fair/expensive
    var fef1 = new Post("ComplexCon", "ComplexCon is an expertly curated convention and festival bringing the world of Complex to life. The groundbreaking festival and exhibition that brings together pop culture, music, art, food, style, sports, innovation, activism, and education.", "../images/complexcon.jpg", "https://www.complexcon.com/", "CLICK THIS TO GO TO WEBSITE", "Many visitors at the Paper Work section");
    var fe1 = new Post("Dream-over: A Sleepover for Adults", "Dream under the compassionate and wakeful gaze of a hundred buddhas. Come in your slippers and pajamas and sleep over at the Rubin Museum beneath a traditional or contemporary artwork handpicked just for you.", "../images/dreamover.jpg", "http://rubinmuseum.org/events/event/dream-over-09-29-2018", "CLICK THIS TO GO TO WEBSITE", "People near the exibates ready to sleep");

    //fall cheap/fair
    var fcf1 = new Post("Oktoberfest NYC", "Authentic German beer will be flowing, complimented by traditional Oktoberfest food and fun for the entire family.", "../images/oktoberfest.jpg", "http://oktober-fest.nyc/", "CLICK THIS TO GO TO WEBSITE", "People enjoying their beers");

    // cheap winter posts
    var exwc = new Post("NAME", "DESCRIPTION", "../images/IMAGE_NAME.jpg", "WEB_SITE", "CLICK THIS TO GO TO WEBSITE", "IMAGE_DESCRIPTION");
    var wc1 = new Post("The Rockefeller Center Tree Lighting", "New York City’s favorite Christmas Tree will be lit the first week of December, and will remain lit until early January. Don’t miss this beloved holiday event!", "../images/tree.jpg", "https://www.rockefellercenter.com/whats-happening/2018/11/28/2018-rockefeller-center-christmas-tree/", "CLICK THIS TO GO TO WEBSITE", "The massive tree in front of Rockefeller center");
    var wc2 = new Post("Solomon R. Guggenheim Museum", "Solomon R. Guggenheim Museum is the permanent home of a continuously expanding collection of Impressionist, Post-Impressionist, early Modern and contemporary art and also features special exhibitions throughout the year.", "../images/solomon.jpg", "https://www.guggenheim.org/", "CLICK THIS TO GO TO WEBSITE", "The Museum from outside");

    // fair winter posts
    var wf1 = new Post("The Rink at Rockefeller Center", "the heart of Midtown, steps from Times Square and the Theater District, The Rink at Rockefeller Center is a New York City tradition that everyone can enjoy.", "../images/rockefeller.jpg", "https://therinkatrockcenter.com/", "CLICK THIS TO GO TO WEBSITE", "People skating at the seasonal rink");
    var wf2 = new Post("Holiday Train Show", "Enchanting model trains zip through a display of more than 175 New York landmarks, each re-created with bark, leaves, and other natural materials—all under the twinkling glow of the Enid A. Haupt Conservatory.", "../images/train.jpg", "https://www.nybg.org/event/holiday-train-show/", "CLICK THIS TO GO TO WEBSITE", "The brooklyn bridge at the train show");

    var we1 = new Post("George Balanchine's The Nutcracker", "Dancers, musicians, stagehands and children come together to put on the best christmas show.", "../images/nutcracker.jpg", "https://www.nycbalvar.com/Balvars/N/George-Balanchines-The-Nutcracker.aspx", "CLICK THIS TO GO TO WEBSITE", "One of the acts from the show");

    // restaurants
    var r1 = new Post("Stacks Pancake House & Smokehouse BBQ", "Serving 22 different kinds of pancakes and other breakfast and BBQ items, Stacks is a must go if you are in the mood for a sweet treat anytime of the day if you are in Hoboken.", "../images/stacks.jpg", "http://www.stackspancakehouse.net/", "CLICK THIS TO GO TO WEBSITE", "some pancakes");
    var r2 = new Post("Benny Tudino's Pizzeria", "Home of the largest slice of pizza for over 50 years.  Come in in to get a delicious New York style anytime of the year.", "../images/bennys.jpg", "http://bennytudinos.com/", "CLICK THIS TO GO TO WEBSITE", "a pizza pie and the owner");
    var r3 = new Post("Makai Poke Co.", "Simple counter serve making build-your-own, Hawaiian-style sushi bowls, salads & sushi burritos.", "../images/makai.jpg", "http://makaipokeco.com/", "CLICK THIS TO GO TO WEBSITE", "a bowl meal item");

  }

  // get these lists
  var springlist = localStorage.getItem('springlist', springlist);
  var summerlist = localStorage.getItem('summerlist', summerlist);
  var falllist = localStorage.getItem('falllist', falllist);
  var winterlist = localStorage.getItem('winterlist', winterlist);
  // if the lists are empty lets add data from the default data, line 210
  if (springlist == null && summerlist == null && falllist == null && winterlist == null) {
    var springlist = [
        [r1, r2, r3, ssc1, sc1, sc2, sc4, allc1, allc2, allc3, allc4, all1, all2, wsc, sc5],
        [sc2, allf1, sf1, all1, all2, allf3, allf4, anyRfe, anyRfe2, allf2, sf2, sf3],
        [sc2, alle2, alle1, all1, all2, anyRfe, anyRfe2, sfe1]
      ];
      var summerlist = [
        [r1, r2, r3, ssc1, sc1, ssc2, sc4, allc1, allc2, allc3, all1, all2, ssc3],
        [r1, r2, r3, ssc1, sc1, sc2, sf1, allf1, all1, all2, anyRfe, anyRfe2, allf2],
        [r1, r2, r3, ssc1, alle2, alle1, all1, all2, anyRfe, anyRfe2]
      ];
      var falllist = [
        [r1, r2, r3, sc1, ssc2, sc2, allc1, allc2, allc3, allc4, all1, all2, fcf1],
        [ssc2, sc2, allf1, all1, all2, allf3, allf4, anyRfe, anyRfe2, fcf1, fef1, allf2],
        [sc2, sc2, alle2, alle1, all1, all2, anyRfe, anyRfe2, fef1, fe1, sfe1]
      ];
      var winterlist = [
        [r1, r2, r3, sc1, sc2, allc1, allc2, all1, allc3, allc4, wc1, all2, wRcf, wc2, wsc],
        [sc2, allf1, all1, wf1, all2, allf3, allf4, anyRfe, anyRfe2, wRcf, allf2, wf2],
        [sc2, alle2, alle1, all1, all2, anyRfe, anyRfe2, we1]
      ];
    console.log("STRING HERE 2");

    localStorage.setItem('springlist', JSON.stringify(springlist));
    localStorage.setItem('summerlist', JSON.stringify(summerlist));
    localStorage.setItem('falllist', JSON.stringify(falllist));
    localStorage.setItem('winterlist', JSON.stringify(winterlist));
    // now store that data if c=1, if its the 1st load

  } else {
    // take that data in the list and convert that into data so it can be used to create a "POST" instance (the class)

    springlist = JSON.parse(localStorage.getItem('springlist'));
    for (var row = 0; row < springlist.length; row++) {
      for (var col = 0; col < springlist[row].length; col++) {
        springlist[row][col] = new Post(springlist[row][col]._name, springlist[row][col]._info, springlist[row][col]._imageLocation, springlist[row][col]._webLink, springlist[row][col]._linkCaption, springlist[row][col]._imageCaption);
      }
    }

    summerlist = JSON.parse(localStorage.getItem('summerlist'));
    for (var row = 0; row < summerlist.length; row++) {
      for (var col = 0; col < summerlist[row].length; col++) {
        summerlist[row][col] = new Post(summerlist[row][col]._name, summerlist[row][col]._info, summerlist[row][col]._imageLocation, summerlist[row][col]._webLink, summerlist[row][col]._linkCaption, summerlist[row][col]._imageCaption);
      }
    }

    falllist = JSON.parse(localStorage.getItem('falllist'));
    for (var row = 0; row < falllist.length; row++) {
      for (var col = 0; col < falllist[row].length; col++) {
        falllist[row][col] = new Post(falllist[row][col]._name, falllist[row][col]._info, falllist[row][col]._imageLocation, falllist[row][col]._webLink, falllist[row][col]._linkCaption, falllist[row][col]._imageCaption);
      }
    }

    winterlist = JSON.parse(localStorage.getItem('winterlist'));
    for (var row = 0; row < winterlist.length; row++) {
      for (var col = 0; col < winterlist[row].length; col++) {
        winterlist[row][col] = new Post(winterlist[row][col]._name, winterlist[row][col]._info, winterlist[row][col]._imageLocation, winterlist[row][col]._webLink, winterlist[row][col]._linkCaption, winterlist[row][col]._imageCaption);
      }
    }

    // ADD SUMMER WINTER SPRING
  }

  // based on the selection of season and price we add a new event/post to the list
  // i.e. a park that a summer event and is cheap is added to the summercheap list
  var seasonAdjusted = "";
  if (season != null && price != null) {
    if (season == 'spring') {
      seasonAdjusted = "springlist";
      if (price == 'cheap') {
        springlist[0].push(newPost);
      } else if (price == 'fair') {
        springlist[1].push(newPost);
      } else if (price == 'expensive') {
        springlist[2].push(newPost);
      }
    } else if (season == 'summer') {
      seasonAdjusted = "summerlist";
      if (price == 'cheap') {
        summerlist[0].push(newPost);
      } else if (price == 'fair') {
        summerlist[1].push(newPost);
      } else if (price == 'expensive') {
        summerlist[2].push(newPost);
      }
    } else if (season == 'fall') {
      seasonAdjusted = "falllist";
      if (price == 'cheap') {
        falllist[0].push(newPost);
      } else if (price == 'fair') {
        falllist[1].push(newPost);
      } else if (price == 'expensive') {
        falllist[2].push(newPost);
      }
    } else if (season == 'winter') {
      seasonAdjusted = "winterlist";
      if (price == 'cheap') {
        falllist[0].push(newPost);

      } else if (price == 'fair') {
        falllist[1].push(newPost);

      } else if (price == 'expensive') {
        falllist[2].push(newPost);

      }
    }
    console.log("Spring list: "+springlist[1]);
    if (seasonAdjusted === "springlist"){
      window.localStorage.removeItem(seasonAdjusted);
      console.log(localStorage);
      localStorage.setItem('springlist', JSON.stringify(springlist));
    }else if (seasonAdjusted === "summerlist"){
      window.localStorage.removeItem(seasonAdjusted);
      console.log(localStorage);
      localStorage.setItem('summerlist', JSON.stringify(summerlist));
    } else if (seasonAdjusted === "falllist"){
      window.localStorage.removeItem(seasonAdjusted);
      console.log(localStorage);
      localStorage.setItem('falllist', JSON.stringify(falllist));
    } else if (seasonAdjusted === "winterlist"){
      window.localStorage.removeItem(seasonAdjusted);
      console.log(localStorage);
      localStorage.setItem('winterlist', JSON.stringify(winterlist));

    }
  }
  //based on that new addition the data is now re-stored so it has the new event in the lists to be later called upon
  if (document.cookie.includes("c=1")) {
    localStorage.setItem('springlist', springlist);
    localStorage.setItem('summerlist', summerlist);
    localStorage.setItem('falllist', falllist);
    localStorage.setItem('winterlist', winterlist);
  }


  // to be used to see what list we want to use

  // based on the seasons and price point we want to see events in we load the specific lists that are made of the
  // object post, that stores info like name,pic,link,des etc
  if (newPost == null) {
    var use = [];
    if (localStorage.getItem("spring") == "true") {
      if (localStorage.getItem("cheap") == "true") {
        document.getElementById("resultsTitle").innerHTML = "Things to do in the spring for a low cost";
        use = springlist[0];
      } else if (localStorage.getItem("fair") == "true") {
        document.getElementById("resultsTitle").innerHTML = "Things to do in the spring for a fair cost";
        use = springlist[1];
      } else if (localStorage.getItem("expensive") == "true") {
        document.getElementById("resultsTitle").innerHTML = "Things to do in the spring for a shiny penny";
        use = springlist[2];
      }
    } else if (localStorage.getItem("summer") == "true") {
      if (localStorage.getItem("cheap") == "true") {
        document.getElementById("resultsTitle").innerHTML = "Things to do in the summer for a low cost";
        use = summerlist[0];
      } else if (localStorage.getItem("fair") == "true") {
        document.getElementById("resultsTitle").innerHTML = "Things to do in the summer for a fair cost";
        use = summerlist[1];
      } else if (localStorage.getItem("expensive") == "true") {
        document.getElementById("resultsTitle").innerHTML = "Things to do in the summer for a shiny penny";
        use = summerlist[2];
      }
    } else if (localStorage.getItem("fall") == "true") {
      if (localStorage.getItem("cheap") == "true") {
        document.getElementById("resultsTitle").innerHTML = "Things to do in the fall for a low cost";
        use = falllist[0];
      } else if (localStorage.getItem("fair") == "true") {
        document.getElementById("resultsTitle").innerHTML = "Things to do in the fall for a fair cost";
        use = falllist[1];
      } else if (localStorage.getItem("expensive") == "true") {
        document.getElementById("resultsTitle").innerHTML = "Things to do in the fall for a shiny penny";
        use = falllist[2];
      }
    } else if (localStorage.getItem("winter") == "true") {
      if (localStorage.getItem("cheap") == "true") {
        document.getElementById("resultsTitle").innerHTML = "Things to do in the winter for a low cost";
        use = winterlist[0];
      } else if (localStorage.getItem("fair") == "true") {
        document.getElementById("resultsTitle").innerHTML = "Things to do in the winter for a fair cost";
        use = winterlist[1];
      } else if (localStorage.getItem("expensive") == "true") {
        document.getElementById("resultsTitle").innerHTML = "Things to do in the winter for a shiny penny";
        use = winterlist[2];
      }
    }

    // based on that list we build the site via the build func in the
    // post class
    buildpage(use);
  }



  function buildpage(use) {
    if (window.location.href.indexOf("results.html") != -1) {
      var nums = [];


      // picks events randomly to set to the site
      for (let i = 0; i < 4; i++) {
        let a = Math.floor(Math.random() * ((use.length - 1) - 0 + 1)) + 0;
        //if the event is in the list to be used regen a new event
        while (nums.includes(a)) {
          a = Math.floor(Math.random() * ((use.length - 1) - 0 + 1)) + 0;
        }
        // add to the list to be used
        nums.push(a);
      }
      //build the actual site
      for (let i = 0; i < nums.length; i++) {
        use[nums[i]].build();
      }
    }
  }
}



  document.cookie = "c=1";


function checkIfIn(post){
  var springlist = localStorage.getItem('springlist', springlist);
  var summerlist = localStorage.getItem('summerlist', summerlist);
  var falllist = localStorage.getItem('falllist', falllist);
  var winterlist = localStorage.getItem('winterlist', winterlist);
  console.log("in check");
  springlist = JSON.parse(localStorage.getItem('springlist'));
  for (var row = 0; row < springlist.length; row++) {
    for (var col = 0; col < springlist[row].length; col++) {
      springlist[row][col] = new Post(springlist[row][col]._name, springlist[row][col]._info, springlist[row][col]._imageLocation, springlist[row][col]._webLink, springlist[row][col]._linkCaption, springlist[row][col]._imageCaption);
      if(springlist[row][col]._name == post){
        return false;
      }
    }
  }

  summerlist = JSON.parse(localStorage.getItem('summerlist'));
  for (var row = 0; row < summerlist.length; row++) {
    for (var col = 0; col < summerlist[row].length; col++) {
      summerlist[row][col] = new Post(summerlist[row][col]._name, summerlist[row][col]._info, summerlist[row][col]._imageLocation, summerlist[row][col]._webLink, summerlist[row][col]._linkCaption, summerlist[row][col]._imageCaption);
      if(summerlist[row][col]._name == post){
        return false;
      }
    }
  }

  falllist = JSON.parse(localStorage.getItem('falllist'));
  for (var row = 0; row < falllist.length; row++) {
    for (var col = 0; col < falllist[row].length; col++) {
      falllist[row][col] = new Post(falllist[row][col]._name, falllist[row][col]._info, falllist[row][col]._imageLocation, falllist[row][col]._webLink, falllist[row][col]._linkCaption, falllist[row][col]._imageCaption);
      if(falllist[row][col]._name == post){
        return false;
      }
    }
  }

  winterlist = JSON.parse(localStorage.getItem('winterlist'));
  for (var row = 0; row < winterlist.length; row++) {
    for (var col = 0; col < winterlist[row].length; col++) {
      winterlist[row][col] = new Post(winterlist[row][col]._name, winterlist[row][col]._info, winterlist[row][col]._imageLocation, winterlist[row][col]._webLink, winterlist[row][col]._linkCaption, winterlist[row][col]._imageCaption);
      if(winterlist[row][col]._name == post){
        return false;
      }
    }
  }
  return true;
}
