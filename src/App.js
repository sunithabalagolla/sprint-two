
import { useEffect, useState } from 'react';
import './App.css';
import { IoIosAddCircleOutline } from "react-icons/io";
import axios from "axios";
import { FormComponent } from './component/formData/formData';
import { Delete, Edit } from '@material-ui/icons';

axios.defaults.baseURL = "http://localhost:2000/"

function App() {

  const [addPopUp, setAddPopUp] = useState(false)
  const [editPopUp, setEditPopUP] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    unit: " ",
    note: " "
  })

  const [formDataEdit, setFormDataEdit] = useState({
    name: "",
    quantity: "",
    unit: " ",
    note: " ",
    _id: ""
  })
  const [dataList, setDataList] = useState([])


  const handleOnChange = (event) => {
    const { value, name } = event.target
    setFormData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })

  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = await axios.post("/create", formData)
    console.log(data)
    if (data.data.success) {
      setAddPopUp(false)
      alert(data.data.message)
      getFetchData()
      setFormData({
        name: "",
        quantity: "",
        unit: " ",
        note: " "
      })
    }
  }

  const getFetchData = async () => {
    const data = await axios.get("/")
    console.log(data)
    if (data.data.success) {
      setDataList(data.data.data)
    }
  }

  useEffect(() => {
    getFetchData()
  }, [])



  const handleDelete = async (id) => {
    const data = await axios.delete("/delete/" + id)

    if (data.data.success) {
      getFetchData()
      alert(data.data.message)
    }
  }


  const handleUpdate = async (event) => {
    event.preventDefault()
    const data = await axios.put("/update", formDataEdit)

    if (data.data.success) {
      getFetchData()
      alert(data.data.message)
      setEditPopUP(false)
    }
  }
  const handleEditOnChange = async (event) => {
    const { value, name } = event.target
    setFormDataEdit((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }
  const handleEdit = (el) => {
    setFormDataEdit(el)
    setEditPopUP(true)
  }
  return (
    <div>
      <div className="container">
        <div className='containering'>
        {/* <h1 style={{ textAlign: "center" ,color:'white',fontSize:'32px'}}>&nbsp;<span style={{color:'#f0eaea'}}>Manage</span> Ingredient</h1> */}
        <h1 className="manage_ingredinernt"
        style={{marginLeft:'180px'}}>Manage Ingredient</h1>
           <button className=" bttn bttn add" onClick={() => setAddPopUp(true)}><IoIosAddCircleOutline />&nbsp;Add New Ingredient 
          </button>
        </div>
        

        {
          addPopUp && (
            <FormComponent
              handleSubmit={handleSubmit}
              handleOnChange={handleOnChange}
              handleclose={() => setAddPopUp(false)}
              rest={formData}></FormComponent>
          )
        }
        {
          editPopUp && (
            <FormComponent
              handleSubmit={handleUpdate}
              handleOnChange={handleEditOnChange}
              handleclose={() => setEditPopUP(false)}
              rest={formDataEdit}></FormComponent>
          )
        }

        <div className='tableContainer'>
          <table className='table-hover'>
            <thead>
              <tr >
                <th>Ingredient Name</th>
                <th>Quantity</th>
                <th>Unit of Measurement</th>
              
                <th>Action</th>

              </tr>
            </thead>
            <tbody >
              {dataList[0] ? (
                dataList.map((el) => {
                  console.log(el)
                  return (
                    <tr>
                      <td>{el.name}</td>
                      <td>{el.quantity}</td>
                      <td>{el.unit}</td>
                   
                      <td>
                        <button className='bttn bttn-edit' onClick={() => handleEdit(el)}> <Edit></Edit></button>
                        
                        <button className='bttn bttn-delete' onClick={() => handleDelete(el._id)}><Delete></Delete></button>
                       
                      </td>
                    </tr>
                  )
                })
              ) : (
                <p style={{ alignItems: "center" }}>No Data</p>
              )
              }
            </tbody>
          </table>
        </div>


      </div>

    </div>
  );
}

export default App;
