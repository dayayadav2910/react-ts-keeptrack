import { render, screen } from '@testing-library/react';
import { Project } from '../Project';
import ProjectCard from '../ProjectCard';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';

describe('<ProjectCard />', () => {
  let project: Project;
  let handleEdit: jest.Mock;
  beforeEach(() => {
    project = new Project({
      id: 1,
      name: 'Mission Impossible',
      description: 'This is really difficult',
      budget: 100,
    });
    handleEdit = jest.fn();
    render(
      <MemoryRouter>
        <ProjectCard project={project} onEdit={handleEdit} />
      </MemoryRouter>
    );
  });

  it('Handler called when edit clicked', () => {
    // expect(screen.getByRole('heading')).toHaveTextContent(project.name);
    // screen.debug(document);
    // screen.getByText(/this is really difficult\.\.\./i);
    // screen.getByText(/budget : 100/i);
    userEvent.click(screen.getByRole('button'));
    expect(handleEdit).toBeCalledTimes(1);
    expect(handleEdit).toBeCalledWith(project);
  });
  test('snapshot',()=>{
        const tree = renderer.create(
            <MemoryRouter>
                <ProjectCard project={project} onEdit={handleEdit}></ProjectCard>
            </MemoryRouter>
        ).toJSON();
        expect(tree).toMatchSnapshot();
  })
});