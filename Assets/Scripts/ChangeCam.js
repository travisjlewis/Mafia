#pragma strict

var myCam : Camera;

private var allCams : Camera[];
private var activeCamIdx : int = 0;

function Start() {
	RevertCams();
}

function SetCams(cams : Camera[]) {
	allCams = cams;
	activeCamIdx = 0;
	myCam.enabled = false;
	allCams[0].enabled = true;
}

function RevertCams() {
	allCams = new Camera[1];
	allCams[0] = myCam;
	activeCamIdx = 0;
	myCam.enabled = true;
}

function Update () {
	if (Input.GetButtonDown("Jump")) {

		activeCamIdx++;
		activeCamIdx = activeCamIdx % allCams.length;
		Debug.Log("CAMERA# "+activeCamIdx);
		
		for (var i : int = 0; i < allCams.length; i++) {
			if (i == activeCamIdx) {
				allCams[i].enabled = true;
			} else {
				allCams[i].enabled = false;
			}
		}
	}
}

