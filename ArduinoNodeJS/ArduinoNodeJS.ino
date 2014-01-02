#include <LiquidCrystal.h>

//The three leads of RGB LED
int redPin = 11;
int greenPin = 10;
int bluePin= 9;
LiquidCrystal lcd(12, 8, 5, 4, 3, 2);

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
  lcd.begin(16, 2);
  lcd.print("Start up");
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
  if(Serial.available()){
    inbyte = (char)Serial.read();
    if(inbyte == '@'){
            serialDataIn = String("@");
            boolean stillname = true;
            lcd.setCursor(0,0);
            while(stillname){
              inbyte = (char)Serial.read();
               if(inbyte == '*'){
                 stillname = false;
                 lcd.print(String(serialDataIn));
                 serialDataIn = String("");
               }else if(( inbyte >= 'a' && inbyte<= 'z') || inbyte=='_'){
                 serialDataIn += inbyte;
               }
            }
            
        }else{
        serialDataIn += inbyte;
        if (inbyte == ','){  // Handle delimiter
            data[counter] = String(serialDataIn);
            serialDataIn = String("");
            counter = counter + 1;
        }
        if(inbyte ==  'U'){  // U for update
            data[counter] = String(serialDataIn);
            clearString();
            String red = data[0].substring(0,data[0].length() - 1);
            String green = data[1].substring(0,data[1].length() - 1);
            String blue = data[2].substring(0,data[2].length() - 1);
            int redVal = red.toInt();
            int greenVal = green.toInt();
            int blueVal = blue.toInt();
            setColor(redVal, greenVal, blueVal);
            lcd.setCursor(0,1);
            lcd.print(red + "," + green + "," + blue + "#Update");
          } 
          if(inbyte == 'C') {//C for clear
            lcd.clear();
          }
         if(inbyte == 'D'){ //D for Delay
           String delayTime = String(serialDataIn);
           delay(delayTime.toInt());
           clearString();
         }
         if(inbyte == 'O'){  //O for off
          setColor(0,0,0);
          clearString();
         }
         if((char)inbyte == 'R'){  //R for red
          setColor(255,0,0); 
          clearString();
          lcd.setCursor(0,1);
          lcd.print("#Red");
         }
        if(inbyte == 'G'){  //G for green
          setColor(0,255,0);
          clearString();
          lcd.setCursor(0,1);
          lcd.print("#Green");
         }
        if(inbyte == 'B'){  //B for blue
          setColor(0,0,255);
          clearString();          
          lcd.setCursor(0,1);
          lcd.print("#Blue");
         }   
        }
     delay(50);  
  }  
}
void clearString(){
  serialDataIn = String("");
  counter = 0;
}
