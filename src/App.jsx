import { useState, useEffect, useRef } from 'react'
import Display from './components/Display';

// Till Now: We have maintained the state in the same form as it was received from the server.
// Even while making changes we maintain the format of the state.
// TODO: Send this state as it is to the server in the form of JSON.

function App() {
  const [data, setData] = useState(null);
  const submitButton = useRef(null);
  console.log(data);
  useEffect(() => {
    fetch('api/')
    .then((res) => res.json())
    .then((data) => setData(data));
  }, []);

  if(!data){return null}
  
  const handleRecipeChange = (event) => {
    const {name, value} = event.target;
    setData(prevData => ({...prevData, [name]: value}));
  }
  
  const handleToppingsChange = (event) => {
    const {name, value} = event.target;
    const toppingId = name.split('-')[1];
    const newToppings = [...data.topping].map(topping => {
      if(topping.id == toppingId) return {...topping, type: value};
      return topping;
    })
    setData(prevData => ({ ...prevData, topping: newToppings}));
  }
  
  const handleBattersChange = (event) => {
    const {name, value} = event.target;
    const batterId = name.split('-')[1];
    const newBatters = [...data.batters.batter].map(batter => {
      if(batter.id == batterId) return {...batter, type: value};
      return batter;
    })
    setData(prevData => ({ ...prevData, batters: { batter: newBatters}}));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    submitButton.current.textContent = 'Save 🔃';
    const res = await fetch('/api/',{
      method: 'POST',
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const resData = await res.json();
    submitButton.current.textContent = 'Save ✅';
    console.log(submitButton);
  }
  
  // Toppings
  const toppings = data ? data.topping.map(topping => {
    return (
      <li id={topping.id}>
        <input onChange={handleToppingsChange} type="text" name={`topping-${topping.id}`} value={topping.type}/><br />
      </li>
    )
  }) : null;

  // Batters
  const batters = data ? data.batters.batter.map(batter => {
    return (
      <li id={batter.id}>
        <input onChange={handleBattersChange} type="text" name={`batter-${batter.id}`} value={batter.type}/><br />
      </li>
    )
  }) : null;

  return (
    <form>
      <div>
        <h3>{data.name} <sup>id:{data.id}</sup> </h3>
        
        <label htmlFor="ppu">PPU</label>
        <input onChange={handleRecipeChange} type="text" id="ppu" name='ppu' value={data.ppu}/><br />

        <label htmlFor="type">Type</label>
        <input onChange={handleRecipeChange} type="text" id="type" name='type' value={data.type}/><br />

        <label htmlFor="topping">Toppings</label>
        <ul>
          {toppings}
        </ul>

        <label htmlFor="batters">Batters</label>
        <ul>
          {batters}
        </ul>
      </div>
      <button onClick={handleSubmit} ref={submitButton}>Save</button>
    </form>
  )
}

export default App
