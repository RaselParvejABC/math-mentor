import React from "react";

const Testimonial = () => {
  return (
    <section className="my-20 text-gray-700 px-4">
      <div className="text-center max-w-3xl mx-auto">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Testimonials</h3>
        <p className="mb-6 pb-2 md:mb-12">
          Let's hear from two of my special Apprentices!
        </p>
      </div>

      <div className="px-6 grid md:grid-cols-2 gap-12 text-center">
        <div className="mb-6 md:mb-0 px-8">
          <div className="flex justify-center mb-6">
            <img
              src="https://i.ibb.co/QCSRz8F/sherlock.jpg"
              className="rounded-full shadow-lg w-24"
              alt="Sherlock Holmes"
            />
          </div>
          <p className="text-xl my-4 text-gray-500">
            To defeat my greatest nemesis, Professor James Moriarty, I had to
            decode one of his Notebooks, the content of which was kind of
            mathematically encrypted.
            <br />
            <br />
            Without kind mentorship and help of Muhammad Rasel Parvej, the Math
            Mentor here, it would be impossible, even for me.
            <br />
            <br />
            And thanks, God! He is a not criminal!
          </p>
          <p className="italic">- Sherlock Holmes</p>
        </div>
        <div className="mb-0 px-8">
          <div className="flex justify-center mb-6">
            <img
              src="https://i.ibb.co/sVWsnr6/batman.jpg"
              className="rounded-full shadow-lg w-24"
              alt="Batman"
            />
          </div>
          <p className="text-xl my-4 text-gray-500">
            When the Riddler challenged me to solve a Math Riddle to save
            Gotham, the Joker and the Penguin laughed at me, saying "Math is not
            some mice for Batsy to catch".
            <br />
            <br />
            I couldn't prove them wrong on the spot. (A bad day for Justice!)
            <br />
            <br />
            But eventually I did prove them wrong with the help of Muhammad
            Rasel Parvej, our dear Math Mentor.
            <br />
            <br />
            Justice was served!
          </p>
          <p className="italic">- Batman (Not Bruce Wayne)</p>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
