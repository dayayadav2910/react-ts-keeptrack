import React, {useEffect } from 'react'
import { MOCK_PROJECTS } from './MockProjects'
import ProjectsLists from './ProjectsLists'
import { Project } from './Project'
import { projectAPI } from './projectAPI'
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../state';
import { loadProject } from './state/projectActions';


export default function ProjectsPage() {
  // const [projects, setproject] = useState<Project[]>(MOCK_PROJECTS)
  // const [projects, setproject] = useState<Project[]>([]);
  // const [loading, setloading] = useState(false);
  // const [error, seterror] = useState<string>("");
  // const [currentPage, setcurrentPage] = useState(1);


  const loading = useSelector(
    (appState: AppState) => appState.projectState.loading
  )
  const projects =  useSelector((appstate:AppState)=> appstate.projectState.projects)
  const error =  useSelector((appState: AppState)=> appState.projectState.error)
  const currentPage = useSelector((appState : AppState)=> appState.projectState.page)
  const dispatch =  useDispatch();

  

  // useEffect(() => {
  //   async function loadProjects() {
  //     setloading(true);
  //     try {
  //       const data = await projectAPI.get(currentPage)
  //       seterror('');
  //       setproject(data)

  //       if (currentPage === 1) {
  //         setproject(data)
  //       }
  //       else {
  //         setproject((project) => [...project, ...data])
  //       }
  //     } catch (e) {
  //       if (e instanceof Error) {
  //         seterror(e.message);
  //       }
  //     }
  //     finally {
  //       setloading(false)
  //     }
  //   }
  //   loadProjects()
  // }, [currentPage])
  useEffect(()=>{
    dispatch(loadProject(1))
  },[dispatch])
  const handleMoreClick = () => {
    dispatch(loadProject(currentPage+1))
  }


  // const saveProject = (project: Project) => {
  //   projectAPI.put(project).then((updatePrpject)=>{
  //     let updateproject = projects.map((p: Project) => {
  //     return p.id === project.id ? new Project(updatePrpject) : p;
  //   });
  //   setproject(updateproject)
  //   }).catch((e)=>{seterror(e.message)})

  // }
  return (
    <div>
      <h1>Projects</h1>{
        error && (
          <div className="row">
            <div className="card large error">
              <section>
                <p>
                  <span className="icon-alert inverse "></span>
                  {error}
                </p>
              </section>
            </div>
          </div>
        )
      }
      <ProjectsLists projects={projects}></ProjectsLists>
      {!loading && !error && (
        <div className="row">
          <div className="col-sm-12">
            <div className="button-group fluid">
              <button className="button default" onClick={handleMoreClick}>
                More...
              </button>
            </div>
          </div>
        </div>
      )}
      {loading && (
        <div className="center-page">
          <span className="spinner primary"></span>
          <p>Loading...</p>
        </div>
      )
      }
    </div>
  )
}   
