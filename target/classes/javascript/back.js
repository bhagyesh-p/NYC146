// Bhagyesh Patel

var count = 0;

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

    var h3 = document.createElement("h3");
    h3.appendChild(document.createTextNode(this._address));

    var smallListItem4 = document.createElement("li");

    var img = document.createElement("img");
    img.className = "activity-image";
    img.src = this._imageLocation;
    img.title = this._imageCaption;
    img.alt = "error";



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
  var location = document.getElementById("formLocation").value;

  var post = new Post(formName, formDescription, formImg, formWebsite, "CLICK THIS TO GO TO WEBSITE", formImgDescription,location);
  let seas = document.getElementById("resultsTitle").innerHTML;



      var serverResp =addToDB(post,season,price);
      if(serverResp == 0){
        post.build();
      }
  loadPage(post, season, price);
}

function addToDB(event,season, price){
  var link= "http://localhost:8080/post/addPost/?name="+ event._name+"&info="+ event._info+"&imageLocation="+event._imageLocation +"&webLink="+ event._webLink +"&linkCaption=click%20me&imageCaption="+ event._imageCaption
      +"&price="+ price +"&season="+ season +"&address="+event._address +"";

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      if(!xhr.responseText.includes("Valid entry")){
        alert(xhr.responseText);
        return -1;
      }else{
        return 0;
      }
    }
  }
  xhr.open('POST', link, true);
  xhr.send(null);

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

  //set all the season and price values to be false
  try {
    document.getElementById("back").addEventListener('click', function() {
      localStorage.setItem("season","");

      localStorage.setItem("price", "");
    });
  } catch (e) {} finally {}

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





  // based on the seasons and price point we want to see events in we load the specific lists that are made of the
  // object post, that stores info like name,pic,link,des etc
  var use = [];
  var link= "http://localhost:8080/post/getItems/?price="+price+"&season="+season+"";
  var use = [];

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      console.log(xhr.responseText);
      var data = JSON.parse(xhr.responseText);
      if(data.Error!== "undefined") {
        if (data.Error && data.Error.includes("DB is very small on the said criteria, this is what we have") ) {
          alert(data.Error + " the DB maybe empty so add your own events if you would like to.");
        }
      }
      for(let i = 0;i<data.data.length;i++){
        if(data.data[i] !== null){
          use[i]= new Post(data.data[i].name,data.data[i].info,data.data[i].imageLocation,data.data[i].webLink,data.data[i].linkCaption,data.data[i].imageLocation,data.data[i].address);

        }
      }
      buildpage(use);
    }
  }
  xhr.open('GET', link, true);
  xhr.send(null);

    // based on that list we build the site via the build func in the
    // post class

}



  function buildpage(use) {
    if (window.location.href.indexOf("results.html") != -1) {
      //build the actual site
      for (let i = 0; i < use.length; i++) {
        use[i].build();
      }
    }
  }



function test() {
  httpGet("http://localhost:8080/post/blacktap_136 W 55th StNew York NY 10019");
}



function Create2DArray(rows) {
  var arr = [];

  for (var i = 0; i < rows; i++) {
    arr[i] = [];
  }

  return arr;
}



// function addItem(array, item) {
//   console.log("adding item: " + item + " to array : " + array);
//   array.push({
//     name: item._name,
//     info: item._info,
//     imageLocation: item._imageLocation,
//     webLink: item._webLink,
//     linkCaption: item._linkCaption,
//     imageCaption: item._imageCaption
//   });
//
//   return array;
// }

function addItem(array, item) {
  console.log("adding item: " + item + " to array : " + array);
  array.push({
    name: item._name,
    info: item._info,
    imageLocation: item._imageLocation,
    webLink: item._webLink,
    linkCaption: item._linkCaption,
    imageCaption: item._imageCaption
  });

  return array;
}


function httpGet(theUrl)
{
  var xmlhttp = new XMLHttpRequest();
  var url = theUrl;

  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var myArr = JSON.parse(this.responseText);
      console.log(myArr);
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}
