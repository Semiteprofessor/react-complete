import { useState } from "react";
import "../accordion.css";

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
  },
];

const Accordion = () => {
  return (
    <div>
      <AccordionView data={faqs} />
    </div>
  );
};

const AccordionView = ({ data }) => {
  const [isOpen, setIsOpen] = useState(null);
  return (
    <div className="accordion">
      {data.map((faq, index) => {
        return (
          <AccordionItem
            title={faq.title}
            text={faq.text}
            num={index}
            key={faq.title}
            isOpen={isOpen}
            onOpen={setIsOpen}
          />
        );
      })}
    </div>
  );
};

const AccordionItem = ({ num, title, text, isOpen, onOpen }) => {
  const currOpen = num === isOpen;
  return (
    <div
      className={`item ${currOpen ? "open" : ""}`}
      onClick={() => onOpen(num)}
    >
      <p className="number">{num < 9 ? `0${num + 1}` : num + 1}</p>
      <p className="title">{title}</p>
      <p className="icon">{currOpen ? "-" : "+"}</p>
      {currOpen && <div className="content-box">{text}</div>}
    </div>
  );
};

export default Accordion;
