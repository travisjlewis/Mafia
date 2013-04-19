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

function Update () {
	if (health <= 0.0) {
		if (GetComponentInChildren(CanHurt)) {
			GetComponentInChildren(CanHurt).enabled = false;	
		}
		if (GetComponent(MeshRenderer)) {
			GetComponent(MeshRenderer).enabled = false;
		}
		if (GetComponent(CanFreeze)) {
			var canFreezeCpt : CanFreeze = GetComponent(CanFreeze) as CanFreeze;
			if (canFreezeCpt.freezeRegion != null) {
				Destroy(canFreezeCpt.freezeRegion);	
			}
		}
		if (GetComponent(CanBeFrozen)) {
			var canBeFrozenCpt : CanBeFrozen = GetComponent(CanBeFrozen) as CanBeFrozen;
			canBeFrozenCpt.BeUnfrozen();
			canBeFrozenCpt.enabled = false;
		}

	}
}

function OnGUI() {
	if (health <= 0.0 && GetComponent(PlayerLocalNet) != null) {
		GUI.Label (Rect (10, 40, 100, 20), "DEAD");	
	}
}