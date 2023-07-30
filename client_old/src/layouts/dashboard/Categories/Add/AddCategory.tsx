import React, {FC} from 'react';
import {Breadcrumb, Button, Col, Container, FloatingLabel, Form, Row} from "react-bootstrap";
import {FormikProps} from "formik";
import {initialAddCategoriesProps} from "../../../../interfaces/IFormikProps";
import {useNavigate} from "react-router-dom";
import Thumb from "../../../../components/Thumb";

const AddCategory: FC<FormikProps<initialAddCategoriesProps>> = (
    {
        values, setFieldValue,
        handleSubmit, handleChange, isSubmitting
    }
) => {
    const navigate = useNavigate();

    const back = () => navigate('/admin/categories');

    return (<>
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
                        <Form onSubmit={handleSubmit} noValidate>
                            <FloatingLabel label="Name" className="mb-3">
                                <Form.Control
                                    name="name" onChange={handleChange} value={values.name}
                                    type="text" placeholder="Category name"/>
                            </FloatingLabel>

                            <Form.Group className="mb-3">
                                <Form.Label htmlFor={"file"}>Category image</Form.Label>
                                <Form.Control
                                    accept="image/png, image/jpeg" name={'file'} onChange={event => {
                                        setFieldValue("file", (event.currentTarget as any).files[0]);
                                    }} type="file" placeholder="Category name"/>
                            </Form.Group>

                            <Button variant="primary" type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Loading…' : 'Enter'}
                            </Button>
                        </Form>
                    </Col>

                    <Col md={4}>
                        <Thumb thumb={values.file} />
                    </Col>
                </Row>
            </Container>
        </Col>
    </>);
};

export default AddCategory;
