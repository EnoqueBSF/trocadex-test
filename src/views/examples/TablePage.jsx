import React from 'react';
import { Container, Row, Col, Card } from 'reactstrap';

import PageHeader from "components/PageHeader/PageHeader.jsx";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.jsx";
import Footer from 'components/Footer/Footer.jsx';
import CoinsTable from 'components/Table/CoinsTable.jsx';

class TablePage extends React.Component {
    componentDidMount() {
        document.body.classList.toggle("index-page");
    }
      componentWillUnmount() {
        document.body.classList.toggle("index-page");
    }

    render() {
        return (
            <>
            <ExamplesNavbar />
            <div className="wrapper">
                <PageHeader />
                <Container className="mt--7" fluid>
                    <Row>
                        <Col>
                            <Card className="shadow">
                                <CoinsTable />
                            </Card>
                        </Col>
                    </Row>
                </Container>
                <Footer />
            </div>
            </>
        );
    }
}

export default TablePage;