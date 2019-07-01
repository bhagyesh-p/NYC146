// Bhagyesh Patel
var count = 0;


/*
This is used for the creation of post/events
takes in basic params and than has one func. in which it builds a event box and then adds it to the html/ website
 */
class Post {


    constructor(name, info, imageLocation, webLink, linkCaption, imageCaption, address) {
        this._name = name,
            this._info = info,
            this._imageLocation = imageLocation,
            this._webLink = webLink;
        this._linkCaption = linkCaption;
        this._imageCaption = imageCaption;
        this._address = address;
    }


    build() {
        // create an item to list
        var largeListItem = document.createElement("li");

        // add a div for the event box
        var div = document.createElement("div");
        div.className = 'activity';

        // these listable items will hold the actual items (the data)
        var smallListItem1 = document.createElement("li");
        var smallListItem2 = document.createElement("li");
        var smallListItem3 = document.createElement("li")
        var smallListItem4 = document.createElement("li");


        // basic items are added to it
        // main box
        var ul = document.createElement("ul");

        //for link addition
        var h1 = document.createElement("h1");
        var a = document.createElement("a");
        //adding the link and its cap. to the href for onClick() (built in html)
        a.className = 'activity-title';
        if (this._webLink.substring(0, 8) === 'https://' || this._webLink.substring(0, 7) === 'http://') {
            a.href = this._webLink;
        } else {
            a.href = 'https://' + this._webLink;
        }
        a.title = this._linkCaption;
        a.appendChild(document.createTextNode(this._name));



        // creation of info box
        var h2 = document.createElement("h2");
        h2.appendChild(document.createTextNode(this._info));

        // creation of addy box
        var h3 = document.createElement("h3");
        h3.appendChild(document.createTextNode(this._address));

        // image implementation of image if it exists
        var img = document.createElement("img");
        img.className = "activity-image";
        img.src = this._imageLocation;
        img.title = this._imageCaption;
        img.alt = "error";

        // putting everything together (adding all small components (smallListItem) to the main ul
        // thats added to div thats added to the largeListItem
        // which is finally added to the site
        h1.appendChild(a);
        smallListItem1.appendChild(h1);
        smallListItem2.appendChild(h2);
        smallListItem3.appendChild(img);
        smallListItem4.appendChild(h3);
        ul.appendChild(smallListItem1);
        ul.appendChild(smallListItem2);
        ul.appendChild(smallListItem3);
        ul.appendChild(smallListItem4)
        div.appendChild(ul);
        largeListItem.appendChild(div);
        //submission to the html
        let resultList = parent.document.getElementById('resultList');
        resultList.insertBefore(largeListItem, resultList.childNodes[resultList.childNodes.length - 3]);

    }
}

function handleFormSubmit(event) {
    // This next line prevents the reload of the form
    event.preventDefault();

    //records the info inserted
    var formName = document.getElementById("formName").value;
    var formDescription = document.getElementById("formDescription").value;
    var formImg = document.getElementById("formImg").value;
    var formWebsite = document.getElementById("formWebsite").value;
    var formImgDescription = document.getElementById("formImgDescription").value;

    var season = document.getElementById("seasonSelector").value;
    var price = document.getElementById("priceSelector").value;
    var location = document.getElementById("formLocation").value;

    // creation of the post/event object
    var post = new Post(formName, formDescription, formImg, formWebsite, "CLICK THIS TO GO TO WEBSITE", formImgDescription, location);

    // try to added the data to DB
    var serverResp = addToDB(post, season, price);

    // based on response add to html
    if (serverResp == 0) {
        alert("addition successful");
        post.build();
        loadPage(post, season, price);
    }
    loadPage(undefined, season, price);

}

function addToDB(event, season, price) {
    var link = "http://localhost:8080/post/addPost/?name=" + event._name + "&info=" + event._info + "&imageLocation=" + event._imageLocation + "&webLink=" + event._webLink + "&linkCaption=click%20me&imageCaption=" + event._imageCaption +
        "&price=" + price + "&season=" + season + "&address=" + event._address + "";

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            if (!xhr.responseText.includes("Valid entry")) {
                alert(xhr.responseText);
                return -1;
            } else {
                return 0;
            }
        }
    }
    xhr.open('POST', link, true);
    xhr.send(null);

}


// we need onload due to the window not having a body till later,
// which causes an issues as we want to hide the scroll background

