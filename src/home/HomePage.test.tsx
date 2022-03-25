import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';
import renderer from 'react-test-renderer';
// import { shallow, ShallowWrapper } from 'enzyme';

describe('<HomePage />', ()=>{
    test('Snapshot',()=>{
        const tree =  renderer.create(<HomePage></HomePage>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('Renders Home Page',()=>{
    render(<HomePage></HomePage>)
    expect(screen.getByRole('heading')).toHaveTextContent('HomePage');
    });
})

