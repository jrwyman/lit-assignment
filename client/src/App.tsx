import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  type bool = boolean;
  type modalNumber = 'modal-1' | 'modal-2' | 'modal-3';
  type classified = { title: string, imageURL: string, type: string, price: number, body: string, date: string, shippingIncluded: boolean, tags: {firm: boolean, new:boolean, multipleavailable: boolean}};
  type classifiedsArray = classified[];
  type errors = string[];
  
  const [show, setShow] = useState<bool>(false);
  const [modalState, setModalState] = useState<modalNumber>('modal-1');

  function handleModalClose() { setShow(false); }
  function handleModalShow() { setShow(true); }

  const [classifiedAds, setClassifiedAds] = useState<classifiedsArray>([]);

  const [classifiedErrors, setClassifiedErrors] = useState<errors>([]);
  
  const [classifiedAd, setClassifiedAd] = useState<classified>({
    title: '',
    imageURL: '',
    type: '',
    price: 500,
    body: '',
    date: '',
    shippingIncluded: false,
    tags: {firm: false, new: false, multipleavailable: false},
  });

  function handleClassifiedTitleChange(e) {
    if (classifiedAd.title.length > 2) {
      setClassifiedErrors([]);
    }

    setClassifiedAd({
      ...classifiedAd,
      title: e.target.value,
    })
  }

  function handleClassifiedImageURLChange(e) {
    if (validateURL(classifiedAd.imageURL)) {
      setClassifiedErrors([]);
    }

    setClassifiedAd({
      ...classifiedAd,
      imageURL: e.target.value,
    })
  }

  function handleClassifiedTypeChange(e) {
    setClassifiedAd({
      ...classifiedAd,
      type: e.target.value,
    })
  }

  function handleClassifiedPriceChange(e) {
    setClassifiedAd({
      ...classifiedAd,
      price: e.target.value,
    })
  }

  function handleClassifiedBodyChange(e) {
    setClassifiedAd({
      ...classifiedAd,
      body: e.target.value,
    })
  }

  function handleClassifiedDateChange(e) {
    setClassifiedAd({
      ...classifiedAd,
      date: e.target.value,
    })
  }

  function validateURL(url) {
    if (url.slice(0, 8) !== 'https://') {
      return false;
    }

    return true;
  }

  function handleClassifiedShippingChange(e) {
    setClassifiedAd({
      ...classifiedAd,
      shippingIncluded: e.target.value,
    })
    console.log(classifiedAd.shippingIncluded)
  }

  function handleClassifiedTagsChange(e) {
    const tags = classifiedAd.tags;

    setClassifiedAd({
      ...classifiedAd,
      tags: {
        ...tags,
        [e.target.value]: !tags[e.target.value],
      }
    })
  }

  function handleClassifiedSubmit() {
    setClassifiedAds([
      ...classifiedAds,
      classifiedAd,
    ])
    setClassifiedAd({
      title: '',
      imageURL: '',
      type: '',
      price: 500,
      body: '',
      date: '',
      shippingIncluded: false,
      tags: {firm: false, new: false, multipleavailable: false},
    })
    handleModalClose();
    setModalState('modal-1');
    setClassifiedErrors([]);
  }

  function showModal() {
    if (modalState === 'modal-1') {
      return modalOne()
    } else if (modalState === 'modal-2') {
      return modalTwo()
    }

    return modalThree()
  }

  function modalOne() {
    return (
      <Modal show={show} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="modal-1-form">
            <label htmlFor="ad-title">Title:</label>
            <div>
              <input required value={classifiedAd.title} onChange={handleClassifiedTitleChange} id="ad-title" type="text"/>
            </div>
            <label htmlFor="ad-type">Item Type:</label>
            <div>
              <select name="ad-type" defaultValue={classifiedAd.type} onChange={handleClassifiedTypeChange} id="ad-type" required>
                <option value="">-- Select --</option>
                <option value="Electronics">Electronics</option>
                <option value="Household Items">Household Items</option>
                <option value="Cars">Cars</option>
                <option value="Gardening">Gardening</option>
              </select>
            </div>
            <label htmlFor="ad-image">Image URL:</label>
            <div>
              <input required value={classifiedAd.imageURL} onChange={handleClassifiedImageURLChange} id="ad-image" type="text" />
            </div>
          </form>
          <div className="modal-1-errors">
            {
              classifiedErrors.map((error) => {
                return <div>{error}</div>;
              })
            }
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-dark" type="submit" form="modal-1-form" onClick={(e) => {
            const error1 = 'Title must be at least 4 characters or more!'
            const error2 = 'Image URL must be valid by starting with https://'

            //Input Validation

            if (classifiedAd.title && classifiedAd.type && classifiedAd.imageURL) {
              if (classifiedAd.title.length > 3) {

                if (validateURL(classifiedAd.imageURL)) {
                  e.preventDefault();
                  setModalState('modal-2')
                } else {
                  e.preventDefault();
                  if (!classifiedErrors.includes(error2) && !validateURL(classifiedAd.imageURL))
                  setClassifiedErrors([
                    ...classifiedErrors,
                    error2
                  ])
                }


                // e.preventDefault();
                // setModalState('modal-2')
              } else {
                e.preventDefault();
                if (!classifiedErrors.includes(error1) && classifiedAd.title.length < 4)
                setClassifiedErrors([
                  ...classifiedErrors,
                  error1
                ])
              }

             

            }
          }}>
            Next
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  function modalTwo() {
    return (
      <Modal show={show} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Listing Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="modal-2-form">
            <label htmlFor="ad-price">Price: ${classifiedAd.price || 500}</label>
            <div>
              <input required type="range" min="1" max="1000" value={classifiedAd.price || 500} className="slider" onChange={handleClassifiedPriceChange} id="ad-price" />
            </div>
            <div className="body-info">
              <label htmlFor="ad-body">Body:</label>
              <div>
                <textarea required value={classifiedAd.body} onChange={handleClassifiedBodyChange} id="ad-body"/>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-dark" onClick={(e) => {
              e.preventDefault();
              setModalState('modal-1')}
          }>
            Previous
          </Button>
          <Button className="btn btn-dark" type="submit" form="modal-2-form" onClick={() => { if (classifiedAd.body) setModalState('modal-3')}}>
            Next
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  function modalThree() {
    return (
      <Modal show={show} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Set Expiration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <label htmlFor="ad-expiration">Expiration Date:</label>
            <div>
              <input value={classifiedAd.date} onChange={handleClassifiedDateChange} id="ad-expiration" type="date"/>
            </div>
            <div className="shipping-info">
              <div className="shipping-tag" >Shipping Included:</div>
              <div>
                <label htmlFor="shipping-included-yes">Yes</label>
                <input className="shipping-radio" defaultChecked={classifiedAd.shippingIncluded ? true : false} onClick={handleClassifiedShippingChange} type="radio" id="shipping-included-yes" name="shipping-included" value="true" />
              </div>
              <div>
                <label htmlFor="shipping-included-no">No</label>
                <input className="shipping-radio" defaultChecked={classifiedAd.shippingIncluded ? false : true} value="false" onClick={handleClassifiedShippingChange} type="radio" id="shipping-included-no" name="shipping-included" />
              </div>
            </div>
            <div className="tags">
              <div>
                <input className="tags-checkbox" defaultChecked={classifiedAd.tags.firm} onChange={handleClassifiedTagsChange} type="checkbox" id="firm" name="firm" value="firm" />
                <label htmlFor="firm">Price Firm</label>
              </div>
              <div>
                <input className="tags-checkbox" defaultChecked={classifiedAd.tags.new} onChange={handleClassifiedTagsChange} type="checkbox" id="new" name="new" value="new" />
                <label htmlFor="new">Brand New</label>
              </div>
              <div>
                <input className="tags-checkbox" defaultChecked={classifiedAd.tags.multipleavailable} onChange={handleClassifiedTagsChange} type="checkbox" id="multiple" name="multiple" value="multipleavailable" />
                <label htmlFor="multiple">Multiple Available</label>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-dark" onClick={(e) => {
            e.preventDefault();
            setModalState('modal-2')}
          }>
            Previous
          </Button>
          <Button className="btn btn-primary" onClick={handleClassifiedSubmit}>
            Post
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        Welcome to ClassifiedLy!
      </header>
      
      {
        classifiedAds.map((ad, idx) => {
          return (
            <div className="classified" key={`${ad.title}--${idx}`}>
              <div className="classified-title">{ad.title} - ${ad.price}</div>
              <div className="classified-tags">
              {
                Object.keys(ad.tags).filter((tag) => {
                  return ad.tags[tag] === true;
                }).map((tag, idx) => {
                  return <div key={`${tag}--${idx}`} className="classified-tag">#{tag}</div>
                })
              }
              </div>
              <img src={ad.imageURL} className="classified-image" alt="classified"/>
              <div className="classified-body">{ad.body}</div>
              <div className="classified-details">
                <div className="classified-type">{ad.type}</div>
                <div className="classified-shipping-info">{ad.shippingIncluded ? 'Free Shipping' : '$10 Shipping' }</div>
                <div className="classified-expiration">{ad.date ? `Expires On: ${ad.date}` : 'No Expiration'}</div>
              </div>
            </div>
          )
        })
      }

      <div>
        <Button variant="primary" onClick={handleModalShow}>
          Create New Listing
        </Button>
        {showModal()}
      </div>
    </div>
  );
}

export default App;
