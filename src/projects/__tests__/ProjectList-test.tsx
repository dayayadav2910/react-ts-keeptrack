import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import ProjectList from '../ProjectsLists';
import { MOCK_PROJECTS } from '../MockProjects';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../state';



describe('<ProjectList />',()=>{
    beforeEach(()=>{
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <ProjectList projects={MOCK_PROJECTS} ></ProjectList>
                </MemoryRouter>
            </Provider>
        )
    })
    test('Should render without crashing',()=>{
        expect(screen).toBeDefined();
    })
    test('Should display list',()=>{
        expect(screen.getAllByRole('heading')).toHaveLength(MOCK_PROJECTS.length);
        expect(screen.getAllByRole('img')).toHaveLength(MOCK_PROJECTS.length);
        // expect(screen.getAllByRole('link')).toHaveLength(MOCK_PROJECTS.length);
        expect(screen.getAllByRole('button')).toHaveLength(MOCK_PROJECTS.length);
    })

    test('display form when edit button is clicked', ()=>{
        userEvent.click(screen.getByRole('button', {name: /edit Wisozk Group/i}));
        expect(screen.getByRole('form',{
            name: /edit A Project/i,
        })).toBeInTheDocument();
    })
    
    test('Should clicked on cancel button',()=>{
        userEvent.click(screen.getByRole('button', {name : /edit Wisozk Group/i }));
        userEvent.click(screen.getByRole('button', {name: /cancel/i}))
        expect(screen.getByRole('img',{
            name: /wisozk group/i,
        })).toBeInTheDocument();
        expect(screen.queryByRole('form', {
            name: /edit a project/i
        })).not.toBeInTheDocument();
    })
})