import { Col, Container, Row } from 'react-bootstrap';
import Header from './components/Header';
import Library from './components/Library';
import Template from './components/Template';

function App() {
  return (
    <div>
      <Row xs={12}>
        <Header title="Automated Workspace" />

        <Container>
          <Row className="content">
            <Col md={8} className="container-decorator">
              <Template />
            </Col>
            <Col md={4} className="container-decorator">
              <Library />
            </Col>
          </Row>
        </Container>
      </Row>
    </div>
  );
}

export default App;
