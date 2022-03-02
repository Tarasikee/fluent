import React, {FC} from 'react';
import {Breadcrumb, Button, Col, Container, FloatingLabel, Form, Row} from "react-bootstrap";
import {ICategory} from "../../../../interfaces/ICategory";
import PositionContainer from "../Position/PositionContainer";

interface CategoryProps {
    category?: ICategory;
    name: string;
    back: () => void;
    onDelete: () => void;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    isLoading: boolean;
    changed: boolean;
    imagePreview: string | null;
}

const Category: FC<CategoryProps> = ({
                                         category,
                                         name,
                                         back,
                                         onDelete,
                                         onInputChange,
                                         onFileChange,
                                         handleSubmit,
                                         isLoading,
                                         changed,
                                         imagePreview
                                     }) => (<div>
    <Col md={12} className={"d-flex align-items-center justify-content-between"}>
        <Breadcrumb className={"display-6"}>
            <Breadcrumb.Item onClick={back}>Categories</Breadcrumb.Item>
            {category && <Breadcrumb.Item active>{category.name}</Breadcrumb.Item>}
        </Breadcrumb>

        {category && <Button onClick={onDelete} variant="danger">Delete</Button>}
    </Col>

    <Col md={12} className={'mt-5'}>
        <Container>
            {category
                ? <>
                    <Row>
                        <Col md={8}>
                            <Form onSubmit={handleSubmit}>
                                <FloatingLabel label="Name" className="mb-3">
                                    <Form.Control value={name} onChange={onInputChange} type="text"
                                                  placeholder="Category name" />
                                </FloatingLabel>

                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor={"file"}>Update image</Form.Label>
                                    <Form.Control
                                        accept="image/png, image/jpeg"
                                        onChange={onFileChange}
                                        type="file" placeholder="Category name" />
                                </Form.Group>

                                <Button type="submit" disabled={isLoading || !changed}>
                                    {isLoading ? 'Loading…' : 'Update'}
                                </Button>
                            </Form>
                        </Col>

                        <Col md={4} className={"mt-5 mt-md-0"}>
                            {imagePreview
                                ? <img className={"w-100 rounded"} src={imagePreview} alt={"Choose an imagePreview"} />
                                : <p>No image</p>}
                        </Col>
                    </Row>

                    <PositionContainer />
                </>
                : <p>There isn`t such category or it might be deleted!</p>}
        </Container>
    </Col>
</div>);

export default Category;
