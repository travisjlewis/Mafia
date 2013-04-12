#pragma strict

var visionDist : float = 100;

function Update () {
	var hit : RaycastHit;
	var checks : Vector3[] = new Vector3[3];
	checks[0] = transform.forward*visionDist-transform.right;
	checks[1] = transform.forward*visionDist+transform.right;
	checks[2] = transform.forward*visionDist;
	for (var i : int = 0; i < checks.length; i++) {
		if (Physics.Raycast (transform.position+transform.right*(i-1)*0.2, checks[i], hit)) {
	        hit.collider.gameObject.SendMessage("BeFrozen", SendMessageOptions.DontRequireReceiver);
	    }
	}
    
}

function OnDrawGizmos() {
	var checks : Vector3[] = new Vector3[3];
	checks[0] = transform.forward*visionDist-transform.right;
	checks[1] = transform.forward*visionDist+transform.right;
	checks[2] = transform.forward*visionDist;
	for (var i : int = 0; i < checks.length; i++) {
		Gizmos.DrawLine(transform.position+transform.right*(i-1)*0.2, checks[i] + transform.position);
	}	
}