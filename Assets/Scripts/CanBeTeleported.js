#pragma strict

function OnTriggerEnter(other : Collider) {
	Debug.Log("Collide!");
	Debug.Log(other.tag);
    if (other.tag == "TeleporterRegion") {
		var teleportLocs = GameObject.FindGameObjectsWithTag ("TeleportPoint");
		for (var teleportLoc in teleportLocs) {
			gameObject.transform.position = teleportLoc.transform.position;
			break;
		}
    }
}