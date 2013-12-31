// LED vars 
const int ledPin = 13;
const int pwmPin = 3;

// LED read vars
String inputString = "";         // a string to hold incoming data
boolean toggleComplete = false;  // whether the string is complete
boolean pwmComplete = false;  

// Potmeter vars
const int analogInPin = A0;
int sensorValue = 0;        // value read from the potmeter
int prevValue = 0;          // previous value from the potmeter

void setup() {
  // initialize serial:
  Serial.begin(9600);
  // init LEDS
  pinMode(ledPin,OUTPUT);
  pinMode(pwmPin,OUTPUT);
  digitalWrite(ledPin,0);
  analogWrite(pwmPin,0);
}

void loop() {
   // Recieve data from Node and write it to a String
   while (Serial.available() && toggleComplete == false && pwmComplete == false) {
    char inChar = (char)Serial.read();
    if(inChar == 'E'){ // end character for led
     toggleComplete = true;
    }
    if(inChar == 'P'){
      pwmComplete = true;
    }
    else{
      inputString += inChar; 
    }
  }
  // Toggle LED 13
  if(!Serial.available() && toggleComplete == true)
  {
    // convert String to int. 
    int recievedVal = stringToInt();
    
    if(recievedVal == 0)
    {
      digitalWrite(ledPin,recievedVal);
    }
    else if(recievedVal == 1)
    {
      digitalWrite(ledPin,recievedVal);
    }    
    toggleComplete = false;
  }
  // Dim LED 3
  if(!Serial.available() && pwmComplete == true)
  {
    // convert String to int. 
    int recievedVal = stringToInt();
    
    analogWrite(pwmPin,recievedVal);
    
    pwmComplete = false;
  }
    // Potmeter
     sensorValue = analogRead(analogInPin);   
    // read the analog in value:
    if(prevValue != sensorValue){
      Serial.print("B"); // begin character 
      Serial.print(sensorValue);  
      Serial.print("E"); // end character
      prevValue = sensorValue;
    }  
  delay(50); // give the Arduino some breathing room.
}

int stringToInt()
{
    char charHolder[inputString.length()+1];
    inputString.toCharArray(charHolder,inputString.length()+1);
    inputString = "";
    int _recievedVal = atoi(charHolder);
    return _recievedVal;
}
