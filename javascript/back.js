//Ryan Adoni, Bhagyesh Patel, Chris Tan, Rohan Krishnakumar
// I pledge my honor that I have abided by the Stevens Honor System.

class Post {

  constructor(name, info, imageLocation, webLink, linkCaption, imageCaption) 
  {
    this._name = name,
    this._info = info,
    this._imageLocation = imageLocation,
    this._webLink = webLink;
    this._linkCaption = linkCaption;
    this._imageCaption = imageCaption;
  }

  build()
  {
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

    document.getElementById("resultList").appendChild(largeListItem);
  }
}

// we need onload due to the window not having a body till later,
// which causes an issues as we want to hid the scroll background

// Have most if not allthe code within the onload, especially
//if it has to do with animtions
window.onload = () => {
    document.body.style.overflow = "hidden";
    // fade in and out the messages at the beginning
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


    function fadeItem(s, action) {
        if (action === "in") {
            $(s).fadeIn("slow", function() {});
            console.log(s + " in");
        } else if (action === "out") {
            $(s).fadeOut("slow", function() {});
            console.log(s + " out");
        } else {
            alert("error with fadeing of item: " + s)
        }
    }

    let place = new Post("NEW THING","ITS SUPER COOL","../images/stacks.jpg", "www.google.com", "CLICK THIS TO GO TO WEBSITE", "cool image");
    place.build();


}
