//Ryan Adoni, Bhagyesh Patel, Chris Tan, Rohan Krishnakumar
// I pledge my honor that I have abided by the Stevens Honor System.

class Post {
  //name,info, image location, link,link caption,image caption
  let name = "";
  let info = "";
  let imageCaption = "";
  let webLink = "";
  let linkCaption = "";
  let imageCaption = "";

  constructor(name,info, imageLocation, webLink, linkCaption, imageCaption) {
    this.name = name;
    this.info = info;
    this.imageCaption = imageCaption;
    this.webLink = link;
    this.linkCaption = linkCaption;
    this.imageCaption = imageCaption;
  }

  build(){
    alert(this.name);
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
    let place = new Post("John",1,1,1,1,1,);
    place.build();


}
