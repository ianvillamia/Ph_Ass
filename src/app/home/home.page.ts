import { Component } from '@angular/core';
import {SpeechRecognition} from '@ionic-native/speech-recognition/ngx';
import{TextToSpeech} from '@ionic-native/text-to-speech/ngx';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  text:string;
  constructor(public speechRecognition:SpeechRecognition,public tts:TextToSpeech) {}

  requestPermission(){
    this.speechRecognition.requestPermission().then((data)=>{
    },(err)=>{
      alert(JSON.stringify(err));
    });
  }

  checkPermission(){
    this.speechRecognition.hasPermission().then((permission)=>{
       if(permission){
        this.startListening();
        this.textToSpeech(this.text);
        alert(this.text);
       }
       else{this.requestPermission();}}

    ,(err)=>{
          alert(JSON.stringify(err));
        });
  }

  startListening(){
    this.speechRecognition.startListening().subscribe((speeches)=>{
      this.text=speeches[0];
      if(this.text=="0"){
        this.text="empty";
      }
      
      },
    (err)=>{
      alert(JSON.stringify(err));
    })
  }

  textToSpeech(text:string){
    this.tts.speak(text);
  }


}
