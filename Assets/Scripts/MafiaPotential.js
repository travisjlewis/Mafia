#pragma strict

function Start () {

}

function Update () {

}

function OnGUI() {
	if (GetComponent(PlayerLocalNet) != null) {
		GUI.Label (Rect (10, 10, 100, 20), "Mafia");
	}
}