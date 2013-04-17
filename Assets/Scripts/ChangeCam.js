#pragma strict

var myCam : Camera;
private var mainCam : Camera;
private var activeCam : boolean = false;

function Start () {
	mainCam = Camera.main;
}

function Update () {
	if (Input.GetButtonDown("Jump")) {
		Debug.Log("Swap!");
		if (activeCam) {
			mainCam.enabled = false;
			myCam.enabled = true;
		} else {
			myCam.enabled = false;
			mainCam.enabled = true;
		}
		activeCam = !activeCam;
	}
}

