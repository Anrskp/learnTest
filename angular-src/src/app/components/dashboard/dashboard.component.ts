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
    let user = JSON.parse(localStorage.getItem('user'));

    let newPost = {
      username: user.username,
      post: this.msg,
      date: new Date()
    }
    this.socketService.sendMessage(newPost);
  }


  ngOnInit() {
  this.postService.getAllPosts().subscribe(posts => {
      posts.posts.forEach(e => this.messages.unshift(e));
    },
    err => {
      console.log(err);
      return false;
    });


     this.connection = this.socketService.getMessages().subscribe(message => {
       this.messages.unshift(message);
      })
}

  ngOnDestroy() {
    this.connection.unsubscribe();
  }

  loadUser() {

  }

}
