import React, {useState} from 'react'
import { Project } from './Project';
import ProjectCard from './ProjectCard';
import ProjectForm from './ProjectForm';

interface ProjectListProps {
    projects: Project[];
}
export default function ProjectsLists({ projects }: ProjectListProps) {
    const [projectbeingedited, setprojectbeingedited] = useState({})
    const HandleEdit = (project : Project) =>{
        console.log(project);
        setprojectbeingedited(project)
    }
    const CancelEditing = () =>{
        setprojectbeingedited({});
    }
    const items = projects.map((project)=>(
        <div key={project.id} className='cols-sm'>
            {project === projectbeingedited ? (<ProjectForm onCancel={CancelEditing} project={project}></ProjectForm>)  :
                (<ProjectCard project={project} onEdit={HandleEdit}></ProjectCard> )
            }
        </div>
    ))
    return (
        <div className='row'> {items} </div>
    )
}
