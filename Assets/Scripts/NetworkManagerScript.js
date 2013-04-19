#pragma strict

var spawnObjects : Transform[];

private var gameName : String = "Olin_VGV_Proto_00";
private var bttnDims : Rect;
private var isRefreshing : boolean = false;
private var hostData : HostData[];
private var hasCharacter : boolean = false;
private var colorList : Color[];


var totalPlayers : int;
var playersToJoin : int;
var mafiaPlayerAssigned : boolean;
private var playerNetworkIds : NetworkViewID[];

function Start () {
	bttnDims = new Rect(Screen.width * 0.05,
						Screen.width * 0.05,
						Screen.width * 0.2,
						Screen.height * 0.05);
	playersToJoin = totalPlayers;
	colorList = new Color[6];
	colorList[0] = Color.red;
	colorList[1] = Color.blue;
	colorList[2] = Color.green;
	colorList[3] = Color.white;
	colorList[4] = Color.black;
	colorList[5] = Color.yellow;
	playerNetworkIds = new NetworkViewID[totalPlayers];
}

function StartServer () {
	// Max players, Port#, use NAT?
	Network.InitializeServer(32, 25000, false);
	MasterServer.RegisterHost(gameName, "Freeze", "Prototype for VGV");
}

function refreshHostList() {
	MasterServer.RequestHostList(gameName);
	isRefreshing = true;
}

@RPC
function becomeMafia(viewID : NetworkViewID) {
	Debug.Log("GIVE MAFIA");
	var view : NetworkView = NetworkView.Find(viewID);
	var mafiaPotCpt = view.GetComponent(MafiaPotential) as MafiaPotential;
	mafiaPotCpt.enabled = true;
}

@RPC
function decrementPlayersToJoin() {
	Debug.Log(playersToJoin);
	playersToJoin--;
}

@RPC
function spawnPlayerRemotely(viewID : NetworkViewID, team : int) {
	var spawnObject : Transform = spawnObjects[totalPlayers-playersToJoin];
	var newObject : GameObject;
	if (team == 0) {
		newObject = Instantiate(Resources.Load("FreezerPlayer"), spawnObject.position, Quaternion.identity) as GameObject;
	} else if (team == 1) {
		newObject = Instantiate(Resources.Load("ToucherPlayer"), spawnObject.position, Quaternion.identity) as GameObject;
	} else {
		newObject = Instantiate(Resources.Load("MafiaPlayer"), spawnObject.position, Quaternion.identity) as GameObject;
		if (Network.isServer) {
			playerNetworkIds[totalPlayers-playersToJoin] = viewID;
		}
	}
	newObject.AddComponent("PlayerRemoteNet");
	newObject.GetComponent(CharacterController).enabled = false;
	var changeCamCpt = newObject.GetComponent(ChangeCam) as ChangeCam;
	changeCamCpt.myCam.enabled = false;
	changeCamCpt.enabled = false;
	var nView : NetworkView;
    nView = newObject.GetComponent(NetworkView);
    nView.viewID = viewID;
}

function spawnPlayer(viewID : NetworkViewID, team : int) {
	var spawnObject : Transform = spawnObjects[totalPlayers-playersToJoin];
	var newObject : GameObject;
	if (team == 0) {
		newObject = Instantiate(Resources.Load("FreezerPlayer"), spawnObject.position, Quaternion.identity) as GameObject;
	} else if (team == 1) {
		newObject = Instantiate(Resources.Load("ToucherPlayer"), spawnObject.position, Quaternion.identity) as GameObject;
	} else {
		if (Network.isServer) {
			Debug.Log("Players Tot: "+ totalPlayers);
			Debug.Log("Players To Join: "+ playersToJoin);
			playerNetworkIds[totalPlayers-playersToJoin] = viewID;
		}
		newObject = Instantiate(Resources.Load("MafiaPlayer"), spawnObject.position, Quaternion.identity) as GameObject;
		newObject.GetComponent(MafiaPotential).enabled = false;
	}
	newObject.AddComponent("PlayerLocalNet");
	var nView : NetworkView;
    nView = newObject.GetComponent(NetworkView);
    nView.viewID = viewID;


}

function spawnFreezer() {
 	var viewID : NetworkViewID = Network.AllocateViewID();
 	spawnPlayer(viewID, 0);
 	networkView.RPC("spawnPlayerRemotely", RPCMode.OthersBuffered, viewID, 0);
}

function spawnToucher() {
 	var viewID : NetworkViewID = Network.AllocateViewID();
 	spawnPlayer(viewID, 1);
 	networkView.RPC("spawnPlayerRemotely", RPCMode.OthersBuffered, viewID, 1);
}

function spawnMafiaChar() {
	Debug.Log("MAFIA");
	var viewID : NetworkViewID = Network.AllocateViewID();
	spawnPlayer(viewID, 2);
 	networkView.RPC("spawnPlayerRemotely", RPCMode.OthersBuffered, viewID, 2);
 	networkView.RPC("decrementPlayersToJoin", RPCMode.AllBuffered);
 	networkView.RPC("SetColor", RPCMode.AllBuffered, viewID, playersToJoin);
}

@RPC
function SetColor(viewID : NetworkViewID, colorNum : int) {
	var view : NetworkView = NetworkView.Find(viewID);
	view.renderer.material.color = colorList[colorNum];
}

function OnMasterServerEvent(mse:MasterServerEvent) {
	if (mse == MasterServerEvent.RegistrationSucceeded) {
		Debug.Log("Registered Server!");
	}
}

function Update () {
	if (isRefreshing) {
		if (MasterServer.PollHostList().length > 0) {
			isRefreshing = false;			
			Debug.Log(MasterServer.PollHostList().length);
			hostData = MasterServer.PollHostList();
		}
	}
	if (Network.isServer) {
		if (!mafiaPlayerAssigned && playersToJoin == 0) {
			var mafiaID = playerNetworkIds[Random.Range(0,totalPlayers)];
			networkView.RPC("becomeMafia", RPCMode.AllBuffered, mafiaID);
			mafiaPlayerAssigned = true;
		}
	}

}

// ----------------------------------------------------------------------
function OnGUI() {
	if (!Network.isClient && !Network.isServer) {
		if (GUI.Button(bttnDims, "Start Server")) {
			Debug.Log("Starting Server");
			StartServer();
		}
	
		if (GUI.Button(Rect(bttnDims.x,
			                bttnDims.y * 1.2 + bttnDims.height,
			                bttnDims.width,
			                bttnDims.height), "Refresh Hosts")) {
			Debug.Log("Refreshing");
			refreshHostList();
		}
	
		if (hostData) {
			for (var i : int = 0; i < hostData.length; i++) {
				if (GUI.Button(Rect(bttnDims.x * 1.5 + bttnDims.width,
				                bttnDims.y * 1.2 + bttnDims.height * i,
				                bttnDims.width * 3,
				                bttnDims.height),
							hostData[i].gameName)) {
					Network.Connect(hostData[i]);
				}
			}
		}
	} else {
		if (!hasCharacter) {
			/*if (GUI.Button(bttnDims, "Join Freezers")) {
				Debug.Log("Joining Freezers!");
				hasCharacter = true;
				spawnFreezer();
			}
	
			if (GUI.Button(Rect(bttnDims.x,
				                bttnDims.y * 1.2 + bttnDims.height,
				                bttnDims.width,
				                bttnDims.height), "Join Touchers")) {
				Debug.Log("Joining Touchers!");
				hasCharacter = true;
				spawnToucher();
			}*/
			spawnMafiaChar();
			hasCharacter = true;
		}
	}
}