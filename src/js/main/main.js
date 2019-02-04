import {checkAuthState, registerUser, loginUser} from '../auth/auth.js';
import {saveMeme, readMemes} from '../data/data.js';

window.onload = () => {
  checkAuthState((user)=>{
    if(user){
      loginOrRegister.style.display = "none";
      app.style.display = "block";
      readMemesFromDatabase();
    }else{
      loginOrRegister.style.display = "block";
      app.style.display = "none";
    }
  });
};

const registerWithEmailAndPassword = () => {
  const emailFromUser = emailTextfield.value;
  const passwordFromUser = passwordTextfield.value;
  registerUser(emailFromUser, passwordFromUser);
};

const loginUserWithEmailAndPassword = () => {
  const emailFromUser = emailTextfield.value;
  const passwordFromUser = passwordTextfield.value;
  loginUser(emailFromUser, passwordFromUser);
};

const saveMemeIntoDatabase = () => {
  const memeTitle = titleMeme.value;
  const memeImage = imageMeme.value;
  const ownerName = firebase.auth().currentUser.email;
  saveMeme(memeTitle, memeImage, ownerName);
}

const readMemesFromDatabase = () => {
  readMemes((meme)=>{
    memeContainer.innerHTML = memeContainer.innerHTML + 
    `<h3>${meme.val().title}</h3>
     <img src="${meme.val().image}" style="width:300px"/>`; 
  });
}

registerButton.addEventListener('click', registerWithEmailAndPassword);
loginButton.addEventListener('click', loginUserWithEmailAndPassword);
sendMeme.addEventListener('click', saveMemeIntoDatabase);
