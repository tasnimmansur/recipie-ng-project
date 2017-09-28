"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var firebase = require("firebase");
var AuthService = (function () {
    function AuthService() {
    }
    AuthService.prototype.signupUser = function (email, password) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(function (error) { return console.log(error); });
    };
    AuthService.prototype.signinUser = function (email, password) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function (response) { return console.log(response); })
            .catch(function (error) { return console.log(error); });
    };
    AuthService.prototype.getToken = function () {
        firebase.auth().currentUser.getToken();
    };
    return AuthService;
}());
exports.AuthService = AuthService;
