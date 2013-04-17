#pragma strict

var damage : float = 100.0;

private var touching : GameObject = null;

function Start () {

}

function Update () {
	if (touching != null) {
		touching.SendMessage("BeHurt", damage, SendMessageOptions.DontRequireReceiver);
	}
}

function OnTriggerEnter(other : Collider) {
	Debug.Log("Collide!");
	touching = other.gameObject;
}

function OnTriggerExit(other : Collider) { 
	touching = null;
}