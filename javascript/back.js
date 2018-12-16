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
    post.build();

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

function loadPage(newPost, season, price) {
  console.log("load");
  if (window.location.href.indexOf("results.html") == -1) {
    console.log("load");

      return ;
  }
  document.cookie = "c=0";
  // if there is no data, 1st load then have  this default data loaded up
    if (newPost == null) {

        // cheap spring posts
        var sc1 = new Post("The Met Museum", "The famous Met Museum, the largest museuem in the US.", "../images/themet.jpg", "https://www.metmuseum.org/", "CLICK THIS TO GO TO WEBSITE", "The Met Museum");
        var sc2 = new Post("The Shops at Columbus Circle", "One of the best malls in Manhattan with over three floors of shops and resturants.", "../images/shops_at_columbus.jpg", "https://www.theshopsatcolumbuscircle.com/", "http://www.theshopsatcolumbuscircle.com/", "The Shops at Columbus Circle");
        var sc3 = new Post("NAME", "DESCRIPTION", "../images/IMAGE_NAME.jpg", "WEB_SITE", "CLICK THIS TO GO TO WEBSITE", "IMAGE_DESCRIPTION");
        // fair spring posts
        // expensive spring posts
        // cheap summer posts
        var ssc1 = new Post("Pier A Park", "A great park on Pier with a gazebo, a great lawn, and a place to fish.", "../images/pier-A-park.jpg", "https://www.hobokennj.gov/location/pier-a-park", "CLICK THIS TO GO TO WEBSITE", "Picture of Pier A Park");
        var ssc2 = new Post("Hoboken Farmers' Market", "Farmers from all over the Garden State come to the corner of 13th Street & Hudson in Hoboken to offer their freshest and the most delicious products.  Open July to November", "../images/Farmers'_Market.jpg", "http://hobokenfarmersmarket.com/", "CLICK THIS TO GO TO WEBSITE", "Picture of fruits at farmers' market");
        var ssc3 = new Post("NAME", "DESCRIPTION", "../images/IMAGE_NAME.jpg", "WEB_SITE", "CLICK THIS TO GO TO WEBSITE", "IMAGE_DESCRIPTION");
        // fair summer posts
        // expensive summer posts
        // cheap fall posts
        var fc1 = new Post("NAME", "DESCRIPTION", "../images/IMAGE_NAME.jpg", "WEB_SITE", "CLICK THIS TO GO TO WEBSITE", "IMAGE_DESCRIPTION");
        // fair fall posts
        // expensive fall posts
        // cheap winter posts
        var wc1 = new Post("NAME", "DESCRIPTION", "../images/IMAGE_NAME.jpg", "WEB_SITE", "CLICK THIS TO GO TO WEBSITE", "IMAGE_DESCRIPTION");
        // fair winter posts
        // expensive winter posts
        // restaurants
        var r1 = new Post("Stacks Pancake House & Smokehouse BBQ", "Serving 22 different kinds of pancakes and other breakfast and BBQ items, Stacks is a must go if you are in the mood for a sweet treat anytime of the day if you are in Hoboken.", "../images/stacks.jpg", "http://www.stackspancakehouse.net/", "CLICK THIS TO GO TO WEBSITE", "some pancakes");
        var r2 = new Post("Benny Tudino's Pizzeria", "Home of the largest slice of pizza for over 50 years.  Come in in to get a delicious New York style anytime of the year.", "../images/bennys.jpg", "http://bennytudinos.com/pizza.html", "CLICK THIS TO GO TO WEBSITE", "a pizza pie and the owner");
        var r3 = new Post("Makai Poke Co.", "Simple counter serve making build-your-own, Hawaiian-style sushi bowls, salads & sushi burritos.", "../images/makai.jpg", "http://makaipokeco.com/", "CLICK THIS TO GO TO WEBSITE", "a bowl meal item");
        var r4 = new Post("NAME", "DESCRIPTION", "../images/IMAGE_NAME.jpg", "WEB_SITE", "CLICK THIS TO GO TO WEBSITE", "IMAGE_DESCRIPTION");
    }

    // get these lists
    var springlist = localStorage.getItem('springlist', springlist);
    var summerlist = localStorage.getItem('summerlist', summerlist);
    var falllist = localStorage.getItem('falllist', falllist);
    var winterlist = localStorage.getItem('winterlist', winterlist);

    // if the lists are empty lets add data from the default data, line 210
    if (springlist == null && summerlist == null && falllist == null && winterlist == null) {
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
        // now store that data if c=1, if its the 1st load
if(document.cookie.includes("c=1") ){
  localStorage.setItem('springlist', springlist);
  localStorage.setItem('summerlist', summerlist);
  localStorage.setItem('falllist', falllist);
  localStorage.setItem('winterlist', winterlist);
}
//other wise lets get load the data.
  else{
  console.log("STRING HERE 2");

  localStorage.setItem('springlist', JSON.stringify(springlist));
  localStorage.setItem('summerlist', JSON.stringify(summerlist));
  localStorage.setItem('falllist', JSON.stringify(falllist));
  localStorage.setItem('winterlist', JSON.stringify(winterlist));
}

  // take that data in the list and convert that into data so it can be used to create a "POST" instance (the class)
    } else {

        springlist = JSON.parse(localStorage.getItem('springlist'));
        for (var row = 0; row < springlist.length; row++) {
            for (var col = 0; col < springlist[row].length; col++) {
                springlist[row][col] = new Post(springlist[row][col]._name, springlist[row][col]._info, springlist[row][col]._imageLocation, springlist[row][col]._webLink, springlist[row][col]._linkCaption, springlist[row][col]._imageCaption);
            }
        }


        // ADD SUMMER WINTER SPRING
    }

    // based on the selection of season and price we add a new event/post to the list
    // i.e. a park that a summer event and is cheap is added to the summercheap list
    if (season != null && price != null) {
        if (season == 'spring') {
            if (price == 'cheap') {
                springlist[0].push(newPost);
            } else if (price == 'fair') {
                springlist[1].push(newPost);
            } else if (price == 'expensive') {
                springlist[2].push(newPost);
            }
        } else if (season == 'summer') {
            if (price == 'cheap') {
                summerlist[0].push(newPost);
            } else if (price == 'fair') {

            } else if (price == 'expensive') {

            }
        } else if (season == 'fall') {
            if (price == 'cheap') {

            } else if (price == 'fair') {

            } else if (price == 'expensive') {

            }
        } else if (season == 'winter') {
            if (price == 'cheap') {

            } else if (price == 'fair') {

            } else if (price == 'expensive') {

            }
        }

    }
    //based on that new addition the data is now re-stored so it has the new event in the lists to be later called upon
    if(document.cookie.includes("c=1") ){
      localStorage.setItem('springlist', springlist);
      localStorage.setItem('summerlist', summerlist);
      localStorage.setItem('falllist', falllist);
      localStorage.setItem('winterlist', winterlist);
    }else{
        console.log("STRING HERE 3");
        localStorage.setItem('springlist', JSON.stringify(springlist));
        localStorage.setItem('summerlist', JSON.stringify(summerlist));
        localStorage.setItem('falllist', JSON.stringify(falllist));
        localStorage.setItem('winterlist', JSON.stringify(winterlist));

    }


    // to be used to see what list we want to use

    // based on the seasons and price point we want to see events in we load the specific lists that are made of the
    // object post, that stores info like name,pic,link,des etc
    if (newPost == null) {
        var use = [];
        if (localStorage.getItem("spring") == "true") {
            console.log("spring");
            if (localStorage.getItem("cheap") == "true") {
                use = springlist[0];
            } else if (localStorage.getItem("fair") == "true") {
                use = springlist[1];
            } else if (localStorage.getItem("expensive") == "true") {
                use = springlist[2];
            }
        } else if (localStorage.getItem("summer") == "true") {
            console.log("summer");
            if (localStorage.getItem("cheap") == "true") {
                use = summerlist[0];
            } else if (localStorage.getItem("fair") == "true") {
                use = summerlist[1];
            } else if (localStorage.getItem("expensive") == "true") {
                use = summerlist[2];
            }
        } else if (localStorage.getItem("fall") == "true") {
            if (localStorage.getItem("cheap") == "true") {
                use = falllist[0];
            } else if (localStorage.getItem("fair") == "true") {
                use = falllist[1];
            } else if (localStorage.getItem("expensive") == "true") {
                use = falllist[2];
            }
        } else if (localStorage.getItem("winter") == "true") {
            if (localStorage.getItem("cheap") == "true") {
                use = winterlist[0];
            } else if (localStorage.getItem("fair") == "true") {
                use = winterlist[1];
            } else if (localStorage.getItem("expensive") == "true") {
                use = winterlist[2];
            }
        }

        // based on that list we build the site via the build func in the
        // post class
        buildpage(use);
    }



    function buildpage(use) {
        for (i = 0; i < use.length; i++) {
            use[i].build();
        }
    }



    document.cookie = "c=1";

}
