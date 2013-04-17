#pragma strict

var health : float = 100.0;

function BeHurt(damage : float) {
	networkView.RPC("RemoteBeHurt", RPCMode.AllBuffered, networkView.viewID, damage);
}

@RPC
function RemoteBeHurt(viewID : NetworkViewID, damage : float) {
	var view : NetworkView = NetworkView.Find(viewID);
	var beHurtCpt : CanBeHurt = view.GetComponent(CanBeHurt) as CanBeHurt;
	beHurtCpt.health -= damage;
}