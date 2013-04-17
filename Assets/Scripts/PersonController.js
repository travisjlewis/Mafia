#pragma strict

var turnSpeed : float;
var movementSpeed : float;
var gravity : float = 5.0;

private var controller : CharacterController;
private var canBeHurt : CanBeHurt;

function Start () {
	canBeHurt = GetComponent(CanBeHurt);
	controller = GetComponent(CharacterController);
}

function Update () {
	if (networkView.isMine) {
		if ((canBeHurt && canBeHurt.health > 0.0) || !canBeHurt) {
			var horiz : float = Input.GetAxis("Horizontal");
			var vert : float = Input.GetAxis("Vertical");
			transform.Rotate(Vector3.up * horiz * turnSpeed * Time.deltaTime);
			controller.Move((new Vector3(0,-gravity,0) + 
				            (transform.forward * vert * movementSpeed)) * Time.deltaTime);
		} else if (canBeHurt.health <= 0.0) {
			GetComponent(MeshRenderer).enabled = false;
		}
	} else {
		enabled = false; // Disable movement script locally
	}
	
}