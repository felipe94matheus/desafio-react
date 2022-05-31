import React from 'react';
import { Navbar as NavbarComponet, Container, Button } from 'react-bootstrap';

interface NavbarProps {
    onClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onClick }) => {
    return (
        <NavbarComponet bg="light" expand="lg">
            <Container fluid style={{ padding: "0 10rem" }}>
                <NavbarComponet.Brand>CRUD React</NavbarComponet.Brand>
                <Button variant="outline-success" onClick={onClick}>
                    Adicionar usuário
                </Button>
            </Container>
        </NavbarComponet>
    );
}

export default Navbar;