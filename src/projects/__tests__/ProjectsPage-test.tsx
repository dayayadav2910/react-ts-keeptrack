import { MemoryRouter } from "react-router-dom";
import { store } from "../../state";
import { Provider } from "react-redux";
import ProjectsPage from "../ProjectsPage";
import {rest} from 'msw';
import {setupServer} from 'msw/node'
import { url as projectsUrl } from '../projectAPI'
import {
    render,
    screen,
    waitForElementToBeRemoved,
} from '@testing-library/react';
import { MOCK_PROJECTS } from "../MockProjects";



const server = setupServer(
    rest.get(projectsUrl, (req,res,ctx)=>{
            return res(ctx.json(MOCK_PROJECTS))
    })
)

beforeAll( () => server.listen());
afterEach(()=> server.resetHandlers());
afterAll(()=> server.close());


describe('<ProjectsPage />',()=>{

    function renderComponent () {
        render(
        <Provider store={store}>
            <MemoryRouter>
                <ProjectsPage></ProjectsPage>
            </MemoryRouter>
        </Provider>
    )
    }  
    test('Should render without crashing',()=>{
        renderComponent ();
        expect(screen.getByRole('heading')).toBeInTheDocument();
    })
    test('render should be in the document',()=>{
        renderComponent ();
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    })

    test('Should display projects ', async ()=>{
        renderComponent ();
        expect( await screen.findAllByRole('img')).toHaveLength(MOCK_PROJECTS.length);
    })

    test('More button should be in the document',async ()=>{
        renderComponent ();
        expect(await screen.findByRole('button',{name: /more/i})).toBeInTheDocument();
    })
    test('Should display more button with get', async ()=>{
        renderComponent ();
        await waitForElementToBeRemoved(()=> screen.getByText(/loading/i));
        expect(screen.getByRole('button', {name : /more/i})).toBeInTheDocument()
    })

    test('Should display custom error on server error', async ()=>{
        server.use(
            rest.get(projectsUrl, (req,res,ctx)=>{
                return res(ctx.status(500,'Server Error'))
            })
        )  
        renderComponent();
        expect(await screen.findByText(/There was an error retrieving the project(s)./i)).toBeInTheDocument();
    })
})