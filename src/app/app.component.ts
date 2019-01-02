import { Component, OnInit } from '@angular/core';
import web3 from './web3';
import lottery from './lottery';
import { NgForm } from '@angular/forms';
import { async } from 'q';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  manager: '';
  players = [];
  balance: any;
  title = 'lottery-angular';
  message: string;

  async ngOnInit() {
    console.log(this.players.length);
    this.manager = await lottery.methods.manager().call();
    this.players = await lottery.methods.getPlayers().call();
    this.balance = await web3.eth.getBalance(lottery.options.address);
  }

  onSubmit = async (form: NgForm) => {
    this.message = 'Waiting for transaction to complete';
    const etherValue = form.value.etherInput;
    const accounts = await web3.eth.getAccounts();
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(etherValue, 'ether')
    });
    this.message = 'You have been enetered!!!';
  }
  onWinnerPick = async() => {
    this.message = 'Waiting for transaction to complete';
    const accounts = await web3.eth.getAccounts();
    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });
    this.message = 'Winner has been picked';
  }
}
