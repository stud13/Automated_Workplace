import { Col, Container, Row } from 'react-bootstrap';
import Header from './components/Header';
import Library from './components/Library';
import './css/app.css';
import Template from './components/Template';

function App() {
  return (
    <div>
      <Row xs={12}>
        <Header title="Automated Workspace" />
      </Row>

      <Container>
        <Row className="content">
          <Col md={8}>
            <Template />
          </Col>
          <Col md={4}>
            <Library />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
