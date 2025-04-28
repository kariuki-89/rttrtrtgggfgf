let groupBanner=""
const firebaseConfig = {
    apiKey: "AIzaSyDdP0hVyTf2rAumW85iNI9lm-PB2lCtm5I",
    authDomain: "asap-9f1b3.firebaseapp.com",
    databaseURL: "https://asap-9f1b3-default-rtdb.firebaseio.com",
    projectId: "asap-9f1b3",
    storageBucket: "asap-9f1b3.appspot.com",
    messagingSenderId: "142417176441",
    appId: "1:142417176441:web:c702e6f41792a54f73f1a8",
    measurementId: "G-LXQW43CQ1T"
  };
  
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // Use the already initialized app
  }
  
  //const storage = firebase.storage();
  const auth = firebase.auth();
  const db = firebase.firestore();
  const provider = new firebase.auth.GoogleAuthProvider();
  const storage = firebase.storage();
  
  let current_page=window.location.pathname
  current_page=current_page.trim()
  let path_url=window.location.href
  let params = new URLSearchParams(window.location.search);
  let paramsObj=Object.fromEntries(params.entries()); // Converts to an object
  console.log(current_page)
  
  let profileImage=null
  let selectedFile=null
  let skills=[]
  let industries=[]
  let fileportfolio="empty"
  let linkedintheprofy=""

  window.onload = async function() {
    console.log('Page is fully loaded!');
    // Your code here
    let current_page=window.location.pathname
    current_page=current_page.trim()
    let path_url=window.location.href
    let params = new URLSearchParams(window.location.search);
    let paramsObj=Object.fromEntries(params.entries()); // Converts to an object
    console.log(current_page)

    if(current_page=="/gated-content/dashboard"){
      const user = firebase.auth().currentUser;
      
      
    }
  
};

  async function changepasswordLink(){
    let theEmail=document.getElementById("changepasswordinput").value
    firebase.auth().sendPasswordResetEmail(theEmail)
    .then(() => {
    console.log("Password reset email sent!");
  })
    .catch((error) => {
    console.error("Error sending password reset email:", error);
  });
  }    ``

  async function updateUserEmail(){
    let thenewUserEmail=document.getElementById("newuseremailinput").value
    let theoldUserEmail=document.getElementById("useremailinput").value
    let thepassword=document.getElementById("passwordchange").value

    const user = firebase.auth().currentUser;
    const providers = user.providerData.map((p) => p.providerId);

    if(user){

      console.log("Linked providers:", providers);

      if (providers.includes("password")) {
        // Already has Email/Password linked — just reauthenticate and update
        const credential = firebase.auth.EmailAuthProvider.credential(
          user.email,
          thepassword // ask the user for their password
        );
      
        user.reauthenticateWithCredential(credential)
          .then(() => {
            return user.updateEmail(thenewUserEmail);
          })
          .then(() => {
            console.log("Email updated successfully");
          })
          .catch((error) => {
            console.error("Error reauthenticating/updating email:", error);
          });
      
      } else {
        // Email/Password not yet linked — safe to link first
        const credential = firebase.auth.EmailAuthProvider.credential(
          user.email,
          thepassword // ask the user to create/confirm a password
        );
      
        user.linkWithCredential(credential)
          .then(() => {
            return user.updateEmail(thenewUserEmail);
          })
          .then(() => {
            console.log("Email linked and updated successfully");
          })
          .catch((error) => {
            console.error("Error linking/updating email:", error);
          });
      }
    }
  else{
    console.log("not logged in")
  }

  }
  document.addEventListener("DOMContentLoaded", async() => {
  
      theselecteduserplan=localStorage.getItem("selectedUserPlan")
      console.log(theselecteduserplan)
      path_url=window.location.href
      //check whether the user is signed up
      firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          console.log("User is signed in:", user.uid);
          //cdn_listenForSnapshots()
          //cdn_listenForSnapshots_connectedaccounts()
          const chatBody = document.querySelector("#chat-container");
          let signedInUser=cdn_getUserById(user.uid)
         //cdn_listenForSnapshots_messages({},"normal")
          let usersCreated=await getfirebaseItems("groups","creator","==",user.uid)
          console.log("🌮🌮🌮🦮🦮",usersCreated)
          let usersconnected=await getItemsonseveralconditions("groups","creator","==",user.uid,"members","array-contains",user.uid)
          console.log("💃🏽💃🏽💃🏽",usersconnected)
          let usersSuggested=await getItemsonseveralconditions("groups","creator","==",user.uid,"members","array-contains",user.uid)
          
          let theCreatedGroupSlider=document.getElementById("theUserCreatedGroupSlider")
          let theConnectedGroupSlider=document.getElementById("theConnectedGroupSlider")
          let thesuggestedGroupSlider=document.getElementById("thesuggestedGroupSlider")
          theCreatedGroupSlider.innerHTML=""

          if(usersCreated.length<=0){
            document.getElementById("userscreatedgroupsempty").style.display="flex"
            document.getElementById("usercreatedslidercontainer").style.display="none"
            document.getElementById("theloadingitems3").style.display="flex"
            
          }
          else{
            document.getElementById("userscreatedgroupsempty").style.display="none"
            document.getElementById("usercreatedslidercontainer").style.display="flex"

            for (let element in usersCreated){
              groupslider2=document.createElement("div")
              groupslider2.classList.add("groupslidingbox","w-slide")
              groupContainer2=document.createElement("div")
              groupContainer2.classList.add("groupcontainer")
              groupbanner2=document.createElement("div")
              groupbanner2.classList.add("groupbanner")
              let backgroundUrl2=usersCreated[element].groupBanner
              if(backgroundUrl2==""||backgroundUrl==null||backgroundUrl==undefined){
                backgroundUrl2='https://cdn.prod.website-files.com/672cee637178adaccd3479eb/680276bea516af172ea961c4_images%20(1).jpg'
              }
              groupbanner2.style.backgroundImage=`url(${backgroundUrl2})`;
              groupbanner2.style.backgroundSize = "cover"; 
              groupbanner2.style.backgroundPosition = "center"; 
              groupbanner2.style.backgroundRepeat = "no-repeat";
              groupname2=document.createElement("p")
              groupname2.classList.add("groupname")
              groupname2.innerText=usersCreated[element].groupName
              groupDescription2=document.createElement("p")
              groupDescription2.classList.add("groupdescription")
              groupDescription2.innerText=usersCreated[element].groupDescription
              buttonContainer2=document.createElement("div")
              buttonContainer2.classList.add("buttoncontainer")
              custombutton2=document.createElement("div")
              custombutton2.classList.add("custombutton")
              buttonImage2=document.createElement("img")
              buttonImage2.classList.add("buttonimage")
              buttonImage2.src='https://cdn.prod.website-files.com/672cee637178adaccd3479eb/6803efa262a2ac3361e11095_icons8-join-80%20(1).png'
              buttonText2=document.createElement("p")
              buttonText2.classList.add("thebuttontext")
              buttonText2.innerText="Go to group"
              
              custombutton2.append(buttonImage2,buttonText2)
              buttonContainer2.append(custombutton2)
              groupContainer2.append(groupbanner2,groupname2,groupDescription2,buttonContainer2)
              groupslider2.append(groupContainer2)
              theCreatedGroupSlider.append(groupslider2)

            }
            document.getElementById("theloadingitems3").style.display="flex"
            
          }

          if(usersconnected.length<=0){
            document.getElementById("usersconnectedgroupsempty").style.display="flex"
            document.getElementById("usersconnectedsidecontainer").style.display="none"
            document.getElementById("theloadingitems2").style.display="flex"
            
          }
          else{
            document.getElementById("userscreatedgroupsempty").style.display="none"
            document.getElementById("usercreatedslidercontainer").style.display="flex"

            for (let element in usersCreated){
              groupslider=document.createElement("div")
              groupslider.classList.add("groupslidingbox","w-slide")
              groupContainer=document.createElement("div")
              groupContainer.classList.add("groupcontainer")
              groupbanner=document.createElement("div")
              groupbanner.classList.add("groupbanner")
              let backgroundUrl=usersCreated[element].groupBanner
              if(backgroundUrl==""||backgroundUrl==null||backgroundUrl==undefined){
                backgroundUrl='https://cdn.prod.website-files.com/672cee637178adaccd3479eb/680276bea516af172ea961c4_images%20(1).jpg'
              }
              groupbanner.style.backgroundImage=`url(${backgroundUrl})`;
              groupbanner.style.backgroundSize = "cover"; 
              groupbanner.style.backgroundPosition = "center"; 
              groupbanner.style.backgroundRepeat = "no-repeat";
              groupname=document.createElement("p")
              groupname.classList.add("groupname")
              groupname.innerText=usersCreated[element].groupName
              groupDescription=document.createElement("p")
              groupDescription.classList.add("groupdescription")
              groupDescription.innerText=usersCreated[element].groupDescription
              buttonContainer=document.createElement("div")
              buttonContainer.classList.add("buttoncontainer")
              custombutton=document.createElement("div")
              custombutton.classList.add("custombutton")
              buttonImage=document.createElement("img")
              buttonImage.classList.add("buttonimage")
              buttonImage.src='https://cdn.prod.website-files.com/672cee637178adaccd3479eb/6803efa262a2ac3361e11095_icons8-join-80%20(1).png'
              buttonText=document.createElement("p")
              buttonText.classList.add("thebuttontext")
              buttonText.innerText="Go to group"
              
              custombutton.append(buttonImage,buttonText)
              buttonContainer.append(custombutton)
              groupContainer.append(groupbanner,groupname,groupDescription,buttonContainer)
              groupslider.append(groupContainer)
              theConnectedGroupSlider.append(groupslider)

            }
            document.getElementById("theloadingitems2").style.display="flex"
            
          }

          if(usersSuggested.length<=0){
            document.getElementById("userscreatedgroupsempty").style.display="flex"
            document.getElementById("usercreatedslidercontainer").style.display="none"
            document.getElementById("theloadingitems1").style.display="flex"
            
          }
          else{
            document.getElementById("userscreatedgroupsempty").style.display="none"
            document.getElementById("usercreatedslidercontainer").style.display="flex"

            for (let element in usersCreated){
              groupslider3=document.createElement("div")
              groupslider3.classList.add("groupslidingbox","w-slide")
              groupContainer3=document.createElement("div")
              groupContainer3.classList.add("groupcontainer")
              groupbanner3=document.createElement("div")
              groupbanner3.classList.add("groupbanner")
              let backgroundUrl3=usersCreated[element].groupBanner
              if(backgroundUrl3==""||backgroundUrl==null||backgroundUrl==undefined){
                backgroundUrl3='https://cdn.prod.website-files.com/672cee637178adaccd3479eb/680276bea516af172ea961c4_images%20(1).jpg'
              }
              groupbanner3.style.backgroundImage=`url(${backgroundUrl3})`;
              groupbanner3.style.backgroundSize = "cover"; 
              groupbanner3.style.backgroundPosition = "center"; 
              groupbanner3.style.backgroundRepeat = "no-repeat";
              groupname3=document.createElement("p")
              groupname3.classList.add("groupname")
              groupname3.innerText=usersCreated[element].groupName
              groupDescription3=document.createElement("p")
              groupDescription3.classList.add("groupdescription")
              groupDescription3.innerText=usersCreated[element].groupDescription
              buttonContainer3=document.createElement("div")
              buttonContainer3.classList.add("buttoncontainer")
              custombutton3=document.createElement("div")
              custombutton3.classList.add("custombutton")
              buttonImage3=document.createElement("img")
              buttonImage3.classList.add("buttonimage")
              buttonImage3.src='https://cdn.prod.website-files.com/672cee637178adaccd3479eb/6803efa262a2ac3361e11095_icons8-join-80%20(1).png'
              buttonText3=document.createElement("p")
              buttonText3.classList.add("thebuttontext")
              buttonText3.innerText="Go to group"
              
              custombutton3.append(buttonImage3,buttonText3)
              buttonContainer3.append(custombutton3)
              groupContainer3.append(groupbanner3,groupname3,groupDescription3,buttonContainer3)
              groupslider3.append(groupContainer3)
              thesuggestedGroupSlider.append(groupslider3)

            }
            document.getElementById("theloadingitems1").style.display="flex"
            
          }
      
        } else {
          console.log("No user is signed in.");
          if(current_page=="/gated-content/dashboard"){
            homepageRedirect("/")
          }
          
      //alert("Please sign in to access your data");
    }
  });
  
  
      const signUpButton = document.querySelector("#signup-button");
      const logInButton = document.querySelector("#login-button");
      const logOutButton=document.querySelector("#logoutbutton");
      let loginGoogleButton=document.querySelector("#loginGoogleButton");
      let SignupGoogleButton=document.querySelector("#signUpGoogle");
      let thefileuploader=document.querySelector("#profileUploader");
      let thefileuploader2=document.querySelector("#profileUploader2")
      let thesubmitbutton=document.querySelector("#skillsbutton")
      let multifileuploader=document.querySelector("#multiFileUploader")
      let theaccountnavigate=document.querySelector("#theaccountnavigate")
      let submitprofilebutton=document.querySelector("#subitprofileinput")
      let theemailupdatebutton=document.querySelector("#updateemailbutton")
      let passwordupdatebuttonLink=document.querySelector("#changepasswordbutton")
      let creategroupbutton=document.querySelector("#creategroupbutton")

      if(creategroupbutton){
        creategroupbutton.addEventListener("click",async()=>{
          let thisButton=event.target
          thisButton.classList.add("submitting")
          thisButton.disabled=true
          let creator=firebase.auth().currentUser;
          let data={
            groupName:document.getElementById("groupname").value,
            groupDescription:document.getElementById("groupdescription").value,
            groupAddress:document.getElementById("address-input").value,
            groupBanner:groupBanner,
            creator:creator.uid,
            members:[creator.uid]
          }
          let groupelement=await cdn_createTables("groups",data)
          thisButton.classList.remove("submitting")
          thisButton.disabled=false
          thisButton.value="Submitted"
          setTimeout(() => {
            thisButton.value="Submit"
          }, 1000);
        })
      }

      if (theemailupdatebutton){
        theemailupdatebutton.addEventListener("click",async ()=>{
          let theemailupdates=await updateUserEmail()
        })
      }

      if(passwordupdatebuttonLink){
        passwordupdatebuttonLink.addEventListener("click",async()=>{
          let changepassword=await changepasswordLink()
        })
      }

      if (submitprofilebutton){
        submitprofilebutton.addEventListener("click",async ()=>{
         let thisButton=event.target
         thisButton.classList.add("submitting")
         thisButton.disabled=true
         thisButton.value="Submitting"
         let thisuser=localStorage.getItem("uniqueId")
         let updateData={
          firstname:document.getElementById("firstnameinput").value,
          lastname:document.getElementById("lastnameinput").value,
          personalstatement:document.getElementById("personalstatementinput").value,
          hobbies:document.getElementById("hobbiesinput").value,
          offerings:document.getElementById("offeringsinput").value,
          email:document.getElementById("useremailinput").value,
          address:document.getElementById("address-input").value
         }
         let updateUser=await updateDocument("users",thisuser,updateData)
         console.log(updateUser)
         thisButton.classList.remove("submitting")
          thisButton.disabled=false
          thisButton.value="Submitted"
          setTimeout(() => {
            thisButton.value="Submit"
          }, 1000);
          
        })
        
      }
  
      // Select all buttons with class "option"
      document.querySelectorAll(".skilloption").forEach(button => {
        button.addEventListener("click", function () {
            console.log(`You clicked: ${this.innerText}`);
            let thisSkill=this.innerText
            let hasthisSkill = skills.includes(this.innerText)
            console.log(hasthisSkill,skills)
            if (hasthisSkill){
              skills = skills.filter(skill => skill !== this.innerText);
              this.classList.remove("selected");
              console.log()
            }
            else{
              skills.push(this.innerText)
              this.classList.add("selected");
            }
        });
      });
  
      // Select all buttons with class "option"
      document.querySelectorAll(".planspopupselect").forEach(button => {
        button.addEventListener("click", function () {
            console.log(`You clicked: ${this.innerText}`);
            let theuserselectedplan=this.getAttribute("plan")
            localStorage.setItem("selectedUserPlan",theuserselectedplan)
        });
      });
  
      // Select all buttons with class "option"
      document.querySelectorAll(".userplanlink").forEach(button => {
        button.addEventListener("click", function () {
            console.log(`You clicked: ${this.innerText}`);
            let theuserselectedplan=this.getAttribute("plan")
            localStorage.setItem("selectedUserPlan",theuserselectedplan)
        });
      });
  
      document.querySelectorAll(".industryitem").forEach(button => {
        button.addEventListener("click", function () {
            console.log(`You clicked: ${this.innerText}`);
            let thisindustry=this.innerText
            let hasthisSkill = industries.includes(this.innerText);
            if (hasthisSkill){
              industries = industries.filter(industry => industry !==  this.innerText);
              this.classList.remove("selected");
            }
            else{
              industries.push(this.innerText)
              this.classList.add("selected");
            }
        });
      });
  
      if (multifileuploader){
        document.getElementById("multiFileUploader").addEventListener("change", function(event) {
          const fileList = document.getElementById("theimageviewercontainer");
          fileList.innerHTML = ""; // Clear previous file list
      
          Array.from(event.target.files).forEach(file => {
              const listItem = document.createElement("p");
              listItem.textContent = `File: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`;
              fileList.appendChild(listItem);
          });
      });
      }
  
      if(thefileuploader2){
        document.getElementById("profileUploader2").addEventListener("change", async function (event) {
          const file = event.target.files[0]; // Get the selected file
          selectedFile = event.target.files[0];
          if (file) {
             let fileUrl=await uploadFile(selectedFile)
             console.log(fileUrl)
             if(fileUrl!="file not uploaded"){
             let user=firebase.auth().currentUser;
             let data={
              profileImage:fileUrl
             }
             let updatedUser=await updateDocument("users",user.uid,data)
             const div = document.getElementById("showprofileimage");
              div.style.backgroundImage = `url('${fileUrl}')`;
              div.style.backgroundSize = "cover";         // Cover entire div
              div.style.backgroundPosition = "center";    // Center the image
              div.style.backgroundRepeat = "no-repeat";   // Prevent tiling
            }
          } else {
              console.log("No file selected")
          }
      });
      }
     
      if (thefileuploader){
        // Listen for file selection
        document.getElementById("profileUploader").addEventListener("change", function (event) {
        
  
        selectedFile = event.target.files[0]; // Store the selected file
        const thefile = event.target.files[0];
  
        if (thefile) {
          const reader = new FileReader();
  
          reader.onload = function (e) {
  
            const img = new Image();
            img.src = e.target.result;
  
            img.onload = function () {
            const width = img.width;
            const height = img.height;
            const aspectRatio = width / height;
  
            console.log(`Width: ${width}px, Height: ${height}px, Aspect Ratio: ${aspectRatio}`);
  
            theimageviewercontainer=document.getElementById("theimageviewercontainer")
            theimageviewer=document.getElementById("theimageviewer")
            theimageviewer.src = img.src; // Set image source
            theimageviewer.style.display = "block"; // Show the image
            theimageviewer.style.width = "100px"; // Set width
            theimageviewer.style.height = `${100 / aspectRatio}px`; // Adjust height 
            console.log("FileReader result:", e.target.result); // Debugging
            };
            
          };
  
          reader.onerror = function (error) {
              console.error("Error reading file:", error);
          };
  
          reader.readAsDataURL(thefile); // Read file as Data URL
      } else {
          console.warn("No file selected or file is empty.");
      }
        
      });
      }
  
  
      if(theaccountnavigate){
        document.querySelector("#theaccountnavigate").addEventListener("click", async (event) =>{
        try {
          firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
              console.log("User is signed in:", user.uid);
              //cdn_listenForSnapshots()
              //cdn_listenForSnapshots_connectedaccounts()
              const chatBody = document.querySelector("#chat-container");
              let signedInUser=await cdn_getUserByIdreturn(user.uid)
              console.log("👩🏽‍💻👩🏽‍💻👩🏽‍💻👩🏽‍💻🦸🏽‍♂️🦸🏽‍♂️",signedInUser)
              let membertpye=signedInUser.usertype
              homepageRedirect("/gated-content/dashboard")
               
             //cdn_listenForSnapshots_messages({},"normal")
          
            } else {
              console.log("No user is signed in.");
          //alert("Please sign in to access your data");
        }
      });
          
        } catch (error) {
          console.log("No user is signed in.");
      }})}
  
  
  
      if(loginGoogleButton){
          document.querySelector("#loginGoogleButton").addEventListener("click", async (event) =>{
          try {
            const result = await auth.signInWithPopup(provider);
            // The signed-in user info
            const user = result.user;
            console.log('User signed in:', user);
            console.log(user.email);
            cdn_getUserByEmail(user.email,user,user.displayName)
          } catch (error) {
            console.error('Error during Google Sign-In:', error.message);
            showElementById("warningDialog")
            setInputValueById("error-message",error.message)
          }
        })}
  
      if(SignupGoogleButton){
          document.querySelector("#signUpGoogle").addEventListener("click", async (event) =>{
          try {
            const result = await auth.signInWithPopup(provider);
            // The signed-in user info
            const user = result.user;
            console.log('User signed in:', user);
            console.log(user.email);
            cdn_getUserByEmail(user.email,user,user.displayName)
          } catch (error) {
            console.error('Error during Google Sign-In:', error.message);
            showElementById("warningDialog")
            setInputValueById("error-message",error.message)
          }
        })}
  
      
      function delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
      }
  
      if (logOutButton){
        document.querySelector("#logoutbutton").addEventListener("click", (event) =>{
          logOutUser()
          homepageRedirect("/")
        })}
  
      if(signUpButton!=null&&signUpButton!=undefined){
          signUpButton.addEventListener("click", async (event) => {
              event.preventDefault(); // Prevent the form from submitting
          
              // Get the values of email and password fields
              const fullName = document.querySelector("input[id='First-Name-Signup']").value;
              const lastName = document.querySelector("input[id='Last-Name-Signup']").value;
              const email = document.querySelector("input[id='Email-Signup']").value;
              const password = document.querySelector("input[id='Password-Signup']").value;
              const ConfirmPassword = document.querySelector("input[id='Confirm-Password-Signup']").value;
              console.log(ConfirmPassword)
          
              // Log the values to the console (you can replace this with your login logic)
              console.log("Email:", email);
              console.log("Password:", password);
          
              // Simulate login action
              let allFields=email && password&&fullName&&ConfirmPassword
              let confirmPasswordval=password==ConfirmPassword
              
              let urlimageprofile="empty"
              
  
              if (!allFields&&confirmPasswordval) {
                    
                //action(email,password);
                showElementById("warningDialog")
                setInputValueById("error-message","All the fields should not be empty")
                    
              } 
                  
              if (!allFields&&!confirmPasswordval) {
                    
                //action(email,password);
                showElementById("warningDialog")
                setInputValueById("error-message","All the fields should not be empty")
                    
              } 
          
              if (allFields&&!confirmPasswordval) {
                showElementById("warningDialog")
                setInputValueById("error-message","Confirm password is not the same as the password") 
              } 
          
              if (allFields&&confirmPasswordval) {
                showElementById("loader")   
                //action(email,password);
                if(selectedFile){
                  try{
                    urlimageprofile=await uploadFile(selectedFile);
                    console.log(urlimageprofile)
                  }
                  catch{
                   console.log("error uploading file to firebase storage")
                  }
                }
                else{
                  console.log("no file uploaded")
                }
    
                cdn_signUp(email,password,fullName,lastName,ConfirmPassword,urlimageprofile)
                //action(email,password,fullName);
                
                    
              } 
          })};
      
  
      if(logInButton!=null&&logInButton!=undefined){
          // Add click event listener to the login button
        logInButton.addEventListener("click", (event) => {
          event.preventDefault(); // Prevent the form from submitting
              
        // Get the values of email and password fields
        const email = document.querySelector("input[id='Email-Signup']").value;
        const password = document.querySelector("input[id='Password-Signup']").value;
              
        // Log the values to the console (you can replace this with your login logic)
        console.log("Email:", email);
        console.log("Password:", password);
              
        // Simulate login action
        if (email && password) {
          console.log("testPage")
          //action(email,password);
          //signInUser(email,password);
          cdn_signIn(email,password);
          showElementById("loader")
                  
        } else {
          showElementById("warningDialog")
          setInputValueById("error-message","Please fill all the fields")
        }
      })};
  })
  
  
  
  //all my functions🔷🔷🔷🧑🏿‍❤️‍💋‍🧑🏾🧑🏿‍❤️‍💋‍🧑🏽🧑🏿‍❤️‍💋‍🧑🏽🥪🥪🥪🥪🌮
  async function cdn_getUserByEmail(email,user,name) {
    
    // Query the 'users' collection where the 'email' field matches the input
    console.log("the logged in user",user)
    try {
      const querySnapshot = await db.collection("users").where("email", "==", email).get();
  
      if (querySnapshot.empty) {
        console.log("empty", email);
  
        const savedData = await saveUserToFirestore(user, name,"","");
        console.log(savedData);
  
        if (savedData.status === "200 ok") {
          // Uncomment the following lines if needed
          
          localStorage.setItem("siteUserName", savedData.response.name);
          localStorage.setItem("uniqueId", savedData.response.uuid);
          localStorage.setItem("theToken", savedData.response.uuid);
          localStorage.setItem("userEmail", savedData.response.email);
          localStorage.setItem("userProfile", savedData.response.profileImage);
          setCookie("agentmultiagentwebtky", savedData.response.uuid, 3);
          setCookie("agentmultiagentwebide", savedData.response.uuid, 3);
          let membertpye=localStorage.getItem("selectedUserPlan")
          homepageRedirect("/gated-content/dashboard") 
        } else {
          showElementById("warningDialog")
          setInputValueById("error-message","An error occurred. Please try again")
        }
        return; // Exit the function if no matching user is found
      }
  
      // Iterate over matching documents and display user data
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        console.log("User Data:", userData);
        
        localStorage.setItem("siteUserName", userData.name);
        localStorage.setItem("uniqueId", userData.uuid);
        localStorage.setItem("userEmail", userData.email);
        localStorage.setItem("theToken", userData.uuid);
        localStorage.setItem("userProfile", userData.uuidprofileImage);
        window.location.href = `/gated-content/dashboard`;
      });
    } catch (error) {
      console.error("Error fetching user:", error.message);
      showElementById("warningDialog")
      setInputValueById("error-message",error.message)
    }
  }
  
  
  //getuserbyId🔷🔷🔷🧑🏿‍❤️‍💋‍🧑🏾🧑🏿‍❤️‍💋‍🧑🏽🧑🏿‍❤️‍💋‍🧑🏽🥪🥪🥪🥪🌮
  async function cdn_getUserByIdreturn(uid) {
    
    // Query the 'users' collection where the 'email' field matches the input
    try {
      const querySnapshot = await db.collection("users").where("uuid", "==", uid).get();
  
      if (querySnapshot.empty) {
        //window.location.href = `/`;
        return {"data":"no user"};
      }
      let thedata
      // Iterate over matching documents and display user data
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        console.log("User Data:", userData);
        thedata= userData
      });
      return thedata
    }
    catch(e){
      return{"data":"error"}
    }
  }
        
  
  //getuserbyId🔷🔷🔷🧑🏿‍❤️‍💋‍🧑🏾🧑🏿‍❤️‍💋‍🧑🏽🧑🏿‍❤️‍💋‍🧑🏽🥪🥪🥪🥪🌮
  async function cdn_getUserById(uid) {
    
    // Query the 'users' collection where the 'email' field matches the input
    try {
      const querySnapshot = await db.collection("users").where("uuid", "==", uid).get();
  
      if (querySnapshot.empty) {
        //window.location.href = `/`;
        return "No user";
      }
  
      // Iterate over matching documents and display user data
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        console.log("User Data:", userData);
        
        localStorage.setItem("siteUserName", userData.name);
        localStorage.setItem("uniqueId", userData.uuid);
        localStorage.setItem("userEmail", userData.email);
        localStorage.setItem("theToken", userData.uuid);
        localStorage.setItem("userProfile", userData.uuidprofileImage);
        localStorage.setItem("docId", doc.id);
        if(current_page=="/login"||current_page=="/signup"){
            homepageRedirect("/gated-content/dashboard")
        }
        if(current_page=="/gated-content/dashboard"){
          console.log("in dashy")
          let userAddress=userData.address
          if (userAddress!=undefined&&userAddress!=null&&userAddress!=""){
            if(document.getElementById("address-input")!=null&&document.getElementById("address-input")!=""){
              document.getElementById("address-input").value=userAddress
            }
          }
          
        }
        if(current_page=="/gated-content/profile"){
          console.log("in profile settings")
          document.getElementById("firstnameinput").value=userData.firstname
          document.getElementById("lastnameinput").value=userData.lastname
          document.getElementById("personalstatementinput").value=userData.personalstatement
          document.getElementById("hobbiesinput").value=userData.hobbies
          document.getElementById("offeringsinput").value=userData.offerings
          document.getElementById("useremailinput").value=userData.email
          let userAddress=userData.address
          if (userData.profileImage!=""&&userData.profileImage!=null&&userData.profileImage!=undefined){
            const div = document.getElementById("showprofileimage");
              div.style.backgroundImage = `url('${userData.profileImage}')`;
              div.style.backgroundSize = "cover";         // Cover entire div
              div.style.backgroundPosition = "center";    // Center the image
              div.style.backgroundRepeat = "no-repeat";   // Prevent tiling
          }
          if (userAddress!=undefined&&userAddress!=null&&userAddress!=""){
            if(document.getElementById("address-input")!=null&&document.getElementById("address-input")!=""){
              document.getElementById("address-input").value=userAddress
            }
          }
        }
      });
    } catch (error) {
      console.log("🧑🏽‍🎄🧑🏽‍🎄🧑🏽‍🎄🧑🏽‍🎄",error)
      //window.location.href = `/`;
    }
  }
  
  
  // Signup Function cdn
  async function cdn_signUp(email, password, name,lastName,ConfirmPassword,profilephoto) {
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      console.log("User signed up:", userCredential.user);
  
      const user = userCredential.user;
      const userSaved = await saveUserToFirestore(user, name,lastName,profilephoto);
      console.log("userSaved", userSaved);
  
      firebasepersist();
  
      if (userSaved.status === "200 ok") {
        let theUserSavedData=userSaved.response
        alert("Sign up successful!");
        localStorage.setItem("siteUserName", name);
        localStorage.setItem("uniqueId", user.uid);
        localStorage.setItem("userEmail", user.email);
        localStorage.setItem("theToken", user.uid);
        localStorage.setItem("userProfile", user.profileImage);
        setCookie("agentmultiagentwebtky", user.uid, 3);
        setCookie("agentmultiagentwebide", user.uid, 3);
        let membertpye=theUserSavedData.usertype
        homepageRedirect("/gated-content/dashboard")
        //cdn_listenForSnapshots; // Start Firestore listener after signup
        return "User signed up: " + userCredential.user;
      }
    } catch (error) {
      console.error("Error signing up:", error.message);
      showElementById("warningDialog");
      setInputValueById("error-message", error.message);
    }
  }
  
  // Sign In Function
  function cdn_signIn(email,password) {
  
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log("User signed in:", userCredential.user);
        firebasepersist()
        user=userCredential.user
        cdn_getUserByEmail(user.email,user)
        
        setCookie("agentmultiagentwebtky",user.uid,3)
        setCookie("agentmultiagentwebide",user.uid,3)
        //cdn_listenForSnapshots()
        console.log("200 Ok")
        
      })
      .catch((error) => {
        console.error("Error signing in:", error.message);
        hideElementById("loader")
        showElementById("warningDialog")
        setInputValueById("error-message",error.message)
      });
  }
  
  
  //create tableItems
  async function cdn_createTables(table, data) {
    try {
      // Add a new document to 'agents' collection
      const docRef = await db.collection(table).add(data);
      console.log("Agent created with ID:", docRef.id);
      return { "status": "200 ok", "id": docRef.id }; // Include ID in response if needed
    } catch (error) {
      console.error("Error creating agent:", error.message);
      return { "status": "500 error", "error": error.message }; // Include error details in response
    }
  }
  
  
  //update an item in firestore
  async function updateDocument(collectionName, docId, updateData) {
    try {
      await db.collection(collectionName).doc(docId).update(updateData);
      console.log(`Document with ID '${docId}' updated successfully.`);
      return{"status":"200 ok","docId":docId}
    } catch (error) {
      return{"status":"500 error","error message":error}
    }
  }
  
  
  
  //Persist firebase
  function firebasepersist(){
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
      console.log("Persistence set to LOCAL");
    })
    .catch((error) => {
      console.error("Error setting persistence:", error);
    });
  }
  
  
  
  
  async function saveUserToFirestore(user,name="",lastName="",theprofilePhoto) {
    const userRef = await db.collection("users").doc(user.uid);
  
    // Set user data in Firestore (you can add additional fields as needed)
    try {
    let theusertype=localStorage.getItem("selectedUserPlan")
    if(!theusertype){
      theusertype="empty"
    }
    userRef.set({
      uuid:user.uid,
      firstname:name,
      lastname:lastName,
      profileImage:theprofilePhoto,
      email: user.email,
      userplan:"Free",
      customerid:"",
      planActive:"no",
      personalstatement:"",
      hobbies:"",
      offerings:"",
      createdAt: firebase.firestore.FieldValue.serverTimestamp(), // Add timestamp
      lastSignIn: firebase.firestore.FieldValue.serverTimestamp()
    })
    console.log("User data saved to Firestore!");
  
      // Fetch and return the saved document
      const doc = await userRef.get();
      if (doc.exists) {
        console.log(doc.data);
        return {status:"200 ok",response:doc.data()}; // Return the created item
      } else {
        hideElementById("loader")
        showElementById("warningDialog")
        setInputValueById("error-message","An error occurred, Please try again")
      }
    } catch (error) {
      console.error("Error saving user to Firestore:", error.message);
      hideElementById("loader")
      showElementById("warningDialog")
      setInputValueById("error-message",error.message) // Rethrow the error for the caller to handle
    }
  
  }
  
  function showElementById(id) {
    const element = document.getElementById(id);
    if (element) {
      element.style.display = "flex"; // Makes the element visible
    }
  }
  
  //change textValue
  function setInputValueById(id, value) {
    const element = document.getElementById(id);
    console.log("karis",value,element.innerHTML)
    
      element.innerHTML = value;
   
  }
  
  // Function to hide an element
  function hideElementById(id) {
    const element = document.getElementById(id);
    if (element) {
      element.style.display = "none"; // Hides the element
    }
  }
  
  //setcookie
  function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
  function homepageRedirect(url){
    window.location.href = url;
  }
  
  function logOutUser(){
    firebase.auth().signOut().then(() => {
      console.log("User signed out");
  }).catch((error) => {
      console.error("Error signing out: ", error);
  });
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE).then(() => {
    console.log("Persistence set to NONE");
  }).catch((error) => {
    console.error("Error changing persistence: ", error);
  });
    localStorage.clear();
    console.log("user logged out")
  }


  async function getfirebaseItems(database,field,operator,value) {

    const queryRef = db.collection(database)
    .where(field, operator, value)  // Field "skills" array contains "Python"

    const snapshot = await queryRef.get();

    const results = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    console.log(results);
    return results;
}
  
async function getItemsonseveralconditions(collectionName,field1,operator1,valueOne,field2, operator2,valuetwo) {
 
   const queryRef = db.collection(collectionName)
        .where(field1, operator1, valueOne)  // Field "skills" array contains "Python"
        .where(field2, operator2, valuetwo);              // Field "otherField" is null

    const snapshot = await queryRef.get();

    const results = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    console.log(results);
    return results;
}
  
  //save a file to firebase database
  async function uploadFile(file) {
    if (!file) return null;
  
    console.log(file);
  
    // Create a reference in Firebase Storage
    const storageRef = firebase.storage().ref("uploads/" + file.name);
  
    // Upload file and return a promise
    return new Promise((resolve, reject) => {
        const uploadTask = storageRef.put(file);
  
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload is ${progress}% done`);
            },
            (error) => {
                console.error("Upload failed:", error);
                reject(error);
            },
            async () => {
                try {
                    const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
                    console.log("File URL:", downloadURL);
                    resolve(downloadURL);
                } catch (error) {
                    reject("file not uploaded");
                }
            }
        );
    });
  }
  