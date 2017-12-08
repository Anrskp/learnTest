import { Component, OnInit, OnDestroy } from '@angular/core';
import {SocketService} from '../../services/socket.service';
import * as socketIo from 'socket.io-client';
import {PostService} from '../../services/post.service';

@Component({
  moduleId: module.id,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [SocketService]
})
export class DashboardComponent  implements OnInit, OnDestroy {
  messages = [];
  connection;
  username: String;
  msg: String;

  constructor(private socketService: SocketService, private postService: PostService) {}

  onRegisterSubmit(){
    this.socketService.sendMessage(this.msg);
  }


  ngOnInit() {
  this.connection = this.postService.getAllPosts().subscribe(posts => {
      this.messages = posts.posts;
      //console.log(posts);
    },
    err => {
      console.log(err);
      return false;
    });

    // this.connection = this.socketService.getMessages().subscribe(message => {
    //   console.log(message['text'])
    //   this.messages.push(message['text']);
    //   console.log(this.messages);
    // })
}

  ngOnDestroy() {
    this.connection.unsubscribe();
  }

}
