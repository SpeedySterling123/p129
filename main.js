song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
function preload()
{
song = loadSound("music.mp3")
}

function setup() {
    canvas = createcanvas(600,500);
    canvas.centre();

    video = createCapture(VIDEO)
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 500);
}

function play()
{
     song.play();
     song.setVolume(1);
     song.rate(1);
}
function modelLoaded()  {
    console.log('PoseNet is Initialised');
}
function gotPoses (results)
{
    if(results.length > 0)
        {
            console.log(results);
            ScoreLeftWrist = results[0].pose.keypoints[9].score;
            console.log("ScoreLeftWrist = "+ ScoreLeftWrist);
            leftWristX = results[0].pose.leftWrist.x;
            leftWristY = results[0].pose.leftWrist.y;
            console.log("leftWristX = "+ leftWristX + "leftWristY = "+ leftWristY);

            rightWristX = results[0].pose.rightWrist.x;
            rightWristY = results[0].pose.rightWrist.y;
            console.log("rightWristX = "+ rightWristX + "rightWristY = "+ rightWristY);
        }
}
function draw()  {
    Image(video, 0, 0, 600, 500);

    if(ScoreLeftWrist > 0.2) {

    fill("#FF0000");
    stroke("#FF0000");

    circle(leftWristX,LeftWristY,20);
    InNumberWristY = Number(leftWristY);
    remove_decimals = floor(InNumberleftWristY);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume);
}
}