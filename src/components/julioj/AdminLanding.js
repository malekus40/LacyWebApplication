import React, { useState, useEffect } from 'react';
import '../../App.css'
import './julioCSS/AdminLanding.css'
import Navbar from "../Navbar";
import Footer from './Footer';
import { db } from "../../DataBase";  // db const
import{collection, getDocs} from 'firebase/firestore'; // collection and getDocs const
import { set } from 'lodash';

// Uncomment for access to image database
// import { storage } from "../../DataBase";
// import { ref, uploadBytes } from 'firebase/storage';
// import { v4 } from 'uuid';

// TODO: Impliment JSON fro imageInfo
// import {  } from "json";


function AdminLanding() {

  // Cloud Database Stuff
  const [Inquirer, setInquirer] = useState([]);
  const InquirerCollectionRef = collection(db,"Inquirer");
  useEffect(() => {

    const getInquirer = async () => {
      const dbData = await getDocs(InquirerCollectionRef);
      setInquirer(dbData.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }                                 

    getInquirer();

  }, []);

  // end Cloud Database Stuff
  
  const [image, setImage] = useState(null);
//   const [ imageInfo ] = useState(null);
  const handleRefresh = () => {
    window.location.reload();

    // Probably can remove this
    // if(image == null) return;
    // let tmp = v4();
    // const imageRef = ref(storage, `gs://daring-wavelet-384121.appspot.com/ImageData/${image.name + tmp}`);

    // // TODO: image information JSON, imageInfo.json
    // // const imageInfo = json
    // const imageRefInfo = ref(storage, `gs://daring-wavelet-384121.appspot.com/ImageInformation/${image.name+tmp}`);
    // fetch("imageInfo.json")
    //     .then(response => response.json())
    //     .then(imageInfo => {
    //         imageInfo.orignalName = image.name;
    //         imageInfo.imageHash = tmp;
    //     })
    // uploadBytes( imageRef, image ).then(()=>{
    //     alert("Image Uploaded");
    // })
    // uploadBytes(imageRefInfo, imageInfo).then(()=>{}
    // );
  }

  return (
    <>
    <Navbar />
    <div className='landing'>
    
      
      <div className='table'>  
      <table>
        <thead>
          <tr>
          
            <th>Inquirer ID</th>
            <th>Inquirer Name</th>
            <th>Inquirer Email</th>
            <th>Inquirer Phone</th>
            <th>Location on Body</th>
            <th>Tattoo Description</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
        {Inquirer.map((Inquiry) => {
          return (
            <tr>
              <td>{Inquiry.id}</td>
              <td>{Inquiry.First} {Inquiry.Last}</td>
              <td>{Inquiry.Email}</td>
              <td>{Inquiry.Phone}</td>
              <td>{Inquiry.Location}</td>
              <td>{Inquiry.Description}</td>
              <td>{Inquiry.Date}</td>
            </tr>
          )
          
        })}
        </tbody>
        </table>
        </div>

    
    
      
      <div className = 'file'>
        <label htmlFor="image">Upload Image
          <input type="file" name="image" onChange={(event) => setImage(event.target.files[0])} required />
        </label>
      </div>
      <div className = 'submit-button'>
        <button onClick={handleRefresh} type="button">Submit</button>
      </div>
    </div>
    
    
    <Footer />
    
    </>
  );
}

export default AdminLanding;