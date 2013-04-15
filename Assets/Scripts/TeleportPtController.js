#pragma strict

function OnDrawGizmos() {
	Gizmos.color = Color.green;
	Gizmos.DrawWireSphere(transform.position, 0.5);
}