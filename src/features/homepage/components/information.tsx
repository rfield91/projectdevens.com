import { Header2 } from "@/components/header/headers";
import { InfoSection } from "@/components/info-section/info-section";
import { Stack } from "@/components/stack/stack";
import Link from "next/link";

export const Information = () => {
  return (
    <>
      <header className="bg-[#c21d30] text-white p-6 text-center flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Autocross in New England</h1>
        <div className="text-lg">
          Your guide to the most thrilling grassroots motorsport in the region.
        </div>
        <div>
          <Link
            href="/calendar"
            className="bg-white text-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:text-neutral-100 p-5 inline-block rounded-full font-bold hover:brightness-90 hover:text-neutral-800 transition-all ease-in-out duration-500"
          >
            View Upcoming Events
          </Link>
        </div>
      </header>

      <div className="container mx-auto p-6">
        <section className="mb-8">
          <Header2>What is Autocross?</Header2>
          <p>
            Autocross is a timed competition where drivers navigate a course
            marked by cones on a large, open surface like a parking lot or
            airfield. It emphasizes car control, precision, and driving skill,
            making it accessible and safe for enthusiasts of all experience
            levels.
          </p>
        </section>

        <Stack>
          <InfoSection
            header={"Benefits of Autocross"}
            body={
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Learn Car Control:</strong> Improve your driving
                  skills in a controlled environment.
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
            }
          />

          <InfoSection
            header={"Costs and Preperation"}
            body={
              <Stack>
                <p>
                  Participating in autocross is affordable compared to other
                  forms of motorsport. Here&apos;s what to expect:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Entry Fee:</strong> Typically $50-$80 per event.
                  </li>
                  <li>
                    <strong>Membership:</strong> Some clubs require annual
                    memberships (these are typically less than $100 per year).
                  </li>
                  <li>
                    <strong>Vehicle Prep:</strong> No modifications needed;
                    ensure your car is safe and in good mechanical condition.
                  </li>
                </ul>
                <p>
                  Cars are divided into classes based on modifications and
                  performance, ranging from stock classes to highly modified or
                  specialty vehicles. Check with your local club for specific
                  classifications.
                </p>
              </Stack>
            }
          />

          <InfoSection
            header={"Clubs in the New England Region"}
            body={
              <Stack gap="sm">
                <p>
                  All clubs welcome all makes and models of cars and have their
                  own small differences, but each offers a great experience and
                  plenty of fun. No matter which club you choose, you&apos;re in
                  for a good time!
                </p>
                <p>
                  So whether you want to open classing of SVT, the tight
                  competition of SCCA, or somewhere in the middle with BMW,
                  Porsche or Renegade
                </p>
              </Stack>
            }
          />

          <InfoSection
            header={"What You Need to Participate"}
            body={
              <Stack>
                <p>To participate in an autocross event, you will need:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>SA2015+ Helmet:</strong> A helmet meeting the SA2015
                    standard or newer.
                  </li>
                  <li>
                    <strong>Vehicle Requirements:</strong> A car that has no
                    leaking fluids and complies with sound limits (check with
                    your local club for specific decibel limits).
                  </li>
                  <li>
                    <strong>Preparedness:</strong> Ensure your car is in good
                    mechanical condition, including brakes and tires.
                  </li>
                </ul>
                <p>
                  Most events provide loaner helmets for beginners, but it is
                  always best to check ahead of time.
                </p>
              </Stack>
            }
          />

          <InfoSection
            header={"Register for Events"}
            body={
              <Stack>
                <p>
                  Ready to join the action? Register for upcoming autocross
                  events through the platforms below:
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
              </Stack>
            }
          />

          <InfoSection
            header={"Videos"}
            body={
              <Stack>
                <p className=" mb-4">
                  Check out some exciting autocross action from some of Devens
                  regulars:
                </p>
                <Stack align="center">
                  {[
                    "https://www.youtube.com/embed/9rS7BCE80tw?si=Mm0uHpbddxg5Hasy",
                    "https://www.youtube.com/embed/P4jOXjXsJRc?si=nNHg43u0l1hx7Sjf",
                    "https://www.youtube.com/embed/xKCXQuG9e0c?si=89bv9DcrpSxN593Z",
                    "https://www.youtube.com/embed/WMd-eAkqxqA?si=u7XCPQSzKiTDI4rH",
                  ].map((video) => (
                    <iframe
                      key={video}
                      width="560"
                      height="315"
                      src={video}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    ></iframe>
                  ))}
                </Stack>
              </Stack>
            }
          />
        </Stack>
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
