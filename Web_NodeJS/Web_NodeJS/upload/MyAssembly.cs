using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MyAssembly : MonoBehaviour {

	public static string myString="abc";
	// Use this for initialization
	void Start () {
		Debug.Log ("Hello from start:"+ gameObject.name);
		
	}

	public string LogMyString(){
		return "Hello from DLL";
	}
	
	// Update is called once per frame
	void Update () {
		Debug.Log ("Hello from update");
	}
}
