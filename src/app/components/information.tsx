"use client";

export const Information = () => {
  return (
    <>
      <header className="bg-[#c21d30] text-gray-100 p-6 text-center">
        <h1 className="text-3xl font-bold">Autocross in New England</h1>
        <p className="text-lg mt-2">
          Your guide to the most thrilling grassroots motorsport in the region
        </p>
      </header>

      <div className="container mx-auto p-6">
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-100 mb-4">
            What is Autocross?
          </h2>
          <p className="text-gray-300">
            Autocross is a timed competition where drivers navigate a course
            marked by cones on a large, open surface like a parking lot or
            airfield. It emphasizes car control, precision, and driving skill,
            making it accessible and safe for enthusiasts of all experience
            levels.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-100 mb-4">
            Benefits of Autocross
          </h2>
          <div className="bg-gray-700 border border-gray-600 rounded-lg shadow p-6">
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>
                <strong>Learn Car Control:</strong> Improve your driving skills
                in a controlled environment.
              </li>
              <li>
                <strong>Affordable Motorsport:</strong> Low cost compared to
                other motorsports.
              </li>
              <li>
                <strong>Community:</strong> Join a friendly and welcoming
                community of car enthusiasts.
              </li>
              <li>
                <strong>Versatility:</strong> Run almost any car, from daily
                drivers to sports cars.
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-100 mb-4">
            Costs and Preperation
          </h2>
          <div className="bg-gray-700 border border-gray-600 rounded-lg shadow p-6">
            <p className="text-gray-300 mb-4">
              Participating in autocross is affordable compared to other forms
              of motorsport. Here&apos;s what to expect:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>
                <strong>Entry Fee:</strong> Typically $50-$80 per event.
              </li>
              <li>
                <strong>Membership:</strong> Some clubs require annual
                memberships (these are typically less than $100 per year).
              </li>
              <li>
                <strong>Vehicle Prep:</strong> No modifications needed; ensure
                your car is safe and in good mechanical condition.
              </li>
            </ul>
            <p className="text-gray-300 mt-4">
              Cars are divided into classes based on modifications and
              performance, ranging from stock classes to highly modified or
              specialty vehicles. Check with your local club for specific
              classifications.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-100 mb-4">
            Clubs in the New England Region
          </h2>
          <div className="bg-gray-700 border border-gray-600 rounded-lg shadow p-6">
            <p className="text-gray-300 mb-4">
              All clubs welcome all makes and models of cars and have their own
              small differences, but each offers a great experience and plenty
              of fun. No matter which club you choose, you&apos;re in for a good
              time!
            </p>
            <p className="text-gray-300">
              So whether you want to open classing of SVT, the tight competition
              of SCCA, or somewhere in the middle with BMW, Porsche or Renegade
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-100 mb-4">
            What You Need to Participate
          </h2>
          <div className="bg-gray-700 border border-gray-600 rounded-lg shadow p-6">
            <p className="text-gray-300">
              To participate in an autocross event, you will need:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>
                <strong>SA2015+ Helmet:</strong> A helmet meeting the SA2015
                standard or newer.
              </li>
              <li>
                <strong>Vehicle Requirements:</strong> A car that has no leaking
                fluids and complies with sound limits (check with your local
                club for specific decibel limits).
              </li>
              <li>
                <strong>Preparedness:</strong> Ensure your car is in good
                mechanical condition, including brakes and tires.
              </li>
            </ul>
            <p className="text-gray-300 mt-4">
              Most events provide loaner helmets for beginners, but it is always
              best to check ahead of time.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-100 mb-4">
            Register for Events
          </h2>
          <div className="bg-gray-700 border border-gray-600 rounded-lg shadow p-6">
            <p className="text-gray-300 mb-4">
              Ready to join the action? Register for upcoming autocross events
              through the platforms below:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <a
                  href="https://www.projectdevens.com/calendar"
                  className="text-[#c21d30] hover:underline"
                  target="_blank"
                >
                  Project Devens Event Calendar
                </a>{" "}
                - Stay up to date on events held at Devens.
              </li>
              <li>
                <a
                  href="https://www.motorsportreg.com/calendar/?country=US&radius=5&lat=42.56&lng=-71.56&loc=01432"
                  className="text-[#c21d30] hover:underline"
                  target="_blank"
                >
                  MotorsportReg
                </a>{" "}
                - Find and register for autocross events in your area.
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-100 mb-4">Videos</h2>
          <div className="bg-gray-700 border border-gray-600 rounded-lg shadow p-6">
            <p className="text-gray-300 mb-4">
              Check out some exciting autocross action from some of Devens
              regulars:
            </p>
            <div className="flex flex-wrap justify-center">
              <iframe
                className="m-4 mt-0"
                width="560"
                height="315"
                src="https://www.youtube.com/embed/9rS7BCE80tw?si=Mm0uHpbddxg5Hasy"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
              <iframe
                className="m-4 mt-0"
                width="560"
                height="315"
                src="https://www.youtube.com/embed/P4jOXjXsJRc?si=nNHg43u0l1hx7Sjf"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
              <iframe
                className="m-4 mt-0"
                width="560"
                height="315"
                src="https://www.youtube.com/embed/xKCXQuG9e0c?si=89bv9DcrpSxN593Z"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
              <iframe
                className="m-4 mt-0"
                width="560"
                height="315"
                src="https://www.youtube.com/embed/WMd-eAkqxqA?si=u7XCPQSzKiTDI4rH"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </section>
      </div>

      <footer className="bg-[#c21d30] text-gray-100 text-center p-6 mt-12">
        <p>
          &copy; 2025 Autocross New England |{" "}
          <a
            href="https://www.scca.com/"
            className="text-gray-100 hover:underline"
          >
            Learn More About SCCA Autocross
          </a>
        </p>
      </footer>
    </>
  );
};
