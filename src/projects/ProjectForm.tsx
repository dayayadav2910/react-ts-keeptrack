import React, {SyntheticEvent,useState} from 'react'
import {Project} from './Project'
import { useDispatch } from 'react-redux';
import { saveProject } from './state/projectActions';

interface ProjectFormProps {
    project : Project; 
    onCancel : ()=> void
}

export default function ProjectForm({onCancel, project : initialproject} :ProjectFormProps ) {
    const [project, setproject] = useState(initialproject)
    const [errors, seterrors] = useState({
        name : '',
        description : '',
        budget : '',
    })
    const dispatch =  useDispatch();

    function validation(project : Project){
        let errors: any = {name:'',description: '', budget: ''};

        if(project.name.length ===0){
            errors.name = "Name is required"
        }
        if(project.description.length===0){
            errors.description = "Description is required"
        }
        if(project.budget === 0){
            errors.budget = "Budget should not be equal to zero"
        }
        return errors;
    }
    function isvalid(){
        return(
            errors.name.length === 0 && errors.description.length===0 && errors.budget.length===0  
        )
    }

    const HandleSubmit = (event :SyntheticEvent ) =>{
        event.preventDefault();
        if(!isvalid()) return; 
        dispatch(saveProject(project)) 
    }

    const handleChange = (event : any) =>{
        const {type,name,value,checked} = event.target;        
        let updatedvalue = type === 'checkbox' ? checked : value;
        if(type === 'number'){
            updatedvalue = Number(updatedvalue)
        }
        const change = {
            [name] : updatedvalue
        }
        console.log(change);
        let updateproject : Project;     
        setproject((p)=>{
            updateproject = new Project({...p, ...change});
            return updateproject;
        })
        seterrors(()=> validation(updateproject))
    }

  return (
    <form aria-label='Edit a Project' name='projectForm' className="input-group vertical" onSubmit={HandleSubmit}>
      <label htmlFor="name">Project Name</label>
      <input id="name"  type="text" name="name" placeholder="enter name" value={project.name}  onChange={handleChange}/>{
          errors.name.length>0 && (
            <div role="alert" className='card error'>
                <p>{errors.name}</p>
            </div>
          )}
      <label htmlFor="description">Project Description</label>
      <textarea id="description" aria-label='project description' name="description" placeholder="enter description" value={project.description} onChange={handleChange} />
        {
            errors.description.length > 0 && (
                <div role="alert" className='card error'>
                    <p>{errors.description}</p>
                </div>
            )   
        }
      <label htmlFor="budget">Project Budget</label>
      <input type="number" id="budget" name="budget" placeholder="enter budget" value={project.budget} onChange={handleChange} />
        {
            errors.budget.length >0 && (
                <div role="alert" className='card error'>
                    <p> {errors.budget} </p>
                </div>
            )
        }
      <label htmlFor="isActive">Active?</label>
      <input  id="isActive" type="checkbox" name="isActive" checked={project.isActive} onChange={handleChange}/>

      <div className="input-group">
        <button className="primary bordered medium">Save</button>
        <span />
        <button type="button" className="bordered medium" onClick={onCancel}>
          cancel
        </button>
      </div>
      
    </form>
  )
}