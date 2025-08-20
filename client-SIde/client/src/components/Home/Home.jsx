import React, { useEffect, useState } from 'react';
import axios from 'axios'

const Home = () => {
    const [data,setdata]= useState([])
    const [name,setname]= useState([])
    const [age,setage]= useState([])
    const [editId, setEditId] = useState(null);

useEffect(()=>{
    axios.get("http://localhost:4000/names")
.then (res =>{

    setdata(res.data)

})
.catch(error =>{

    console.log(error);
})

},[]

);
const handleAdd = () => {
    

    axios.post("http://localhost:4000/names", { Name: name, AGE: age })
      .then(res => {
        // Directly update state without refetch
        setdata([...data, res.data]);
        setname('');
        setage('');
      })
      .catch(err => console.log(err));
  };

// Delete item
  const handleDelete = (id) => {
    axios.delete(`http://localhost:4000/names/${id}`)
      .then(() => {
        // Remove item from state
        setdata(data.filter(item => item.ID !== id));
      })
      .catch(err => console.log(err));
  };


//  // Start editing
//   const handleEdit = (item) => {
//     setEditId(item.ID);
//     setname(item.Name);
//     setage(item.AGE);
//   };

//   // Update item
//   const handleUpdate = () => {
//     if (!name || !age) return;

//     axios.put(`http://localhost:4000/names/${editId}`, { Name: name, AGE: age })
//       .then(res => {
//         setdata(data.map(item => (item.ID === editId ? res.data : item)));
//         setEditId(null);
//         setname('');
//         setage('');
//       })
//       .catch(err => console.log(err));
//   };







    return (
        <>
        <div className='flex justify-center items-center'>
           
  <ul>        
   {             
data.map((item) => (
    
    // the whole array
     <li key={item.ID}>{item.Name} - Age: {item.AGE} 
     
     
     
     {/* Edit button: fills the form with this item */}
      <button
        onClick={() => {
          setEditId(item.ID);
          setname(item.Name);
          setage(item.AGE);
        }}
        className="ml-2 bg-yellow-500 text-white px-2 py-1"
      >
        Edit
      </button>

      {/* Update button: only shown if this item is being edited */}
      {editId === item.ID && (
        <button
          onClick={() => {
            axios.put(`http://localhost:4000/names/${editId}`, { Name: name, AGE: age })
              .then(res => {
                setdata(data.map(d => (d.ID === editId ? res.data : d)));
                setEditId(null);
                setname('');
                setage('');
              })
              .catch(err => console.log(err));
          }}
          className="ml-2 bg-green-500 text-white px-2 py-1"
        >
          Update
        </button>
      )}
     
     
     <button
                onClick={() => handleDelete(item.ID)}
                className="ml-4 bg-red-500 text-white px-2 py-1"
              >
                Delete
              </button></li>
))}

</ul>   



          </div>  
          
        {/* Add Form */}
        <div className='mb-4'>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setname(e.target.value)}
            className="border p-1 mr-2"
          />
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={e => setage(e.target.value)}
            className="border p-1 mr-2"
          />
          <button onClick={handleAdd} className="bg-blue-500 text-white p-1">
            Add
          </button>
        </div>
          <div>









          </div>
        
        </>
    );
};

export default Home;