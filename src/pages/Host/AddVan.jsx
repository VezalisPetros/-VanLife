import React from "react";
import { addVan ,uploadImage} from "../../api"
import {ref,uploadBytes} from "firebase/storage"


export default function AddVan() {

    const [newVanData, setNewVanData] = React.useState({ description: "", imageUrl: "", name: "", price: 0, type: "simple",hostId:`${localStorage.getItem("idLogged")}`});
    const [addedCorrectly,setAddedCorrectly]=React.useState(null)
   
    function handleChange(e) {
        const { name, value, type, files } = e.target;
    
        // Create a new object to update the state
        
    
        if (type === "file" && files.length > 0) {
            
            uploadImage(files[0])
            .then(imgeUrl => {
                
                
                // Update the state with the new object
                setNewVanData(prevFormData => {
                    return {
                        ...prevFormData,
                        [name]: imgeUrl
                    }
                })
               
            })
            .catch(error => {
                console.error("Error uploading image:", error);
            });
        } else {
            // Handle other input types
            setNewVanData(prevFormData => {
                return {
                    ...prevFormData,
                    [name]: value
                }
            })
        }
    
       
       
    }
    

    function handleSubmit(e) {
        e.preventDefault();
        
        
        addVan(newVanData)    

        if (newVanData.imageUrl.trim() === "") {
            setAddedCorrectly(false);
        } else {
            setAddedCorrectly(true);
        }
        
      
        }

    return (
        <div className="add-van-info-panel">
            <div className="add-van-info">
                <h3>Let's make your Van </h3>
                <div className={`message-created-van ${addedCorrectly === true ? "success" : addedCorrectly === false ? "error" : ""}`}>

                     { addedCorrectly === true ?  
                     <span class="material-symbols-outlined">
                     check
                     </span>:addedCorrectly === false ?
                     <span class="material-symbols-outlined">
                     dangerous
                     </span>
                     :
                     ""
                      }
                     { addedCorrectly === true ? "Your van has been added correctly" : addedCorrectly === false ? "Your van image couldn't be uploaded" : "Fill the information"}
                </div>

                <form onSubmit={handleSubmit} className="van-form">
                    
                        <h2>Description:</h2>
                        <textarea
                            name="description"
                            onChange={handleChange}
                            placeholder="Tell us about your van."
                            value={newVanData.description}
                            rows={4} // Adjust the number of visible rows
                            cols={40} // Adjust the number of visible columns
                        />
                 
                    <div className="name-and-price">
                        <div className="name-section">
                        <h2>Name:</h2>
                            <input
                                name="name"
                                onChange={handleChange}
                                type="text" 
                                placeholder="Type the van name "
                                value={newVanData.name}
                            />
                        </div>
                            
                        <div className="price-section">
                            <h2>Price:</h2>
                            <div className="input-with-icon">
                                <input
                                    name="price"
                                    onChange={handleChange}
                                    type="number"
                                    value={newVanData.price}
                                    className="van-price-input"
                                />
                                <span className="dollar-sign">$</span>
                            </div>
                        </div>

                       
                    </div>


                    <div className="type-and-img">
                        <div className="type-section">
                        <h2>Type:</h2>
                                    

                                        <select
                                            name="type"
                                            onChange={handleChange}
                                            value={newVanData.type}
                                        >
                                            <option value="simple">Simple</option>
                                            <option value="luxury">Luxury</option>
                                            <option value="rugged">Rugged</option>
                                          
                                        </select>
                        </div>
                            
                        <div className="img-section">
                            <h2>Add an image:</h2>
                            <label className="custom-file-upload">
                            
                                <input
                                    name="imageUrl"
                                    onChange={handleChange}
                                    type="file"
                                    
                                />
                                <span class="material-symbols-outlined">
                                upload_file
                                </span>
                                <span>Choose Image</span>
                            </label>
                        </div>

                       
                    </div>
                    
                    <div className="button-section">
                    <button className="vibrate-1 create-van-button">Create van </button>
                    </div>
                    
                </form>
            </div>
        </div>
    );
}
