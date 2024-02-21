import React from 'react'
import { Formik, Form, ErrorMessage } from 'formik'
import { loginUser } from '../API/Route'
import { AnimatePresence, motion, useAnimation } from 'framer-motion'
import * as Yup from 'yup';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../context/userContext';

function FormLogin() {
  const { setIsLoged } = useContext(UserContext);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Ingresa un correo electrónico válido')
      .required('El correo electrónico es requerido'),
    password: Yup.string()
      .required('La contraseña es requerida'),
  });

  return (
    <>
    <main className='flex justify-center items-center w-full h-screen'>

    
      <motion.div
      transition={{
        ease: "linear",
        duration: 2,
        x: { duration: 1 }
      }}
    >
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          email:"",
          password:""
        }}
        onSubmit={async(values, actions)=>{
          console.log("Imprimiendo los valores ")
          console.table(values)
            try{ 
              const response  = await loginUser(values)
              alert("Estoy dentro XD")
              await new Promise((resolve) => {
                window.localStorage.setItem( "loggedUser", JSON.stringify(response.data));
                resolve();
              });
              setIsLoged(true);
              navigate("/home")
            }catch(e){
              console.log("Error: " + e);
            } 
        }}
      
      >{({values, errors, touched, setFieldValue, handleSubmit, handleChange, isSubmitting})=>(
          <Form className='max-w-sm mx-auto w-96 sm:max-w-sm'>
            <h1 className='text-4xl mb-3'>Inicio de Sesión</h1>
            <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ingrese su correo: </label>
                <input type="email" name='email' onChange={handleChange} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
                <ErrorMessage name="email" className='text-red-500' component="div" />
            </div>
            <div className="mb-5">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ingrese su contraseña: </label>
                <input type="text" name='password' onChange={handleChange} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
                <ErrorMessage name="password" className='text-red-500' component="div" />
            </div>
            <div className="mb-5 flex gap-2">
              <p>¿No tienes una cuenta?</p>
              <Link to={"/register"}><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Registrate aqui</span> </Link>
            </div>
            <div className='flex item-center justify-center'>
              <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{isSubmitting ? "Iniciando..." : "Iniciar Sesión"}</button>
            </div>
          </Form> 
      )}
      </Formik>
    </motion.div>
    </main>
    </>
  )
}

export default FormLogin