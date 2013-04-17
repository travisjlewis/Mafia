#pragma strict

var health : float = 100.0;

function BeHurt(damage : float) {
	health -= damage;
}