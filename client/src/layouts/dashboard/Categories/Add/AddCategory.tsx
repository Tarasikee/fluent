import React, {FC} from 'react';
import {Breadcrumb, Button, Col, Container, FloatingLabel, Form, Row} from "react-bootstrap";
import {hookedInput} from "../../../../hooks/useInput";

interface AddProps {
    back: () => void,
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
    name: hookedInput,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    isLoading: boolean,
    image: string | ArrayBuffer
}

const AddCategory: FC<AddProps> = ({
                               back,
                               handleSubmit,
                               name,
                               onChange,
                               isLoading,
                               image
                           }) => (<>
    <Col md={12}>
        <Breadcrumb className={"display-6"}>
            <Breadcrumb.Item onClick={back}>Categories</Breadcrumb.Item>
            <Breadcrumb.Item active>Add</Breadcrumb.Item>
        </Breadcrumb>
    </Col>

    <Col md={12} className={'mt-5'}>
        <Container>
            <Row>
                <Col md={8} className={"border-end"}>
                    <Form onSubmit={handleSubmit}>
                        <FloatingLabel label="Name" className="mb-3">
                            <Form.Control {...name} type="text" placeholder="Category name" />
                        </FloatingLabel>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor={"file"}>Category image</Form.Label>
                            <Form.Control
                                accept="image/png, image/jpeg"
                                onChange={onChange}
                                type="file" placeholder="Category name"
                                id={"file"} />
                        </Form.Group>

                        <Button variant="primary" type="submit" disabled={isLoading}>
                            {isLoading ? 'Loading…' : 'Enter'}
                        </Button>
                    </Form>
                </Col>

                <Col md={4}>
                    {image
                        ? <img className={"w-100"} src={image.toString()} alt={"Choose an image"} />
                        : <p>Image preview</p>}
                </Col>
            </Row>
        </Container>
    </Col>
</>);

export default AddCategory;
