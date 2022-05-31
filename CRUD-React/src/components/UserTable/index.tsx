import React from 'react';
import { Container, Table } from 'react-bootstrap';
import { User } from "../../types"

interface UserTableProps {
    users: User[];
}

const UserTable: React.FC<UserTableProps> = ({
    users
}) => {
    return (
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
                    {users.map(user => (
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
    );
}

export default UserTable;