import React, { useState } from 'react';
import { FiPlay, FiSettings, FiImage, FiArchive } from 'react-icons/fi';
import { Stage, Layer, Image } from 'react-konva';
import useImage from 'use-image';

import { Container, HeaderMenu, SideNav } from './styles';
import arrow from '../../assets/arrow.png';
import circle from '../../assets/circle.png';

const URLImage = ({ image }) => {
  const [img] = useImage(image.src);
  const [name, setName] = useState('');

  return (
    <Image
      image={img}
      x={image.x}
      y={image.y}
      offsetX={img ? img.width / 2 : 0}
      offsetY={img ? img.height / 2 : 0}
      draggable="true"
      name={name}
      onClick={console.log(image, 'id')}
    />
  );
};

function Main() {
  const dragUrl = React.useRef();
  const stageRef = React.useRef();
  const [images, setImages] = useState([]);

  console.log(images.length);

  return (
    <Container>
      <HeaderMenu>
        <header>
          <h6>Bayesian Network</h6>
          <div>
            <a href="/" alt="Run">
              <FiPlay size={16} color="#fff" />
              Run
            </a>
            <a href="/" alt="Run">
              <FiSettings size={16} color="#fff" />
              Settings
            </a>
            <a href="/" alt="Run">
              <FiImage size={16} color="#fff" />
              Save as image
            </a>
            <a href="/" alt="Run">
              <FiArchive size={16} color="#fff" />
              Save as blabla
            </a>
          </div>
        </header>
      </HeaderMenu>
      <SideNav>
        <div>
          <img
            alt="circle"
            src={circle}
            style={{ marginLeft: '20px', marginTop: '40px' }}
            draggable="true"
            onDragStart={(e) => {
              dragUrl.current = e.target.src;
            }}
          />
        </div>
      </SideNav>
      <div
        onDrop={(e) => {
          // register event position
          stageRef.current.setPointersPositions(e);
          // add image
          setImages(
            images.concat([
              {
                ...stageRef.current.getPointerPosition(),
                src: dragUrl.current,
              },
            ]),
          );
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        <Stage
          width={window.innerWidth}
          height={window.innerHeight}
          style={{ border: '1px solid grey' }}
          ref={stageRef}
        >
          <Layer>
            {images.map((image) => {
              return <URLImage image={image} />;
            })}
          </Layer>
        </Stage>
      </div>
    </Container>
  );
}

export default Main;
