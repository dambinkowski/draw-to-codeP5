function codeArea() {
  //this function writes on the right bar of html current code from code array
  var mystring = ""; // this is local just to feed html whith good looking for user
  for (var i = 0; i < code.length; i++) {
    mystring = mystring + "<br>&emsp;" + code[i]; // code area
  }
  select("#rightbar").html(mystring);

  // coppied and addopted from :
  // https://stackoverflow.com/questions/18614301/keep-overflow-div-scrolled-to-bottom-unless-user-scrolls-up
  // author: Mr.Manhattan
  // date:  Sep 4, 2013 at 12:59
  var theArea = document.getElementById('rightbar');
  theArea.scrollTop = theArea.scrollHeight;
}
