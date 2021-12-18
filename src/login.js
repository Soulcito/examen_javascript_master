'use strict'

const handleLogin = () => {
  
  //  VARIABLES

   const user = document.getElementById('user');
   const password = document.getElementById('password');
   const alertUser = document.getElementById('alertUser');
   const alertPass = document.getElementById('alertPassword');
   const login = document.getElementById('userPassInvalid');
   const log = document.getElementById('log');
   const play = document.getElementById('play');
   
  //  VALIDACION DE DATOS REQUERIDOS

   if ( user.value == '' || user.value == null ) {
       alertUser.style.display = 'flex';
   } else {
       alertUser.style.display = 'none';
   }

   if ( password.value == '' || password.value == null ) {
       alertPass.style.display = 'flex';
   }else {
       alertPass.style.display = 'none';
   }

  //  VALIDACION DE USER Y PASSWORD

  if ( user.value != '' && user.value != null && password.value != '' && password.value != null ){
    if ( !(user.value == 'admin' && password.value == '123456') ) {
       login.style.display = 'flex';
    } else {
       log.style.display = 'none';
       play.style.display = 'flex';
    }
  }

}