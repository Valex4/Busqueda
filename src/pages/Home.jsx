import { useState } from 'react'
import { AnimatePresence, motion, useAnimation } from 'framer-motion'
import { Form, Formik } from 'formik';
import { getClient } from '../API/Route';
import '../App.css'
import { useNavigate } from 'react-router';
import { useContext } from 'react';
import UserContext from '../context/userContext';
import image from "../assets/logout.png"
import exitImage from "../assets/salir.svg"


function Home() {
  const navigate = useNavigate();
  const { setIsLoged } = useContext(UserContext);
  const [Data, setData] = useState([]);

  const handleClick = () =>{
    window.localStorage.removeItem("loggedUser");
    setIsLoged(false);
    navigate("/")
  }
  
  return (
    <>

    <div className=' flex items-start'>
      
      <button onClick={handleClick}><img src={exitImage} className='w-11 h-auto' alt="Cerrar Sesión" /></button>
      <p className='mt-2 ml-2'>Cerrar Sesión</p>
    </div>
    <motion.div
      transition={{
        ease: "linear",
        duration: 2,
        x: { duration: 1 }
      }}
    >
      <Formik
        initialValues={{
          nombre:"",
          telefono:""
        }}
        onSubmit={async(values, actions)=>{
          console.log("Imprimiendo los valores ")
          console.table(values)

          if(values.nombre === '' && values.telefono === ''){
            alert("Ingrese al menos un valor")
          }else{
            try{ 
              const response  = await getClient(values)
              console.log(response.data.data);
              setData(response.data.data)
            }catch(e){
              console.log("Error: " + e);
            }
          }
        }}
      
      >{({values, errors, touched, setFieldValue, handleSubmit, handleChange, isSubmitting})=>(
          <Form className='max-w-sm mx-auto'>
            <div className="mb-5">
                <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ingrese el nombre: </label>
                <input type="text" onChange={handleChange} name='nombre' id="nombre" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
              </div>
              <div className="mb-5">
                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ingrese el numero telefonico: </label>
                <input type="phone" name='telefono' onChange={handleChange} id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
              </div>
              <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Buscar</button>
          </Form> 
      )}
          
      </Formik>
    </motion.div>

    <motion.div
                    
                    initial={{ x: '0' }}
                    animate={{ x: 0 }}
                    exit={{ x: '-150%' }}
                    transition={{ duration: 0.5 }}
                    className='   max-w-5xl flex flex-col   mx-auto my-auto mt-10'>
                    {/* Center Header */}

                    <div className=' min-w-full max-h-[64px] flex items-center justify-between'>
                        <div >
                            <h1 className=' lg:text-4xl md:text-2xl  text-xl  dark:text-white tracking-wide font-semibold'>Clientes</h1>
                            <p className=' text-gray-500 font-light'>Hay {Data.length} Clientes.</p>
                        </div>

                    </div>

                    <div className= 'mt-10 space-y-5  w-auto'>
                            <div className="relative overflow-x-auto">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-white uppercase bg-[#1E2139] dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                Clave Cliente 
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Nombre
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Correo
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Telefono
                                            </th>
                                        </tr>
                                    </thead>
                                    
                                    <tbody>
                                        {Data.map((product, index) => (
                                          <motion.tr
                                              key={index}
                                              initial={{ opacity: 0, y: -50 }}
                                              animate={{ opacity: 1, y: 0, transition: { delay: index * 0.2 } }}
                                              exit={{ opacity: 0, y: 50 }}
                                              transition={{ duration: 0.5 }}
                                              className="bg-white dark:bg-gray-800"
                                          >
                                              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                              {product.clave_cliente}
                                              </td>
                                              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                              {product.nombre}
                                              </td>
                                              <td className="px-6 py-4">
                                              {product.correo}
                                              </td>
                                              <td className="px-6 py-4">
                                              {product.telefono}
                                              </td>
                                          </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                    </div>

                </motion.div>


    </>
  )
}

export default Home
