import React, { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Typography,
} from "@material-tailwind/react";

const Blog = () => {
  const [openAccordionIndex, setOpenAccordionIndex] = useState(0);

  return (
    <div className="container mx-auto p-5">
      <Accordion open={openAccordionIndex === 1}>
        <AccordionHeader
          className="text-left"
          onClick={() =>
            setOpenAccordionIndex(openAccordionIndex === 1 ? 0 : 1)
          }
        >
          How SQL and NoSQL differ from each other?
        </AccordionHeader>
        <AccordionBody>
          <Typography className="mb-4" variant="paragraph">
            SQL databases store data in tabular fashion. On the other hand,
            NoSQL databases store data in document fashion.
          </Typography>
        </AccordionBody>
      </Accordion>
      <Accordion open={openAccordionIndex === 2}>
        <AccordionHeader
          className="text-left"
          onClick={() =>
            setOpenAccordionIndex(openAccordionIndex === 2 ? 0 : 2)
          }
        >
          What is JWT? How does it work?
        </AccordionHeader>
        <AccordionBody>
          <Typography className="mb-4" variant="paragraph">
            JSON Web Token (JWT) is an encryption method to encrypt data in
            order to share the data between parties.
          </Typography>
          <Typography className="mb-4" variant="paragraph">
            Only the party that encrypts (or signs) the data can decrypt it. So,
            we are sure of data integrity.
          </Typography>
          <Typography className="mb-4" variant="paragraph">
            JWT Issuer encrypts (or signs) data with a secret and encryption
            algorithm. Encrypted data is sent to client. Whenever client need to
            prove its claim of some resource to the issuer, client sends the
            encrypted data (aka the token) with resource request. Server can
            decrypt the data only if it is also the issuer of the data. That's
            how JWT helps prove claims.
          </Typography>
        </AccordionBody>
      </Accordion>
      <Accordion open={openAccordionIndex === 3}>
        <AccordionHeader
          className="text-left"
          onClick={() =>
            setOpenAccordionIndex(openAccordionIndex === 3 ? 0 : 3)
          }
        >
          What is the difference between javascript and NodeJS?
        </AccordionHeader>
        <AccordionBody>
          <Typography className="mb-4" variant="paragraph">
            Javascript is a language— a Programming Language.
          </Typography>
          <Typography className="mb-4" variant="paragraph">
            On the other hand, NodeJS is a development platform or runtime that
            understands Javascript.
          </Typography>
          <Typography className="mb-4" variant="paragraph">
            There are also browsers, deno etc, who understand Javascript. NodeJS
            is one of them.
          </Typography>
          <Typography className="mb-4" variant="paragraph">
            If you want to get something done with NodeJS, you can tell NodeJS
            what you want it to do with Javascript.
          </Typography>
          <Typography className="mb-4" variant="paragraph">
            NodeJS is a development platform with whom you can communicate with
            Javascript.
          </Typography>
        </AccordionBody>
      </Accordion>
      <Accordion open={openAccordionIndex === 4}>
        <AccordionHeader
          className="text-left"
          onClick={() =>
            setOpenAccordionIndex(openAccordionIndex === 4 ? 0 : 4)
          }
        >
          How does NodeJS handle multiple requests at the same time?
        </AccordionHeader>
        <AccordionBody>
          <Typography className="mb-4" variant="paragraph">
            Node works in asynchronous nature and driven by events. Its
            operations are non-blocking. It does not block the main thread by
            waiting for some work to complete first. Rather, registering a
            callback to its completion event, it proceed to the next task.
            That's why node is great for I/O intensive Applications.
          </Typography>
          <Typography className="mb-4" variant="paragraph">
            When NodeJS receives multiple requests, it places the requests into
            Event Queue. Node has an Event Loop, that keeps an eye on the main
            thread and event queue. Whenever Event Loop sees an task on event
            queue is completed and main thread is empty, it takes the task from
            the from the event queue and execute its callback on main thread,
            thus serving the requests.
          </Typography>
        </AccordionBody>
      </Accordion>
    </div>
  );
};

export default Blog;
