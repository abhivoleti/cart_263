window.onload = function() {
    console.log("move");

    this.document.querySelector("#draw-box-a").
    addEventListener("mousemove", mouseMoveFunction);

    // console.log(document.querySelector("#draw-box-a").getBoundingClientRect());

    let rect = document.querySelector("#draw-box-a").getBoundingClientRect();

    let pointDiv = this.document.createElement("div");
    pointDiv.classsList.add("point");
    document.querySelector("#draw-box-a").appendChild(pointDiv);


    function mouseMoveFunction(event) {
      console.log('moving');
      console. log(eventObj)
    //   this.innerHTML= 
    //   'x:${eventObj.clientX}, y:${eventObj.clientY}';

      //DIFFERENCE TO ENSURE COORDS
        let offsetX= event.clientX-rect.x;
        let offsetY= event.clientY-rect.y;

        // this.innerHTML=
        // 'x:${offsetX}, y:${offsetY}';
        pointDiv.style.top='${offsetY}px';
        pointDiv.style.left='${offsetX}px';
}

}