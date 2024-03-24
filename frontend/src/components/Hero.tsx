import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Link,
} from "@nextui-org/react";

import { Link as RouterLink } from "react-router-dom";
import Container from "./Container";
const Hero = () => {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <Container>
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-3xl">RexAuth</CardHeader>
          <CardBody>
            <p>
              Mern authentication that stores JWT tokens in HTTP-Only cookie. It
              also uses Redux Toolkit and NextUI library
            </p>
          </CardBody>

          <CardFooter className="flex gap-3 items-center">
            <Link as={RouterLink} to="/login">
              Login
            </Link>
            <Button
              as={RouterLink}
              color="primary"
              to="/register"
              variant="flat"
            >
              Sign Up
            </Button>
          </CardFooter>
        </Card>
      </Container>
    </main>
  );
};

export default Hero;
