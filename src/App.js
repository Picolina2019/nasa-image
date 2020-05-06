import React, {useState, useEffect} from 'react';

import Modal from 'react-modal';
import './App.css';
import { Loader } from './Loader/Loader';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('div');

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const url = `https://api.nasa.gov/planetary/apod?api_key=6oSFdy8qCyD5yXaxb4uAncwXQ422SBq8vHLFkqJK`;

    const loadData = async () => {
      try {
        setLoading(true);
        let response = await fetch(url);
        let data = await response.json();
       
        setData(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false)
        setData();
      }
    };
    loadData();
  }, []);

  function closeModal() {
    setModal(false);
  }
  function openModal() {
    setModal(true);
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className='container'>
          <h1>Astronomy Picture of the Day </h1>
          {error ? <p style={{color:'darkRed', margin:'50% auto',fontSize:'2rem'}}>Ooops, something went wrong...</p>:
          (<>
          <div className='title'>{data.title}</div>
          <img className='image' src={data.url}></img>
          <div>
            <button onClick={openModal}>Explanation</button>
            <Modal
              isOpen={modal}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel='Example Modal'
            >
              <div className='explanation'>{data.explanation}</div>
              <button onClick={closeModal}>close</button>
            </Modal>
          </div>
          <div className='date'>{data.date}</div>
          </>)}
        </div>
      )}
    </>
  );
};

export default App;
