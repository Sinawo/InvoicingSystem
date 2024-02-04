import { Component, OnInit } from '@angular/core';
declare global {
  interface Window {
    WebChat: any;
  }
}

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {

  ngOnInit(): void {
    this.loadRasaWebchat();
  }

  private loadRasaWebchat(): void {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/rasa-webchat@1.x.x/lib/index.js'; // Replace 1.x.x with the version you want
    script.async = true;
    script.onload = () => {
      window.WebChat.default(
        {
          initPayload: '/greet',
          customData: { language: 'en' },
          socketUrl: 'http://localhost:5005',
          title: 'AspireChatbot',
          // add other props here
        },
        null
      );
    };
    document.head.appendChild(script);
  }
}
