//The three leads of RGB LED
int redPin = 11;
int greenPin = 10;
int bluePin= 9;

String serialDataIn;
String data[3];
int counter;
char inbyte;
// the setup routine runs once when you press reset:
void setup()  { 
  Serial.begin(9600);
  counter =0;
  serialDataIn = String("");
  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT);
  setColor(0,0,0);
} 
//Function that easily sets the RGB LED to the correct color
void setColor(int red, int green, int blue) {
  red = 255 - red;
  green = 255 - green;
  blue = 255 - blue;
  analogWrite(redPin, red);
  analogWrite(greenPin, green);
  analogWrite(bluePin, blue); 
}
void loop() {
  // Recieve data from Node and write it to a String
  if(Serial.available())
  {
    inbyte = (char)Serial.read();
    if(inbyte >= '0' & inbyte <= '9')
            serialDataIn += inbyte;
        if (inbyte == ','){  // Handle delimiter
            data[counter] = String(serialDataIn);
            serialDataIn = String("");
            counter = counter + 1;
        }
        if(inbyte ==  'U'){  // U for update
            data[counter] = String(serialDataIn);
            clearString();
            Serial.println("Parsing Data...");
            Serial.println("Red Value   = " + data[0]);
            Serial.println("Green Value = " + data[1]);
            Serial.println("Blue Value  = " + data[2]);
            String red = data[0];
            String green = data[1];
            String blue = data[2];
            int redVal = red.toInt();
            int greenVal = green.toInt();
            int blueVal = blue.toInt();
            setColor(redVal, greenVal, blueVal);
          } 
         if(inbyte == 'D'){ //D for Delay
           String delayTime = String(serialDataIn);
           Serial.println("Delay of " + delayTime + " ms");
           delay(delayTime.toInt());
           clearString();
         }
         if(inbyte == 'O'){  //O for off
          Serial.println("LED Off");
          setColor(0,0,0);
          clearString();
         }
         if((char)inbyte == 'R'){  //R for red
          setColor(255,0,0); 
          Serial.println("LED Red");
          clearString();
         }
        if(inbyte == 'G'){  //G for green
          setColor(0,255,0);
          Serial.println("LED Green");
          clearString(); 
         }
        if(inbyte == 'B'){  //B for blue
          setColor(0,0,255);
          Serial.println("LED Blue");
          clearString();
         }   
     delay(50);    
  }
}
void clearString(){
  serialDataIn = String("");
  counter = 0;
}
