
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore/lite';

// Your web app's Firebase configuration
//PASTE FIREBASE CONFIG HERE!!!!!!

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//Initialize Product Variables

// Get products list
async function getProduct(db) {
  /*
  //gets all products
  let prodName = "";
  let prodDesc = "";
  const productCol = collection(db, 'products');
  const productSnapshot = await getDocs(productCol);
  const productsList = productSnapshot.docs.map(doc => doc.data());
  console.log(productsList)
  */

  let prodName = "";
  let prodDesc = "";
  let prodRating = 0;
  const productID = "VH9oGG3pusaizEanXDTS";

  const docRef = doc(db, 'products', productID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    prodName = docSnap.data().name;
    prodDesc= docSnap.data().description;
    prodRating= docSnap.data().rating;
    //IMPORTANT: RESTORE WHEN USING BROWSER 
    /*document.getElementById("title").innerHTML = prodName;
    document.getElementById("desc").innerHTML = prodDesc;
    */
    console.log("Product: \n")
    console.log(prodName);
    console.log(prodRating);
    console.log(prodDesc);
    console.log("\n")
    
  } else {
  // docSnap.data() will be undefined in this case
    console.log("No such document!");
  } 

  //comments
  const commentCol = collection(db, 'comments');
  const commentSnapshot = await getDocs(commentCol);
  const commentList = commentSnapshot.docs.map(doc => doc.data());
  let comments = [];
  //return specified product
  for (let i = 0; i < commentList.length; i++) { 
    if (commentList[i].product==productID){
      comments.push(commentList[i]);
    }
   
  }
  console.log("Comments: \n")
  for (let j = 0; j < comments.length; j++) {
    console.log(comments[j]);
  }

}
getProduct(db);
