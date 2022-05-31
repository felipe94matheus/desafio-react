import { Fragment, useEffect, useState } from 'react'
import { Container, Button, Table, Modal, Form } from 'react-bootstrap'
import { useFormik } from 'formik'
import Navbar from './components/Navbar'
import UserTable from './components/UserTable'
import './App.css'
import { renderUsers, createUser } from './api'
import { User } from "./types"
import ModalCreateUser from './components/ModalCreateUser'

function App(): JSX.Element {
  const [userList, setUsers] = useState<User[]>([] as User[])

  const [userCreateModal, setUserCreateModal] = useState<boolean>(false)

  useEffect(() => {
    renderUsers().then(users => setUsers(users))
  }, [])

  const handleCreateUser = async (user: Omit<User, "id">) => {
    const newUser = await createUser(user)
    setUsers(
      oldUserList => [...oldUserList, newUser]
    )
  }
  // Função para abrir o nosso modal
  const handleOpenCreateUserModal = () => {
    setUserCreateModal(true)
  }

  // Função para fechar o nosso modal
  const handleCloseCreateUserModal = () => {
    setUserCreateModal(false)
  }



  return (
    <Fragment>
      {/*Navbar*/}
      <Navbar onClick={handleOpenCreateUserModal} />
      {/*Container*/}
      <UserTable users={userList} />
      {/*Modal de crição do usuario*/}
      <ModalCreateUser
        show={userCreateModal}
        createUser={handleCreateUser}
        onHide={handleCloseCreateUserModal} />
    </Fragment>
  )
}

export default App
