import { Fragment, useEffect, useState } from 'react'
import { Navbar, Container, Button, Table, Modal, Form } from 'react-bootstrap'
import { useFormik } from 'formik'
import './App.css'
import { renderUsers, createUser } from './api'

interface User {
  id: number,
  nome: string,
  idade: number,
}

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

  const formik = useFormik({
    initialValues: {
      nome: '',
      idade: 0,
    },
    onSubmit: (values) => {
      handleCreateUser({
        nome: values.nome,
        idade: values.idade,
      })
      handleCloseCreateUserModal()
    }
  })

  return (
    <Fragment>
      {/*Navbar*/}
      <Navbar bg="light" expand="lg">
        <Container fluid style={{ padding: "0 10rem" }}>
          <Navbar.Brand>CRUD React</Navbar.Brand>
          <Button variant="outline-success" onClick={handleOpenCreateUserModal}>
            Adicionar usuário
          </Button>
        </Container>
      </Navbar>
      {/*Container*/}
      <Container fluid="sm" style={{ marginTop: 25 }}>
        <h1>Lista de Usuários</h1>
        <Table striped borderless responsive hover variant="light">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Idade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {userList.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.nome}</td>
                <td>{user.idade}</td>
                <td>Ações</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      {/*Modal de crição do usuario*/}
      <Modal show={userCreateModal} onHide={handleCloseCreateUserModal}>
        <Modal.Header closeButton>
          <Modal.Title>Criar Usuário</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-5">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                id="nome"
                type="text"
                placeholder="Nome Completo"
                value={formik.values.nome}
                onChange={formik.handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-5">
              <Form.Label>Idade</Form.Label>
              <Form.Control
                id="idade"
                type="number"
                placeholder="Idade"
                value={formik.values.idade}
                onChange={formik.handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Button variant="success" type="submit" style={{ marginRight: 15 }}>
                Salvar
              </Button>
              <Button variant="danger" onClick={formik.handleReset}>
                Limpar
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </Fragment>
  )
}

export default App
