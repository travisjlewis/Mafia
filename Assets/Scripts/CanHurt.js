#pragma strict

var damage : float = 100.0;

private var touching : GameObject = null;

function Update () {
	if (touching != null && Input.GetButtonDown("Fire1")) {
		touching.SendMessage("BeHurt", damage, SendMessageOptions.DontRequireReceiver);
	}
}

function OnTriggerEnter(other : Collider) {
	Debug.Log("Hurt "+other.gameObject.name);
	touching = other.gameObject;
	if (touching.GetComponent(PlayerLocalNet) != null) {
		touching = null;
	}
}

function OnTriggerExit(other : Collider) { 
	touching = null;
}