#pragma strict

////////////////////////////////////
// Local script to send position,
// rotation, and frame send time
// to server for interpolation
// on other computers.
// From http://wiki.unity3d.com/index.php?title=NetworkView_Position_Sync
////////////////////////////////////

////////////////////////////////////
// Position
private var pos : Vector3;

// Rotation
private var rot : Quaternion;

// The number of milliseconds that 
// transpire between the packet's
// original send time and the time
// it is resent from the server to
// all the other clients
private var msSinceSend : int = 0;
////////////////////////////////////

function Start() {
	networkView.observed = this;
}
 
function OnSerializeNetworkView(stream : BitStream) {
	pos = rigidbody.position;
	rot = rigidbody.rotation;
	msSinceSend = 0;
	stream.Serialize(pos);
	stream.Serialize(rot);
	stream.Serialize(msSinceSend);
}