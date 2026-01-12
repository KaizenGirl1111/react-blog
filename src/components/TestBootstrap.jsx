import Button from 'react-bootstrap/Button';

function TestBootstrap() {
  return (
    <>
        <div className="h-50 w-50 border border-2 border-primary">hello</div>
      <Button variant="primary" size="lg" active>
        Primary button
      </Button>
      <Button variant="secondary" size="lg" active>
        Button
      </Button>
    </>
  );
}

export default TestBootstrap;