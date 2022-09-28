import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import {createSearchParams, useNavigate } from 'react-router-dom'

const Location = () => {
    const [val, setVal] = useState();
    const navigate = useNavigate();
    console.log(val)
    
    const params = { vehicleType: 'car' , location: val}

    const save = (e) => setVal(e.target.value)

    const filter  = () => {
    

        navigate({
          pathname: '/admin/hires-bus',
          search: `?${createSearchParams(params)}`,
        });
    }
      


  return (
    <Form.Select
     onChange={e => {save(e);filter()}}
     >
      <option>Location</option>
      <option value="jaffna">Jaffna</option>
      <option value="Manipay">Manipay</option>
      <option value="kopay">Kopay</option>
    </Form.Select>
  );
};

export default Location
