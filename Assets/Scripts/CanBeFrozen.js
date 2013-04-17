#pragma strict

var lethargyFactor : float = 0.01;

private var controller : PersonController;
private var prevMovementSpeed : float;
private var prevTurnSpeed : float;

private var isFrozen : boolean = false;

private var gizmoRayA : Vector3;
private var gizmoRayB : Vector3;

function Start () {
	controller = GetComponent(PersonController);
	prevTurnSpeed = controller.turnSpeed;
	prevMovementSpeed = controller.movementSpeed;
}

function BeFrozen () {
	isFrozen = true;
	Debug.Log("Be Frozen!");
	controller.turnSpeed = prevTurnSpeed * lethargyFactor;
	controller.movementSpeed = prevMovementSpeed * lethargyFactor;
}

function BeUnfrozen () {
	isFrozen = false;
	Debug.Log("Unfreeze!");
	controller.turnSpeed = prevTurnSpeed;
	controller.movementSpeed = prevMovementSpeed;
}

function OnTriggerEnter (other : Collider) {
	Debug.Log("Check Freezing");
	if (other.tag == "FreezeRegion") {
		var hit : RaycastHit;
		var source : Vector3 = other.gameObject.transform.position;
		var dir : Vector3 = (transform.position + Vector3.up*0.2) - source;
		gizmoRayB = dir;
		gizmoRayA = source;
		// Make sure we can't be frozen through walls
		if (Physics.Raycast (source, dir, hit)) {
			Debug.Log(hit.collider.gameObject);
			Debug.Log(gameObject);
			if (hit.collider.gameObject == gameObject || hit.collider.gameObject.tag=="TeleporterRegion") {
				//Debug.Log(other.gameObject.transform.position);

				//if (!isFrozen) {
					BeFrozen();	
				//}
			} else {
				//if (isFrozen) {
					BeUnfrozen();	
				//}
			}
		}
		
	}
}

function OnTriggerExit (other : Collider) {
	if (other.tag == "FreezeRegion") {
		//if (isFrozen) {
			BeUnfrozen();
		//}
	}
}

function OnDrawGizmos () {
	if (gizmoRayA != null && gizmoRayB != null) {
		Gizmos.DrawRay (gizmoRayA, gizmoRayB);	
	}
}