// Have most if not all the code within the onload, especially
// if it has to do with animations

//onload we hide the lodaing of the gifs as they are loaded in at 1 frame at a time which causes
// a flashing like effect (epilepsy)
window.onload = () => {

    // if its the clicking option pages disable the scrolling
    if (window.location.href.indexOf("index.html") != -1 || window.location.href.indexOf("money.html") != -1) {
        document.body.style.overflow = "hidden";
    }


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

    //fades in/out certain parts of hmtl
    function fadeItem(s, action) {
        if (action === "in") {
            $(s).fadeIn("slow", function() {});
        } else if (action === "out") {
            $(s).fadeOut("slow", function() {});
        } else {
            alert("error with fading of item: " + s)
        }
    }

    // if the season divs are on the page then use this code, else ignore it
    // in other words if we are selecting the season we will wait for the person
    // to click on it and we continue to the price selection
    try {
        document.getElementById("springDiv").addEventListener('click', function() {
            localStorage.setItem("season", "spring");
        });
        document.getElementById("summerDiv").addEventListener('click', function() {
            localStorage.setItem("season", "summer");
        });
        document.getElementById("fallDiv").addEventListener('click', function() {
            localStorage.setItem("season", "fall");
        });
        document.getElementById("winterDiv").addEventListener('click', function() {
            localStorage.setItem("season", "winter");
        });
    } catch (e) {} finally {}

    // if the price divs are on the page then use this code, else ignore it
    // in other words if we are selecting the price we will wait for the person
    // to click on it and we continue to the result page
    try {
        document.getElementById("cheapDiv").addEventListener('click', function() {
            localStorage.setItem("price", "cheap");
        });
        document.getElementById("fairDiv").addEventListener('click', function() {
            localStorage.setItem("price", "fair");
        });
        document.getElementById("expensiveDiv").addEventListener('click', function() {
            localStorage.setItem("price", "expensive");
        });
    } catch (e) {} finally {}

    //set all the season and price values to be false when we click logo of NYC 146
    try {
        document.getElementById("back").addEventListener('click', function() {
            localStorage.setItem("season", "");

            localStorage.setItem("price", "");
        });
    } catch (e) {} finally {}

    // load a base page with the  season and price they clicked (1st time load)
    loadPage(null, localStorage.getItem('season'), localStorage.getItem('price'));

}

////////////////////////////////////////////////////////////
// For Season and Price Selector Above
//
// For Result Page Below
//////////////////////////////////////////////////////////

function loadPage(newPost, season, price) {
    console.log(season + " " + price);
    console.log("post: " + newPost);
    if (window.location.href.indexOf("results.html") == -1) {
        console.log("load");
        return;
    }
    // if we are not adding a new post (not undef)
    if (newPost === null) {

        // based on the seasons and price point we want to see events in we load the specific lists that are made of the
        // object post, that stores info like name,pic,link,des etc
        var use = [];
        var link = "http://localhost:8080/post/getItems/?price=" + price + "&season=" + season + "";
        var use = [];

        // http request sent to the server in hopes that it will take it
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            // once the request was sent and received we then make use of the response
            if (xhr.readyState == XMLHttpRequest.DONE) {
                // we take the response and make it a JSON so we than can use it to possibly make it a object (POJO)
                var data = JSON.parse(xhr.responseText);

                // if we do not have an error of undef. we will than try to retrieve items from the DB
                if (data.Error !== "undefined") {
                    // if we get the error and its about small data set we tell the user such
                    if (data.Error && data.Error.includes("DB is very small on the said criteria, this is what we have")) {
                        alert(data.Error + " the DB maybe empty so add your own events if you would like to.");
                    }
                }
                console.log(data.data);
                //now with all the responses we have we till than create an array of post/event objects
                for (let i = 0; i < data.data.length; i++) {
                    if (data.data[i] !== null) {
                        use[i] = new Post(data.data[i].name, data.data[i].info, data.data[i].imageLocation, data.data[i].webLink, data.data[i].linkCaption, data.data[i].imageLocation, data.data[i].address);

                    }
                }
                //we build all those objects to the site
                buildpage(use);
            }
        }
        xhr.open('GET', link, true);
        xhr.send(null);
    }


}


function buildpage(use) {
    if (window.location.href.indexOf("results.html") != -1) {
        //build the actual site
        for (let i = 0; i < use.length; i++) {
            use[i].build();
        }
    }
}
