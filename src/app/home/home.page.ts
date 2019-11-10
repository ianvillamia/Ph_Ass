import { Component, OnInit } from '@angular/core';
import {SpeechRecognition} from '@ionic-native/speech-recognition/ngx';
import{TextToSpeech} from '@ionic-native/text-to-speech/ngx';
import { HttpClient, JsonpClientBackend } from '@angular/common/http';

export interface Message{
  message: string,
  sender: string
}

const dialogflowURL =
  'https://asia-east2-phass-c3d43.cloudfunctions.net/dialogflowGateway';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  sessionId = Math.random()
    .toString(10)
    .slice(-5);

  text:string;
  messages: Message[] = [];
  constructor(public speechRecognition:SpeechRecognition,public tts:TextToSpeech, 
    private http: HttpClient) {}
  ngOnInit(){
   // if(this.text=""){  this.textToSpeech(this.text);}
    //else{  this.textToSpeech(this.text);}

    this.messages.push({
      message: 'Hello human! Try saying "What plans can i avail"',
      sender: 'bot'
    });

    // this.messages.push({
    //   message: 'Hello human!',
    //   sender: 'me'
    // })
    this.requestPermission();
  }
  requestPermission(){
    this.speechRecognition.requestPermission().then((data)=>{
    },(err)=>{
      alert(JSON.stringify(err));
    });
  }

  listen(){
    this.speechRecognition.hasPermission().then((permission)=>{
       if(permission){
        this.startListening();
       }
       else{this.requestPermission();}}

    ,(err)=>{
          alert(JSON.stringify(err));
        });
  }

  startListening(){
    this.speechRecognition.startListening().subscribe((speeches)=>{
      this.text=speeches[0];
      if(this.text=="0"){this.text="empty";}
      else{this.send();}
      },
    
      (err)=>{
      alert(JSON.stringify(err));
    })
  }

  textToSpeech(text:string){
    this.tts.speak(text);
  }
  //listen to user 
  user(user_text){
    this.messages.push({
      message:user_text,
      sender: 'me'
    });
  }
  //bot speak
  bot(bot_text){
    this.messages.push({
      message:bot_text,
      sender:'bot'
    })
    this.textToSpeech(bot_text);
  }


   send(){
    const txt =this.text.toLowerCase();
    this.user(this.text);
    //do bot reply
    if(txt==""){
      this.bot("Im sorry I didn't quite catch that");
    }
    if(txt =="what plans can i avail" ){
       this.bot("Okay but first let me get your age..");
        
    }

    if(txt=="21"){
    this.bot("Do you consider yourself to have a safe personality or are you more of a risk taker?");
    //this.bot("Plan All in one . With AIA All-In-One, get protected against 4 major risks in life: untimely death, accidents, disability, and critical illnesses. That way, you can conveniently secure your future and live worry-free with your family.");
    //this.bot("another one is");
    //this.bot("Future Scholar, Future Scholar is an investment and life insurance plan that gives guaranteed education benefits and long-term growth potential. ");
    //this.bot("another example is");
    //this.bot("Future protect,Philam Life’s Future Protect can take care of your future needs. It’s a plan for you when you grow old, or for your loved ones to remember you by should the unexpected happen.")
    }
    if(txt=="safe personality"){this.bot("who do you prioritize more? family or career");}
    if(txt=="risk taker"){this.bot("who do you prioritize more? family or career");}
   // if(txt=="yes"){this.bot("who do you prioritize more? family or career"); }
    if(txt=="family"){this.bot("Then I suggest this Plan....AIA... All in one . With AIA All-In-One, get protected against 4 major risks in life: untimely death, accidents, disability, and critical illnesses. That way, you can conveniently secure your future and live worry-free with your family.");}
    if(txt=="career"){this.bot("Then I suggest this Plan...Future protect...Philam Life’s Future Protect can take care of your future needs. It’s a plan for you when you grow old, or for your loved ones to remember you by should the unexpected happen. Do You want to contact a financial adviser to get in touch with you?")
  //  this.bot("Do you want me to Contact get in touch with a financial advisor?");
    }  
    if(txt=="yes"){this.bot("Done! You will be contacted by a financial adviser Later. Thank you, and have a good day ")}
    if(txt=="no"){this.bot("Ok, Well have a good day");}
    this.text="";  
  }


}
