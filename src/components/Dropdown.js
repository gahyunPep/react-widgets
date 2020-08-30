import React, { useState, useEffect, useRef } from 'react';

const Dropdown = ({ label, options, selected, onSelectedChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const onBodyClick = (event) => {
      // if user clicked inside of component don't do anything
      // when the component is not rendered ref.current is set to null but this event will still invoke when user clicks somewhere in body -> err
      if(ref.current.contains(event.target)){
        return;
      }
      setOpen(false);
    }

    document.body.addEventListener('click', onBodyClick);

    //Clean up function will be also invoked when the component is about to remove the component entirely
    return () => {
      // remove the eventListener from the body
      document.body.removeEventListener('click', onBodyClick);
    };
  }, []);

  const renderedOptions = options.map((option) => {

    if(option.value === selected.value) {
      return null; // null in react means render nothing
    }

    return(
      <div 
      key={option.value} 
      className="item"
      onClick={()=>{onSelectedChange(option)}}
      >
        {option.label}
      </div>
    );
  });

  // console.log(ref.current);

  return (
    <div ref={ref} className="ui form">
      <div className="field">
        <label className="label">{label}</label>
        <div 
          onClick={()=>setOpen(!open)} 
          className={`ui selection dropdown ${open? 'visible active': ''}`}
        >
          <i className="dropdown icon"></i>
          <div className="text">{selected.label}</div>
          <div className={`menu ${open? 'visible transition':''}`}>
            {renderedOptions}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dropdown;