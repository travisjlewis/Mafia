#pragma strict

function OnTriggerEnter(other : Collider) {
	Debug.Log("Collide!");
	Debug.Log(other.tag);
    if (other.tag == "Team1") {
		var teleportLocs = GameObject.FindGameObjectsWithTag ("TeleportPoint");
		for (var teleportLoc in teleportLocs) {
			other.gameObject.transform.position = teleportLoc.transform.position;
			break;
		}
    }
}