#pragma strict

var lethargyFactor : float = 0.01;

private var controller : PersonController;
private var prevMovementSpeed : float;
private var prevTurnSpeed : float;

function Start () {
	controller = GetComponent(PersonController);
	prevTurnSpeed = controller.turnSpeed;
	prevMovementSpeed = controller.movementSpeed;
}

function BeFrozen () {
	Debug.Log("Be Frozen!");
	controller.turnSpeed = prevTurnSpeed * lethargyFactor;
	controller.movementSpeed = prevMovementSpeed * lethargyFactor;
	yield WaitForSeconds(1.0);
	controller.turnSpeed = prevTurnSpeed;
	controller.movementSpeed = prevMovementSpeed;
}