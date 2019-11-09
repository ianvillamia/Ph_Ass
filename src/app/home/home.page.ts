import { Component, OnInit } from '@angular/core';
import {SpeechRecognition} from '@ionic-native/speech-recognition/ngx';
import{TextToSpeech} from '@ionic-native/text-to-speech/ngx';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  text:string;
  constructor(public speechRecognition:SpeechRecognition,public tts:TextToSpeech) {}
  ngOnInit(){
   // if(this.text=""){  this.textToSpeech(this.text);}
    //else{  this.textToSpeech(this.text);}
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
      if(this.text=="0"){this.text="empty";}else{ alert(this.text);this.textToSpeech(this.text);}
      },
    (err)=>{
      alert(JSON.stringify(err));
    })
  }

  textToSpeech(text:string){
    this.tts.speak(text);
  }


}
