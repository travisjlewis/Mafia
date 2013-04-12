#pragma strict

var turnSpeed : float;
var movementSpeed : float;
var gravity : float = 5.0;

private var controller : CharacterController;

function Start () {
	controller = GetComponent(CharacterController);
}

function Update () {
	if (networkView.isMine) {
		var horiz : float = Input.GetAxis("Horizontal");
		var vert : float = Input.GetAxis("Vertical");
		transform.Rotate(Vector3.up * horiz * turnSpeed * Time.deltaTime);
		controller.Move((new Vector3(0,-gravity,0) + 
			            (transform.forward * vert * movementSpeed)) * Time.deltaTime);
	} else {
		enabled = false; // Disable movement script locally
	}
}