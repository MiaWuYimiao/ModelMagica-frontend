import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DropdownList, Multiselect } from "react-widgets";
import Alert from '../common/Alert.js';
import ImageAdd from "./ImageAdd.js";
import "./UploadForm.css"
import "react-widgets/styles.css";
import ModelmagicaApi from "../api/api";
import { getDispName } from "../helper/conveter.js";

function UploadForm() {
    const initialFormData ={
        title:"",
        type:"Editorial",
        publishTime:"",
        client:"",
        source:""
    }
    const navigate = useNavigate();

    const [ workForm, setWorkForm ] = useState(initialFormData);
    const [ formError, setFormError ] = useState([]);
    const [ crew, setCrew ] = useState([]);
    const [ people, setPeople] = useState([]);
    const [ imageSelection, setImageSelection ] = useState([]);
    const [ imageList, setImageList ] = useState([]);
    const [ imageCrew, setImageCrew ] = useState([]); //[ { image : [ false, true, false true]}, ...]
  
    useEffect(() => {
        async function getPeople() {
          let people = await ModelmagicaApi.getPeople();
          setPeople(people);
      }
        getPeople();
    },[]);

    function handleChange(evt) {
        evt.persist();
        setWorkForm(f => ({ ...f, [evt.target.name]:evt.target.value }));
    }

    function handleChangeType(value) {
        setWorkForm( f => ({ ...f, type : value}));
    }

    function handleCreate(image) {
        setImageSelection(oldList => [...oldList, image]);

        const newImgCrewItem = { 
            url : image,
            crew : (new Array(crew.length).fill(true))
        }
        setImageCrew(oldList => [...oldList, newImgCrewItem]); 
    }

    function handleImageSelection(value) {
        setImageSelection(value);
        setImageCrew(oldList => (oldList.filter(obj => value.includes(obj.url))));
    }

    console.log("imageSelection", imageSelection);

    async function handleSubmit(evt) {
        evt.preventDefault();
        //uploadWork
        let uploadWorkRes;
        try {
            //upload work get back
            const workRes = await ModelmagicaApi.uploadWork(workForm);

            //upload image get back
            if(workRes) {
                if(imageSelection.length === 0) {
                    throw ["Empty Image Selection"];
                }

                for(let i=0; i<imageSelection.length; i++) 
                {
                    let imageRes = await ModelmagicaApi.uploadImage({url:imageSelection.at(i)});
                    await ModelmagicaApi.addWorkImage(workRes.id, imageRes.id);
    
                    //upload addPeopleImage
                    if(imageRes) {
                        for(let j=0; j<crew.length; j++) {
                            if(imageCrew.at(i).crew.at(j)) {
                                await ModelmagicaApi.addPeopleImage(crew.at(j).fullname, imageRes.id);
                            }
                        }
                    }
                }
            }

            uploadWorkRes = {success: true};
        } catch(err) {
            uploadWorkRes =  {success:false, err};
        }


        if(uploadWorkRes.success){
            navigate('/works');
        } else {
            setFormError(uploadWorkRes.err);
        }
    }

    const {title, type, publishTime, client, source } = workForm;
    
    return (
        <div className="Signup-form mt-4">
            <div className="container col-md-6 offset-md-3 col-lg-6 offset-lg-3">
                <form className="form-horizontal" onSubmit={handleSubmit}>
                    <h3 className="mb-3 text-left">1. Basic Information</h3>
                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="mb-3 input-group">
                                <label htmlFor="title" className="form-label">Title/Subject:</label>
                                <input 
                                    id="title"
                                    name="title" 
                                    className="form-control" 
                                    value={title}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3 input-group">
                                <label htmlFor="type" className="form-label">Type:</label>
                                <DropdownList 
                                    name="type"
                                    value={type} 
                                    onChange={handleChangeType}
                                    data={["Editorial", "Shows", "Magazine Covers", "Advertising", "Social Media"]}
                                    style={{width:"70%"}}
                                />
                            </div>
                            <div className="mb-3 input-group">
                                <label htmlFor="publishTime" className="form-label">Published:</label>
                                <input 
                                    id="publishTime" 
                                    name="publishTime" 
                                    type="date"
                                    className="form-control" 
                                    value={publishTime}
                                    onChange={handleChange}
                                 />
                            </div>
                            <div className="mb-3 input-group">
                                <label htmlFor="client" className="form-label">Client/Brand:</label>
                                <input 
                                    id="client" 
                                    name="client" 
                                    className="form-control" 
                                    value={client}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3 input-group">
                                <label htmlFor="source" className="form-label">Source:</label>
                                <input 
                                    id="source"
                                    type="url" 
                                    name="source" 
                                    className="form-control" 
                                    value={source}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <h3 className="mb-3 text-left">2. Credits</h3>
                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="mb-1 text-left">
                                Add a model or crew member:
                            </div>
                            <div>
                                <Multiselect 
                                    data={people}
                                    textField={item => (getDispName(item.fullname))}
                                    filter='contains'
                                    value={crew}
                                    onChange={value => setCrew(value)}
                                />
                            </div>
                        </div>
                    </div>
                    <h3 className="mb-3 text-left">3. Images</h3>
                    <div className="card mb-3">
                        <div className="card-body">
                            <div>
                                <Multiselect 
                                    data={imageList}
                                    value={imageSelection}
                                    allowCreate="onFilter"
                                    onCreate={handleCreate}
                                    onChange={handleImageSelection}
                                />
                            </div>
                            <hr></hr>
                            <div className="list-container">
                                {
                                   imageSelection.map((image, i) => (<ImageAdd key={i} image={image} crew={crew} setImageCrew={setImageCrew}/>))
                                }
                            </div>
                        </div>
                    </div>
                    {formError.length? 
                                <Alert type="danger" messages={formError}/>
                                : null
                    }
                    <div className="d-gri offset-lg-10">
                        <button type="submit" className="btn btn-secondary">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UploadForm;

