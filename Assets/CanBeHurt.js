#pragma strict

var health : float = 100.0;

function BeHurt(damage : float) {
	networkView.RPC("RemoteBeHurt", RPCMode.AllBuffered, networkView.viewID);
}

@RPC
function RemoteBeHurt(view : NetworkView) {
	var view : NetworkView = NetworkView.Find(view);
	var beHurtCpt : CanBeHurt = view.GetComponent(CanBeHurt) as CanBeHurt;
	beHurtCpt.health -= damage;
}