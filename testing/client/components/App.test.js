/**
 * @jest-environment jsdom
 */
import React from 'react';
import Enzyme, { shallow } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';
import App from '../../../client/components/app.jsx';
import CarouselPic from '../../../client/components/carousel.jsx';
import Display from '../../../client/components/display.jsx';
import LeftArrow from '../../../client/components/leftArrow.jsx';
import RightArrow from '../../../client/components/rightArrow.jsx';

Enzyme.configure({ adapter: new Adapter() });

xdescribe('App', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<App debug />);
    expect(component).toMatchSnapshot();
  });
});

xdescribe('<CarouselPic />', () => {
  test('It renders a picture based on prop', () => {
    const wrapper = Enzyme.mount(<CarouselPic image="https://btetsy.s3.us-east-2.amazonaws.com/2_1.jpg" />);
    expect(wrapper.find('.carouselPic').get(0).props.style.backgroundImage).toBe('url(https://btetsy.s3.us-east-2.amazonaws.com/2_1.jpg)');
  });
});

xdescribe('<LeftArrow/>', () => {
  test('It renders a left button in the navaigation bar', () => {
    const wrapper = Enzyme.mount(<LeftArrow />);
    console.log('get the function, \n', wrapper.getElement('.leftArrow').type);
    expect(LeftArrow).toBeDefined();
    expect(wrapper).toMatchSnapshot();
    expect(typeof (wrapper.getElement('.leftArrow').type)).toBe('function');
  });

  test('It renders a left button that displays the previous picture in the item carousel', () => {
    const wrapper = Enzyme.mount(<App />);
    // console.log('whats the state of the picture?', wrapper.state('currIndex'));
    // console.log(wrapper.find('carousel'));
    expect(wrapper.state('currIndex')).toBe(0);
    wrapper.find('LeftArrow').simulate('click');
    expect(wrapper.state('currIndex')).toBe(2);
  });
});

xdescribe('<RightArrow/>', () => {
  test('It renders a right button in the navaigation bar', () => {
    const wrapper = Enzyme.mount(<RightArrow />);

    expect(RightArrow).toBeDefined();
    expect(wrapper).toMatchSnapshot();
    expect(typeof (wrapper.getElement('.RightArrow').type)).toBe('function');
  });

  test('It renders a right button that displays the previous picture in the item carousel', () => {
    const wrapper = Enzyme.mount(<App />);
    expect(wrapper.state('currIndex')).toBe(0);
    wrapper.find('RightArrow').simulate('click');
    expect(wrapper.state('currIndex')).toBe(1);
  });
});
