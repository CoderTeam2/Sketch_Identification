function preload(){
    classifier = ml5.imageClassifier("DoodleNet");
}

function setup(){
   canvas =  createCanvas(300,300);
   canvas.center();
   background(255);
   canvas.mouseReleased(classifyCanvas);
   synth = window.speechSynthesis;
}

function draw(){
    strokeWeight(10);
    stroke(0);
    if(mouseIsPressed){
        line(pmouseX,pmouseY,mouseX,mouseY);
    }
}

function clearCanvas(){
    background(255);
}

function classifyCanvas(){
    classifier.classify(canvas,gotResult);
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }else{
        label = results[0].label;
        label = label.toUpperCase();
        confidence = Math.floor(results[0].confidence*100) + "%";
        document.getElementById("label").innerHTML = label;
        document.getElementById("confidence").innerHTML = confidence;
        utter = new SpeechSynthesisUtterance(results[0].label);
        synth.speak(utter);
    }
}