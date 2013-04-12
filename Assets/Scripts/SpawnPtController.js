#pragma strict

function OnDrawGizmos() {
	Gizmos.color = Color.red;
	Gizmos.DrawWireSphere(transform.position, 0.5);
}