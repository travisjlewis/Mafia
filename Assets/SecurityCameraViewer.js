#pragma strict

var cameras : Camera[];

function OnTriggerEnter(other : Collider) {
	Debug.Log("Hi, there!");
	var changeCamCpt : ChangeCam = other.gameObject.GetComponent(ChangeCam) as ChangeCam;
	if (changeCamCpt != null) {
		Debug.Log("Hello");
		changeCamCpt.SetCams(cameras);
	}
}

function OnTriggerExit(other : Collider) {
	var changeCamCpt : ChangeCam = other.gameObject.GetComponent(ChangeCam) as ChangeCam;
	if (changeCamCpt != null) {
		Debug.Log("Goodbye!");
		changeCamCpt.RevertCams();
	}
}